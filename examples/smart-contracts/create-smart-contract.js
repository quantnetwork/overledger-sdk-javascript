//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const SCFunctionTypeOptions = require('@quantnetwork/overledger-types').SCFunctionTypeOptions;
const TransactionTypeOptions = require('@quantnetwork/overledger-types').TransactionTypeOptions;
const TransactionEthereumSubTypeOptions = require('@quantnetwork/overledger-dlt-ethereum').TransactionEthereumSubTypeOptions;
const EthereumUintIntOptions = require('@quantnetwork/overledger-dlt-ethereum').EthereumUintIntOptions;
const EthereumBytesOptions = require('@quantnetwork/overledger-dlt-ethereum').EthereumBytesOptions;
const EthereumTypeOptions = require('@quantnetwork/overledger-dlt-ethereum').EthereumTypeOptions;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;
//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------

// The following are found from your Overledger Account:
const mappId = '...';
const bpiKey = '...';

// Paste in your ethereum address and private key.
const partyAEthereumPrivateKey = '0xe352ad01a835ec50ba301ed7ffb305555cbf3b635082af140b3864f8e3e443d3'; //should have 0x in front
const partyAEthereumAddress = '0x650A87cfB9165C9F4Ccc7B971D971f50f753e761';


//  ---------------------------------------------------------
//  -------------- END VARIABLES TO UPDATE ------------------
//  ---------------------------------------------------------

// This is the bytecode of demoSmartContract.sol - note that it must start with 0x, for it to be deployed correctly
const smartContractDemoCode = "0x60806040523480156200001157600080fd5b5060405162000f8638038062000f86833981810160405260808110156200003757600080fd5b8101908080519060200190929190805160405193929190846401000000008211156200006257600080fd5b838201915060208201858111156200007957600080fd5b82518660018202830111640100000000821117156200009757600080fd5b8083526020830192505050908051906020019080838360005b83811015620000cd578082015181840152602081019050620000b0565b50505050905090810190601f168015620000fb5780820380516001836020036101000a031916815260200191505b5060405260200180519060200190929190805160405193929190846401000000008211156200012957600080fd5b838201915060208201858111156200014057600080fd5b82518660018202830111640100000000821117156200015e57600080fd5b8083526020830192505050908051906020019080838360005b838110156200019457808201518184015260208101905062000177565b50505050905090810190601f168015620001c25780820380516001836020036101000a031916815260200191505b50604052505050836000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508360058190555082600290805190602001906200022b9291906200026a565b5081600360006101000a81548160ff021916908360ff16021790555080600490805190602001906200025f9291906200026a565b505050505062000319565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620002ad57805160ff1916838001178555620002de565b82800160010185558215620002de579182015b82811115620002dd578251825591602001919060010190620002c0565b5b509050620002ed9190620002f1565b5090565b6200031691905b8082111562000312576000816000905550600101620002f8565b5090565b90565b610c5d80620003296000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c8063313ce56711610071578063313ce567146102935780635c658165146102b757806370a082311461032f57806395d89b4114610387578063a9059cbb1461040a578063dd62ed3e14610470576100a9565b806306fdde03146100ae578063095ea7b31461013157806318160ddd1461019757806323b872dd146101b557806327e235e31461023b575b600080fd5b6100b66104e8565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100f65780820151818401526020810190506100db565b50505050905090810190601f1680156101235780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61017d6004803603604081101561014757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610586565b604051808215151515815260200191505060405180910390f35b61019f610678565b6040518082815260200191505060405180910390f35b610221600480360360608110156101cb57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610682565b604051808215151515815260200191505060405180910390f35b61027d6004803603602081101561025157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610917565b6040518082815260200191505060405180910390f35b61029b61092f565b604051808260ff1660ff16815260200191505060405180910390f35b610319600480360360408110156102cd57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610942565b6040518082815260200191505060405180910390f35b6103716004803603602081101561034557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610967565b6040518082815260200191505060405180910390f35b61038f6109af565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156103cf5780820151818401526020810190506103b4565b50505050905090810190601f1680156103fc5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6104566004803603604081101561042057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610a4d565b604051808215151515815260200191505060405180910390f35b6104d26004803603604081101561048657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610ba1565b6040518082815260200191505060405180910390f35b60028054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561057e5780601f106105535761010080835404028352916020019161057e565b820191906000526020600020905b81548152906001019060200180831161056157829003601f168201915b505050505081565b600081600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b6000600554905090565b600080600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050826000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101580156107525750828110155b61075b57600080fd5b826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550826000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8110156108a65782600160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b8373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef856040518082815260200191505060405180910390a360019150509392505050565b60006020528060005260406000206000915090505481565b600360009054906101000a900460ff1681565b6001602052816000526040600020602052806000526040600020600091509150505481565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60048054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610a455780601f10610a1a57610100808354040283529160200191610a45565b820191906000526020600020905b815481529060010190602001808311610a2857829003601f168201915b505050505081565b6000816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015610a9a57600080fd5b816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490509291505056fea265627a7a723158203af1f95fa2673881cced5064aa73c1ade74d99cfffe3d62cb9f40e9d715b9b3964736f6c63430005110032";

; (async () => {
  try {
    console.log("name is: " + DltNameOptions.ETHEREUM);
    // Initialise overledger with ethereum for this example
    const overledger = new OverledgerSDK(mappId, bpiKey, {
      dlts: [{ dlt: DltNameOptions.ETHEREUM }],
      provider: { network: 'testnet' },
    });

    // SET the signing key;
    overledger.dlts.ethereum.setAccount({privateKey: partyAEthereumPrivateKey});

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
            functionType: SCFunctionTypeOptions.CONSTRUCTOR_WITH_NO_PARAMETERS,
            functionName: "", // Not needed for constructor
            inputParams: [
              {  
                type: {selectedType: EthereumTypeOptions.INT_B, selectedIntegerLength: EthereumUintIntOptions.B256}, // First parameter is a boolean
                name: '_initialAmount', // Name of parameter
                value: '100000000000000', // Value of the boolean
            },
            {  
                type: {selectedType: EthereumTypeOptions.STRING} ,  //second parameter is an integer //if you choose an integer you must say what bit value to use
                name: 'tokenName',
                value: 'United States Dollar',
            },
            {  
                type: {selectedType: EthereumTypeOptions.UINT_B, selectedIntegerLength: EthereumUintIntOptions.B8},
                name: 'decimalUnits',
                value: '2',
            },
            {  
                type: {selectedType: EthereumTypeOptions.STRING}, //fourth parameter is bytes //if you choose bytes you must say what bit value to use
                name: 'tokenSymbol',
                value: 'USD', // Hello in bytes, 0x identifier required.
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
            compUnitPrice: '100000000' // The maximum fee that this transaction will use
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

