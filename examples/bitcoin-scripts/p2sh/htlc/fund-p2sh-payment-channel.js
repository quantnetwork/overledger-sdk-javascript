//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const bitcoin = require('bitcoinjs-lib');
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;
const TransactionTypeOptions = require('@quantnetwork/overledger-types').TransactionTypeOptions;
const TransactionBitcoinSubTypeOptions = require('@quantnetwork/overledger-dlt-bitcoin').TransactionBitcoinSubTypeOptions;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
const mappId = 'network.quant.testnet';
const bpiKey = 'joNp29bJkQHwEwP3FmNZFgHTqCmciVu5NYD3LkEtk1I';

// Paste in your bitcoin, ethereum and XRP ledger private keys.

// For Bitcoin you can generate an account using `OverledgerSDK.dlts.bitcoin.createAccount` then fund the address at the Bitcoin Testnet Faucet.
const partyABitcoinPrivateKey = 'cUk9izv1EPDSB2CJ7sf6RdVa6BDUWUBN8icE2LVW5ixvDApqBReT';
const partyABitcoinAddress = 'mfYHTfMs5ptQpWoefcdt9RWi3WTWGeSB7J';
const bitcoinLinkedTx = 'c58924831c5f5078fd33bd0d8f4a403a92715f5d4d0217a1fe1124222d71ddb3'; // Add the previous transaction here
const bitcoinLinkedIndex = '1'; // Add the linked transaction index here
const bitcoinInputAmount = 2226031; // set equal to the number of satoshis in your first input
const bitcoinPartyBAmount = 10000; // set equal to the number of satoshis to send to party B
const bitcoinChangeAmount = 2213831; // set equal to the number of satoshis to send back to yourself 
                                // ( must be equal to 'total input amount' - 'party B amount' - extraFields.feePrice )

// Now provide three other addresses that you will be transfering value too
const partyBBitcoinAddress = '2NAqorer9D2i3kSMGv3XRKfqtLQgXBSN4KY';

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
    overledger.dlts.bitcoin.setAccount({ privateKey: partyABitcoinPrivateKey });

    const signedTransactions = await overledger.sign([
    {
          // The following parameters are from the TransactionRequest object:
      dlt: DltNameOptions.BITCOIN,
      type: TransactionTypeOptions.UTXO,
      subType: {name: TransactionBitcoinSubTypeOptions.VALUE_TRANSFER},
      // scriptType: { name: ''} // TRANSFER TYPE ???
      message: transactionMessage,
            // The following parameters are from the TransactionUtxoRequest object:
      txInputs: [ // Set as many inputs as required in order to fund your outputs
        {
          linkedTx: bitcoinLinkedTx,
          linkedIndex: bitcoinLinkedIndex,
          fromAddress: partyABitcoinAddress,
          rawTransaction: '020000000179a23c40e7faf081240a0bea36272d114d26e6fb52a1d307b892bb01626045ed010000006a473044022047dfa2ea9bcf19df72d15ff0daf678131f9145be5ef1194f1dc68b84e9dd7bc20220661489ef4ee5c831240590732f727f4c7790612d657d693becaa0239f34f562f0121035b71e0ec7329c32acf0a86eaa62e88951818021c9ff893108ef5b3103db32221ffffffff02102700000000000017a9140f9f1ed5ec59f95fd386190756608b82bccb7129876ff72100000000001976a91400406a26567183b9b3e42e5fed00f70a2d11428188ac00000000',
          scriptPubKey: '76a91400406a26567183b9b3e42e5fed00f70a2d11428188ac',
          amount: bitcoinInputAmount 
        }
      ],
      txOutputs: [ // Set as many outputs as required
        {  
          toAddress: partyBBitcoinAddress,
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

// https://blockstream.info/testnet/tx/10179dbe986c6e6018b059361fef827b4e8f284ce020bcac3bcc3b073517add5