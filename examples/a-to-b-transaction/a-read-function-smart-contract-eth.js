// Replace the dependency by @quantnetwork/overledger-bundle if you're in your own project
//const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
// const OverledgerSDK = require('../overledger-sdk-javascript/packages/overledger-bundle/dist').default;
const OverledgerSDK = require('../../packages/overledger-bundle/dist').default;
const Web3 = require('web3');
const FunctionTypes = require('../../packages/overledger-dlt-ethereum/dist/Ethereum').FunctionTypes;
const DataMessageOptions = require('@quantnetwork/overledger-dlt-abstract/dist/AbstractDLT').DataMessageOptions;
const TypeOptions = require('../../packages/overledger-dlt-ethereum/dist/Ethereum').TypeOptions;
const UintIntMOptions = require('../../packages/overledger-dlt-ethereum/dist/Ethereum').UintIntMOptions;
const BytesMOptions = require('../../packages/overledger-dlt-ethereum/dist/Ethereum').BytesMOptions;
const Payable = require('../../packages/overledger-dlt-ethereum/dist/Ethereum').Payable;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
const mappId = 'network.quant.software';
const bpiKey = 'bpiKeyTest';

// Paste in your ethereum and ripple private keys.
// For Ethereum you can generate an account using `OverledgerSDK.dlts.ethereum.createAccount` then fund the address at the Ropsten Testnet Faucet.
const partyAEthereumPrivateKey = '0xcbf05d5215b7f37b3cd1577280c45381393116a81c053abbe21afdbd5d0e504d';
const partyAEthereumAddress = '0x0E4e8278ACa5EFEc8430692108B5271961A00ec7'

const partyBEthereumAddress = '0x1a90dbb13861a29bFC2e464549D28bE44846Dbe4';

//  ---------------------------------------------------------
//  -------------- END VARIABLES TO UPDATE ------------------
//  ---------------------------------------------------------


; (async () => {
  try {
    const overledger = new OverledgerSDK(mappId, bpiKey, {
      dlts: [{ dlt: 'ethereum' }],
      provider: { network: 'testnet' },
    });

    const transactionMessage = 'Overledger JavaScript SDK Test';

    // SET partyA accounts for signing;
    overledger.dlts.ethereum.setAccount(partyAEthereumPrivateKey);

    // Get the address sequences.
    const ethereumSequenceRequest = await overledger.dlts.ethereum.getSequence(partyAEthereumAddress);
    const ethereumAccountSequence = ethereumSequenceRequest.data.dltData[0].sequence;

    console.error('ethereumAccountSequence:' + ethereumAccountSequence);

    let contractAddress = "0xBDA545C5Fc4c5DFD385AC5E6c3513eDDD74AB028";

    // Sign the transactions.
    const input = {
        fromAddress: partyAEthereumAddress,
        contractAddress,
        funcName: 'getVariable1',
        inputValues: [{
            type: "uint256",
            value: "3"
        }],
        outputTypes: [{
            type:'uint256'
        }]
    }
    const returnedValues = await overledger.search.queryContract('ethereum', input);

    console.log(`returnedValues `,returnedValues);
    console.log(`output values `, returnedValues.data.results);

  } catch (e) {
    console.error('error:', e);
  }
})();

