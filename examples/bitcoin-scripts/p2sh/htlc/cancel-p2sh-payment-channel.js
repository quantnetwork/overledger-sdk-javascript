const bip65 = require('bip65');
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


// Paste in your bitcoin, ethereum and XRP ledger private keys.

const p2shSmartContractAddress = '2N53nd5TvmWNrYDRtMnpfzBWprSZdwcnjKe';
const bitcoinLinkedTx = '1b328a0f78cc84020c1efebd6b1c2300a96d5beeb26316e4550c5015833aa78d'; // Add the previous transaction here
const bitcoinLinkedIndex = '0'; // Add the linked transaction index here
const bitcoinInputAmount = 10000; // set equal to the number of satoshis in your first input
const bitcoinPartyBAmount = 7800; // set equal to the number of satoshis to send to party B
const bitcoinChangeAmount = 0; // set equal to the number of satoshis to send back to yourself 
// ( must be equal to 'total input amount' - 'party B amount' - extraFields.feePrice )
const nLocktime = bip65.encode({ blocks: 1936697 }); // will be taken at the transaction level

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
            fromAddress: p2shSmartContractAddress,
            amount: bitcoinInputAmount,
            scriptPubKey: 'a9148177c279b23935dff24d76c7592f1436d0ad7d0187',
            linkedRawTransaction: '020000000130ece0aaf7b6988aab1a8e3ce636a33a0c8fbbf78ed725034d85cdd49a1b5fb3010000006b483045022100c9f2034cdc28e21dc945c39730055ff7a3bed3f114ad7206622b1821c943c3320220135f3c2341c4b413c28beb0a58087e7c2b7bfd63a3db19892f9b230c42dd2dcb0121035b71e0ec7329c32acf0a86eaa62e88951818021c9ff893108ef5b3103db32221ffffffff03102700000000000017a9148177c279b23935dff24d76c7592f1436d0ad7d01879f961b00000000001976a91400406a26567183b9b3e42e5fed00f70a2d11428188ac00000000000000000e6a0c4f564c2053444b205465737400000000',
            linkedTxLockTime: nLocktime,
            linkedTxSequence: 0xfffffffe,
            smartContract: {
              id: p2shSmartContractAddress,
              // type: ??
              functionCall: [{
                functionType: SCFunctionTypeOptions.FUNCTION_CALL_WITH_PARAMETERS,
                functionName: TransactionBitcoinFunctionOptions.CANCEL_HTLC,
                inputParams: [
                  {
                    type: { selectedType: BitcoinTypeOptions.HEX_STRING }, // First parameter is a boolean array
                    name: 'redeemScript', // Name of parameter
                    value: 'a914c1678ba6b9cb17819bdca55c3d0e2aae4d4a97d9876321037475473e1e509bfd85dd7384d95dcb817b71f353b0e3d73616517747e98a26f16703398d1db17521035b71e0ec7329c32acf0a86eaa62e88951818021c9ff893108ef5b3103db3222168ac', // Value of the boolean array
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

//  https://blockstream.info/testnet/tx/08bb5b7933afdfad045d09aa8e7786f0fe885bc3fc1b993b1a4ed54261d4ba4b

// non-final until the lock time is reached