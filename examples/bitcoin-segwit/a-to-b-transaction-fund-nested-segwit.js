//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const bitcoin = require('bitcoinjs-lib');
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;
const TransactionTypeOptions = require('@quantnetwork/overledger-types').TransactionTypeOptions;
const TransactionBitcoinSubTypeOptions = require('@quantnetwork/overledger-dlt-bitcoin').TransactionBitcoinSubTypeOptions;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
const mappId = '...';
const bpiKey = '...';

// Paste in your bitcoin, ethereum and XRP ledger private keys.

// For Bitcoin you can generate an account using `OverledgerSDK.dlts.bitcoin.createAccount` then fund the address at the Bitcoin Testnet Faucet.
const partyABitcoinPrivateKey = 'cVbxBjsJLLVwy9M8aK1jLd7jVMuhEDn2VsxYfZsSzg4vHCad1u4U';
const partyABitcoinAddress = 'tb1qmaerfydd6vdldd8ghprkmlgr2sk3rmx37q2cr9';
const bitcoinLinkedTx = '38b7d4a9fdd1d9972144d280e211d6101c144cfb5ac8c55d633817a12c7921f8'; // Add the previous transaction here
const bitcoinLinkedIndex = '1'; // Add the linked transaction index here
const bitcoinInputAmount = 75600; // set equal to the number of satoshis in your first input
const bitcoinPartyBAmount = 10000; // set equal to the number of satoshis to send to party B
const bitcoinChangeAmount = 63400; // set equal to the number of satoshis to send back to yourself 
                                // ( must be equal to 'total input amount' - 'party B amount' - extraFields.feePrice )

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
    overledger.dlts.bitcoin.setAccount({ privateKey: partyABitcoinPrivateKey, isSegwit: true });
    

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
          fromAddress: partyABitcoinAddress,
          linkedRawTransaction: '02000000000101d9cd94083ac474e0fb2e4fc3e473b10588b3a030cdf0c34063bb70738b4908eb0100000000ffffffff031027000000000000160014b953bab25b4b86ee2a104a7ab43b61add58ed1ca5027010000000000160014df723491add31bf6b4e8b8476dfd03542d11ecd100000000000000000e6a0c4f564c2053444b20546573740247304402201f9c8fffe11310152e7a5e337394cbdd21e8c1a068bc0b9567053dff668dcc4b022067d55f4f70e6865b71ee556e15accb20a73477fd61f191afb84d956974db8db80121036dac9370678def34d4c6cc3190c72740da27b4d15e9b1d3a365d437f7d81bc9500000000',
          scriptPubKey: '0014df723491add31bf6b4e8b8476dfd03542d11ecd1',
          amount: bitcoinInputAmount 
        }
      ],
      txOutputs: [ // Set as many outputs as required
        {  
          toAddress: nestedAccountAddress,
          amount: bitcoinPartyBAmount 
        },
        {
          toAddress: partyABitcoinAddress, // This is the change address
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