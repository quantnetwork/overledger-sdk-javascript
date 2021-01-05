const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;
const TransactionTypeOptions = require('@quantnetwork/overledger-types').TransactionTypeOptions;
const TransactionBitcoinSubTypeOptions = require('@quantnetwork/overledger-dlt-bitcoin').TransactionBitcoinSubTypeOptions;
const computeCoins = require('./sender-wallet.js').computeCoins;
const computeBtcRequestTxns = require('./sender-wallet.js').computeBtcRequestTxns;
const updateCsvFile = require('./sender-wallet').updateCsvFile;


const mappId = '...';
const bpiKey = '...';

const senderAddress = 'muxP7kJNsV6v32m52gvsqHJTKLHiB53p9w';
const senderPrivateKey = 'cT3Wm1SE2wqxMu9nh2wG8gWS4d4usidw4zurKbQBXA7jVu8LJe8G';
const receiverAddress = 'mqbdQXAAipkAJeKjCVDSg3TJ92y9yxg5yt';
const valueToSend = 0.0017;
const csvFile = './sender-utxos.csv';
const userFeeRate = 5; // satoshis/byte and should be more than 2
const feePriorityOptions = ["fastestFee", "halfHourFee", "hourFee"];


// Main call
; (async () => {
  try {
    // Connect to overledger and choose which distributed ledgers to use:
    const overledger = new OverledgerSDK(mappId, bpiKey, {
      dlts: [{ dlt: DltNameOptions.BITCOIN }],
      provider: { network: 'testnet' },
    });
    const transactionMessage = 'OVL SDK Wallet Test';
    const senderChangeAddress = senderAddress; // for now
    let coinSelected;
    let txns;
    try {
      // computeCoins(overledger, csvFilePath, senderAddress, receiverAddress, senderChangeAddress, valueToSend, addScript, userFeeUsed, defaultServiceFeeUsed, userEstimateFee, priority)
      coinSelected = await computeCoins(overledger, csvFile, senderAddress, receiverAddress, senderChangeAddress, valueToSend, false, false, true, userFeeRate, feePriorityOptions[0]);
      console.log(`coinSelected ${JSON.stringify(coinSelected)}`);
      txns = computeBtcRequestTxns(coinSelected.inputs, coinSelected.outputsWithChangeAddress);
    } catch (e) {
      console.log(e.message);
      return false;
    }
    const { txInputs, txOutputs } = txns;
    console.log(`------txInputs-----`);
    console.log(txInputs);
    console.log(`------txOutputs----`);
    console.log(txOutputs);
    console.log(`------Fee----------`);
    console.log(coinSelected.fee);
    overledger.dlts.bitcoin.setAccount({privateKey: senderPrivateKey});

    const signedTransaction = await overledger.sign([
      {
        dlt: DltNameOptions.BITCOIN,
        type: TransactionTypeOptions.UTXO,
        subType: { name: TransactionBitcoinSubTypeOptions.VALUE_TRANSFER },
        message: transactionMessage,
        txInputs,
        txOutputs,
        extraFields: {
          feePrice: coinSelected.fee
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
    console.log(`transaction hash created: ${txHash}`);
    let n = 0; // max two attempts to update the utxos csv file
    let csvUpdated = false;
    while (n < 2 && !csvUpdated) {
      try {
        await updateCsvFile(overledger, senderChangeAddress, coinSelected.coinsToKeep, [txHash], csvFile);
        csvUpdated = true;
      } catch (e) {
        console.log(e.message);
      }
      n++;
    }
  } catch (e) {
    console.error('error:', e);
  }
})();
