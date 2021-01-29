//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;
const TransactionTypeOptions = require('@quantnetwork/overledger-types').TransactionTypeOptions;
const TransactionBitcoinSubTypeOptions = require('@quantnetwork/overledger-dlt-bitcoin').TransactionBitcoinSubTypeOptions;
const TransactionEthereumSubTypeOptions = require('@quantnetwork/overledger-dlt-ethereum').TransactionEthereumSubTypeOptions;
const TransactionXRPSubTypeOptions = require('@quantnetwork/overledger-dlt-ripple').TransactionXRPSubTypeOptions;
//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
const mappId = 'network.quant.testnet';
const bpiKey = 'joNp29bJkQHwEwP3FmNZFgHTqCmciVu5NYD3LkEtk1I';

// Paste in your bitcoin, ethereum and XRP ledger private keys.

// For Bitcoin you can generate an account using `OverledgerSDK.dlts.bitcoin.createAccount` then fund the address at the Bitcoin Testnet Faucet.
const partyABitcoinPrivateKey = 'cNmsFjPqWCaVdhbPoHQJqDpayYdtKR9Qo81KVAEMHJwmgRVJZjDu'; 
const partyABitcoinAddress = 'mo54poo7oLL5LvHEYwhDmYdCpqvx7j3Ks2';
const partyAs2ndBitcoinPrivateKey = 'cVRJipj585NeirnEt2q2CYrvonQLzQNRNQsh1vMaSAqXJTN5bQDR';
const partyAs2ndBitcoinAddress = 'mgRvRj22C38dusBc8xqViKn168CCgHFzgv'; // Nominate a Bitcoin address you own for the change to be returned to
const bitcoinLinkedTx = 'c2485af29ef5906e2fdee405e9ed6285a57ef7cf672246a9082fc206cf0220af'; // Add the previous transaction here
const bitcoinLinkedIndex = '1'; // Add the linked transaction index here
const bitcoinInputAmount = 95400; // set equal to the number of satoshis in your first input
const bitcoinPartyBAmount = 100; // set equal to the number of satoshis to send to party B
const bitcoinChangeAmount = 93100; // set equal to the number of satoshis to send back to yourself 
                                // ( must be equal to 'total input amount' - 'party B amount' - extraFields.feePrice )

// For Ethereum you can generate an account using `OverledgerSDK.dlts.ethereum.createAccount` then fund the address at the Ropsten Testnet Faucet.
const partyAEthereumPrivateKey = '0xe352ad01a835ec50ba301ed7ffb305555cbf3b635082af140b3864f8e3e443d3'; //should have 0x in front
const partyAEthereumAddress = '0x650A87cfB9165C9F4Ccc7B971D971f50f753e761';

// For the XRP ledger, you can go to the official XRP Testnet Faucet to get an account already funded.
// Keep in mind that for XRP the minimum transfer amount is 20XRP (20,000,000 drops), if the address is not yet funded.
const partyAxrpPrivateKey = 'sswERuW1KWEwMXF6VFpRY72PxfC9b';
const partyAxrpAddress = 'rhTa8RGotyJQAW8sS2tFVVfvcHYXaps9hC';

// Now provide three other addresses that you will be transfering value too
const partyBBitcoinAddress = 'mtHsSjGeVhSQVqcM3fv5A79qoSJ5TgEjtj';
const partyBEthereumAddress = '0xB3ea4D180f31B4000F2fbCC58a085eF2ffD5a763';
const partyBxrpAddress = 'rKoGTTkPefCuQR31UHsfk9jKnrQHz6LtKe';

//  ---------------------------------------------------------
//  -------------- END VARIABLES TO UPDATE ------------------
//  ---------------------------------------------------------

; (async () => {
  try {
    // Connect to overledger and choose which distributed ledgers to use:
    const overledger = new OverledgerSDK(mappId, bpiKey, {
       dlts: [{ dlt: DltNameOptions.BITCOIN } 
        // , { dlt: DltNameOptions.ETHEREUM }, { dlt: DltNameOptions.XRP_LEDGER }
      ],
      provider: { network: 'testnet' },
    });
    const transactionMessage = 'OVL SDK Test';

    // SET partyA accounts for signing;
    overledger.dlts.bitcoin.setAccount({privateKey: partyAs2ndBitcoinPrivateKey});
    // overledger.dlts.ethereum.setAccount({privateKey: partyAEthereumPrivateKey});
    // overledger.dlts.ripple.setAccount({privateKey: partyAxrpPrivateKey});
    
    // Get the address sequences.
    // const ethereumSequenceRequest = await overledger.dlts.ethereum.getSequence(partyAEthereumAddress);
    // const xrpSequenceRequest = await overledger.dlts.ripple.getSequence(partyAxrpAddress);
    // const ethereumAccountSequence = ethereumSequenceRequest.data.dltData[0].sequence;
    // const xrpAccountSequence = xrpSequenceRequest.data.dltData[0].sequence;

    // Sign the transactions.
    // As input to this function, we will be providing:
    //  (1) a TransactionBitcoinRequest object (of @quantnetwork/overledger-dlt-bitcoin) that inherits from the TransactionUtxoRequest object which inherits from the TransactionRequest object (both of @quantnetwork/overledger-types)
    //  (2) a TransactionEthereumRequest object (of @quantnetwork/overledger-dlt-ethereum) that inherits from the TransactionAccountRequest object which inherits from the TransactionRequest object (both of @quantnetwork/overledger-types)
    //  (3) a TransactionXRPRequest object (of @quantnetwork/overledger-dlt-ripple) that inherits from the TransactionAccountRequest object which inherits from the TransactionRequest object (both of @quantnetwork/overledger-types)
    const signedTransactions = await overledger.sign([
    {
          // The following parameters are from the TransactionRequest object:
      dlt: DltNameOptions.BITCOIN,
      type: TransactionTypeOptions.UTXO,
      subType: {name: TransactionBitcoinSubTypeOptions.VALUE_TRANSFER},
      message: transactionMessage,
            // The following parameters are from the TransactionUtxoRequest object:
      txInputs: [ // Set as many inputs as required in order to fund your outputs
        {
          linkedTx: bitcoinLinkedTx,
          linkedIndex: bitcoinLinkedIndex,
          fromAddress: partyAs2ndBitcoinAddress,
          rawTransaction: '02000000016088a9602eee7279ccfbd5d09a7340a8e5f71f9956a96598dadb0c602bf39d14010000006b483045022100f1fbcce9defd5fdaf6a8e9b486d64876f662337dc272580273dfff5be4af3bfb0220523de3bf1e8bd33fc1b31ab9915ab2985b9bed68e34a68c219e3f0f3f2449c7b012103427906c1f98722c111d046e68c49573d16b726cf8435abbb20c6d36454c43992ffffffff0364000000000000001976a91452dba4763ad74fb2736ef5743a3ed46dfe5bd87288aca8740100000000001976a9140a047ca3444ef0047984e75bada91e75acccc4fc88ac00000000000000007b6a4c784f564c2053444b20546573744f564c2053444b20546573744f564c2053444b20546573744f564c2053444b20546573744f564c2053444b20546573744f564c2053444b20546573744f564c2053444b20546573744f564c2053444b20546573744f564c2053444b20546573744f564c2053444b205465737400000000',
          scriptPubKey: '76a9140a047ca3444ef0047984e75bada91e75acccc4fc88ac',
          amount: bitcoinInputAmount 
        }
      ],
      txOutputs: [ // Set as many outputs as required
        {
          toAddress: partyABitcoinAddress, 
          amount: bitcoinPartyBAmount 
        },
        {
          toAddress: partyAs2ndBitcoinAddress, // This is the change address
          amount: bitcoinChangeAmount 
        }
      ],
      extraFields: {
              // The following parameters are from the TransactionBitcoinRequest object:
        feePrice: '2200' // Price for the miner to add this transaction to the block
      },
    },
    // {
    //         // The following parameters are from the TransactionRequest object:
    //   dlt: DltNameOptions.ETHEREUM,
    //   type: TransactionTypeOptions.ACCOUNTS,
    //   subType: {name: TransactionEthereumSubTypeOptions.VALUE_TRANSFER},
    //   message: transactionMessage,
    //         // The following parameters are from the TransactionAccountRequest object:
    //   fromAddress: partyAEthereumAddress,
    //   toAddress: partyBEthereumAddress,
    //   sequence: ethereumAccountSequence, // Sequence starts at 0 for newly created addresses
    //   amount: '0', // On Ethereum you can send 0 amount transactions. But you still pay network fees
    //   extraFields: {
    //           // The following parameters are from the TransactionEthereumRequest object:
    //     compUnitPrice: '8000000000', // Price for each individual gas unit this transaction will consume
    //     compLimit: '80000', // The maximum fee that this transaction will use
    //   },
    // },
    // {
    //         // The following parameters are from the TransactionRequest object:
    //   dlt: DltNameOptions.XRP_LEDGER,
    //   type: TransactionTypeOptions.ACCOUNTS,
    //   subType: { name: TransactionXRPSubTypeOptions.VALUE_TRANSFER },
    //   message: transactionMessage,
    //         // The following parameters are from the TransactionAccountRequest object:
    //   fromAddress: partyAxrpAddress,
    //   toAddress: partyBxrpAddress,
    //   sequence: xrpAccountSequence, // Sequence starts at 0 for newly created addresses
    //   amount: '1', // Minimum allowed amount of drops is 1.      
    //   extraFields: {
    //                   // The following parameters are from the TransactionXRPRequest object:
    //     feePrice: '12', // Minimum feePrice on XRP Ledger is 12 drops.
    //     maxLedgerVersion: '4294967295', // The maximum ledger version the transaction can be included in.
    //   },
    // },
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


// --- PSBT object ------
// Psbt {
//   data:
//    Psbt {
//      inputs: [ [Object] ],
//      outputs: [ [Object], [Object], [Object] ],
//      globalMap: { unsignedTx: PsbtTransaction {} } } }