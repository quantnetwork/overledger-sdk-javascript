//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;
const TransactionTypeOptions = require('@quantnetwork/overledger-types').TransactionTypeOptions;
const TransactionBitcoinSubTypeOptions = require('@quantnetwork/overledger-dlt-bitcoin').TransactionBitcoinSubTypeOptions;
const TransactionBitcoinFunctionOptions = require('@quantnetwork/overledger-dlt-bitcoin').TransactionBitcoinFunctionOptions;
const BitcoinTypeOptions = require('@quantnetwork/overledger-dlt-bitcoin').BitcoinTypeOptions;
const SCFunctionTypeOptions = require('@quantnetwork/overledger-types').SCFunctionTypeOptions;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
const mappId = '...';
const bpiKey = '...';

// Paste in your bitcoin private keys.


// HTLC p2sh address obtained in the creation step with create-p2sh-payment-channel.js and funded with fund-p2sh-payment-channel.js
const p2shSmartContractAddress = '2Mwqagt3TqrSfnYvp3oqubL264hiPNnpy1e';
// UTXO obtained to fund p2shSmartContractAddress by running fund-p2sh-payment-channel.js
const bitcoinLinkedTx = 'd513f9e85ec6964b02e51569b6787640f1a1ee8c4f509adbcfe5afaa6c5d5bd2'; // Add the previous transaction here
const bitcoinLinkedIndex = '0'; // Add the linked transaction index here
const bitcoinInputAmount = 10000; // set equal to the number of satoshis in your first input
const bitcoinPartyBAmount = 7800; // set equal to the number of satoshis to send to party B
const bitcoinChangeAmount = 0; // set equal to the number of satoshis to send back to yourself 
// ( must be equal to 'total input amount' - 'party B amount' - extraFields.feePrice )
const partyBBitcoinAddress = 'mxvHBCNoT8mCP7MFaERVuBy9GMzmHcR9hj';
const partyBBitcoinPrivateKey = 'cQYWyycWa8KXRV2Y2c82NYPjdJuSy7wpFMhauMRVNNPFxDyLaAdn';


//  ---------------------------------------------------------
//  -------------- END VARIABLES TO UPDATE ------------------
//  ---------------------------------------------------------

; (async () => {
  try {
    // Connect to overledger and choose which distributed ledgers to use:
    const overledger = new OverledgerSDK(mappId, bpiKey, {
      dlts: [{ dlt: DltNameOptions.BITCOIN }],
      provider: { network: 'testnet' },
    });
    const transactionMessage = 'OVL SDK Test';

    // SET partyA accounts for signing;
    overledger.dlts.bitcoin.setAccount({ privateKey: partyBBitcoinPrivateKey });

    const signedTransactions = await overledger.sign([
      {
        // The following parameters are from the TransactionRequest object:
        dlt: DltNameOptions.BITCOIN,
        type: TransactionTypeOptions.UTXO,
        subType: { name: TransactionBitcoinSubTypeOptions.VALUE_TRANSFER },
        message: transactionMessage,
        // The following parameters are from the TransactionUtxoRequest object:
        txInputs: [ // Set as many inputs as required in order to fund your outputs
          {
            linkedTx: bitcoinLinkedTx,
            linkedIndex: bitcoinLinkedIndex,
            fromAddress: p2shSmartContractAddress,
            amount: bitcoinInputAmount,
            scriptPubKey: 'a914325fecdf3b31c673c7eff61b44ea7da77234984887',
            linkedRawTransaction: '02000000013c44cd14f918e7d92cca176de0df26ffda47b573768647a935eee1b2b521f5b3010000006b483045022100f37b98aace237222d6807595599f4a071acc37432ebc07aef17c4909de6b78ed0220223d9fa0d3a9ba98b736963eebd6ac83487d68cf52295ec56d59073536e13e040121035b71e0ec7329c32acf0a86eaa62e88951818021c9ff893108ef5b3103db32221ffffffff03102700000000000017a914325fecdf3b31c673c7eff61b44ea7da7723498488706491a00000000001976a91400406a26567183b9b3e42e5fed00f70a2d11428188ac00000000000000000e6a0c4f564c2053444b205465737400000000',
            smartContract: {
              id: p2shSmartContractAddress,
              // type: ??
              functionCall: [{
                functionType: SCFunctionTypeOptions.FUNCTION_CALL_WITH_PARAMETERS,
                functionName: TransactionBitcoinFunctionOptions.REDEEM_HTLC, // The function name must be given
                inputParams: [
                  {
                    type: { selectedType: BitcoinTypeOptions.HEX_STRING }, // First parameter is a boolean array
                    name: 'redeemScript', // Name of parameter
                    value: 'a914c1678ba6b9cb17819bdca55c3d0e2aae4d4a97d9876321037475473e1e509bfd85dd7384d95dcb817b71f353b0e3d73616517747e98a26f1670373141eb17521035b71e0ec7329c32acf0a86eaa62e88951818021c9ff893108ef5b3103db3222168ac', // Value of the boolean array
                  },
                  {
                    type: { selectedType: BitcoinTypeOptions.STRING }, // First parameter is a boolean array
                    name: 'preimage', // Name of parameter
                    value: 'quantbitcoinpaymentchannel', // Value of the boolean array
                  }
                ]
              }
              ]
            }
          }
        ],
        txOutputs: [ // Set as many outputs as required
          {
            toAddress: partyBBitcoinAddress,
            amount: bitcoinPartyBAmount
          }
        ],
        extraFields: {
          // The following parameters are from the TransactionBitcoinRequest object:
          feePrice: '2200' // Price for the miner to add this transaction to the block
        },
      }
    ]);

    console.log("Signed transactions: ");
    console.log(JSON.stringify(signedTransactions, null, 2));

    // Send the transactions to Overledger.
    const result = (await overledger.send(signedTransactions)).data;

    // Log the result.
    console.log('OVL result:');
    console.log(JSON.stringify(result, null, 2));
    console.log("");
    counter = 0;
    while (counter < result.dltData.length) {
      console.log('Your ' + result.dltData[counter].dlt + ' value transfer transaction hash is: ' + result.dltData[counter].transactionHash);
      console.log("");
      counter = counter + 1;
    }
  } catch (e) {
    console.error('error:', e);
  }
})();

