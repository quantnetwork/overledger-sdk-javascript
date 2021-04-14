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

// Paste in your bitcoin, ethereum and XRP ledger private keys.

// HTLC p2sh-p2wsh address obtained in the creation step with create-p2sh-p2wsh-payment-channel.js and funded with fund-p2sh-p2wsh-payment-channel.js
const p2shp2wshSmartContractAddress = '2N9TUL7wpDAhuZa1VefSoW5fRevhEq6QUTa';
const bitcoinLinkedTx = '28048cfc224142c36e213d116e2d70db174217c0dc2099d4e14996ef0267e640'; // Add the previous transaction here
const bitcoinLinkedIndex = '0'; // Add the linked transaction index here
const bitcoinInputAmount = 10000; // set equal to the number of satoshis in your first input
const bitcoinPartyBAmount = 7800; // set equal to the number of satoshis to send to party B
const bitcoinChangeAmount = 0; // set equal to the number of satoshis to send back to yourself 
                                // ( must be equal to 'total input amount' - 'party B amount' - extraFields.feePrice )

// Now provide three other addresses that you will be transfering value too
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
      subType: {name: TransactionBitcoinSubTypeOptions.VALUE_TRANSFER},
      message: transactionMessage,
      txInputs: [
        { 
          linkedTx: bitcoinLinkedTx,
          linkedIndex: bitcoinLinkedIndex,
          fromAddress: p2shp2wshSmartContractAddress,
          amount: bitcoinInputAmount,
          scriptPubKey: 'a914b1d2f9e78b5ef2f88ed0e4c1cc1a0eb8cd89d8f587',
          linkedRawTransaction: '020000000163f775489655da550fcd17a4af9996652f97eb2583f5ab3d97a0f07ff5c05671010000006b483045022100e5ac44f38e7221d0dfd10e573ae8d6dd55b1140b4adaeed9a5e924a7285dbeaf0220580252968e177585972dd86089b119ebcc8b8cdc6ba33e63cdeb791181222b790121035b71e0ec7329c32acf0a86eaa62e88951818021c9ff893108ef5b3103db32221ffffffff03102700000000000017a914b1d2f9e78b5ef2f88ed0e4c1cc1a0eb8cd89d8f587668a1900000000001976a91400406a26567183b9b3e42e5fed00f70a2d11428188ac00000000000000000e6a0c4f564c2053444b205465737400000000',
          smartContract: {
            id: p2shp2wshSmartContractAddress,
            functionCall: [{
              functionType: SCFunctionTypeOptions.FUNCTION_CALL_WITH_PARAMETERS,
              functionName: TransactionBitcoinFunctionOptions.REDEEM_HTLC, // The function name must be given
              inputParams: [
                {
                  type: { selectedType: BitcoinTypeOptions.HEX_STRING },
                  name: 'redeemScript', // Name of parameter
                  value: '0020dc786f99f014d20e197e35c5c262b3dcb9e348d38b4005de964666df60b27f32',
                },
                {
                  type: { selectedType: BitcoinTypeOptions.HEX_STRING },
                  name: 'witnessScript', // Name of parameter
                  value: 'a820f74c6f2402bbde893ca7a6e199bee59a6da22c737069451c0b48c3d84d4426a6876321037475473e1e509bfd85dd7384d95dcb817b71f353b0e3d73616517747e98a26f16703e2141eb17521035b71e0ec7329c32acf0a86eaa62e88951818021c9ff893108ef5b3103db3222168ac', // Value of the boolean array
                },
                {
                  type: { selectedType: BitcoinTypeOptions.STRING }, 
                  name: 'preimage', // Name of parameter
                  value: 'quantbitcoinpaymentchannel',
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
    while (counter < result.dltData.length){
      console.log('Your ' + result.dltData[counter].dlt + ' value transfer transaction hash is: ' + result.dltData[counter].transactionHash);
      console.log("");
      counter = counter + 1;
    }
  } catch (e) {
    console.error('error:', e);
  }
})();

