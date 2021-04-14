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




// HTLC p2wsh address obtained in the creation step with create-p2wsh-payment-channel.js and funded with fund-p2wsh-payment-channel.js
const p2wshSmartContractAddress = 'tb1q9vm99heg4vweazp8rh52nfzhs097ptv8g9frdlmeky66xsc3sl5qp25lwe';
// UTXO obtained to fund p2wshSmartContractAddress by running fund-p2wsh-payment-channel.js
const bitcoinLinkedTx = 'f9e0820b9aba24e7d24ab8df375bfe8614403f9f9cf085080b2213acf2fc93ea'; // Add the previous transaction here
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
        subType: { name: TransactionBitcoinSubTypeOptions.VALUE_TRANSFER },
        message: transactionMessage,
        // The following parameters are from the TransactionUtxoRequest object:
        txInputs: [ // Set as many inputs as required in order to fund your outputs
          {
            linkedTx: bitcoinLinkedTx,
            linkedIndex: bitcoinLinkedIndex,
            fromAddress: p2wshSmartContractAddress,
            amount: bitcoinInputAmount,
            scriptPubKey: '0020204804131a0aae6cb1bcc7feab4f108917765589f319f0b60abc7594a05f4594',
            linkedRawTransaction: '0200000001691cf23cb142c81e09c48c56cbaf09b1f2465a3b9179866311cc10f7163f5236010000006a473044022028f9449f289d21d74f111538235e5dc4fb1533c6966bbeb96be9a9e7f3a94f530220421e087f28f32b2ef66c486f5b362115640d9c021e491b4b98165597199cac1d0121035b71e0ec7329c32acf0a86eaa62e88951818021c9ff893108ef5b3103db32221ffffffff031027000000000000220020204804131a0aae6cb1bcc7feab4f108917765589f319f0b60abc7594a05f4594b6e91900000000001976a91400406a26567183b9b3e42e5fed00f70a2d11428188ac00000000000000000e6a0c4f564c2053444b205465737400000000',
            smartContract: {
              id: p2wshSmartContractAddress,
              functionCall: [{
                functionType: SCFunctionTypeOptions.FUNCTION_CALL_WITH_PARAMETERS,
                functionName: TransactionBitcoinFunctionOptions.REDEEM_HTLC, // The function name must be given
                inputParams: [
                  {
                    type: { selectedType: BitcoinTypeOptions.HEX_STRING },
                    name: 'witnessScript', // Name of parameter
                    value: 'a820f74c6f2402bbde893ca7a6e199bee59a6da22c737069451c0b48c3d84d4426a6876321037475473e1e509bfd85dd7384d95dcb817b71f353b0e3d73616517747e98a26f167037b141eb17521035b71e0ec7329c32acf0a86eaa62e88951818021c9ff893108ef5b3103db3222168ac', // Value of the boolean array
                  },
                  {
                    type: { selectedType: BitcoinTypeOptions.STRING }, // First parameter is a boolean array
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
    while (counter < result.dltData.length) {
      console.log('Your ' + result.dltData[counter].dlt + ' value transfer transaction hash is: ' + result.dltData[counter].transactionHash);
      console.log("");
      counter = counter + 1;
    }
  } catch (e) {
    console.error('error:', e);
  }
})();

// https://blockstream.info/testnet/tx/b2d0d40cccccb97ece5a449af5d543fdc5acc0f6b2b1ce48d4f96403c4821e6f
