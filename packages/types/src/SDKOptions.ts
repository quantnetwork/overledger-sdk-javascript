import DLTOptions from './DLTOptions';
import ProviderOptions from './ProviderOptions';

/**
 * Overledger SDK options
 * @typedef {Object} SDKOptions
 * @property {DLTOptions[]} dlts - The dlts to be loaded.
 * @property {ProviderOptions=} provider - The network provider options.
 */

/**
 * @memberof module:types
 */
type SDKOptions = {
  dlts: DLTOptions[],
  provider?: ProviderOptions,
};

export default SDKOptions;
