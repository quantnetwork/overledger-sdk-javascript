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


// UTXO resulting from running the script fund-p2wsh-multisig.js
const bitcoinLinkedTx = '7156c0f57ff0a0973dabf58325eb972f659699afa417cd0f55da55964875f763'; // Add the previous transaction here
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
          fromAddress: multisigAccount.multisigAddress,
          amount: bitcoinInputAmount,
          scriptPubKey: multisigAccount.script,
          linkedRawTransaction: '0200000001ea93fcf2ac13220b0885f09c9f3f401486fe5b37dfb84ad2e724ba9a0b82e0f9010000006a473044022022e9d30ab5a44bd909469a62d278e0c85266ea96c8df632f2e1fcfbad12e9df602203d6ab244f108ba7100e25aa92076feaece092ff58a4dd2a7557dd32932642d4d0121035b71e0ec7329c32acf0a86eaa62e88951818021c9ff893108ef5b3103db32221ffffffff031027000000000000220020747a5f2f5822fa03b1ac4b4a83a74bf31f552c719d48b194d7d9246e7ff2cef30eba1900000000001976a91400406a26567183b9b3e42e5fed00f70a2d11428188ac00000000000000000e6a0c4f564c2053444b205465737400000000',
          smartContract: {
            id: multisigAccount.multisigAddress,
            functionCall: [{
              functionType: SCFunctionTypeOptions.FUNCTION_CALL_WITH_PARAMETERS,
              functionName: TransactionBitcoinFunctionOptions.REDEEM_P2MS, // The function name must be given
              inputParams: [
                {
                  type: { selectedType: BitcoinTypeOptions.HEX_STRING },
                  name: 'witnessScript', // Name of parameter
                  value: multisigAccount.witnessScript,
                },
                {
                  type: { selectedType: BitcoinTypeOptions.ARRAY_HEX_STRING },
                  name: 'coSigners', // Name of parameter
                  value: [partyB2BitcoinPrivateKey, partyB3BitcoinPrivateKey],
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

