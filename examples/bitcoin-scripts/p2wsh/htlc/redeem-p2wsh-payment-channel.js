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

const p2wshSmartContractAddress = 'tb1q9vm99heg4vweazp8rh52nfzhs097ptv8g9frdlmeky66xsc3sl5qp25lwe';
const bitcoinLinkedTx = '10179dbe986c6e6018b059361fef827b4e8f284ce020bcac3bcc3b073517add5'; // Add the previous transaction here
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
            scriptPubKey: '00202b3652df28ab1d9e88271de8a9a45783cbe0ad87415236ff79b135a3431187e8',
            linkedRawTransaction: '0200000001f231e32e61c83bcc47c2bff523c69b31d22ef46c2e3b3de0659464182cd70d93000000006b483045022100d6d32c14f56170d6eee8bfcb31287b01df176efb4fc25c285c8a9e928b5de8c002206d81c804bbc7e0a951fdad12b3a7e68526a19f13f666668d5db84b668948dc390121035b71e0ec7329c32acf0a86eaa62e88951818021c9ff893108ef5b3103db32221ffffffff0210270000000000002200202b3652df28ab1d9e88271de8a9a45783cbe0ad87415236ff79b135a3431187e87ced1a00000000001976a91400406a26567183b9b3e42e5fed00f70a2d11428188ac00000000',
            smartContract: {
              id: p2wshSmartContractAddress,
              // type: ??
              functionCall: [{
                functionType: SCFunctionTypeOptions.FUNCTION_CALL_WITH_PARAMETERS,
                functionName: TransactionBitcoinFunctionOptions.REDEEM_HTLC, // The function name must be given
                inputParams: [
                  {
                    type: { selectedType: BitcoinTypeOptions.HEX_STRING }, // First parameter is a boolean array
                    name: 'witnessScript', // Name of parameter
                    value: 'a914c1678ba6b9cb17819bdca55c3d0e2aae4d4a97d9876321037475473e1e509bfd85dd7384d95dcb817b71f353b0e3d73616517747e98a26f167038c0b1db17521035b71e0ec7329c32acf0a86eaa62e88951818021c9ff893108ef5b3103db3222168ac', // Value of the boolean array
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
