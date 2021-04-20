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

// Paste in your bitcoin private keys.

// For Bitcoin you can generate an account using `OverledgerSDK.dlts.bitcoin.createAccount` then fund the address at the Bitcoin Testnet Faucet.
const partyABitcoinPrivateKey = 'cPEGEmiMcEATowC5drxviWeMJoxxpUJNS8bxhiyjgd6h4bwA1qgX';
const partyABitcoinAddress = 'tb1q4q4v0argtjzmgsu5ccqtkk9ckcgd7sa2k07e9y';
const partyAs2ndBitcoinPrivateKey = 'cVbxBjsJLLVwy9M8aK1jLd7jVMuhEDn2VsxYfZsSzg4vHCad1u4U';
const partyAs2ndBitcoinAddress = 'tb1qmaerfydd6vdldd8ghprkmlgr2sk3rmx37q2cr9';
const bitcoinLinkedTx = 'eb8f2939be0eba9d46c26b578439c3d97c4961136bc493c6ebfa308fd48a84c5'; // Add the previous transaction here
const bitcoinLinkedIndex = '1'; // Add the linked transaction index here
const bitcoinInputAmount = 100000; // set equal to the number of satoshis in your first input
const bitcoinPartyBAmount = 10000; // set equal to the number of satoshis to send to party B
const bitcoinChangeAmount = 87800; // set equal to the number of satoshis to send back to yourself 
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
    const transactionMessage = '00009320.73a56a7336B53BaF6ffa7a18ff3e16aAB69898bA.50000:31761182c63899c70ded58d2ba8bb15d46da1bfc16f4c63305674f3e2cb17cba5029cf2c9ce02650b52ed009447c6144b84fac6229576ad0224599e7d88922861b';

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
          linkedRawTransaction: '020000000001017d669931fec8b68acb80a17af163825f5c5ea5057217957a5104535a3733d3f40000000017160014c33c84eddaa6d026f5588927114b474fb173c453feffffff02d901a201000000001600148558728f600db735349b46bb02cdffe666b1ddd6a086010000000000160014a82ac7f4685c85b44394c600bb58b8b610df43aa02473044022012a685cc807c13fe6701dd3dcf0fb3b0c1f751cd0757103efaf4d4a435ec65ed02202d96bd91ba49f2382640e4c54adff6a00703ca0ee0af5ddcab13c9af1b598847012103f11c5151ee57d10aca16f7a771418e7f4d7c141612fef245377b01342d2d98d6b1111d00',
          scriptPubKey: '0014a82ac7f4685c85b44394c600bb58b8b610df43aa',
          amount: bitcoinInputAmount 
        }
      ],
      txOutputs: [ // Set as many outputs as required
        {  
          toAddress: partyBBitcoinAddress,
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