import { TransactionOptions, SignedTransactionRequest, Account } from '@quantnetwork/overledger-types';
import { AxiosPromise, AxiosResponse } from 'axios';

/**
 * @memberof module:overledger-dlt-abstract
*/
abstract class AbstractDLT { 
  name: string;
  sdk: any;
  options: Object;

  account?: Account;

  /**
   * @param {any} sdk
   * @param {Object} options
   */
  constructor(sdk: any, options: Object = {}) {
    this.sdk = sdk;
    this.options = options;
  }

  /**
   * @typedef {Object} Account
   * @property {string} privateKey The privateKey
   * @property {string} address The address
   */

  /**
   * Create an account for a specific DLT
   * @abstract
   * @return {Account}
   */
  abstract createAccount(): Account;

  /**
   * Set an account for signing transactions for a specific DLT
   * @param {string} privateKey The privateKey
   */
  abstract setAccount(privateKey: string): void;

  /**
   * Get the balance for a specific address
   *
   * @param {string} address The address to query for
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
   * Sign a transaction for the DLT
   *
   * @param {string} toAddress
   * @param {string} message
   * @param {TransactionOptions} options
   */
  public sign(toAddress: string, message: string, options: TransactionOptions): Promise<string> {
    if (!this.account) {
      throw new Error(`The ${this.name} account must be set up`);
    }

    return this._sign(toAddress, message, options);
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
   * Internal method to sign a transaction for the DLT
   * @abstract
   * @param {string} toAddress
   * @param {string} message
   * @param {TransactionOptions} options
   */
  abstract _sign(toAddress: string, message: string, options?: TransactionOptions): Promise<string>;

  /**
   * Wrap a specific DLT signed transaction with the Overledger required fields
   *
   * @param {SignedTransactionRequest} signedTransaction
   *
   * @return {ApiCall}
   */
  public buildSignedTransactionsApiCall(stx: SignedTransactionRequest): SignedTransactionRequest {
    return {
      dlt: stx.dlt,
      fromAddress: stx.fromAddress,
      amount: stx.amount,
      signedTransaction: stx.signedTransaction,
    };
  }
}

export default AbstractDLT;
