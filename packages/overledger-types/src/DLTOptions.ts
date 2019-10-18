/**
 * Options for loading a DLT in the SDK
 * @typedef {Object} DLTOptions
 * @property {string} dlt - The distributed ledger technology.
 * @property {string=} privateKey - The private key of an account for the respecitve dlt.
 */

/**
 * @memberof module:overledger-types
 */
type DLTOptions = {
  dlt: string,
  privateKey?: string,
};

export default DLTOptions;
