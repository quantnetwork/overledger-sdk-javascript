
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

// npx ts-node sender-wallet.ts
// ----------------------------------------------------------------------------

const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;
const TransactionTypeOptions = require('@quantnetwork/overledger-types').TransactionTypeOptions;
const TransactionBitcoinSubTypeOptions = require('@quantnetwork/overledger-dlt-bitcoin').TransactionBitcoinSubTypeOptions;
const fs = require('fs');
const neatCsv = require('neat-csv');
const coinSelect = require('coinselect');

const mappId = 'network.quant.testnet';
const bpiKey = 'joNp29bJkQHwEwP3FmNZFgHTqCmciVu5NYD3LkEtk1I';

const senderAddress = 'mgjbZZqZg1r9Yqo8gjyBL3Y2Mu4XttAu1T';
const senderChangeAddress = 'mvBLrpwRYs68GzXpTUBUf33jAfWtu6cg8M';
const senderPrivateKey = 'cTmdFnuSqY8xrUKPuVeUip2LyRAwwwv8LqA6G1nLDmBNfPjzrK3s';
const receiverAddress = 'mqbdQXAAipkAJeKjCVDSg3TJ92y9yxg5yt';
const valueToSend = 0.0001;
const csvFile = './sender-utxos.csv';
const feeRate = 55; // satoshis per byte ? endpoint to get estimated fee rate from the connector ????


interface UtxoCSVObject {
  address: string;
  txHash: string;
  // script: string;
  outputIndex: number;
  value: number; // satoshis
}

interface UtxoInput {
  address: string;
  txHash: string;
  script: string;
  outputIndex: number;
  value: number; // satoshis
}

interface UtxoOutput {
  address: string;
  value: number; // satoshis
}

async function createUtxosObjects(csvFilePath): Promise<UtxoCSVObject[]> {
  const readStream = fs.createReadStream(csvFilePath);
  const txnInputs = await neatCsv(readStream);
  return txnInputs;
}

function utxosWithSatoshisValues(txnInputs: UtxoCSVObject[]) {
  const txnInputsWithSatoshisValues = txnInputs.map((txn) => { 
    return { ...txn, value: btcToSatoshiValue(txn.value)};
  });
  return txnInputsWithSatoshisValues;
}

function btcToSatoshiValue(btcValue: number): number {
 return btcValue * 1e8;
}

function addChangeAddressForChangeOutput(outputs, senderChangeAddress) {
  const finalOutputs = outputs.map( output => {
    if(!output.address){
      return { ...output, address: senderChangeAddress }
    } else {
      return output;
    }
  });
  return finalOutputs;
}

async function computeCoins(csvFilePath) {
  const txnInputs = await createUtxosObjects(csvFilePath);
  console.log(`txnInputs ${JSON.stringify(txnInputs)}`);
  const txnInputsWithSatoshisValues = utxosWithSatoshisValues(txnInputs);
  const coinSelected = coinSelect(txnInputsWithSatoshisValues, [{ address: receiverAddress, value: btcToSatoshiValue(valueToSend)}], feeRate);
  const outputsWithChangeAddress = addChangeAddressForChangeOutput(coinSelected.outputs, senderChangeAddress);
  console.log(`computeCoins ${JSON.stringify({ ...coinSelected, outputsWithChangeAddress })}`);
  return { ...coinSelected, outputsWithChangeAddress };
}

function computeBtcRequestTxns(coinSelectTxInputs, coinSelectTxOutputs) {
  const txInputs = coinSelectTxInputs.map( input => {
    return {
      linkedTx: input.txHash,
      linkedIndex: input.outputIndex,
      fromAddress: input.address, 
      amount: input.value 
    }
  });
  const txOutputs = coinSelectTxOutputs.map( output => {
    return {
      toAddress: output.address, 
      amount: output.value
    }
  });
   return { txInputs, txOutputs };
}

; (async () => {
  try {
    // Connect to overledger and choose which distributed ledgers to use:
    const overledger = new OverledgerSDK(mappId, bpiKey, {
      dlts: [{ dlt: DltNameOptions.BITCOIN }],
      provider: { network: 'testnet' },
    });
    const transactionMessage = 'OVL SDK Wallet Test';
    const coinSelected = await computeCoins(csvFile);
    const { txInputs, txOutputs } = computeBtcRequestTxns(coinSelected.inputs, coinSelected.outputsWithChangeAddress);

    overledger.dlts.bitcoin.setAccount(senderPrivateKey);

    const signedTransaction = await overledger.sign([
    {
      dlt: DltNameOptions.BITCOIN,
      type: TransactionTypeOptions.UTXO,
      subType: {name: TransactionBitcoinSubTypeOptions.VALUE_TRANSFER},
      message: transactionMessage,
            // The following parameters are from the TransactionUtxoRequest object:
      txInputs,
      txOutputs,
      extraFields: {
        feePrice: coinSelected.fee // Price for the miner to add this transaction to the block
      },
    },
   ]);

    console.log("Signed transactions: ");
    console.log(JSON.stringify(signedTransaction, null, 2));

    // Send the transactions to Overledger.
    const result = (await overledger.send(signedTransaction)).data;

    // Log the result.
    console.log('OVL result:');
    console.log(JSON.stringify(result, null, 2));
    console.log("");
      console.log('Your ' + result.dltData[0].dlt + ' value transfer transaction hash is: ' + result.dltData[0].transactionHash);
  } catch (e) {
    console.error('error:', e);
  }
})();



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
