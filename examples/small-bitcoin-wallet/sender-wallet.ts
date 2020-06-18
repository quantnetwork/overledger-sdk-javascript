// npx ts-node sender-wallet.ts: run only the .ts file examples (if exist)
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


// response code: 500 responseMessage Internal Server Error, response: {\\\"result\\\":null,\\\"error\\\":{\\\"code\\\":-26,\\\"message\\\":\\\"min relay fee not met, 374 < 403 (code 66)\\\"},\\\"id\\\":\\\"1\\\"}\\n\",\"details\":\"uri=/transactions\"}],\"errorCount\":1}" 
// 374 2 inputs/ 2 outputs

// address,txHash,outputIndex,value
// muxP7kJNsV6v32m52gvsqHJTKLHiB53p9w,e69d06cefe436d76aed3486a2e277d71db0547cb0d15d3ddbc98bac42875bf1f,1,0.00031979
// muxP7kJNsV6v32m52gvsqHJTKLHiB53p9w,27ab7afc5ef53fbf99348e15dc54b397d2c2e2858d89b63141ad864d97a8c614,1,0.00003724
