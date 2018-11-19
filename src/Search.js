import axios from 'axios';

class Search {
  TESTNET = 'testnet';

  MAINNET = 'mainnet';

  /**
   * The object storing the DLTs loaded by the Overledger sdk
   */
  dlts = {};

  /**
   * @param {Object} sdk
   * @param {Object} options
   */
  constructor(sdk, options = {}) {
    this.sdk = sdk;
  }

  /**
   * Get transaction by a transaction hash (non-deterministic)
   *
   * @param {string} transactionHash Transaction hash
   */
  async getTransaction(transactionHash) {
    try {
      const response = await axios.get(`${this.overledgerUri}/transactions/${transactionHash}`);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }

  get overledgerUri() {
    return `${this.sdk.overledgerUri}/search`;
  }
}

module.exports = Search;
