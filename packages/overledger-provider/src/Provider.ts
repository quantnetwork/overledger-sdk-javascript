import axios, { AxiosInstance } from 'axios';
import { NetworkOptions, ProviderOptions } from '@quantnetwork/overledger-types';
import log4js from 'log4js';

export const TESTNET: NetworkOptions = 'testnet';
export const MAINNET: NetworkOptions = 'mainnet';

/**
 * @memberof module:overledger-provider
*/
const log = log4js.getLogger('Provider');
class Provider {
  mappId: string;
  bpiKey: string;
  options: ProviderOptions;
  network: NetworkOptions;

  constructor();
  /**
   * @param {ProviderOptions} ProviderOptions Overledger network provider options
   */
  constructor(options: ProviderOptions);
  /**
   * @param {string} mappId The Multi-chain Application ID
   * @param {string} bpiKey The Overledger Blockchain Programming Interface license key
   * @param {ProviderOptions} ProviderOptions Overledger network provider options
   */
  constructor(mappId: string, bpiKey: string, options: ProviderOptions);


  /**
  * Create the Provider
  * */
  constructor(...args: any[]) {
    if (args.length === 1) {
      log.info("Creating provider V2...");
      this.options = args[0];
      this.network = this.options.network || TESTNET;
    } else if (args.length === 3) {
      log.info("Creating provider V1...");
      this.mappId = args[0];
      this.bpiKey = args[1];
      this.options = args[2];
      this.network = this.options.network || TESTNET;
    } else {
      log.error("Error in creating provider.");
    }
  }

  /**
   *
   * @param {string} path Request v1 endpoint resource path
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

  /**
   *
   * @param {string} accessToken Request v2 endpoint resource path
   */
  createOAuthRequest(accessToken: string): AxiosInstance {
    let overledgerUri: string;

    if (this.network === TESTNET) {
      overledgerUri = 'https://bpi.testnet.overledger.io/v2';
    } else if (this.network === MAINNET) {
      overledgerUri = 'https://bpi.overledger.io/v2';
    } else {
      overledgerUri = this.network;
    }

    const baseUrl: string = overledgerUri;

    return axios.create({
      baseURL: baseUrl,
      timeout: this.options.timeout || 5000,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
    });
  }
}

export default Provider;
