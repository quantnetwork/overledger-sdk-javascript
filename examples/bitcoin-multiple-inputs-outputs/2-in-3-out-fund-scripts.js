const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;
const TransactionTypeOptions = require('@quantnetwork/overledger-types').TransactionTypeOptions;
const TransactionBitcoinSubTypeOptions = require('@quantnetwork/overledger-dlt-bitcoin').TransactionBitcoinSubTypeOptions;
const TransactionBitcoinScriptTypeOptions = require('@quantnetwork/overledger-dlt-bitcoin').TransactionBitcoinScriptTypeOptions;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
const mappId = '...';
const bpiKey = '...';


// P2WPKH SENDER ACCOUNT: created with script examples/create-account/create-account.js
const partyABitcoinPrivateKey = 'cVbxBjsJLLVwy9M8aK1jLd7jVMuhEDn2VsxYfZsSzg4vHCad1u4U';
const partyABitcoinAddress = 'tb1qmaerfydd6vdldd8ghprkmlgr2sk3rmx37q2cr9';

// P2WPKH SENDER ACCOUNT: created with script examples/create-account/create-account.js
const partyAs2ndBitcoinPrivateKey = 'cPEGEmiMcEATowC5drxviWeMJoxxpUJNS8bxhiyjgd6h4bwA1qgX';
const partyAs2ndBitcoinAddress = 'tb1q4q4v0argtjzmgsu5ccqtkk9ckcgd7sa2k07e9y';

// P2WPKH ADDRESS: created with script examples/create-account/create-account.js
const partyBBitcoinAddress = 'tb1q0ahuaph3pgnu2wd2u05ez58ug7pap96xdcjx0z';

// HTLC P2WSH ADDRESS: created with the script examples/bitcoin-scripts/p2wsh/htlc/create-p2wsh-payment-channel.js
// p2wsh address: tb1ql4rermqtgkr0403kdrnjpxz9ttf0wtvrugm2wagsssvs06vaax9q2d0ey3
// p2wsh output script: 0020fd4791ec0b4586fabe3668e72098455ad2f72d83e236a77510841907e99de98a
// p2wsh witness script to keep to redeem the script: a914c1678ba6b9cb17819bdca55c3d0e2aae4d4a97d9876321037475473e1e509bfd85dd7384d95dcb817b71f353b0e3d73616517747e98a26f16703387d1db17521035b71e0ec7329c32acf0a86eaa62e88951818021c9ff893108ef5b3103db3222168ac

const partyHTLCAddress = 'tb1ql4rermqtgkr0403kdrnjpxz9ttf0wtvrugm2wagsssvs06vaax9q2d0ey3';

// TRANSACTION DATA:
const bitcoinFirstLinkedTx = '960b66b8e535dc1e489bc6d829d08f3a4638d15501a0506dc44e1d4b03d57361';
const bitcoinFirstLinkedIndex = '1';
const bitcoinFirstInputAmount = 39000;

const bitcoinSecondLinkedTx = 'cea87e7bd2569756d8bd8c84ea9cccfd4d7581fddca60d38b6e7920031cba9c0';
const bitcoinSecondLinkedIndex = '1';
const bitcoinSecondInputAmount = 100000;

const bitcoinPartyBAmount = 1000;
const bitcoinMultisigPartyAmount = 5000;
const bitcoinHTLCPartyAmmount = 39000;
const bitcoinChangeAmount = 91800; // set equal to the number of satoshis to send back to yourself 
                            

// MULTISIG P2WPKH PARTICIPANTS ACCOUNTS: created with script examples/create-account/create-account.js
const party1MultisigBitcoinAddress = 'mfYHTfMs5ptQpWoefcdt9RWi3WTWGeSB7J';
const party1MultisigBitcoinPrivateKey = 'cUk9izv1EPDSB2CJ7sf6RdVa6BDUWUBN8icE2LVW5ixvDApqBReT';

const party2MultisigBitcoinAddress = 'mxvHBCNoT8mCP7MFaERVuBy9GMzmHcR9hj';
const party2MultisigBitcoinPrivateKey = 'cQYWyycWa8KXRV2Y2c82NYPjdJuSy7wpFMhauMRVNNPFxDyLaAdn';

const party3MultisigBitcoinAddress = 'n3oitdxMxaVeo1iUQpm4EyzxyWDZagyqEu';
const party3MultisigBitcoinPrivateKey = 'cSiJocehbCKWFGivZdN56jt2AE467EKQGcAuDbvvX9WiHsuGcb32';    

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
    const transactionMessage = 'SDK OVL Test';

    // SET partyA accounts for signing;
    overledger.dlts.bitcoin.setAccount({ privateKey: partyABitcoinPrivateKey, isSegwit: true });
    overledger.dlts.bitcoin.setMultiSigAccount(2, [party1MultisigBitcoinPrivateKey, party2MultisigBitcoinPrivateKey, party3MultisigBitcoinPrivateKey ], TransactionBitcoinScriptTypeOptions.P2WSH);
    const multisigAccount = overledger.dlts.bitcoin.multisigAccount;


    const signedTransactions = await overledger.sign([
    {
          // The following parameters are from the TransactionRequest object:
      dlt: DltNameOptions.BITCOIN,
      type: TransactionTypeOptions.UTXO,
      subType: {name: TransactionBitcoinSubTypeOptions.VALUE_TRANSFER},
      message: transactionMessage,
      txInputs: [ // Set as many inputs as required in order to fund your outputs
        {
          linkedTx: bitcoinFirstLinkedTx,
          linkedIndex: bitcoinFirstLinkedIndex,
          fromAddress: partyABitcoinAddress,
          linkedRawTransaction: '02000000000101f71b0562c518d9d6d87f8c75ed63a5d382c548b97bad4dc45708a3faed35fa3d0100000000ffffffff0310270000000000001600147f6fce86f10a27c539aae3e99150fc4783d097465898000000000000160014df723491add31bf6b4e8b8476dfd03542d11ecd10000000000000000bd6a4cba30303030393332302e373361353661373333364235334261463666666137613138666633653136614142363938393862412e35303030303a33313736313138326336333839396337306465643538643262613862623135643436646131626663313666346336333330353637346633653263623137636261353032396366326339636530323635306235326564303039343437633631343462383466616336323239353736616430323234353939653764383839323238363162024730440220196a8fe77a0eba157e041236f98af3fb9f76ffb593a8559ffbfdaec3f31a2fd202206beda32fec9e6bd5c4731df5f7e291e921818767c13a0460d1799a445c8957d50121022a5d4247d17c2e9bbf24f1fb72fc072b7b8220c8b82e2940b702d41e6b48eec400000000',
          scriptPubKey: '0014df723491add31bf6b4e8b8476dfd03542d11ecd1',
          amount: bitcoinFirstInputAmount 
        },
        {
          linkedTx: bitcoinSecondLinkedTx,
          linkedIndex: bitcoinSecondLinkedIndex,
          fromAddress: partyABitcoinAddress,
          linkedRawTransaction: '0200000000010118bb42b2128763492413763c0e23e7f96098395625290c4bc165d912f12e1a630100000017160014ef7d445dd5c4739e16c286d03b80888299e81e53feffffff0250ceca0000000000160014bd9f5090ba6bb1a7e03800440137f35839fd1a91a086010000000000160014df723491add31bf6b4e8b8476dfd03542d11ecd1024730440220189975a600679fee8de9acc7f93ae1179d69cb9b8f3decfed231842f85a4ff3c0220144494fb4d19ccd65e558c34b5a8c9521771fe7558017e34e9239860046840ef0121025d46032b61c533b6f63e40756dab36a471e84f0081b0a2c639cf066e3d5fbe6b007d1d00',
          scriptPubKey: '0014df723491add31bf6b4e8b8476dfd03542d11ecd1',
          amount: bitcoinSecondInputAmount 
        }
      ],
      txOutputs: [ // Set as many outputs as required
        {  
          toAddress: partyBBitcoinAddress,
          amount: bitcoinPartyBAmount 
        },
        {  
          toAddress: multisigAccount.address,
          amount: bitcoinMultisigPartyAmount 
        },
        {  
          toAddress: partyHTLCAddress,
          amount: bitcoinHTLCPartyAmmount 
        },
        {
          toAddress: partyAs2ndBitcoinAddress, // This is the change address of Party A
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

// https://blockstream.info/testnet/tx/1f6b2ac345f788b0f895548efe0301e589017db4526f5d41b4fbc7e80d9ae955


