import axios, { AxiosInstance } from 'axios';
import { NetworkOptions, ProviderOptions } from '@quantnetwork/overledger-types';

export const TESTNET: NetworkOptions = 'testnet';
export const MAINNET: NetworkOptions = 'mainnet';

/**
 * @memberof module:overledger-provider
*/
class Provider {
  mappId: string;
  bpiKey: string;
  options: ProviderOptions;
  network: NetworkOptions;

  /**
   * @param {string} mappId The Multi-chain Application ID
   * @param {string} bpiKey The Overledger Blockchain Programming Interface license key
   * @param {ProviderOptions} ProviderOptions Overledger network provider options
   */
  constructor(mappId: string, bpiKey: string, options: ProviderOptions = {}) {
    this.mappId = mappId;
    this.bpiKey = bpiKey;
    this.options = options;
    this.network = this.options.network || TESTNET;
  }

  /**
   * 
   * @param {string} path Request endpoint resource path
   */
  createRequest(path?: string): AxiosInstance {
    let overledgerUri: string;

    if (this.network === TESTNET) {
      overledgerUri = 'https://bpi.testnet.overledger.io/v1';
    } else if (this.network === MAINNET) {
      overledgerUri = 'https://bpi.overledger.io/v1';
    } else {
      overledgerUri = this.network;
    }

    const baseUrl: string = path ? overledgerUri + path : overledgerUri;

    return axios.create({
      baseURL: baseUrl,
      timeout: this.options.timeout || 5000,
      headers: {
        Authorization: `Bearer ${this.mappId}:${this.bpiKey}`,
        'Content-type': 'application/json',
      },
    });
  }
}

export default Provider;
