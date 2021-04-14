//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
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
const partyABitcoinPrivateKey = 'cUk9izv1EPDSB2CJ7sf6RdVa6BDUWUBN8icE2LVW5ixvDApqBReT';
const partyABitcoinAddress = 'mfYHTfMs5ptQpWoefcdt9RWi3WTWGeSB7J';
const bitcoinLinkedTx = 'f9e0820b9aba24e7d24ab8df375bfe8614403f9f9cf085080b2213acf2fc93ea'; // Add the previous transaction here
const bitcoinLinkedIndex = '1'; // Add the linked transaction index here
const bitcoinInputAmount = 1698230; // set equal to the number of satoshis in your first input
const bitcoinPartyBAmount = 10000; // set equal to the number of satoshis to send to party B
const bitcoinChangeAmount = 1686030; // set equal to the number of satoshis to send back to yourself 
                                // ( must be equal to 'total input amount' - 'party B amount' - extraFields.feePrice )


// multisig account paricipants
const partyB1BitcoinAddress = 'mfYHTfMs5ptQpWoefcdt9RWi3WTWGeSB7J';
const partyB1BitcoinPrivateKey = 'cUk9izv1EPDSB2CJ7sf6RdVa6BDUWUBN8icE2LVW5ixvDApqBReT';

const partyB2BitcoinAddress = 'mxvHBCNoT8mCP7MFaERVuBy9GMzmHcR9hj';
const partyB2BitcoinPrivateKey = 'cQYWyycWa8KXRV2Y2c82NYPjdJuSy7wpFMhauMRVNNPFxDyLaAdn';

const partyB3BitcoinAddress = 'n3oitdxMxaVeo1iUQpm4EyzxyWDZagyqEu';
const partyB3BitcoinPrivateKey = 'cSiJocehbCKWFGivZdN56jt2AE467EKQGcAuDbvvX9WiHsuGcb32';    

const accountParty1 = {privateKey: partyB1BitcoinPrivateKey, address: partyB1BitcoinAddress};
const accountParty2 = {privateKey: partyB2BitcoinPrivateKey, address: partyB2BitcoinAddress};
const accountParty3 = {privateKey: partyB3BitcoinPrivateKey, address: partyB3BitcoinAddress};

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
    overledger.dlts.bitcoin.setMultiSigAccount({ numberCoSigners: 2, accounts: [accountParty1, accountParty2, accountParty3], isSegwit: true } );
    const multisigAccount = overledger.dlts.bitcoin.multisigAccount;

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
          fromAddress: partyABitcoinAddress,
          linkedRawTransaction: '0200000001691cf23cb142c81e09c48c56cbaf09b1f2465a3b9179866311cc10f7163f5236010000006a473044022028f9449f289d21d74f111538235e5dc4fb1533c6966bbeb96be9a9e7f3a94f530220421e087f28f32b2ef66c486f5b362115640d9c021e491b4b98165597199cac1d0121035b71e0ec7329c32acf0a86eaa62e88951818021c9ff893108ef5b3103db32221ffffffff031027000000000000220020204804131a0aae6cb1bcc7feab4f108917765589f319f0b60abc7594a05f4594b6e91900000000001976a91400406a26567183b9b3e42e5fed00f70a2d11428188ac00000000000000000e6a0c4f564c2053444b205465737400000000',
          scriptPubKey: '76a91400406a26567183b9b3e42e5fed00f70a2d11428188ac',
          amount: bitcoinInputAmount
        }
      ],
      txOutputs: [ // Set as many outputs as required
        {  
          toAddress: multisigAccount.multisigAddress,
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