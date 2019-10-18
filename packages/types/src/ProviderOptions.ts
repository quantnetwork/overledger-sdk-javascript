import NetworkOptions from './NetworkOptions';

/**
 * Overledger network provider options
 * @typedef {Object} ProviderOptions
 * @property {NetworkOptions=} network - The network, either testnet, mainnet or custom.
 * @property {number=} timeout - Request timeout period specified in milliseconds.
 */

/**
 * @memberof module:types
 */
type ProviderOptions = {
  network?: NetworkOptions,
  timeout?: number,
};

export default ProviderOptions;
