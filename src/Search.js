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

    this.request = axios.create({
      baseURL: `${this.sdk.overledgerUri}/search`,
      timeout: 1000,
      headers: { Authorization: `Bearer ${this.sdk.mappId}:${this.sdk.bpiKey}` }
    });


  }

  /**
   * Get transaction by a transaction hash (non-deterministic)
   *
   * @param {string} transactionHash Transaction hash
   */
  async getTransaction(transactionHash) {
    try {
      const response = await this.request.get(`/transactions/${transactionHash}`);
      return response;
    } catch (e) {
      console.log(e);
      return e.response;
    }
  }

  /**
   * Get whoami
   *
   * @param {string} hash hash
   */
  async whoami(hash) {
    try {
      const response = await this.request.get(`/whoami/${hash}`);
      return response;
    } catch (e) {
      return e.response;
    }
  }

  /**
   * Get block by number
   *
   * @param {number} number block number
   */
  async getBlockByDltAndNumber(dlt, number) {
    try {
      const response = await this.request.get(`/chains/${dlt}/blocks/byNumber/${number}`);
      return response;
    } catch (e) {
      return e.response;
    }
  }

  /**
   * Get block by hash
   *
   * @param {string} hash block hash
   */
  async getBlockByDltAndHash(dlt, hash) {
    try {
      const response = await this.request.get(`/chains/${dlt}/blocks/byHash/${hash}`);
      return response;
    } catch (e) {
      return e.response;
    }
  }
}

module.exports = Search;
