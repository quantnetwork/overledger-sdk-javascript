import OverledgerSDK from '../';
import { AxiosPromise, AxiosResponse } from 'axios';

abstract class AbstractDLT {
  name: string;
  sdk: OverledgerSDK;
  options: {};

  account?: Account;

  /**
   * @param {OverledgerSDK} sdk
   * @param {Object} options
   */
  constructor(sdk: OverledgerSDK, options: Object = {}) {
    this.sdk = sdk;
    this.options = options;
  }

  /**
   * Sign a transaction for the DLT
   *
   * @param {string} toAddress
   * @param {string} message
   * @param {TransactionOptions} options
   */
  public sign(toAddress: string, message: string, options: TransactionOptions = {}): Promise<string> {
    if (!this.account) {
      throw new Error(`The ${this.name} account must be setup`);
    }

    return this._sign(toAddress, message, options);
  }

  /**
   * Internal method to sign a transaction for the DLT
   *
   * @param {string} toAddress
   * @param {string} message
   * @param {Object} options
   */
  abstract _sign(toAddress: string, message: string, options?: TransactionOptions): Promise<string>;

  /**
   * Send a signed transactions array to overledger
   *
   * @param {string|string[]} signedTransaction
   */
  public send(signedTransaction: string | string[]): AxiosPromise<Object> {
    let signedTransactions = [];
    if (!Array.isArray(signedTransaction)) {
      signedTransactions = [signedTransaction];
    } else {
      signedTransactions = signedTransaction;
    }

    return this.sdk.send(signedTransactions.map(dlt => this.buildApiCall(dlt)));
  }

  /**
   * Sign and send a DLT transaction to overledger
   *
   * @param {string} fromAddress
   * @param {string} toAddress
   * @param {string} message
   * @param {TransactionOptions} options
   *
   * @return {Promise<axios>}
   */
  async signAndSend(toAddress: string, message: string, options: TransactionOptions): Promise<AxiosResponse> {
    const signedTx = await this.sign(toAddress, message, options);

    return this.send(signedTx);
  }

  /**
   * Wrap a specific DLT signed transaction with the overledger
   *
   * @param {string} signedTransaction
   *
   * @return {ApiCall}
   */
  protected buildApiCall(signedTransaction: string): ApiCall {
    return {
      signedTransaction,
      dlt: this.name,
    };
  }

  /**
   * Create an account for a specific DLT
   *
   * @typedef {Object} Account
   * @property {string} privateKey The privateKey
   * @property {string} address The address
   *
   * @return {Account}
   */
  abstract createAccount(): Account;

  /**
   * Set an account for a specific DLT
   *
   * @param {string} privateKey The privateKey
   */
  abstract setAccount(privateKey: string): void;

  /**
   * Fund an account
   *
   * @param {number} amount The amount to fund
   * @param {string} address the address to fund
   */
  fundAccount(amount: number, address: string = null): Promise<AxiosResponse> {
    if (address === null) {
      if (!this.account) {
        throw new Error('The account must be setup');
      }

      address = this.account.address;
    }

    return this.sdk.request.post(`/faucet/fund/${this.name}/${address}/${amount}`);
  }

  /**
   * Get the balance for a specific address
   *
   * @param {string} address The address to look at
   */
  getBalance(address: string = null): Promise<AxiosResponse> {
    if (address === null) {
      if (!this.account) {
        throw new Error('The account must be setup');
      }

      address = this.account.address;
    }

    console.log({
      address,
      dlt: this.name,
    });

    return this.sdk.request.post('/balances', {
      address,
      dlt: this.name,
    });
  }
}

export type Account = {
  privateKey: string,
  address: string,
};

export type Options = {
  privateKey?: string,
};

export type TransactionOptions = {
  sequence?: number,
  amount?: string,
};

export type ApiCall = {
  dlt: string,
  signedTransaction: string,
};

export default AbstractDLT;
