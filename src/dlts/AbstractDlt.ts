import OverledgerSDK from '../';

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
      throw new Error('The account must be setup');
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
  public send(signedTransaction: string|string[]): Promise<any> {
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
  async signAndSend(toAddress: string, message: string, options: TransactionOptions): Promise<any> {
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
