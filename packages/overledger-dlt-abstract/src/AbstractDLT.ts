import {
  TransactionRequest, SignedTransactionRequest, Account, TransactionTypeOptions,
  TransactionAccountsRequest, TransactionUtxoRequest, ValidationCheck, TransactionInput, TransactionOutput, SmartContract, MultisigNOfMAccount,
} from '@quantnetwork/overledger-types';
import { AxiosPromise, AxiosResponse } from 'axios';

/**
 * @memberof module:overledger-dlt-abstract
*/
abstract class AbstractDLT {
  name: string;
  sdk: any;
  options: Object;

  account?: Account;
  multisigAccount?: MultisigNOfMAccount;

  /**
   * @param {any} sdk
   */
  constructor(sdk: any) {
    this.sdk = sdk;
  }

  /**
   * Create an account for a specific DLT
   *
   * Abstract method to be implemented in each DLT
   * @return {Account}
   */
  public createAccount(): Account {
    throw new Error('createAccount: abstract method must be implemented');
  }

  /**
   * Set an account for signing transactions for a specific DLT
   *
   * Abstract method to be implemented in each DLT
   * @param {Account} AccountInfo The standardised Account Object
   */
  public setAccount(_accountInfo: Account): void {
    throw new Error('setAccount: abstract method must be implemented');
  } 

  public setMultiSigAccount(_multisigAccountInfo: MultisigNOfMAccount): void {
    throw new Error('setMultiSigAccount: abstract method must be implemented');
  }

  /**
   * Get the balance for a specific address
   * @param {string} address The address to query for
   * @return {Promise<AxiosResponse>}
   */
  public getBalance(address: string = null): Promise<AxiosResponse> {
    if (address === null) {
      if (!this.account) {
        throw new Error('The account must be set up');
      }

      address = this.account.address;
    }

    return this.sdk.request.get(`/balances/${this.name}/${address}`);
  }

  /**
   * Get the sequence for a specific address
   * @param {string|string[]} address
   */
  public getSequence(address: string): AxiosPromise<Object> {
    return this.sdk.getSequences([{ address, dlt: this.name }]);
  }

  /**
   * Converts an Overledger transaction to the correct format for the DLT in question and signs it
   *
   * @param {TransactionRequest} thisTransaction - the transaction information
   */
  public sign(thisTransaction: TransactionRequest): Promise<string> {
    const transactionValidation = this.transactionValidation(thisTransaction);
    if (!transactionValidation.success) {
      throw new Error(`Error parameter: ${transactionValidation.failingField}. Error is: ${transactionValidation.error}`);
    }
    return this._sign(thisTransaction);
  }

  /**
   * Takes the given transaction and validates it
   * @param thisTransaction - the transaction to check the formatting of
   *
   * @return {ValidationCheck} - returns an object {success: boolean, failingField: string, error: string}.
   *  If 'success' = true, the validation passes, otherwise, the 'failingField' parameter will contain
   *  the first failing transaction field and error will contain information on this problem
   */
  public transactionValidation(thisTransaction: TransactionRequest): ValidationCheck {
    // input validation for the user account
    if (!this.account && !this.multisigAccount) {
      return {
        success: false,
        failingField: 'overledger account',
        error: `The ${this.name} account must be set up`,
      };
    }
    // now input validation for a generic transaction
    if ((!thisTransaction.dlt) || (thisTransaction.dlt === null)) {
      return {
        success: false,
        failingField: 'dlt',
        error: 'All transactions must have a dlt field',
      };
    }
    if ((!thisTransaction.type) || (thisTransaction.type === null)) {
      return {
        success: false,
        failingField: 'type',
        error: 'All transactions must have a type field',
      };
    }
    if (!Object.values(TransactionTypeOptions).includes(thisTransaction.type)) {
      return {
        success: false,
        failingField: 'type',
        error: 'You must select a type from TransactionTypeOptions',
      };
    }
    if ((!thisTransaction.subType) || (thisTransaction.subType === null)) {
      return {
        success: false,
        failingField: 'subType',
        error: 'All transactions must have a subType field',
      };
    }
    if ((!this.conversionTest(thisTransaction.message)) || (thisTransaction.message === 'undefined') || (thisTransaction.message == null)) {
      return {
        success: false,
        failingField: 'message',
        error: 'All transactions must have a message field. If no message is required, assign message to the empty string, i.e. message: ""',
      };
    }

    // now input validation on a generic accounts-based transaction or utxo-based transaction
    if (thisTransaction.type === TransactionTypeOptions.ACCOUNTS) {
      const thisAccountsTx = <TransactionAccountsRequest>thisTransaction;
      if ((!thisAccountsTx.fromAddress) || (thisAccountsTx.fromAddress === '') || (thisAccountsTx.fromAddress == null) || (thisAccountsTx.fromAddress === 'undefined')) {
        return {
          success: false,
          failingField: 'fromAddress',
          error: 'All transactions for accounts distributed ledgers must have the fromAddress field',
        };
      }
      if ((!this.conversionTest(thisAccountsTx.toAddress)) || (thisAccountsTx.toAddress == null) || (thisAccountsTx.toAddress === 'undefined')) {
        return {
          success: false,
          failingField: 'toAddress',
          error: 'All transactions for accounts distributed ledgers must have the toAddress field. If you do not want to set a toAddress (maybe you are creating an on-chain smart contract?), assign toAddress to the empty string, i.e. toAddress = ""',
        };
      }
      if ((!this.conversionTest(thisAccountsTx.sequence)) || (thisAccountsTx.sequence == null) || (thisAccountsTx.sequence < 0)) {
        return {
          success: false,
          failingField: 'sequence',
          error: 'All transactions for accounts distributed ledgers must have the sequence field as a number greater or equal to 0',
        };
      }

    } else if (thisTransaction.type === TransactionTypeOptions.UTXO) {
      const thisUtxoTx = <TransactionUtxoRequest>thisTransaction;
      if (!thisUtxoTx.txInputs || thisUtxoTx.txInputs === undefined) {
        return {
          success: false,
          failingField: 'txInputs',
          error: 'All transactions for utxo distributed ledgers must have the txInputs field',
        };
      }
      if ((!this.conversionTest(thisUtxoTx.txOutputs)) || (thisUtxoTx.txOutputs == null)) {
        return {
          success: false,
          failingField: 'txOutputs',
          error: 'All transactions for utxo distributed ledgers must have the txOutputs field',
        };
      }
      // check each input
      let counter = 0;
      let inputToValidate;
      while (counter < thisUtxoTx.txInputs.length) {
        inputToValidate = <TransactionInput>thisUtxoTx.txInputs[counter];
        if ((!this.conversionTest(inputToValidate.linkedTx)) || (inputToValidate.linkedTx == null) || (inputToValidate.linkedTx === 'undefined')) {
          return {
            success: false,
            failingField: 'txInputs.linkedTx',
            error: 'Each txInput for a utxo distributed ledger transaction must have a linkedTx field. If there is no linked transaction, set to the empty string, i.e.: linkedTx = ""',
          };
        }
        if ((!this.conversionTest(inputToValidate.linkedIndex)) || (inputToValidate.linkedIndex == null) || (inputToValidate.linkedIndex === 'undefined')) {
          return {
            success: false,
            failingField: 'txInputs.linkedIndex',
            error: 'Each txInput for a utxo distributed ledger transaction must have a linkedIndex field. If there is no linked transaction index, set to the empty string, i.e.: linkedIndex = ""',
          };
        }
        if ((!this.conversionTest(inputToValidate.fromAddress)) || (inputToValidate.fromAddress == null) || (inputToValidate.fromAddress === 'undefined')) {
          return {
            success: false,
            failingField: 'txInputs.fromAddress',
            error: 'Each txInput for a utxo distributed ledger transaction must have a fromAddress field. If there is no from address (e.g. for coinbase transactions), set to the empty string, i.e.: fromAddress = ""',
          };
        }
        counter = counter + 1;
      }
      // check each output
      counter = 0;
      let outputToValidate;
      while (counter < thisUtxoTx.txOutputs.length) {
        outputToValidate = <TransactionOutput>thisUtxoTx.txOutputs[counter];
        if ((!this.conversionTest(outputToValidate.toAddress)) || (outputToValidate.toAddress == null) || (outputToValidate.toAddress === 'undefined')) {
          return {
            success: false,
            failingField: 'txOutputs.toAddress',
            error: 'Each txOutput for a utxo distributed ledger transaction must have a toAddress field.',
          };
        }
        counter = counter + 1;
      }
    }

    // finally input validation on the distributed ledger specific transaction
    return this._transactionValidation(thisTransaction);
  }

  private conversionTest(thisObject: Object): boolean {
    try {
      thisObject.toString();
    } catch (e) {
      return false;
    }
    return true;
  }

  /**
   * Send an Overledger signed transaction
   *
   * @param {SignedTransactionRequest} signedTransaction
   */
  public send(signedTransaction: SignedTransactionRequest): AxiosPromise<Object> {
    return this.sdk.send([this.buildSignedTransactionsApiCall(signedTransaction)]);
  }

  /**
   * Allows a smart contract to be queried.
   * @param {string} dltAddress - the user's dlt address
   * @param {smartContract} contractQueryDetails - The details on the smart contract query
   *
   */
  public buildSmartContractQuery(dltAddress: string, contractQueryDetails: SmartContract): Object {
    const smartContractQueryValidation = this.smartContractQueryValidation(contractQueryDetails);
    if (!smartContractQueryValidation.success) {
      throw new Error(`Error parameter: ${smartContractQueryValidation.failingField}. Error is: ${smartContractQueryValidation.error}`);
    }
    return this._buildSmartContractQuery(dltAddress, contractQueryDetails);
  }

  /**
   * Takes the given smartContractQuery and validates it
   * @param thisTransaction - the transaction to check the formatting of
   *
   * @return {ValidationCheck} - returns an object {success: boolean, failingField: string, error: string}.
   *  If 'success' = true, the validation passes, otherwise, the 'failingField' parameter will contain
   *  the first failing transaction field and error will contain information on this problem
   */
  public smartContractQueryValidation(contractQueryDetails: SmartContract): ValidationCheck {

    // must be calling a function
    if ((!contractQueryDetails.functionCall) || (contractQueryDetails.functionCall.length === 0)) {
      return {
        success: false,
        failingField: 'smartContract.functionCall',
        error: 'To query a smart contract, you need to provide the smartContract.functionCall field',
      };
    }
    // now go to ledger specific validation
    return this._smartContractQueryValidation(contractQueryDetails);

  }

  /**
   * Internal method to sign a transaction for the DLT
   * @param {TransactionRequest} thisTransaction
   */
  abstract _sign(thisTransaction: TransactionRequest): Promise<string>;

  /**
 * Internal method to validate a transaction for the DLT
 * @param {TransactionRequest} thisTransaction
 */
  abstract _transactionValidation(thisTransaction: TransactionRequest): ValidationCheck;

  /**
  * Internal method to validate a smart contract query for the DLT
  * @param {SmartContract} contractQueryDetails the query
  */
  abstract _smartContractQueryValidation(contractQueryDetails: SmartContract): ValidationCheck;

  /**
   * Allows a smart contract to be queried on the specific distributed ledger.
   * @param {string} dltAddress - the user's dlt address
   * @param {smartContract} contractQueryDetails - The details on the smart contract query
   */
  abstract _buildSmartContractQuery(dltAddress: string, contractQueryDetails: SmartContract): Object;

  /**
   * Wrap a specific DLT signed transaction with the Overledger required fields
   *
   * @param {SignedTransactionRequest} signedTransaction
   *
   * @return {SignedTransactionRequest}
   */
  public buildSignedTransactionsApiCall(stx: SignedTransactionRequest): SignedTransactionRequest {
    return {
      dlt: stx.dlt,
      fromAddress: stx.fromAddress,
      // amount: stx.amount,
      signedTransaction: stx.signedTransaction,
    };
  }
}

export default AbstractDLT;
