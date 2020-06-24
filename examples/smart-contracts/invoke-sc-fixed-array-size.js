//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const OverledgerSDK = require('@quantnetwork/overledger-bundle/dist').default;
const SCFunctionTypeOptions = require('@quantnetwork/overledger-types').SCFunctionTypeOptions;
const TransactionTypeOptions = require('@quantnetwork/overledger-types').TransactionTypeOptions;
const TransactionEthereumSubTypeOptions = require('@quantnetwork/overledger-dlt-ethereum').TransactionEthereumSubTypeOptions;
const EthereumTypeOptions = require('@quantnetwork/overledger-dlt-ethereum').EthereumTypeOptions;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;
const EthereumUintIntOptions = require('@quantnetwork/overledger-dlt-ethereum').EthereumUintIntOptions;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------

// The following are found from your Overledger Account:
const mappId = 'network.quant.testnet';
const bpiKey = 'joNp29bJkQHwEwP3FmNZFgHTqCmciVu5NYD3LkEtk1I';

// Paste in your ethereum address and private key.
const partyAEthereumPrivateKey = '0xe352ad01a835ec50ba301ed7ffb305555cbf3b635082af140b3864f8e3e443d3'; //should have 0x in front
const partyAEthereumAddress = '0x650A87cfB9165C9F4Ccc7B971D971f50f753e761';
//  ---------------------------------------------------------
//  -------------- END VARIABLES TO UPDATE ------------------
//  ---------------------------------------------------------

// A smart contract created earlier from the demoSmartContract.sol code
const smartContractAddress = '0x4Bf94Ec7A50cE7C3fdFEE3ACab545DF51d279D5F';

; (async () => {
  try {
    const overledger = new OverledgerSDK(mappId, bpiKey, {
      dlts: [{ dlt: DltNameOptions.ETHEREUM }],
      provider: { network: 'testnet' },
    });

    // SET the signing key;
    overledger.dlts.ethereum.setAccount(partyAEthereumPrivateKey);

    // Get the address sequence.
    const ethereumSequenceRequest = await overledger.dlts.ethereum.getSequence(partyAEthereumAddress);
    const ethereumAccountSequence = ethereumSequenceRequest.data.dltData[0].sequence;

    console.error('ethereumAccountSequence:' + ethereumAccountSequence);

    // Sign the transaction.
    // As input to this function, we will be providing a TransactionEthereumRequest object (of @quantnetwork/overledger-dlt-ethereum) that inherits from the TransactionAccountRequest object which inherits from the TransactionRequest object (both of @quantnetwork/overledger-types)
    const signedTransactions = await overledger.sign([
      {
            // The following parameters are from the TransactionRequest object:
        dlt: DltNameOptions.ETHEREUM,
        type: TransactionTypeOptions.ACCOUNTS,
        subType: { name: TransactionEthereumSubTypeOptions.SMART_CONTRACT_INVOCATION },
        message: "",  // This must be empty for a contractInvocation transaction
            // The following parameters are from the TransactionAccountRequest object:
        fromAddress: partyAEthereumAddress,
        toAddress: smartContractAddress, 
        sequence: ethereumAccountSequence, // Must be an integer >= 0
        amount: '0', // Must be an integer >= 0
        smartContract: {
          code: "", // No need to put code here as you are declaring the function call ->
          functionCall: [{
            functionType: SCFunctionTypeOptions.FUNCTION_CALL_WITH_PARAMETERS,
            functionName: "setOVLTestUintArrayFixed", // The function name must be given
            inputParams: [
              {  
                type: { selectedType: EthereumTypeOptions.UINT_B_ARRAY, selectedIntegerLength: EthereumUintIntOptions.B16, selectedArrayLength: 4 },
                name: 'newTestUintArrayFixed', // Name of parameter
                value: [1,2,5,9], // Value of the boolean array
              }
            ]
          }

          ],
          extraFields: {
              // The following parameters are from the SmartContractEthereum object:
            payable: false
          }
        },
        extraFields: {
              // The following parameters are from the TransactionEthereumRequest object:
            compLimit: '4000000', // Must be an integer
            compUnitPrice: '8000000000' // Must be an integer
        }
      },
    ]);

    console.log('signedTransactions:');
    console.log(JSON.stringify(signedTransactions, null, 2));

    // Send the transactions to Overledger.
    const result = (await overledger.send(signedTransactions)).data;

    // Log the result.
    console.log('OVL result:');
    console.log(JSON.stringify(result, null, 2));
    console.log("");
    console.log('Your smart contract invocation transaction hash is: ' + result.dltData[0].transactionHash);
    console.log("");

  } catch (e) {
    console.error('error:', e);
  }
})();

