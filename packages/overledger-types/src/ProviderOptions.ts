/**
 * Overledger network provider options.
 * @typedef {Object} ProviderOptions
 * @property {NetworkOptions=} network - The network, either testnet, mainnet or custom.
 * @property {number=} timeout - Request timeout period specified in milliseconds.
 */

import NetworkOptions from './NetworkOptions';

/**
 * @memberof module:overledger-types
 */
type ProviderOptions = {
  network?: NetworkOptions,
  timeout?: number,
};

export default ProviderOptions;
