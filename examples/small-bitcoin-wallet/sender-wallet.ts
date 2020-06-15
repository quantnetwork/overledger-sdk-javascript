
// const csv = require('csv-parser');
// const util = require('util');
// const csv = require('csvtojson');
// const createReadStream = util.promisify(fs.createReadStream);

// ---- sender: 
// Bitcoin account:
//  { privateKey: 'cTmdFnuSqY8xrUKPuVeUip2LyRAwwwv8LqA6G1nLDmBNfPjzrK3s',
//   address: 'mgjbZZqZg1r9Yqo8gjyBL3Y2Mu4XttAu1T' }

// Bitcoin account:
//  { privateKey: 'cRPiTxaWGkxFtsaesEbxEn33oZ97yEjfdygS3sA5JxAwAmL37baM',
//   address: 'mvBLrpwRYs68GzXpTUBUf33jAfWtu6cg8M' }


// ---- receiver:
// Bitcoin account:
//  { privateKey: 'cNoXs1M34cVWhfQvd9cDSRkCfy9hLEGohzEfUrzUy7cdvMKTAhTk',
//   address: 'mqbdQXAAipkAJeKjCVDSg3TJ92y9yxg5yt' }

// Bitcoin account:
//  { privateKey: 'cT3Wm1SE2wqxMu9nh2wG8gWS4d4usidw4zurKbQBXA7jVu8LJe8G',
//   address: 'muxP7kJNsV6v32m52gvsqHJTKLHiB53p9w' }

// npx ts-node sender-wallet.ts
// ----------------------------------------------------------------------------

const fs = require('fs');
const neatCsv = require('neat-csv');
const coinSelect = require('coinselect');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const mappId = 'network.quant.testnet';
const bpiKey = 'joNp29bJkQHwEwP3FmNZFgHTqCmciVu5NYD3LkEtk1I';

// const senderAddress = 'mgjbZZqZg1r9Yqo8gjyBL3Y2Mu4XttAu1T';
const senderAddress = 'muxP7kJNsV6v32m52gvsqHJTKLHiB53p9w';
const senderChangeAddresses = ['muxP7kJNsV6v32m52gvsqHJTKLHiB53p9w'];
const senderPrivateKey = 'cT3Wm1SE2wqxMu9nh2wG8gWS4d4usidw4zurKbQBXA7jVu8LJe8G';
const receiverAddress = 'mqbdQXAAipkAJeKjCVDSg3TJ92y9yxg5yt';
const valueToSend = 0.0001;
const csvFile = '/Users/najlachamseddine/dev/overledger-sdk-javascript/small-bitcoin-wallet/sender-utxos.csv';
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

export async function computeCoins(overledger, csvFilePath, senderAddress, senderChangeAddress, addScript) {
  const feeRate = await getFeeRate(overledger);
  // "min relay fee not met, 226 < 256 (code 66) ?????
  // const feeRate = computedFeeRate <= 1 ? 2 : computedFeeRate;
  console.log(`feeRate computeCoins ${feeRate}`)
  const txnInputs = await createUtxosObjects(overledger, csvFilePath, addScript);
  console.log(`txnInputs ${JSON.stringify(txnInputs)}`);
  // const senderTxnInputs = txnInputs.filter(t => t.address === senderAddress || senderChangeAddresses.includes(t.address));
  const senderTxnInputs = txnInputs.filter(t => t.address === senderAddress); // for now
  const txnInputsWithSatoshisValues = utxosWithSatoshisValues(senderTxnInputs);
  let coinSelected = coinSelect(txnInputsWithSatoshisValues, [{ address: receiverAddress, value: btcToSatoshiValue(valueToSend) }], feeRate);
  let outputsWithChangeAddress = addChangeAddressForChangeOutput(coinSelected.outputs, senderChangeAddress);
  const coinSelectedHashes = coinSelected.inputs.map(sel => { return sel.txHash });
  const coinsToKeep = txnInputs.filter(t => !coinSelectedHashes.includes(t.txHash));
  console.log(`computeCoins ${JSON.stringify({ ...coinSelected, outputsWithChangeAddress })}`);
  if (coinSelected.fee < 256) {
    const diff = 256 - coinSelected.fee;
    coinSelected = { ...coinSelected, fee: 256 };
    console.log(`coinSelected ${JSON.stringify(coinSelected)}`);
    outputsWithChangeAddress = outputsWithChangeAddress.map(output => {
      if (output.address === senderChangeAddress) {
        return { ...output, value: output.value - diff }
      } else {
        return output;
      }
    });
    console.log(`newOutputsWithChangeAddress ${JSON.stringify(outputsWithChangeAddress)}`);
    console.log(`coinSelected ${JSON.stringify(coinSelected)}`);
    console.log(`outputsWithChangeAddress ${JSON.stringify(outputsWithChangeAddress)}`);
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


// ; (async () => {
//   const overledger = new OverledgerSDK(mappId, bpiKey, {
//     dlts: [{ dlt: DltNameOptions.BITCOIN }],
//     provider: { network: 'testnet' },
//   });
//   const txHash = "220de086b14a6e36263f92daf2bee8a85c85087c3ce08181ebc6555b75d89f3f";
//   await updateCsvFile(overledger, senderChangeAddress, [txHash], csvFile);

// })();


// async function runExample() {
//   const utxos: UtxoCSVObject[] = await createUtxosObjects(csvFile);
//   console.log(`CSV OBJECT ${JSON.stringify(utxos)}`);
//   const values = utxos.filter((txn) => txn.value > valueToSend);
//   console.log(`values ${JSON.stringify(values)}`);
// }


// async function runExample2() {
//   const utxos: UtxoCSVObject[] = await createUtxosObjects(csvFile);
//   console.log(`CSV OBJECT ${JSON.stringify(utxos)}`);
//   // const values = utxos.filter((txn) => txn.value > valueToSend);
//   const values = utxos.map((txn) => { 
//     return { ...txn, value: btcToSatoshiValue(txn.value)};
//   });
//   console.log(`values ${JSON.stringify(values)}`);
// }

// ;(async () => {
//   // return runExample2();
//   const txnInputs = await createUtxosObjects(csvFile);
//   console.log(`txnInputs ${JSON.stringify(txnInputs)}`);
//   const txnInputsWithSatoshisValues = utxosWithSatoshisValues(txnInputs);
//   const { inputs, outputs, fee } = coinSelect( txnInputsWithSatoshisValues, [{ address: receiverAddress, value: btcToSatoshiValue(valueToSend)}], 50);
//   const finalOutputs = addChangeAddressForChangeOutput(outputs, senderChangeAddress);
//   console.log(`res coin select ${JSON.stringify({ inputs, outputs, finalOutputs, fee } )}`);
// })();


// ;(async () => {
//   const overledger = new OverledgerSDK(mappId, bpiKey, {
//     dlts: [{ dlt: DltNameOptions.BITCOIN }],
//     provider: { network: 'testnet' },
//   });
//   // const txHash = "d59cbe2c485ff0d62af1aaaff9c45e35e901340c063f9ee32f5027d6665cdd7f";
//   const objects = await createUtxosObjects(overledger, csvFile, false);
//   console.log(objects);
// })();


// NEED TO ADD SCRIPT SIZE OF EACH TXN IN BYTES !!!
// BnB algorithm

// TRANSACTION BUILDER DEPRECATED ---> NEEDS TO USE psbt
