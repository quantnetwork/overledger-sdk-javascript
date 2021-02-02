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

const bitcoinLinkedTx = '3703c43909eb0f9e99b55cf584c2521ab283c94a820509355cc79b140b0bcc3a'; // Add the previous transaction here
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
    overledger.dlts.bitcoin.setMultiSigAccount(2, [partyB1BitcoinPrivateKey, partyB2BitcoinPrivateKey, partyB3BitcoinPrivateKey ], TransactionBitcoinScriptTypeOptions.P2SH_P2WSH);
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
          witnessScript: multisigAccount.witnessScript,
          redeemScript: multisigAccount.redeemScript,
          rawTransaction: '0200000001762de5dac3fa96558e4b182f2b6061614b1daaeb05cb4ebd809ea54944ba64d6000000006b483045022100f61dcf976eb897b1b6c33428eca8e87ce03cf1b9770767b62eac6a9cca7c8f230220572635c6b13bbd25974e09181f44304ef31b04b321f47cf81dbd65e14529895c0121035b71e0ec7329c32acf0a86eaa62e88951818021c9ff893108ef5b3103db32221ffffffff02102700000000000017a9149917e2dde850be63f2e2f0402bb06aa2071e3db387bfd91800000000001976a91400406a26567183b9b3e42e5fed00f70a2d11428188ac00000000',
          coSigners: [partyB2BitcoinPrivateKey, partyB3BitcoinPrivateKey],
          transferType: TransactionBitcoinTransferTypeOptions.REDEEM_P2MS
        }
      ],
      txOutputs: [ // Set as many outputs as required
        { 
          scriptType: TransactionBitcoinScriptTypeOptions.P2PKH,
          toAddress: partyB2BitcoinAddress,
          amount: bitcoinPartyBAmount 
        },
        {
          scriptType: TransactionBitcoinScriptTypeOptions.P2PKH,
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

// https://blockstream.info/testnet/address/2N7ChzGyK1dtBMYvTCsZjUGxqGdWyTkHcA4