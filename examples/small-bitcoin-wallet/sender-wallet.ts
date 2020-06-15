// npx ts-node sender-wallet.ts
// npx tsc sender-wallet.ts 

const fs = require('fs');
const neatCsv = require('neat-csv');
const coinSelect = require('coinselect');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const MIN_FEE = 256;
// const feeRate = 55; // satoshis per byte ? endpoint to get estimated fee rate from the connector ????


interface UtxoCSVObject {
  address: string;
  txHash: string;
  outputIndex: number;
  value: number; // satoshis
  script?: Buffer;
}

async function getFeeRate(overledger) {
  const estimateFeeRate = await overledger.dlts.bitcoin.getEstimateFeeRate();
  console.log(estimateFeeRate.data);
  return estimateFeeRate.data.feerate * 1e5; // satoshis/byte
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
    console.log(bitcoinTransaction);
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
  return btcValue * 1e8;
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

export async function computeCoins(overledger, csvFilePath, senderAddress, receiverAddress, senderChangeAddress, valueToSend, addScript) {
  const feeRate = await getFeeRate(overledger);
  console.log(`feeRate computeCoins ${feeRate}`);
  const txnInputs = await createUtxosObjects(overledger, csvFilePath, addScript);
  console.log(`txnInputs ${JSON.stringify(txnInputs)}`);
  // const senderTxnInputs = txnInputs.filter(t => t.address === senderAddress || senderChangeAddresses.includes(t.address));
  const senderTxnInputs = txnInputs.filter(t => t.address === senderAddress); // for now
  const txnInputsWithSatoshisValues = utxosWithSatoshisValues(senderTxnInputs);
  let coinSelected = coinSelect(txnInputsWithSatoshisValues, [{ address: receiverAddress, value: btcToSatoshiValue(valueToSend) }], feeRate);
  let outputsWithChangeAddress = addChangeAddressForChangeOutput(coinSelected.outputs, senderChangeAddress);
  const coinSelectedHashes = coinSelected.inputs.map(sel => { return sel.txHash });
  const coinsToKeep = txnInputs.filter(t => !coinSelectedHashes.includes(t.txHash));
  // "min relay fee not met, 226 < 256 (code 66)
  if (coinSelected.fee < MIN_FEE) {
    const diff = MIN_FEE - coinSelected.fee;
    coinSelected = { ...coinSelected, fee: MIN_FEE };
    outputsWithChangeAddress = outputsWithChangeAddress.map(output => {
      if (output.address === senderChangeAddress) {
        return { ...output, value: output.value - diff }
      } else {
        return output;
      }
    });
    return { ...coinSelected, coinsToKeep, outputsWithChangeAddress };
  }
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

