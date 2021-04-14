//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const bip65 = require('bip65');
const sha256 = require('crypto-js/sha256');
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const OverledgerSearch = require('@quantnetwork/overledger-search').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;
const TransactionBitcoinScriptTypeOptions = require('@quantnetwork/overledger-dlt-bitcoin').TransactionBitcoinScriptTypeOptions;
const generateHashTimeLockContractCodeHASH160 = require('@quantnetwork/overledger-dlt-bitcoin').generateHashTimeLockContractCodeHASH160;
const createHashTimeLockContractPaymentChannel = require('@quantnetwork/overledger-dlt-bitcoin').createHashTimeLockContractPaymentChannel;
//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------

const mappId = '...';
const bpiKey = '...';

// Paste in your bitcoin private keys.

// For Bitcoin you can generate an account using `OverledgerSDK.dlts.bitcoin.createAccount` then fund the address at the Bitcoin Testnet Faucet.
const partyABitcoinPrivateKey = 'cUk9izv1EPDSB2CJ7sf6RdVa6BDUWUBN8icE2LVW5ixvDApqBReT';
const partyBBitcoinPrivateKey = 'cQYWyycWa8KXRV2Y2c82NYPjdJuSy7wpFMhauMRVNNPFxDyLaAdn';

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

    // SECRET THAT SHOULD BE STORED BY THE SIDE WHO CAN REDEEM THE SMART CONTRACT
    const secret = 'quantbitcoinpaymentchannel';
    const hashSecret = sha256(secret).toString();
    console.log(`Hash Secret: ${hashSecret}`);
    // TIMELOCK EXPRESSED IN BLOCK HEIGHT
    const timeLock = bip65.encode({ blocks: 1971431 }); // get the current block height and add the number of blocks you want your lock to last
    // TIMELOCK EXPRESSED IN UTC TIME
    // example: bip65.encode({ utc: Math.floor(Date.now() / 1000) + 60 * 10});
    console.log(`Time Lock: ${timeLock}`);

    overledger.dlts.bitcoin.setAccount({ privateKey: partyBBitcoinPrivateKey} );
    const claimPublicKey = overledger.dlts.bitcoin.account.publicKey;
    console.log(`claimPublicKey ${claimPublicKey}`);
    overledger.dlts.bitcoin.setAccount({ privateKey: partyABitcoinPrivateKey} );
    const refundPublicKey =  overledger.dlts.bitcoin.account.publicKey;
    console.log(`refundPublicKey ${refundPublicKey}`);

    const currentContractCode = generateHashTimeLockContractCodeHASH160(claimPublicKey, refundPublicKey, hashSecret, timeLock);
    console.log(`currentContractCode ${currentContractCode.toString('hex')}`);
    const p2shPaymentChannel = createHashTimeLockContractPaymentChannel(currentContractCode, TransactionBitcoinScriptTypeOptions.P2SH, overledger.dlts.bitcoin.addressType);
    console.log(`p2sh ${JSON.stringify(p2shPaymentChannel)}`);
    console.log(`p2sh address: ${p2shPaymentChannel.address}`);
    console.log(`p2sh output script: ${p2shPaymentChannel.output.toString('hex')}`);
    console.log(`p2sh redeem script: ${p2shPaymentChannel.redeem.output.toString('hex')}`);
  } catch (e) {
    console.error('error:', e);
  }
})();