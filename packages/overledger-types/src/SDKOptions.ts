/**
 * Overledger SDK options.
 * @typedef {Object} SDKOptions
 * @property {DLTOptions[]} dlts - The dlts to be loaded.
 * @property {ProviderOptions=} provider - The network provider options.
 */

import DLTOptions from './DLTOptions';
import ProviderOptions from './ProviderOptions';

/**
 * @memberof module:overledger-types
 */
type SDKOptions = {
  dlts: DLTOptions[],
  provider?: ProviderOptions,
};

export default SDKOptions;
