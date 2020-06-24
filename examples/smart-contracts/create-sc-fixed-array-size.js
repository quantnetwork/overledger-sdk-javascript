//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const SCFunctionTypeOptions = require('@quantnetwork/overledger-types').SCFunctionTypeOptions;
const TransactionTypeOptions = require('@quantnetwork/overledger-types').TransactionTypeOptions;
const TransactionEthereumSubTypeOptions = require('@quantnetwork/overledger-dlt-ethereum').TransactionEthereumSubTypeOptions;
const EthereumUintIntOptions = require('@quantnetwork/overledger-dlt-ethereum').EthereumUintIntOptions;
const EthereumTypeOptions = require('@quantnetwork/overledger-dlt-ethereum').EthereumTypeOptions;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;
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

// This is the bytecode of demoSmartContract.sol - note that it must start with 0x, for it to be deployed correctly
const smartContractDemoCode = "0x608060405234801561001057600080fd5b506040516103523803806103528339818101604052608081101561003357600080fd5b810190809190505080600090600461004c929190610053565b505061012e565b82805482825590600052602060002090600f016010900481019282156100ec5791602002820160005b838211156100bc57835183826101000a81548161ffff021916908361ffff160217905550926020019260020160208160010104928301926001030261007c565b80156100ea5782816101000a81549061ffff02191690556002016020816001010492830192600103026100bc565b505b5090506100f991906100fd565b5090565b61012b91905b8082111561012757600081816101000a81549061ffff021916905550600101610103565b5090565b90565b6102158061013d6000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80636cc64d661461003b578063e327dcc214610069575b600080fd5b6100676004803603608081101561005157600080fd5b81019080806080019091929192905050506100b3565b005b6100956004803603602081101561007f57600080fd5b81019080803590602001909291905050506100c8565b604051808261ffff1661ffff16815260200191505060405180910390f35b8060009060046100c4929190610101565b5050565b60008082815481106100d657fe5b90600052602060002090601091828204019190066002029054906101000a900461ffff169050919050565b82805482825590600052602060002090600f0160109004810192821561019e5791602002820160005b8382111561016e57833561ffff1683826101000a81548161ffff021916908361ffff160217905550926020019260020160208160010104928301926001030261012a565b801561019c5782816101000a81549061ffff021916905560020160208160010104928301926001030261016e565b505b5090506101ab91906101af565b5090565b6101dd91905b808211156101d957600081816101000a81549061ffff0219169055506001016101b5565b5090565b9056fea265627a7a723158208214ca886e4d99955c5e94f17282c1761548170d9e4a85154671915c591c678f64736f6c63430005110032";


; (async () => {
  try {
    console.log("name is: " + DltNameOptions.ETHEREUM);
    // Initialise overledger with ethereum for this example
    const overledger = new OverledgerSDK(mappId, bpiKey, {
      dlts: [{ dlt: DltNameOptions.ETHEREUM }],
      provider: { network: 'testnet' },
    });

    // SET the signing key;
    overledger.dlts.ethereum.setAccount(partyAEthereumPrivateKey);

    // Get the address sequence.
    const ethereumSequenceRequest = await overledger.dlts.ethereum.getSequence(partyAEthereumAddress);
    const ethereumAccountSequence = ethereumSequenceRequest.data.dltData[0].sequence;

    console.log('ethereumAccountSequence:' + ethereumAccountSequence);

    // Sign the transaction.
    // As input to this function, we will be providing a TransactionEthereumRequest object (of @quantnetwork/overledger-dlt-ethereum) that inherits from the TransactionAccountRequest object which inherits from the TransactionRequest object (both of @quantnetwork/overledger-types)
    const signedTransactions = await overledger.sign([
      {
            // The following parameters are from the TransactionRequest object:
        dlt: DltNameOptions.ETHEREUM,
        type: TransactionTypeOptions.ACCOUNTS,
        subType: { name: TransactionEthereumSubTypeOptions.SMART_CONTRACT_DEPLOY },
        message: "",  // This must be empty for a contractDeploy transaction
            // The following parameters are from the TransactionAccountRequest object:
        fromAddress: partyAEthereumAddress,
        toAddress: "", // This must be empty for a contractDeploy transaction
        sequence: ethereumAccountSequence, // must be an integer >= 0
        amount: '0', // Must be an integer >= 0
        smartContract: {
          code: smartContractDemoCode, // Put the bytecode to deploy here
          functionCall: [{
            functionType: SCFunctionTypeOptions.CONSTRUCTOR_WITH_PARAMETERS,
            functionName: "", // Not needed for constructor
            inputParams: [
            {
                type: { selectedType: EthereumTypeOptions.UINT_B_ARRAY, selectedIntegerLength: EthereumUintIntOptions.B16, selectedArrayLength: 4 },
                name: 'thisTestUintArrayFixed',
                value: [0,9,6,1]
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
            compLimit: '4000000', // Price for each individual gas unit this transaction will consume
            compUnitPrice: '8000000000' // The maximum fee that this transaction will use
        }
      },
    ]);

    console.log('signedTransaction:');
    console.log(JSON.stringify(signedTransactions, null, 2));

    // Send the transactions to Overledger.
    const result = (await overledger.send(signedTransactions)).data;

    // Log the result.
    console.log('OVL result:');
    console.log(JSON.stringify(result, null, 2));
    console.log("");
    console.log('Your smart contract creation transaction hash is: ' + result.dltData[0].transactionHash);
    console.log("");
  } catch (e) {
    console.error('error:', e);
  }
})();

