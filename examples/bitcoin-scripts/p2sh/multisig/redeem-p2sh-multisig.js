//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;
const TransactionTypeOptions = require('@quantnetwork/overledger-types').TransactionTypeOptions;
const TransactionBitcoinSubTypeOptions = require('@quantnetwork/overledger-dlt-bitcoin').TransactionBitcoinSubTypeOptions;
const TransactionBitcoinScriptTypeOptions = require('@quantnetwork/overledger-dlt-bitcoin').TransactionBitcoinScriptTypeOptions;
const TransactionBitcoinTransferTypeOptions = require('@quantnetwork/overledger-dlt-bitcoin').TransactionBitcoinTransferTypeOptions;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
const mappId = 'network.quant.testnet';
const bpiKey = 'joNp29bJkQHwEwP3FmNZFgHTqCmciVu5NYD3LkEtk1I';

const bitcoinLinkedTx = 'c58924831c5f5078fd33bd0d8f4a403a92715f5d4d0217a1fe1124222d71ddb3'; // Add the previous transaction here
const bitcoinLinkedIndex = '0'; // Add the linked transaction index here
const bitcoinInputAmount = 10000; // set equal to the number of satoshis in your first input
const bitcoinPartyBAmount = 7800; // set equal to the number of satoshis to send to party B
const bitcoinChangeAmount = 0; // set equal to the number of satoshis to send back to yourself 
                                // ( must be equal to 'total input amount' - 'party B amount' - extraFields.feePrice )

// mutisig accounts
const partyB1BitcoinAddress = 'mfYHTfMs5ptQpWoefcdt9RWi3WTWGeSB7J';
const partyB1BitcoinPrivateKey = 'cUk9izv1EPDSB2CJ7sf6RdVa6BDUWUBN8icE2LVW5ixvDApqBReT';

const partyB2BitcoinAddress = 'mxvHBCNoT8mCP7MFaERVuBy9GMzmHcR9hj';
const partyB2BitcoinPrivateKey = 'cQYWyycWa8KXRV2Y2c82NYPjdJuSy7wpFMhauMRVNNPFxDyLaAdn';

const partyB3BitcoinAddress = 'n3oitdxMxaVeo1iUQpm4EyzxyWDZagyqEu';
const partyB3BitcoinPrivateKey = 'cSiJocehbCKWFGivZdN56jt2AE467EKQGcAuDbvvX9WiHsuGcb32';

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

    // SET multisignature account
    overledger.dlts.bitcoin.setMultiSigAccount(2, [partyB1BitcoinPrivateKey, partyB2BitcoinPrivateKey, partyB3BitcoinPrivateKey ], TransactionBitcoinScriptTypeOptions.P2SH);
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
          fromAddress: multisigAccount.address,
          amount: bitcoinInputAmount,
          scriptPubKey: multisigAccount.script,
          redeemScript: multisigAccount.redeemScript,
          rawTransaction: '020000000179a23c40e7faf081240a0bea36272d114d26e6fb52a1d307b892bb01626045ed010000006a473044022047dfa2ea9bcf19df72d15ff0daf678131f9145be5ef1194f1dc68b84e9dd7bc20220661489ef4ee5c831240590732f727f4c7790612d657d693becaa0239f34f562f0121035b71e0ec7329c32acf0a86eaa62e88951818021c9ff893108ef5b3103db32221ffffffff02102700000000000017a9140f9f1ed5ec59f95fd386190756608b82bccb7129876ff72100000000001976a91400406a26567183b9b3e42e5fed00f70a2d11428188ac00000000',
          coSigners: [partyB2BitcoinPrivateKey, partyB3BitcoinPrivateKey],
          transferType: TransactionBitcoinTransferTypeOptions.REDEEM_P2MS
        }
      ],
      txOutputs: [ // Set as many outputs as required
        { 
          toAddress: partyB2BitcoinAddress,
          amount: bitcoinPartyBAmount 
        },
        {
          toAddress: partyB1BitcoinAddress, // This is the change address
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

// https://blockstream.info/testnet/tx/8921bd584ba51412b1b370a4c17356acc20831c637c8ba6db1fb38305aca8a3d