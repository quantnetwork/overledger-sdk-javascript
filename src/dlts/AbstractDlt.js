class AbstractDLT {
  /**
   * @param {Object} sdk
   * @param {Object} options
   */
  constructor(sdk, options = {}) {
    this.sdk = sdk;
    this.options = options;
  }

  /**
   * Build a DLT transaction to be signed
   *
   * @param {string} fromAddress
   * @param {string} toAddress
   * @param {string} message
   * @param {Object} options
   */
  buildTransaction(fromAddress, toAddress, message, options = {}) {
    throw new Error('Must be implemented');
  }

  /**
   * Sign a transaction for the DLT
   *
   * @param {string} fromAddress
   * @param {string} toAddress
   * @param {string} message
   * @param {Object} options
   */
  sign(fromAddress, toAddress, message, options = {}) {
    if (!this.account) {
      throw new Error('The account must be setup');
    }

    return this._sign(fromAddress, toAddress, message, options);
  }

  /**
   * Internal method to sign a transaction for the DLT
   *
   * @param {string} fromAddress
   * @param {string} toAddress
   * @param {string} message
   * @param {Object} options
   */
  _sign(fromAddress, toAddress, message, options = {}) {
    throw new Error('Must be implemented');
  }

  /**
   * Send a signed transactions array to overledger
   *
   * @param {array|string} signedTransactions
   *
   * return {Object}
   */
  send(signedTransactions) {
    if (!Array.isArray(signedTransactions)) {
      signedTransactions = [signedTransactions];
    }

    return this.sdk.send(signedTransactions.map(dlt => this.buildApiCall(dlt)));
  }

  /**
   * Sign and send a DLT transaction to overledger
   *
   * @param {string} fromAddress
   * @param {string} toAddress
   * @param {string} message
   * @param {Object} options
   *
   * @return {Object}
   */
  async sendAndSign(fromAddress, toAddress, message, options = {}) {
    const signedTx = await this.sign(fromAddress, toAddress, message, options);

    return this.send(signedTx);
  }

  /**
   * Wrap a specific DLT signed transaction with the overledger
   *
   * @param {string} signedTransaction
   *
   * @return {Object}
   */
  buildApiCall(signedTransaction) {
    return {
      dlt: this.name,
      signedTransaction,
      amount: 0,
      callbackUrl: '',
      changeAddress: '',
      fee: 0,
      feeLimit: 0,
      fromAddress: '',
      message: '',
      toAddress: '',
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
  createAccount() {
    throw new Error('Must be implemented');
  }

  /**
   * Set an account for a specific DLT
   *
   * @param {string} privateKey The privateKey
   */
  setAccount(privateKey) {
    throw new Error('Must be implemented');
  }
}

export default AbstractDLT;
