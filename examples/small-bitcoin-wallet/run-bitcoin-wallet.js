const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;
const TransactionTypeOptions = require('@quantnetwork/overledger-types').TransactionTypeOptions;
const TransactionBitcoinSubTypeOptions = require('@quantnetwork/overledger-dlt-bitcoin').TransactionBitcoinSubTypeOptions;
const computeCoins = require('./sender-wallet.js').computeCoins;
const computeBtcRequestTxns = require('./sender-wallet.js').computeBtcRequestTxns;
const updateCsvFile = require('./sender-wallet').updateCsvFile;


const mappId = 'network.quant.testnet';
const bpiKey = 'joNp29bJkQHwEwP3FmNZFgHTqCmciVu5NYD3LkEtk1I';

const senderAddress = 'muxP7kJNsV6v32m52gvsqHJTKLHiB53p9w';
const senderChangeAddresses = ['muxP7kJNsV6v32m52gvsqHJTKLHiB53p9w'];
const senderPrivateKey = 'cT3Wm1SE2wqxMu9nh2wG8gWS4d4usidw4zurKbQBXA7jVu8LJe8G';
const receiverAddress = 'mqbdQXAAipkAJeKjCVDSg3TJ92y9yxg5yt';
const valueToSend = 0.0004;
const csvFile = './sender-utxos.csv';
const userFeeRate = 12; // satoshis/byte
const feePrority = ["fastestFee", "halfHourFee", "hourFee"];



; (async () => {
  try {
    // Connect to overledger and choose which distributed ledgers to use:
    const overledger = new OverledgerSDK(mappId, bpiKey, {
      dlts: [{ dlt: DltNameOptions.BITCOIN }],
      provider: { network: 'testnet' },
    });
    const transactionMessage = 'OVL SDK Wallet Test';
    const senderChangeAddress = senderAddress; // for now
    // computeCoins(overledger, csvFilePath, senderAddress, receiverAddress, senderChangeAddress, valueToSend, addScript, userFeeUsed, defaultServiceFeeUsed, userEstimateFee, priority)
    const coinSelected = await computeCoins(overledger, csvFile, senderAddress, receiverAddress, senderChangeAddress, valueToSend, false, true, false, userFeeRate, feePrority[0]);
    console.log(`coinSelected ${JSON.stringify(coinSelected)}`);
    const { txInputs, txOutputs } = computeBtcRequestTxns(coinSelected.inputs, coinSelected.outputsWithChangeAddress);

    console.log(`------txInputs-----`);
    console.log(txInputs);
    console.log(`------txOutputs----`);
    console.log(txOutputs);
    console.log(`------Fee--------`);
    console.log(coinSelected.fee);
    overledger.dlts.bitcoin.setAccount(senderPrivateKey);

    const signedTransaction = await overledger.sign([
      {
        dlt: DltNameOptions.BITCOIN,
        type: TransactionTypeOptions.UTXO,
        subType: { name: TransactionBitcoinSubTypeOptions.VALUE_TRANSFER },
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
    let txHash;

    // Log the result.
    console.log('OVL result:');
    console.log(JSON.stringify(result, null, 2));
    console.log("");
    txHash = result.dltData[0].transactionHash;
    await updateCsvFile(overledger, senderChangeAddress, coinSelected.coinsToKeep, [txHash], csvFile);
  } catch (e) {
    console.error('error:', e);
  }
})();