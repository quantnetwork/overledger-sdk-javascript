// npx ts-node sender-wallet.ts: run only the .ts file examples (if it exists)
// npx tsc sender-wallet.ts (generate the js file)


const fs = require('fs');
const neatCsv = require('neat-csv');
const coinSelect = require('coinselect');
const fetch = require('node-fetch');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const previousEstimateFee = { fastestFee: 44, halfHourFee: 42, hourFee: 36 }; // (curl https://bitcoinfees.earn.com/api/v1/fees/recommended)
const serviceEstimateFeeUrl = 'https://bitcoinfees.earn.com/api/v1/fees/recommended';

interface UtxoCSVObject {
  address: string;
  txHash: string;
  outputIndex: number;
  value: number;
  script?: Buffer;
}

async function createUtxosObjects(overledger, csvFilePath: string, addScript: boolean): Promise<UtxoCSVObject[]> {
  const readStream = fs.createReadStream(csvFilePath);
  const txnInputs = await neatCsv(readStream);
  if (addScript) {
    return Promise.all(txnInputs.map(async (tx) => {
      const script = await getUtxoScriptPubKey(overledger, tx.txHash, parseInt(tx.outputIndex, 10));
      return { ...tx, script };
    }));
  }
  return txnInputs;
}

async function getUtxoScriptPubKey(overledger, txnHash, index) {
  const bitcoinTransaction = await overledger.search.getTransaction(txnHash);
  const scriptPubKey = bitcoinTransaction.data.data.vout.filter(out => {
    return out.n === index
  });
  const scriptHex = scriptPubKey[0].scriptPubKey.hex;
  // const scriptAsm = scriptPubKey[0].scriptPubKey.asm;
  return Buffer.from(scriptHex.toString(), "hex");
}

export async function updateCsvFile(overledger, senderChangeAddress, txnsInputsNotUsed, txnHashInputsToAdd, csvFilePath) {
  const csvWriter = createCsvWriter({
    path: csvFilePath,
    header: [
      { id: 'address', title: 'address' },
      { id: 'txHash', title: 'txHash' },
      { id: 'outputIndex', title: 'outputIndex' },
      { id: 'value', title: 'value' }
    ]
  });
  const newChangeInput = await Promise.all(txnHashInputsToAdd.map(async txnHash => {
    const bitcoinTransaction = await overledger.search.getTransaction(txnHash);
    console.log(`--updating csv file with new inputs--`);
    if (!bitcoinTransaction.data || bitcoinTransaction.data === undefined) {
      throw new Error(`Updating the csv file failed; it will try automatically to update it twice, otherwise you would need to update it manually`);
    }
    const vout = bitcoinTransaction.data.data.vout;
    console.log(bitcoinTransaction.data.data.vout);
    console.log(bitcoinTransaction.data.data.vin);
    const changeOutputVout = vout.filter(o => {
      if (o.scriptPubKey !== undefined && o.scriptPubKey.addresses !== undefined) {
        return o.scriptPubKey.addresses.includes(senderChangeAddress);
      }
      return false;
    });
    console.log(`changeOutputVout ${JSON.stringify(changeOutputVout)}`);
    return {
      address: changeOutputVout[0].scriptPubKey.addresses[0],
      txHash: bitcoinTransaction.data.data.txid,
      outputIndex: changeOutputVout[0].n,
      value: changeOutputVout[0].value
    }
  }));

  let totalRecords;
  if (txnsInputsNotUsed !== undefined) {
    totalRecords = txnsInputsNotUsed.concat(newChangeInput);
  } else {
    totalRecords = newChangeInput;
  }

  console.log(`newChangeInput ${JSON.stringify(totalRecords)}`);
  await csvWriter.writeRecords(totalRecords);
}

function utxosWithSatoshisValues(txnInputs: UtxoCSVObject[]) {
  const txnInputsWithSatoshisValues = txnInputs.map((txn) => {
    return { ...txn, value: btcToSatoshiValue(txn.value) };
  });
  return txnInputsWithSatoshisValues;
}

function btcToSatoshiValue(btcValue: number): number {
  return Math.floor(btcValue * 1e8);
}

function addChangeAddressForChangeOutput(outputs, senderChangeAddress) {
  const finalOutputs = outputs.map(output => {
    if (!output.address) {
      return { ...output, address: senderChangeAddress }
    } else {
      return output;
    }
  });
  return finalOutputs;
}

/***
 * Return the list of inputs, outputs, fee
 * overledger: instance of overledgerSDK
 * csvFilePath: path of the csv file that contains utxos: address,txHash,outputIndex,value
 * senderAddress: the address of the sender
 * receiverAddress: the address the btc are sent to
 * senderChangeAddress: change output address, this address will be the same as the sender address for this version of the wallet
 * valueToSend: btc amount to send
 * addScript: boolean used to call or not the scriptPubKey to compute the estimated transaction bytes instead of the defaults/estimated values for scriptPubKey length proposed by coinselect library
 * userFeeUsed: boolean used to call or not the fee rate set by the user in userEstimateFee. If false it will get the service's fee rates
 * defaultServiceFeeUsed: boolean used to call or not the default service rate. If false it will call the service to get the latest fee rates
 * priority: in case of using the service fee rates, priority should be choosen from "fastestFee", "halfHourFee", "hourFee"
 */
export async function computeCoins(overledger, csvFilePath, senderAddress, receiverAddress, senderChangeAddress, valueToSend, addScript, userFeeUsed, defaultServiceFeeUsed, userEstimateFee, priority) {
  const feeRate = await getEstimateFeeRate(userFeeUsed, defaultServiceFeeUsed, userEstimateFee, priority);
  console.log(`feeRate computeCoins ${feeRate}`);
  const txnInputs = await createUtxosObjects(overledger, csvFilePath, addScript);
  const senderTxnInputs = txnInputs.filter(t => t.address === senderAddress); // for now
  if (!senderTxnInputs || senderTxnInputs === undefined || senderTxnInputs.length === 0) {
    throw new Error(`No utxos inputs; Please check your wallet's balance in the sender-utxo.csv file`);
  }
  const txnInputsWithSatoshisValues = utxosWithSatoshisValues(senderTxnInputs);
  const totalInputsValues = txnInputsWithSatoshisValues.reduce((t, i) => t + i.value, 0);
  const coinSelected = coinSelect(txnInputsWithSatoshisValues, [{ address: receiverAddress, value: btcToSatoshiValue(valueToSend) }], feeRate);
  const fees = coinSelected.fee;
  const totalToOwn = btcToSatoshiValue(valueToSend) + fees;
  console.log(`coinSelected ${JSON.stringify(coinSelected)}`);
  if (Math.floor(totalInputsValues) < Math.floor(totalToOwn) || !coinSelected.outputs || coinSelected.outputs.length === 0) {
    console.log(`total to own (value to send + fees):  ${Math.round(totalToOwn)}`);
    console.log(`total inputs values in the wallet: ${Math.round(totalInputsValues)}`);
    throw new Error(`Not enough BTC in the wallet's balance for the transaction to be sent; Please change the fee rate ${feeRate} or add BTC to your wallet`);
  }
  console.log(`coinSelected ${JSON.stringify(coinSelected)}`);
  let outputsWithChangeAddress = addChangeAddressForChangeOutput(coinSelected.outputs, senderChangeAddress);
  const coinSelectedHashes = coinSelected.inputs.map(sel => { return sel.txHash });
  const coinsToKeep = txnInputs.filter(t => !coinSelectedHashes.includes(t.txHash));
  return { ...coinSelected, coinsToKeep, outputsWithChangeAddress };
}

export function computeBtcRequestTxns(coinSelectTxInputs, coinSelectTxOutputs) {
  const txInputs = coinSelectTxInputs.map(input => {
    return {
      linkedTx: input.txHash,
      linkedIndex: input.outputIndex,
      fromAddress: input.address,
      amount: input.value
    }
  });
  const txOutputs = coinSelectTxOutputs.map(output => {
    return {
      toAddress: output.address,
      amount: output.value
    }
  });
  return { txInputs, txOutputs };
}

async function getEstimateFeeFromService(url) {
  const response = await fetch(url);
  const estimatedFees = await response.json();
  console.log(estimatedFees);
  return estimatedFees;
}

export async function getEstimateFeeRate(userFeeUsed: boolean, defaultServiceFeeUsed: boolean, userEstimateFee?: number, priority?: string) {
  if (userFeeUsed) {
    if (userEstimateFee && userEstimateFee !== undefined) {
      return Math.round(userEstimateFee);
    } else {
      console.log(`User fee is used; Please set the fee rate for the transaction. The last recommended fees are: ${JSON.stringify(previousEstimateFee)}`);
    }
  } else {
    if (priority && priority !== undefined) {
      if (defaultServiceFeeUsed) {
        return previousEstimateFee[priority];
      } else {
        if (serviceEstimateFeeUrl && serviceEstimateFeeUrl !== undefined) {
          try {
            const estimatedfFees = await getEstimateFeeFromService(serviceEstimateFeeUrl.toString());
            return estimatedfFees[priority];
          } catch (e) {
            console.log(`Cannot get the latest estimated fees; default fees are used: ${JSON.stringify(previousEstimateFee)}`);
            return previousEstimateFee[priority];
          }
        } else {
          console.log(`Please make sure the url service to get the estimate fee is correct`);
        }
      }
    } else {
      console.log(`Please set the priority for the default estimate fee to be used`);
    }
  }
}