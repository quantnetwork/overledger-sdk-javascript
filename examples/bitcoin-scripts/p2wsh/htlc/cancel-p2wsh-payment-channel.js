const bip65 = require('bip65');
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;
const TransactionTypeOptions = require('@quantnetwork/overledger-types').TransactionTypeOptions;
const TransactionBitcoinSubTypeOptions = require('@quantnetwork/overledger-dlt-bitcoin').TransactionBitcoinSubTypeOptions;
const SCFunctionTypeOptions = require('@quantnetwork/overledger-types').SCFunctionTypeOptions;
const TransactionBitcoinFunctionOptions = require('@quantnetwork/overledger-dlt-bitcoin').TransactionBitcoinFunctionOptions;
const BitcoinTypeOptions = require('@quantnetwork/overledger-dlt-bitcoin').BitcoinTypeOptions;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
const mappId = '...';
const bpiKey = '...';

// Paste in your bitcoin ledger private keys.

// HTLC p2wsh address obtained in the creation step with create-p2wsh-payment-channel.js and funded with fund-p2wsh-payment-channel.js
const p2wshSmartContractAddress = 'tb1qy0d6vag7xvjptlpapc890ulk8ydls8cdl7ucnf7pn0neyf9h2mmsqlz9x6';
// UTXO obtained to fund p2wshSmartContractAddress by running fund-p2wsh-payment-channel.js
const bitcoinLinkedTx = 'f551ad8d2f3cce24ff8b5e5f8d0e072f9998f0e9ee48847c6898398914990378'; // Add the previous transaction here
const bitcoinLinkedIndex = '0'; // Add the linked transaction index here
const bitcoinInputAmount = 10000; // set equal to the number of satoshis in your first input
const bitcoinPartyBAmount = 7800; // set equal to the number of satoshis to send to party B
const bitcoinChangeAmount = 0; // set equal to the number of satoshis to send back to yourself 
// ( must be equal to 'total input amount' - 'party B amount' - extraFields.feePrice )
const nLocktime = bip65.encode({ blocks: 1971432 }); // will be taken at the transaction level

// Now provide three other addresses that you will be transfering value too
const partyBBitcoinAddress = 'mfYHTfMs5ptQpWoefcdt9RWi3WTWGeSB7J';
const partyBBitcoinPrivateKey = 'cUk9izv1EPDSB2CJ7sf6RdVa6BDUWUBN8icE2LVW5ixvDApqBReT';

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
            fromAddress: p2wshSmartContractAddress,
            amount: bitcoinInputAmount,
            scriptPubKey: '002023dba6751e332415fc3d0e0e57f3f6391bf81f0dffb989a7c19be79224b756f7',
            linkedRawTransaction: '0200000001151c2586e50a75aec8be3c8b3a3eebe88edfa81e941231c1293f7f5a438bc222010000006a47304402205e6cab63e9def13bd7e2e5fade6400259f7615747d187f5237906dc30c062a71022028966ace656097fef37bd153b39572293794d3cc3563b8339462f713819b6d9d0121035b71e0ec7329c32acf0a86eaa62e88951818021c9ff893108ef5b3103db32221ffffffff03102700000000000022002023dba6751e332415fc3d0e0e57f3f6391bf81f0dffb989a7c19be79224b756f76efb1800000000001976a91400406a26567183b9b3e42e5fed00f70a2d11428188ac00000000000000000e6a0c4f564c2053444b205465737400000000',
            linkedTxLockTime: nLocktime,
            linkedTxSequence: 0xfffffffe,
            smartContract: {
              id: p2wshSmartContractAddress,
              functionCall: [{
                functionType: SCFunctionTypeOptions.FUNCTION_CALL_WITH_PARAMETERS,
                functionName: TransactionBitcoinFunctionOptions.CANCEL_HTLC,
                inputParams: [
                  {
                    type: { selectedType: BitcoinTypeOptions.HEX_STRING }, // First parameter is a boolean array
                    name: 'witnessScript', // Name of parameter
                    value: 'a820f74c6f2402bbde893ca7a6e199bee59a6da22c737069451c0b48c3d84d4426a6876321037475473e1e509bfd85dd7384d95dcb817b71f353b0e3d73616517747e98a26f16703e8141eb17521035b71e0ec7329c32acf0a86eaa62e88951818021c9ff893108ef5b3103db3222168ac', // Value of the boolean array
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
          },
          {
            toAddress: partyBBitcoinAddress, // This is the change address
            amount: bitcoinChangeAmount
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
// non-final until the lock time is reached