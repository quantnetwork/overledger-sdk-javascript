//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;
const TransactionTypeOptions = require('@quantnetwork/overledger-types').TransactionTypeOptions;
const TransactionBitcoinSubTypeOptions = require('@quantnetwork/overledger-dlt-bitcoin').TransactionBitcoinSubTypeOptions;
const TransactionBitcoinScriptTypeOptions = require('@quantnetwork/overledger-dlt-bitcoin').TransactionBitcoinScriptTypeOptions;
const TransactionBitcoinFunctionOptions = require('@quantnetwork/overledger-dlt-bitcoin').TransactionBitcoinFunctionOptions;
const BitcoinTypeOptions = require('@quantnetwork/overledger-dlt-bitcoin').BitcoinTypeOptions;
const SCFunctionTypeOptions = require('@quantnetwork/overledger-types').SCFunctionTypeOptions;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
const mappId = '...';
const bpiKey = '...';


// UTXO resulting from running the script fund-p2sh-p2wsh-multisig.js
const bitcoinLinkedTx = '0c9c4cbb0d612214cd79a913b5565df40de7117570a6356eafa03c41890297cd'; // Add the previous transaction here
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

    // SET multisignature account
    overledger.dlts.bitcoin.setMultiSigAccount({ numberCoSigners: 2, accounts: [accountParty1, accountParty2, accountParty3], isNestedSegwit: true });
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
          fromAddress: multisigAccount.multisigAddress,
          amount: bitcoinInputAmount,
          scriptPubKey: multisigAccount.script,
          linkedRawTransaction: '020000000140e66702ef9649e1d49920dcc0174217db702d6e113d216ec3424122fc8c0428010000006a47304402201224ae334c8e9b6aa34cd2c68c5f231bc99d1594f26a53bad02144402751fcc30220307cfabe11e2d4d033468f1f02add7bf2df7336b89965c25cc01310113da6eb70121035b71e0ec7329c32acf0a86eaa62e88951818021c9ff893108ef5b3103db32221ffffffff03102700000000000017a9149917e2dde850be63f2e2f0402bb06aa2071e3db387be5a1900000000001976a91400406a26567183b9b3e42e5fed00f70a2d11428188ac00000000000000000e6a0c4f564c2053444b205465737400000000',
          coSigners: [partyB2BitcoinPrivateKey, partyB3BitcoinPrivateKey],
          smartContract: {
            id: multisigAccount.multisigAddress,
            // type: ??
            functionCall: [{
              functionType: SCFunctionTypeOptions.FUNCTION_CALL_WITH_PARAMETERS,
              functionName: TransactionBitcoinFunctionOptions.REDEEM_P2MS, // The function name must be given
              inputParams: [
                {
                  type: { selectedType: BitcoinTypeOptions.HEX_STRING },
                  name: 'redeemScript', // Name of parameter
                  value: multisigAccount.redeemScript,
                },
                {
                  type: { selectedType: BitcoinTypeOptions.HEX_STRING },
                  name: 'witnessScript', // Name of parameter
                  value: multisigAccount.witnessScript,
                },
                {
                  type: { selectedType: BitcoinTypeOptions.ARRAY_HEX_STRING }, // First parameter is a boolean array
                  name: 'coSigners', // Name of parameter
                  value: [partyB2BitcoinPrivateKey, partyB3BitcoinPrivateKey], // Value of the boolean array
                }
              ]
            }
            ]
          }
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

// https://blockstream.info/testnet/address/2N7ChzGyK1dtBMYvTCsZjUGxqGdWyTkHcA4