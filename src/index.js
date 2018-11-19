import axios from 'axios';
import Search from './Search';
import ucFirst from './utils/ucFirst';

class OverledgerSDK {
  TESTNET = 'testnet';

  MAINNET = 'mainnet';

  /**
   * The object storing the DLTs loaded by the Overledger sdk
   */
  dlts = {};

  /**
   * @param {string} mappId
   * @param {string} bpiKey
   * @param {Object} options
   */
  constructor(mappId, bpiKey, options = {}) {
    this.mappId = mappId;
    this.bpiKey = bpiKey;

    this.validateOptions(options);
    this.configure(options);
  }

  /**
   * Validate the provided options
   *
   * @param {Object} options
   */
  validateOptions(options) {
    if (!options.dlts) {
      throw new Error('The dlts are missing');
    }
  }

  /**
   * Configure the provided options
   *
   * @param {Object} options
   */
  configure(options) {
    options.dlts.forEach((dltConfig) => {
      const dlt = this.loadDlt(dltConfig);
      this.dlts[dlt.name] = dlt;
    });

    this.network = options.network || this.TESTNET;

    if (this.network === this.MAINNET) {
      this.overledgerUri = 'https://bpi.overledger.io/v1';
    } else {
      this.overledgerUri = 'https://bpi.testnet.overledger.io/v1';
    }

    this.search = new Search(this, options);
  }

  /**
   * Sign transactions for the provided DLTs
   *
   * @param {Object} dlts Object of the DLTs where you want to send a transaction
   */
  async sign(dlts) {
    if (!Array.isArray(dlts)) {
      throw new Error('The dlts object must be an array');
    }

    const responseDlts = await Promise.all(dlts.map(async (dlt) => {
      return {
        dlt: dlt.dlt,
        signedTransaction: await this.dlts[dlt.dlt].sign(dlt.fromAddress, dlt.toAddress, dlt.message, dlt.options),
      };
    }));

    return responseDlts;
  }

  /**
   * Wrap the DLTData with the api schema
   *
   * @param {array} dltData
   */
  buildWrapperApiCall(dltData) {
    return {
      mappId: this.mappId,
      dltData,
    };
  }

  /**
   * Send signed transactions to the provided DLTs
   *
   * @param {Object} signedTransactions Object of the DLTs where you want to send a transaction
   */
  send(signedTransactions) {
    const apiCall = signedTransactions.map(
      dlt => this.dlts[dlt.dlt].buildApiCall(dlt.signedTransaction),
    );

    return axios.post(`${this.overledgerUri}/transactions`, this.buildWrapperApiCall(apiCall));
  }

  /**
   * Load the dlt to the Overledger SDK
   *
   * @param {object} config
   *
   * @return {Provider}
   */
  loadDlt(config) {
    const Provider = require(`./dlts/${ucFirst(config.dlt)}`).default;

    return new Provider(this, config);
  }

  /**
   * Read by mapp id
   */
  async readTransactionsByMappId() {
    try {
      const response = await axios.get(`${this.overledgerUri}/mapp/${this.mappId}/transactions`);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }

  /**
   * read by overledger transaction id
   *
   * @param {string} ovlTransactionId
   */
  async readByTransactionId(ovlTransactionId) {
    try {
      const response = await axios.get(`${this.overledgerUri}/transactions/${ovlTransactionId}`);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }

  /**
   * Set the mapp id
   *
   * @param {string} mappId
   */
  setMappId(mappId) {
    this.mappId = mappId;
  }

  /**
   * get the mapp id
   */
  getMappId() {
    return this.mappId;
  }

  /**
   * set the bpi key
   *
   * @param {string} bpiKey
   */
  setBpiKey(bpiKey) {
    this.bpiKey = bpiKey;
  }

  /**
   * get the bpi key
   */
  getBpiKey() {
    return this.bpiKey;
  }
}

module.exports = OverledgerSDK;
