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
const partyABitcoinPrivateKey = 'cVbxBjsJLLVwy9M8aK1jLd7jVMuhEDn2VsxYfZsSzg4vHCad1u4U';
const partyABitcoinAddress = 'tb1qmaerfydd6vdldd8ghprkmlgr2sk3rmx37q2cr9';
const bitcoinLinkedTx = 'b663023a455f67c3592370e17c52b7fef8b3af9c492d0a8d5936f2892bc5de9a'; // Add the previous transaction here
const bitcoinLinkedIndex = '1'; // Add the linked transaction index here
const bitcoinInputAmount = 67400; // set equal to the number of satoshis in your first input
const bitcoinPartyBAmount = 10000; // set equal to the number of satoshis to send to party B
const bitcoinChangeAmount = 55200; // set equal to the number of satoshis to send back to yourself 
                                // ( must be equal to 'total input amount' - 'party B amount' - extraFields.feePrice )

const partyBBitcoinPrivateKey = 'cPEGEmiMcEATowC5drxviWeMJoxxpUJNS8bxhiyjgd6h4bwA1qgX';
const partyBBitcoinAddress = 'tb1q4q4v0argtjzmgsu5ccqtkk9ckcgd7sa2k07e9y';


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
    const nestedSegwit = overledger.dlts.bitcoin.createNestedSegwitAccount({ privateKey: partyBBitcoinPrivateKey });

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
          linkedRawTransaction: '020000000001011142874f657473851898da976126fa6902598b31bd4e28f710ce402c56e82a640100000000ffffffff0310270000000000001600147f6fce86f10a27c539aae3e99150fc4783d097464807010000000000160014df723491add31bf6b4e8b8476dfd03542d11ecd10000000000000000bd6a4cba30303030393332302e373361353661373333364235334261463666666137613138666633653136614142363938393862412e35303030303a333137363131383263363338393963373064656435386432626138626231356434366461316266633136663463363333303536373466336532636231376362613530323963663263396365303236353062353265643030393434376336313434623834666163363232393537366164303232343539396537643838393232383631620248304502210084587e1a541bbedae0b3fa2716bc7e2beea2f4fd7c13ff5c72dbd7a84f173f0a02204e4ebaaa37bfc915be9c36cfe37bea0aaa3dd4abcb85979819881321148d6c910121036dac9370678def34d4c6cc3190c72740da27b4d15e9b1d3a365d437f7d81bc9500000000',
          scriptPubKey: '0014df723491add31bf6b4e8b8476dfd03542d11ecd1',
          amount: bitcoinInputAmount 
        }
      ],
      txOutputs: [ // Set as many outputs as required
        {  
          toAddress: nestedSegwit.address,
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