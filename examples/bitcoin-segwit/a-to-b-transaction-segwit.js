//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const bitcoin = require('bitcoinjs-lib');
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;
const TransactionTypeOptions = require('@quantnetwork/overledger-types').TransactionTypeOptions;
const TransactionBitcoinSubTypeOptions = require('@quantnetwork/overledger-dlt-bitcoin').TransactionBitcoinSubTypeOptions;
const TransactionBitcoinScriptTypeOptions = require('@quantnetwork/overledger-dlt-bitcoin').TransactionBitcoinScriptTypeOptions;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
const mappId = 'network.quant.testnet';
const bpiKey = 'joNp29bJkQHwEwP3FmNZFgHTqCmciVu5NYD3LkEtk1I';

// Paste in your bitcoin, ethereum and XRP ledger private keys.

// For Bitcoin you can generate an account using `OverledgerSDK.dlts.bitcoin.createAccount` then fund the address at the Bitcoin Testnet Faucet.
const partyABitcoinPrivateKey = 'cPEGEmiMcEATowC5drxviWeMJoxxpUJNS8bxhiyjgd6h4bwA1qgX';
const partyABitcoinAddress = 'tb1q4q4v0argtjzmgsu5ccqtkk9ckcgd7sa2k07e9y';
const partyAs2ndBitcoinPrivateKey = 'cVbxBjsJLLVwy9M8aK1jLd7jVMuhEDn2VsxYfZsSzg4vHCad1u4U';
const partyAs2ndBitcoinAddress = 'tb1qmaerfydd6vdldd8ghprkmlgr2sk3rmx37q2cr9';
const bitcoinLinkedTx = '3dfa35edfaa30857c44dad7bb948c582d3a563ed758c7fd8d6d918c562051bf7'; // Add the previous transaction here
const bitcoinLinkedIndex = '1'; // Add the linked transaction index here
const bitcoinInputAmount = 51200; // set equal to the number of satoshis in your first input
const bitcoinPartyBAmount = 10000; // set equal to the number of satoshis to send to party B
const bitcoinChangeAmount = 39000; // set equal to the number of satoshis to send back to yourself 
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
          rawTransaction: '02000000000101f6d09a2a22021417d59db125dbabedb0e57580eaa8e2e85b429b5d74dce05d3b0100000000ffffffff0310270000000000001600147f6fce86f10a27c539aae3e99150fc4783d0974600c8000000000000160014a82ac7f4685c85b44394c600bb58b8b610df43aa00000000000000007b6a4c784f564c2053444b20546573744f564c2053444b20546573744f564c2053444b20546573744f564c2053444b20546573744f564c2053444b20546573744f564c2053444b20546573744f564c2053444b20546573744f564c2053444b20546573744f564c2053444b20546573744f564c2053444b205465737402473044022053535f6e9763b638e3fcbdf2178293a8c2267554f3c2fc8e3ef45ae503856c5e02207606699d2dec622f33c6b7580c91d5ad6afae217cf651787faa47ad45b0ef3ed0121036dac9370678def34d4c6cc3190c72740da27b4d15e9b1d3a365d437f7d81bc9500000000',
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