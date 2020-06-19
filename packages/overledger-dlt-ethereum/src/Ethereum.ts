import Accounts from 'web3-eth-accounts';
import Web3 from 'web3';
import { MAINNET } from '@quantnetwork/overledger-provider';
import AbstractDLT from '@quantnetwork/overledger-dlt-abstract';
import { Options, Account, TransactionRequest, SCFunctionTypeOptions, ValidationCheck } from '@quantnetwork/overledger-types';
import TransactionEthereumRequest from './DLTSpecificTypes/TransactionEthereumRequest';
import SCEthereumParam from './DLTSpecificTypes/SCEthereumParam';
import SmartContractEthereum from './DLTSpecificTypes/SmartContractEthereum';
import computeParamType from './DLTSpecificTypes/ParamType';
import TypeOptions from './DLTSpecificTypes/associatedEnums/TypeOptions';
import BytesBOptions from './DLTSpecificTypes/associatedEnums/BytesBOptions';
import UintIntBOptions from './DLTSpecificTypes/associatedEnums/UintIntBOptions';
import TransactionEthereumSubTypeOptions from './DLTSpecificTypes/associatedEnums/TransactionEthereumSubTypeOptions';

/**
 * @memberof module:overledger-dlt-ethereum
*/
class Ethereum extends AbstractDLT {
  chainId: number;
  account: Accounts;
  options: Object;
  web3: Web3;

  /**
   * Name of the DLT
   */
  name: string = 'ethereum';

  /**
   * Symbol of the DLT
   */
  symbol: string = 'ETH';

  /**
   * @param {any} sdk - the sdk instance
   * @param {Object} options - any additional options to instantiate this dlt
   */
  constructor(sdk: any, options: Options = {}) {
    super(sdk, options);

    this.web3 = new Web3();
    this.options = options;

    if (options.privateKey) {
      this.setAccount(options.privateKey);
    }

    if (sdk.network === MAINNET) {
      this.chainId = 1;
    } else {
      this.chainId = 3;
    }
  }

  /**
   * Create an Ethereum account
   *
   * @return {Account} the new Ethereum account
   */
  createAccount(): Account {
    return this.web3.eth.accounts.create();
  }

  /**
   * Set an account for signing transactions for a specific DLT
   *
   * @param {string} privateKey The privateKey
   */
  setAccount(privateKey: string): void {
    this.account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
  }

  /**
   * Takes the Overledger definition of a transaction and converts it into a specific Ethereum transaction
   * @param {TransactionEthereumRequest} thisTransaction - details on the information to include in this transaction for the Ethereum distributed ledger
   * @return {Transaction} the Ethereum transaction
   */
  buildTransaction(thisTransaction: TransactionEthereumRequest): Transaction {
    super.transactionValidation(thisTransaction);
    let transactionData = '';
    let invocationType;
    if (thisTransaction.subType.name === TransactionEthereumSubTypeOptions.VALUE_TRANSFER) {
      transactionData = this.web3.utils.asciiToHex(thisTransaction.message);
    } else if (thisTransaction.subType.name === TransactionEthereumSubTypeOptions.SMART_CONTRACT_DEPLOY) {
      if (!thisTransaction.toAddress) {
        invocationType = thisTransaction.smartContract.functionCall[0].functionType;
        if (invocationType === SCFunctionTypeOptions.CONSTRUCTOR_WITH_NO_PARAMETERS) {
          transactionData = thisTransaction.smartContract.code;
        } else if (invocationType === SCFunctionTypeOptions.CONSTRUCTOR_WITH_PARAMETERS) {
          const paramsList = <SCEthereumParam[]>thisTransaction.smartContract.functionCall[0].inputParams;
          if (!paramsList || paramsList.length <= 0) {
            throw new Error('When deploying a smart contract with parameters, then thisTransaction.smartContract.functionCall.inputParams must be defined with a non-null length');
          }
          transactionData = this.computeTransactionDataForConstructorWithParams(thisTransaction.smartContract.code, paramsList);
        } else {
          throw new Error('When deploying a smart contract, you must set the thisTransaction.smartContract.functionCall.functionType parameter to be one of SCFunctionTypeOptions');
        }
      } else {
        throw new Error('When deploying a smart contract, the toAddress must be set to the empty string, i.e. Transaction.toAddress = "" ');
      }
    } else if (thisTransaction.subType.name === TransactionEthereumSubTypeOptions.SMART_CONTRACT_INVOCATION) {
      invocationType = thisTransaction.smartContract.functionCall[0].functionType;
      if (thisTransaction.toAddress) {
        if ((invocationType === SCFunctionTypeOptions.FUNCTION_CALL_WITH_PARAMETERS) || (invocationType === SCFunctionTypeOptions.FUNCTION_CALL_WITH_NO_PARAMETERS)) {
          const paramsList = <SCEthereumParam[]>thisTransaction.smartContract.functionCall[0].inputParams;
          if (!paramsList) {
            throw new Error('If invoking a smart contract then the thisTransaction.smartContract.functionCall.inputParams parameter must be defined. If the called function takes no parameters then set it to the empty array, i.e. functionParameters = []');
          }
          const functionName = thisTransaction.smartContract.functionCall[0].functionName;
          if (!functionName) {
            throw new Error('When invoking a smart contract function, the name of the called function must be given by setting thisTransaction.smartContract.functionCall.functionName');
          }
          transactionData = this.computeTransactionDataForFunctionCall(functionName, paramsList);
        } else {
          throw new Error('When invoking a smart contract function thisTransaction.smartContract.functionCall.functionType must be set to SCFunctionTypeOptions.functionCallWithNoParameters or SCFunctionTypeOptions.functionCallWithParameters');
        }
      } else {
        throw new Error('When invoking a smart contract, the toAddress must be set to a non empty string, equal to the ethereum address of the smart contract, i.e. Transaction.toAddress = "0x..." ');
      }

    }

    const transaction = {
      nonce: thisTransaction.sequence,
      chainId: this.chainId,
      to: thisTransaction.toAddress,
      gas: thisTransaction.extraFields.compLimit,
      gasPrice: thisTransaction.extraFields.compUnitPrice,
      value: thisTransaction.amount.toString(),
      data: transactionData,
    };
    return transaction;
  }

  /**
   * validates an OVL transactionRequest according to Ethereum specific rules
   * @param thisTransaction - The transaction request
   */
  _transactionValidation(thisTransaction: TransactionRequest): ValidationCheck {

    // now input validation on an Ethereum transaction
    const thisEthereumTx = <TransactionEthereumRequest>thisTransaction;
    const ethereumSC = <SmartContractEthereum>thisEthereumTx.smartContract; // recasting for extra fields

    if (!Object.values(TransactionEthereumSubTypeOptions).includes(thisEthereumTx.subType.name)) {
      return {
        success: false,
        failingField: 'subType',
        error: 'You must select a subType from TransactionSubTypeOptions',
      };
    }
    if ((!thisEthereumTx.extraFields) || (thisEthereumTx.extraFields == null)) {
      return {
        success: false,
        failingField: 'extraFields',
        error: 'All transactions for XRP must have the extraFields field set with feePrice and maxLedgerVersion parameters within it',
      };
    }
    if ((thisEthereumTx.extraFields.compLimit === '') || (thisEthereumTx.extraFields.compLimit == null) || (thisEthereumTx.extraFields.compLimit === 'undefined')) {
      return {
        success: false,
        failingField: 'extraFields.compLimit',
        error: 'All transactions for Ethereum must have the extraFields.compLimit field set',
      };
    }
    if ((thisEthereumTx.extraFields.compUnitPrice === '') || (thisEthereumTx.extraFields.compUnitPrice == null) || (thisEthereumTx.extraFields.compLimit === 'undefined')) {
      return {
        success: false,
        failingField: 'extraFields.compUnitPrice',
        error: 'All transactions for Ethereum must have the extraFields.compUnitPrice field set',
      };
    }
    if ((thisEthereumTx.subType.name === TransactionEthereumSubTypeOptions.SMART_CONTRACT_DEPLOY) && (!thisEthereumTx.smartContract)) {
      return {
        success: false,
        failingField: 'smartContract',
        error: 'To deploy a smart contract on Ethereum, you need to define a smartContract object',
      };
    }
    if ((thisEthereumTx.subType.name === TransactionEthereumSubTypeOptions.SMART_CONTRACT_DEPLOY) && (!ethereumSC.code)) {
      return {
        success: false,
        failingField: 'smartContract.code',
        error: 'To deploy a smart contract on Ethereum, you need to provide the smartContract.code field',
      };
    }
    if ((thisEthereumTx.subType.name === TransactionEthereumSubTypeOptions.SMART_CONTRACT_DEPLOY) && (!ethereumSC.functionCall)) {
      return {
        success: false,
        failingField: 'smartContract.functionCall',
        error: 'To deploy a smart contract on Ethereum, you need to provide the smartContract.functionCall field',
      };
    }
    if ((thisEthereumTx.subType.name === TransactionEthereumSubTypeOptions.SMART_CONTRACT_DEPLOY)
     && ((!ethereumSC.functionCall[0].functionType) || (!Object.values(SCFunctionTypeOptions).includes(ethereumSC.functionCall[0].functionType)))) {
      return {
        success: false,
        failingField: 'smartContract.functionCall[0].functionType',
        error: 'To deploy a smart contract on Ethereum, you need to provide the smartContract.functionCall[0].functionType field and set it equal to constructorWithNoParameters or constructorWithParameters',
      };
    }
    if ((thisEthereumTx.subType.name === TransactionEthereumSubTypeOptions.SMART_CONTRACT_DEPLOY)
     && ((ethereumSC.functionCall[0].functionType === SCFunctionTypeOptions.FUNCTION_CALL_WITH_NO_PARAMETERS)
     || (ethereumSC.functionCall[0].functionType === SCFunctionTypeOptions.FUNCTION_CALL_WITH_PARAMETERS))) {
      return {
        success: false,
        failingField: 'smartContract.functionCall[0].functionType',
        error: 'To deploy a smart contract on Ethereum, you need to provide the smartContract.functionCall[0].functionType field and set it equal to constructorWithNoParameters or constructorWithParameters',
      };
    }
    if ((thisEthereumTx.subType.name === TransactionEthereumSubTypeOptions.SMART_CONTRACT_DEPLOY)
     && (ethereumSC.functionCall[0].functionType === SCFunctionTypeOptions.CONSTRUCTOR_WITH_PARAMETERS)
     && ((typeof ethereumSC.functionCall[0].inputParams === 'undefined') || (ethereumSC.functionCall[0].inputParams == null)
     || (ethereumSC.functionCall[0].inputParams.length === 0))) {
      return {
        success: false,
        failingField: 'smartContract.functionCall[0].inputParams',
        error: 'To deploy a smart contract on Ethereum that has parameters in its constructor, you need to provide them in the smartContract.functionCall[0].inputParams field',
      };
    }
    if ((thisEthereumTx.subType.name === TransactionEthereumSubTypeOptions.SMART_CONTRACT_INVOCATION) && (!thisEthereumTx.smartContract)) {
      return {
        success: false,
        failingField: 'smartContract',
        error: 'To invoke a smart contract on Ethereum, you need to define a smartContract object',
      };
    }
    if ((thisEthereumTx.subType.name === TransactionEthereumSubTypeOptions.SMART_CONTRACT_INVOCATION) && (!ethereumSC.functionCall)) {
      return {
        success: false,
        failingField: 'smartContract.functionCall',
        error: 'To invoke a smart contract on Ethereum, you need to provide the smartContract.functionCall field',
      };
    }
    if ((thisEthereumTx.subType.name === TransactionEthereumSubTypeOptions.SMART_CONTRACT_INVOCATION) && (!ethereumSC.functionCall[0].functionType)) {
      return {
        success: false,
        failingField: 'smartContract.functionCall[0].functionType',
        error: 'To invoke a smart contract on Ethereum, you need to provide the smartContract.functionCall[0].functionType field and set it equal to functionCallWithNoParameters or functionCallWithParameters',
      };
    }
    if ((thisEthereumTx.subType.name === TransactionEthereumSubTypeOptions.SMART_CONTRACT_INVOCATION)
     && (ethereumSC.functionCall[0].functionType === SCFunctionTypeOptions.FUNCTION_CALL_WITH_PARAMETERS) && (ethereumSC.functionCall[0].inputParams.length === 0)) {
      return {
        success: false,
        failingField: 'smartContract.functionCall[0].inputParams',
        error: 'To invoke a smart contract on Ethereum that has parameters in its constructor, you need to provide them in the smartContract.functionCall[0].inputParams field',
      };
    }
    if (((!thisEthereumTx.toAddress) || (thisEthereumTx.toAddress === '')) && thisEthereumTx.subType.name === TransactionEthereumSubTypeOptions.SMART_CONTRACT_INVOCATION) {
      return {
        success: false,
        failingField: 'toAddress',
        error: 'If Transaction.subType.name === TransactionSubTypeOptions.smartContractInvocation then a transaction.toAddress needs to be set indicating the address of the smart contract to invoke.',
      };
    }
    if (thisEthereumTx.amount > 0
      && (thisEthereumTx.subType.name === TransactionEthereumSubTypeOptions.SMART_CONTRACT_DEPLOY || thisEthereumTx.subType.name === TransactionEthereumSubTypeOptions.SMART_CONTRACT_INVOCATION)
      && ((!ethereumSC.extraFields) || (!ethereumSC.extraFields.payable))) {
      return {
        success: false,
        failingField: 'extraFields.payable',
        error: 'If deploying or invoking a smart contract and ethereumSC.extraFields.payable === "false", then transaction.amount must be set to 0',
      };
    }

    // for each parameter in the smart contract inputs and outputs
    // check there is a type and a value???
    let counter = 0;
    if ((thisEthereumTx.subType.name !== TransactionEthereumSubTypeOptions.VALUE_TRANSFER) && (ethereumSC.functionCall[0].inputParams)) {
      while (counter < ethereumSC.functionCall[0].inputParams.length) {
        const thisSCEthereumParam = <SCEthereumParam>ethereumSC.functionCall[0].inputParams[counter];
        if (!thisSCEthereumParam.type) {
          return {
            success: false,
            failingField: 'ethereumSC.functionCall[0].inputParams[counter].type',
            error: 'To invoke an Ethereum smart contract function that has input parameters, you need to provide the type field for each smart contract input parameter',
          };
        }
        if ((!thisSCEthereumParam.type.selectedType) || ((!Object.values(TypeOptions).includes(thisSCEthereumParam.type.selectedType)))) {
          return {
            success: false,
            failingField: 'ethereumSC.functionCall[0].inputParams[counter].type.selectedType',
            error: 'To invoke a smart contract on Ethereum that has input parameters, you need to provide the selectedType field for each smart contract input parameter type, selected from TypeOptions in the Ethereum Package',
          };
        }
        if (((thisSCEthereumParam.type.selectedType === TypeOptions.UINT_B) || (thisSCEthereumParam.type.selectedType === TypeOptions.INT_B)
         || (thisSCEthereumParam.type.selectedType === TypeOptions.UINT_B_ARRAY) || (thisSCEthereumParam.type.selectedType === TypeOptions.INT_B_ARRAY))
         && ((!thisSCEthereumParam.type.selectedIntegerLength) || (!Object.values(UintIntBOptions).includes(thisSCEthereumParam.type.selectedIntegerLength)))) {
          return {
            success: false,
            failingField: 'ethereumSC.functionCall[0].inputParams[counter].type.selectedIntegerLength',
            error: 'To invoke a smart contract on Ethereum that has input parameters, where some are integers, you need to provide the type.selectedIntegerLength field for each integer, stating how many bytes length it should use, selected from UintIntOptions in the Ethereum package',
          };
        }
        // console.log(`thisSCEthereumParam.type.selectedBytesLength  ${thisSCEthereumParam.type.selectedBytesLength }`);
        // if (((thisSCEthereumParam.type.selectedType === TypeOptions.BYTES_B) || (thisSCEthereumParam.type.selectedType === TypeOptions.BYTES_B_ARRAY))
        //  && ((thisSCEthereumParam.type.selectedBytesLength == undefined) || (thisSCEthereumParam.type.selectedBytesLength == null) || (!Object.values(BytesBOptions).includes(thisSCEthereumParam.type.selectedBytesLength)))) {
        //   return {
        //     success: false,
        //     failingField: 'ethereumSC.functionCall[0].inputParams[counter].type.selectedBytesLength',
        //     error: 'To invoke a smart contract on Ethereum that has input parameters, where some are bytes, you need to provide the type.selectedBytesLength field for each byte parameter, stating how many bytes length it should use, selected from BytesBOptions in the Ethereum package',
        //   };
        // }
        if (!thisSCEthereumParam.name) {
          return {
            success: false,
            failingField: 'ethereumSC.functionCall[0].inputParams[counter].name',
            error: 'To invoke a smart contract on Ethereum that has input parameters, you need to provide the name field for each smart contract input parameter',
          };
        }
        if (!thisSCEthereumParam.value) {
          return {
            success: false,
            failingField: 'ethereumSC.functionCall[0].inputParams[counter].value',
            error: 'To invoke a smart contract on Ethereum that has input parameters, you need to provide the value field for each smart contract input parameter',
          };
        }
        counter = counter + 1;
      }
    }
    if ((thisEthereumTx.subType.name !== TransactionEthereumSubTypeOptions.VALUE_TRANSFER) && (ethereumSC.functionCall[0].outputParams)) {
      return {
        success: false,
        failingField: 'ethereumSC.functionCall[0].outputParams',
        error: 'To deploy or invoke a smart contract on Ethereum you should not list the output parameters',
      };
    }

    return { success: true };
  }

  /**
   * validates an OVL smart contract query according to Ethereum specific rules
   * @param {SmartContract} contractQueryDetails - The transaction request
   */
  _smartContractQueryValidation(contractQueryDetails: SmartContractEthereum): ValidationCheck {

    // code must be empty
    if (contractQueryDetails.code) {
      return {
        success: false,
        failingField: 'code',
        error: 'The smart contract code should be set to the empty string when querying',
      };
    }
    if (!contractQueryDetails.functionCall[0].functionType) {
      return {
        success: false,
        failingField: 'functionCall[0].functionType',
        error: 'The smart contract query should include a functionType',
      };
    }
    if ((contractQueryDetails.functionCall[0].functionType === SCFunctionTypeOptions.CONSTRUCTOR_WITH_NO_PARAMETERS)
     || ((contractQueryDetails.functionCall[0].functionType === SCFunctionTypeOptions.CONSTRUCTOR_WITH_PARAMETERS))) {
      return {
        success: false,
        failingField: 'functionCall[0].functionType',
        error: 'The smart contract query should include a functionType set to functionCallWithParameters or functionCallWithNoParameters',
      };
    }
    if (!contractQueryDetails.functionCall[0].functionName) {
      return {
        success: false,
        failingField: 'functionCall[0].functionName',
        error: 'The smart contract query should include a functionName',
      };
    }
    if ((contractQueryDetails.functionCall[0].functionType === SCFunctionTypeOptions.FUNCTION_CALL_WITH_PARAMETERS) && (!contractQueryDetails.functionCall[0].inputParams)) {
      return {
        success: false,
        failingField: 'functionCall[0].inputParams',
        error: 'The smart contract query for a function call with parameters should include the functionCall[0].inputParams field',
      };
    }
    if (!contractQueryDetails.functionCall[0].outputParams) {
      return {
        success: false,
        failingField: 'functionCall[0].outputParams',
        error: 'The smart contract query should include the functionCall[0].outputParams field',
      };
    }
    // input and output parameters must follow specific format
    let counter = 0;
    if (contractQueryDetails.functionCall[0].inputParams) {
      while (counter < contractQueryDetails.functionCall[0].inputParams.length) {
        const thisSCEthereumParam = <SCEthereumParam>contractQueryDetails.functionCall[0].inputParams[counter];
        if (!thisSCEthereumParam.type) {
          return {
            success: false,
            failingField: 'functionCall[0].inputParams[counter].type',
            error: 'To query an Ethereum smart contract function that has input parameters, you need to provide the type field for each smart contract input parameter',
          };
        }
        if ((!thisSCEthereumParam.type.selectedType) || ((!Object.values(TypeOptions).includes(thisSCEthereumParam.type.selectedType)))) {
          return {
            success: false,
            failingField: 'functionCall[0].inputParams[counter].type.selectedType',
            error: 'To query a smart contract on Ethereum that has input parameters, you need to provide the selectedType field for each smart contract input parameter type, selected from TypeOptions in the Ethereum Package',
          };
        }
        if (((thisSCEthereumParam.type.selectedType === TypeOptions.UINT_B) || (thisSCEthereumParam.type.selectedType === TypeOptions.INT_B)
         || (thisSCEthereumParam.type.selectedType === TypeOptions.UINT_B_ARRAY) || (thisSCEthereumParam.type.selectedType === TypeOptions.INT_B_ARRAY))
         && ((!thisSCEthereumParam.type.selectedIntegerLength) || (!Object.values(UintIntBOptions).includes(thisSCEthereumParam.type.selectedIntegerLength)))) {
          return {
            success: false,
            failingField: 'functionCall[0].inputParams[counter].type.selectedIntegerLength',
            error: 'To query a smart contract on Ethereum that has input parameters, where some are integers, you need to provide the type.selectedIntegerLength field for each integer, stating how many bytes length it should use, selected from UintIntOptions in the Ethereum package',
          };
        }
        if (((thisSCEthereumParam.type.selectedType === TypeOptions.BYTES_B) || (thisSCEthereumParam.type.selectedType === TypeOptions.BYTES_B_ARRAY))
         && ((!thisSCEthereumParam.type.selectedBytesLength) || (!Object.values(BytesBOptions).includes(thisSCEthereumParam.type.selectedBytesLength)))) {
          return {
            success: false,
            failingField: 'functionCall[0].inputParams[counter].type.selectedBytesLength',
            error: 'To query a smart contract on Ethereum that has input parameters, where some are bytes, you need to provide the type.selectedBytesLength field for each byte parameter, stating how many bytes length it should use, selected from BytesBOptions in the Ethereum package',
          };
        }
        if (!thisSCEthereumParam.name) {
          return {
            success: false,
            failingField: 'functionCall[0].inputParams[counter].name',
            error: 'To query a smart contract on Ethereum that has input parameters, you need to provide the name field for each smart contract input parameter',
          };
        }
        if (!thisSCEthereumParam.value) {
          return {
            success: false,
            failingField: 'functionCall[0].inputParams[counter].value',
            error: 'To query a smart contract on Ethereum that has input parameters, you need to provide the value field for each smart contract input parameter',
          };
        }
        counter = counter + 1;
      }
    }
    if (contractQueryDetails.functionCall[0].outputParams) {
      counter = 0;
      while (counter < contractQueryDetails.functionCall[0].outputParams.length) {
        const thisSCEthereumParam = <SCEthereumParam>contractQueryDetails.functionCall[0].outputParams[counter];
        if (!thisSCEthereumParam.type) {
          return {
            success: false,
            failingField: 'functionCall[0].outputParams[counter].type',
            error: 'To query an Ethereum smart contract function that has output parameters, you need to provide the type field for each smart contract output parameter',
          };
        }
        if ((!thisSCEthereumParam.type.selectedType) || (!Object.values(TypeOptions).includes(thisSCEthereumParam.type.selectedType))) {
          return {
            success: false,
            failingField: 'functionCall[0].outputParams[counter].type.selectedType',
            error: 'To query a smart contract on Ethereum that has output parameters, you need to provide the selectedType field for each smart contract output parameter type, selected from TypeOptions in the Ethereum Package',
          };
        }
        if (((thisSCEthereumParam.type.selectedType === TypeOptions.UINT_B) || (thisSCEthereumParam.type.selectedType === TypeOptions.INT_B)
         || (thisSCEthereumParam.type.selectedType === TypeOptions.UINT_B_ARRAY) || (thisSCEthereumParam.type.selectedType === TypeOptions.INT_B_ARRAY))
         && ((!thisSCEthereumParam.type.selectedIntegerLength) || (!Object.values(UintIntBOptions).includes(thisSCEthereumParam.type.selectedIntegerLength)))) {
          return {
            success: false,
            failingField: 'functionCall[0].outputParams[counter].type.selectedIntegerLength',
            error: 'To query a smart contract on Ethereum that has output parameters, where some are integers, you need to provide the type.selectedIntegerLength field for each integer, stating how many bytes length it should use, selected from UintIntOptions in the Ethereum package',
          };
        }
        if (((thisSCEthereumParam.type.selectedType === TypeOptions.BYTES_B) || (thisSCEthereumParam.type.selectedType === TypeOptions.BYTES_B_ARRAY))
         && ((!thisSCEthereumParam.type.selectedBytesLength) || (!Object.values(BytesBOptions).includes(thisSCEthereumParam.type.selectedBytesLength)))) {
          return {
            success: false,
            failingField: 'functionCall[0].outputParams[counter].type.selectedBytesLength',
            error: 'To query a smart contract on Ethereum that has output parameters, where some are bytes, you need to provide the type.selectedBytesLength field for each byte parameter, stating how many bytes length it should use, selected from BytesBOptions in the Ethereum package',
          };
        }
        counter = counter + 1;
      }
    }
    return { success: true };

  }

  /**
   * Convert Overledger object description of a smart contract constructor and parameters into Ethereum versions
   * @param {string} smartContractCode - the bytecode of the smart contract (without the byte code information on the constructor variables)
   * @param {SCEthereumParam[]} paramsList - the list of parameters that this constructor takes as input
   *
   * @return {string} the bytecode of the smart contract and the parameters
   */
  private computeTransactionDataForConstructorWithParams(smartContractCode: string, paramsList: SCEthereumParam[]): string {
    const typesAndValues =
    paramsList.reduce((paramsValues, p) => { const paramType = computeParamType(p); paramsValues[0].push(paramType); paramsValues[1].push(p.value); return paramsValues; }, [[], []]);
    const encodedParams = this.web3.eth.abi.encodeParameters(typesAndValues[0], typesAndValues[1]).slice(2);
    return smartContractCode + encodedParams;
  }

  /**
   * Convert Overledger object description of a smart contract function and parameters into Ethereum versions
   * @param {string} functionName - the name of the smart contract function to call
   * @param {SCEthereumParam[]} paramsList - the list of parameters that this function takes as input
   *
   * @return {string} the bytecode of this function call
   */
  private computeTransactionDataForFunctionCall(functionName: string, paramsList: SCEthereumParam[]): string {
    const inputsAndValues =
    paramsList.reduce((values, p) => { const type = computeParamType(p); values[0].push({ type: type.toString(), name: p.name }); values[1].push(p.value); return values; }, [[], []]);
    const jsonFunctionCall: IJsonFunctionCall = {
      name: functionName,
      type: 'function',
      inputs: <[{ type: string, name: string }]>inputsAndValues[0],
    };
    const encodedInput = this.web3.eth.abi.encodeFunctionCall(jsonFunctionCall, inputsAndValues[1]);
    return encodedInput;
  }

  /**
   * Takes in an overledger definition of a transaction for ethereum, converts it into a form that the Ethereum distributed ledger will understand, and then signs the transaction
   * @param {TransactionRequest} thisTransaction - an instantiated overledger definition of an ethereum transaction
   */
  _sign(thisTransaction: TransactionRequest): Promise<string> {

    const transaction = this.buildTransaction(<TransactionEthereumRequest>thisTransaction);

    return new Promise((resolve, reject) => {
      this.account.signTransaction(transaction, (err, data) => {
        if (err) {
          return reject(err);
        }

        return resolve(data.rawTransaction);
      });
    });
  }

  /**
   * Allows a user to build a smart contract query for the Ethereum distributed ledger
   * @param {string} dltAddress - the user's Ethereum address
   * @param {SmartContractEthereum} contractQueryDetails - the definition of the smart contract function the user wants to interact with,
   * including information on what parameters to use in the function call.
   *
   * @return {Object} success indicates if this query building was correct, if yes then it will be in the response field of the object
   */
  _buildSmartContractQuery(dltAddress: string, contractQueryDetails: SmartContractEthereum): Object {
    try {
      const theseEthereumInputParams = <SCEthereumParam[]>contractQueryDetails.functionCall[0].inputParams;
      const theseEthereumOutputParams = <SCEthereumParam[]>contractQueryDetails.functionCall[0].outputParams;
      const data = {
        fromAddress: dltAddress,
        contractAddress: contractQueryDetails.id,
        funcName: contractQueryDetails.functionCall[0].functionName,
        inputValues: this.computeSCQueryInputValuesList(theseEthereumInputParams),
        outputTypes: this.computeSCQueryOutputTypesList(theseEthereumOutputParams),
      };
      return { success: true, response: data };
    } catch (e) {
      return { success: false, response: e.response };
    }
  }

  /**
   * computes the input parameters into the smart contract function query
   * @param {SCEthereumParam[]} inputFunctionParams - the list of input parameters
   */
  private computeSCQueryInputValuesList(inputFunctionParams: SCEthereumParam[]) {
    const inputValues =
     inputFunctionParams.reduce((inputParams, p) => { const paramType = computeParamType(p); inputParams.push(<QueryInput>{ type: paramType, value: p.value }); return inputParams; }, []);
    return inputValues;
  }

  /**
   * computes the output parameters into the smart contract function query
   * @param {SCEthereumParam[]} outputFunctionTypes
   */
  computeSCQueryOutputTypesList(outputFunctionTypes: SCEthereumParam[]) {
    const outputTypes =
     outputFunctionTypes.reduce((outputTypes, p) => { const paramType = computeParamType(p); outputTypes.push(<QueryOutput>{ type: paramType }); return outputTypes; }, []);
    return outputTypes;
  }

}

interface QueryInput {
  type: string;
  value: string;
}

interface QueryOutput {
  type: string;
}

export type Transaction = {
  nonce: number,
  chainId: number,
  to: string,
  gas: string,
  gasPrice: string,
  value: string,
  data: string,
};

interface IJsonFunctionCall {
  name: string;
  type?: string;
  inputs: [{ type: string, name: string }];
}

export default Ethereum;
