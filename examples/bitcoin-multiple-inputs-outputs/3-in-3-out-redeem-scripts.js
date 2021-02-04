// Inputs:
// p2wpkh
// outputs 
// p2wpkh and fund multisig account and htlc contract


//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const bitcoin = require('bitcoinjs-lib');
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


// P2PKH SENDER ACCOUNT: created with script examples/create-account/create-account.js
const partyABitcoinAddress = 'mxvHBCNoT8mCP7MFaERVuBy9GMzmHcR9hj';
const partyABitcoinPrivateKey = 'cQYWyycWa8KXRV2Y2c82NYPjdJuSy7wpFMhauMRVNNPFxDyLaAdn';

// P2WPH PARTY A CHANGE ADDRESS
const partyAs2ndBitcoinAddress = 'tb1q78jqlt8atkxj3kspn2f2wskylla4cuqa9nc5un';
const partyAs2ndBitcoinPrivateKey = 'cQWsPaA3MnJw73pMjo1U37gM8KszUuqi4CRQ5SR4tanVCbD9CcDw';

const partyCBitcoinAddress = 'tb1q0ahuaph3pgnu2wd2u05ez58ug7pap96xdcjx0z';


// HTLC P2WSH ADDRESS: created with the script examples/bitcoin-scripts/p2wsh/htlc/create-p2wsh-payment-channel.js
// p2wsh address: tb1ql4rermqtgkr0403kdrnjpxz9ttf0wtvrugm2wagsssvs06vaax9q2d0ey3
// p2wsh output script: 0020fd4791ec0b4586fabe3668e72098455ad2f72d83e236a77510841907e99de98a
// p2wsh witness script to keep to redeem the script: a914c1678ba6b9cb17819bdca55c3d0e2aae4d4a97d9876321037475473e1e509bfd85dd7384d95dcb817b71f353b0e3d73616517747e98a26f16703387d1db17521035b71e0ec7329c32acf0a86eaa62e88951818021c9ff893108ef5b3103db3222168ac
const partyHTLCAddress = 'tb1ql4rermqtgkr0403kdrnjpxz9ttf0wtvrugm2wagsssvs06vaax9q2d0ey3';

// TRANSACTION DATA: transaction resulting from the example 2-in-3-out-fund-scripts.js
const firstRawTransaction = '020000000001026173d5034b1d4ec46d50a00155d138463a8fd029d8c69b481edc35e5b8660b960100000000ffffffffc0a9cb310092e7b6380da6dcfd81754dfdcc9cea848cbdd8569756d27b7ea8ce0100000000ffffffff05e8030000000000001600147f6fce86f10a27c539aae3e99150fc4783d097468813000000000000220020747a5f2f5822fa03b1ac4b4a83a74bf31f552c719d48b194d7d9246e7ff2cef35898000000000000220020fd4791ec0b4586fabe3668e72098455ad2f72d83e236a77510841907e99de98a9866010000000000160014a82ac7f4685c85b44394c600bb58b8b610df43aa00000000000000000e6a0c53444b204f564c20546573740247304402205475522f484a7930c859d4176f90ca0a366664a53e6a010fc13a7e1d95ce33fc0220223cc43d7609728c0c1f30a25cf15299ae10cab5f74d8c00b4671e547243f5500121036dac9370678def34d4c6cc3190c72740da27b4d15e9b1d3a365d437f7d81bc9502483045022100b6a4ed103f5158fdd0bb7aed2390a5720c4b945cbd9a2e33892d33454e2fb2ff022053b9dce64bd5a2bf3b8605f046af7b4c478e43ba5842d806d6d00a3edf83ada60121036dac9370678def34d4c6cc3190c72740da27b4d15e9b1d3a365d437f7d81bc9500000000';
const secondRawTransaction = '02000000000101947828412f06c2c9ec4f9a20afb71b1bf5c634d62f524c1d3cd804936cd33d8d0100000017160014572e96299a7836d645c72ca4e3a44814cf4b9db8feffffff02ec7561000000000017a9145333b130be98f56ee91ddbb1d4aa15f2c2ffa52387a0860100000000001976a914bee377979bee7ca3b0785ff72c84fad2b938327888ac02473044022037eac5f5599ace4c254617bb953fc9b4b23c049be51a4f770cfcc81f246ad971022002de2ef048825a590562dcfde790c72c0f62219bec6d9b01076a3e25f2d08386012102e5f5161249b19d8ac4fa96caf49cb45d3b9095321a54d36cbb0e0799e7489c9184801d00';
const bitcoinFirstLinkedTx = '1f6b2ac345f788b0f895548efe0301e589017db4526f5d41b4fbc7e80d9ae955';
const bitcoinSecondLinkedTx = 'ab2a034c8b20c25686c97c2895170a94206ef8c13091f843e9dc9ef027004b20';
const bitcoinMultisigLinkedIndex = '1';
const bitcoinHTLCLinkedIndex = '2';
const bitcoinSegwitLinkedIndex = '1';
const bitcoinHTLCInputAmount = 39000;
const bitcoinMultisigInputAmount = 5000;
const bitcoinSegwitInputAmount = 91800;
const bitcoinPartyAAmount = 125000;
const bitcoinPartyCAmount = 5000;
const bitcoinChangeAmount = 3600; // set equal to the number of satoshis to send back to yourself 
                            

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
    overledger.dlts.bitcoin.setAccount({ privateKey: partyABitcoinPrivateKey });
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
          linkedIndex: bitcoinHTLCLinkedIndex,
          fromAddress: partyHTLCAddress,
          amount: bitcoinHTLCInputAmount,
          scriptPubKey: '0020fd4791ec0b4586fabe3668e72098455ad2f72d83e236a77510841907e99de98a',
          rawTransaction: firstRawTransaction,
          witnessScript: 'a914c1678ba6b9cb17819bdca55c3d0e2aae4d4a97d9876321037475473e1e509bfd85dd7384d95dcb817b71f353b0e3d73616517747e98a26f16703387d1db17521035b71e0ec7329c32acf0a86eaa62e88951818021c9ff893108ef5b3103db3222168ac',
          preimage: 'quantbitcoinpaymentchannel',
          transferType: TransactionBitcoinTransferTypeOptions.REDEEM_HTLC
        },
        { 
          linkedTx: bitcoinFirstLinkedTx,
          linkedIndex: bitcoinMultisigLinkedIndex,
          fromAddress: multisigAccount.address,
          amount: bitcoinMultisigInputAmount,
          scriptPubKey: multisigAccount.script,
          witnessScript: multisigAccount.witnessScript,
          rawTransaction: firstRawTransaction,
          coSigners: [party2MultisigBitcoinPrivateKey, party3MultisigBitcoinPrivateKey],
          transferType: TransactionBitcoinTransferTypeOptions.REDEEM_P2MS
        },
        { 
          linkedTx: bitcoinSecondLinkedTx,
          linkedIndex: bitcoinSegwitLinkedIndex,
          fromAddress: partyABitcoinAddress,
          amount: bitcoinSegwitInputAmount,
          scriptPubKey: '76a914bee377979bee7ca3b0785ff72c84fad2b938327888ac',
          rawTransaction: secondRawTransaction,
        },
      ],
      txOutputs: [ // Set as many outputs as required
        { 
          toAddress: partyABitcoinAddress,
          amount: bitcoinPartyAAmount 
        },
        { 
          toAddress: partyCBitcoinAddress,
          amount: bitcoinPartyCAmount 
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

// https://blockstream.info/testnet/tx/057e7eec5640a7a95f0c3d3c676fa2891a883f0100a53c7c922146665f04a930



