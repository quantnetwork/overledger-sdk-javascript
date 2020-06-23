//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const SCFunctionTypeOptions = require('@quantnetwork/overledger-types').SCFunctionTypeOptions;
const EthereumUintIntOptions = require('@quantnetwork/overledger-dlt-ethereum').EthereumUintIntOptions;
const EthereumTypeOptions = require('@quantnetwork/overledger-dlt-ethereum').EthereumTypeOptions;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------

// The following are found from your Overledger Account:
const mappId = 'network.quant.testnet';
const bpiKey = 'joNp29bJkQHwEwP3FmNZFgHTqCmciVu5NYD3LkEtk1I';


// Paste in your ethereum address.
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

    // We will be providing a SmartContractEthereum object (of @quantnetwork/overledger-dlt-ethereum) that inherits from the SmartContract object (of @quantnetwork/overledger-types)
    // This smart contract object is querying a smart contract function that does not have an input
    let smartContractQuery = {
          // The following parameters are from the SmartContract object:
      id: smartContractAddress,
      code: "", // No need to put code here if you are declaring the function call ->
      functionCall: [{
        functionType: SCFunctionTypeOptions.FUNCTION_CALL_WITH_PARAMETERS,
        functionName: "getTestUintArrayFixed", // Not needed for constructor
        inputParams: [
          {  
            type: { selectedType: EthereumTypeOptions.UINT_B, selectedIntegerLength: EthereumUintIntOptions.B256 }, //first parameter is an integer
            value: '1',
            name: 'index'
          }
        ],
        outputParams: [
          {  
            type: { selectedType: EthereumTypeOptions.UINT_B, selectedIntegerLength: EthereumUintIntOptions.B16 }, //first parameter is an integer
          }
        ]
      }],
      extraFields: {
          // The following parameters are from the SmartContractEthereum object:
        payable: false
      }
    } 

  // Now we will use the above smart contract object to build our Ethereum smart contract query
  const ethereumSmartContractQueryBuild = overledger.dlts.ethereum.buildSmartContractQuery(partyAEthereumAddress,smartContractQuery);

  if (ethereumSmartContractQueryBuild.success == false){
    throw new Error(`Ethereum smart contract build unsuccessful: ` + ethereumSmartContractQueryBuild.response);      
  }

  // And finally we will send the smart contract function query to the node.
  const returnedValues = await overledger.search.smartContractQuery(DltNameOptions.ETHEREUM, ethereumSmartContractQueryBuild.response);
  console.log(`\n`);
  console.log(`returned output value for smart contract function 'getOVLTestUint'`,  returnedValues.data);
  console.log(`\n`);
  } catch (e) {
    console.error('error:', e);
  }
})();

