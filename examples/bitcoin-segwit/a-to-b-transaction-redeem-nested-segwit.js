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
const bitcoinLinkedTx = '979ee59e6f4a9b9145f108f623fe3ee06da0ef665201bcc0719e0966bbe5ee99'; // Add the previous transaction here
const bitcoinLinkedIndex = '0'; // Add the linked transaction index here
const bitcoinInputAmount = 10000; // set equal to the number of satoshis in your first input
const bitcoinPartyBAmount = 7800; // set equal to the number of satoshis to send to party B
const bitcoinChangeAmount = 0; // set equal to the number of satoshis to send back to yourself 
                                // ( must be equal to 'total input amount' - 'party B amount' - extraFields.feePrice )

// Now provide three other addresses that you will be transfering value too
const partyBBitcoinAddress = 'tb1q0ahuaph3pgnu2wd2u05ez58ug7pap96xdcjx0z';

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
    overledger.dlts.bitcoin.setAccount({ privateKey: partyABitcoinPrivateKey, isSegwit: true });
    const nestedSegwitAccount = overledger.dlts.bitcoin.createAccount({ privateKey: partyABitcoinPrivateKey, isNestedSegwit: true });
    console.log(`nestedSegwitAccount ${JSON.stringify(nestedSegwitAccount)}`);

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
          fromAddress: nestedSegwitAccount.address,
          linkedRawTransaction: '020000000001019adec52b89f236598d0a2d499cafb3f8feb7527ce1702359c3675f453a0263b60100000000ffffffff03102700000000000017a9141b465d2f0233792df48a8719e2291457623fdd0b87a0d7000000000000160014df723491add31bf6b4e8b8476dfd03542d11ecd100000000000000000e6a0c4f564c2053444b205465737402483045022100fdaa360357860115ac64156f71f686900c715167fab9ac7b8e7d31c03f40f49c02200794a218e2230a66f5dac6d9662f2f7e77a4e644d3cd354ab35ea1a8074448750121036dac9370678def34d4c6cc3190c72740da27b4d15e9b1d3a365d437f7d81bc9500000000',
          scriptPubKey: nestedSegwitAccount.script,
          amount: bitcoinInputAmount,
          smartContract: {
            id: nestedSegwitAccount.address,
            // type: ??
            functionCall: [{
              functionType: SCFunctionTypeOptions.FUNCTION_CALL_WITH_PARAMETERS,
              functionName: TransactionBitcoinFunctionOptions.REDEEM_P2SH, // The function name must be given
              inputParams: [
                {
                  type: { selectedType: BitcoinTypeOptions.HEX_STRING }, // First parameter is a boolean array
                  name: 'redeemScript', // Name of parameter
                  value: nestedSegwitAccount.redeemScript, // Value of the boolean array
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
          toAddress: nestedSegwit.address, // This is the change address
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


// https://blockstream.info/testnet/tx/3dfa35edfaa30857c44dad7bb948c582d3a563ed758c7fd8d6d918c562051bf7