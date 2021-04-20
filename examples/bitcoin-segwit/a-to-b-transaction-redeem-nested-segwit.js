//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const bitcoin = require('bitcoinjs-lib');
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

// For Bitcoin you can generate an account using `OverledgerSDK.dlts.bitcoin.createAccount` then fund the address at the Bitcoin Testnet Faucet.
const partyABitcoinPrivateKey = 'cPEGEmiMcEATowC5drxviWeMJoxxpUJNS8bxhiyjgd6h4bwA1qgX';
const bitcoinLinkedTx = '272d8f1a932c7a70a9d0e3db89b31128653f032a7807140692f3806c32e5af7f'; // Add the previous transaction here
const bitcoinLinkedIndex = '0'; // Add the linked transaction index here
const bitcoinInputAmount = 10000; // set equal to the number of satoshis in your first input
const bitcoinPartyBAmount = 7800; // set equal to the number of satoshis to send to party B
const bitcoinChangeAmount = 0; // set equal to the number of satoshis to send back to yourself 
                                // ( must be equal to 'total input amount' - 'party B amount' - extraFields.feePrice )

// Now provide three other addresses that you will be transfering value too
const partyBBitcoinAddress = 'tb1q0ahuaph3pgnu2wd2u05ez58ug7pap96xdcjx0z';

// Bitcoin account nested segwit created with examples/create-account/create-account.js
const nestedAccountPrivateKey = 'cRQEvRZBdxLgCRLHcTDANvU4JA5Qpt5aJDmK9Q6iKgVJRPacDKPL';
const nestedAccountAddress = '2MvoLoTt1SJb5anXAT2JfUrrDm4jZLp7NQa';
//  { privateKey: 'cRQEvRZBdxLgCRLHcTDANvU4JA5Qpt5aJDmK9Q6iKgVJRPacDKPL',
//   address: '2MvoLoTt1SJb5anXAT2JfUrrDm4jZLp7NQa',
//   publicKey:
//    '024f81dc1b5f3028baba2eeaf5f2c0756eaad62541e80d730df68484be0788e387',
//   isSegwit: false,
//   isNestedSegwit: true,
//   script: 'a91426fb602ebc9bb980d5fb6d1ef42611a9ab5c5d0c87',
//   redeemScript: '00142f543d88c245db79a2f2120f31766055f9d5332d',
//   password: '',
//   provider: '' }

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
    overledger.dlts.bitcoin.setAccount({ privateKey: nestedAccountPrivateKey, isNestedSegwit: true });

    const signedTransactions = await overledger.sign([
    {
          // The following parameters are from the TransactionRequest object:
      dlt: DltNameOptions.BITCOIN,
      type: TransactionTypeOptions.UTXO,
      subType: {name: TransactionBitcoinSubTypeOptions.VALUE_TRANSFER},
      message: transactionMessage,
      txInputs: [ // Set as many inputs as required in order to fund your outputs
        {
          linkedTx: bitcoinLinkedTx,
          linkedIndex: bitcoinLinkedIndex,
          fromAddress: nestedAccountAddress,
          linkedRawTransaction: '02000000000101f821792ca11738635dc5c85afb4c141c10d611e280d2442197d9d1fda9d4b7380100000000ffffffff03102700000000000017a91426fb602ebc9bb980d5fb6d1ef42611a9ab5c5d0c87a8f7000000000000160014df723491add31bf6b4e8b8476dfd03542d11ecd100000000000000000e6a0c4f564c2053444b205465737402483045022100fd67b305fbd3a89ef391ddad0198fc47074797f20f6a0f778540c9bb1fcfdb1402205ec86a6c173b5d6ff31bf43e90d50c20d3019320a9e54bba34d9c3ec8bda5c0a0121036dac9370678def34d4c6cc3190c72740da27b4d15e9b1d3a365d437f7d81bc9500000000',
          scriptPubKey: 'a91426fb602ebc9bb980d5fb6d1ef42611a9ab5c5d0c87',
          amount: bitcoinInputAmount,
          smartContract: {
            id: nestedAccountAddress,
            functionCall: [{
              functionType: SCFunctionTypeOptions.FUNCTION_CALL_WITH_PARAMETERS,
              functionName: TransactionBitcoinFunctionOptions.REDEEM_P2SH, // The function name must be given
              inputParams: [
                {
                  type: { selectedType: BitcoinTypeOptions.HEX_STRING },
                  name: 'redeemScript', // Name of parameter
                  value: '00142f543d88c245db79a2f2120f31766055f9d5332d',
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
          toAddress: nestedAccountAddress, // This is the change address
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

