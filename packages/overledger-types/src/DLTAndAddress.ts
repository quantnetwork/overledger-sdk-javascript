/**
 * DLT and Address pair.
 * @typedef {Object} DLTAndAddress
 * @property {string} dlt - The distributed ledger technology.
 * @property {string} address - The address on the respective dlt network.
 */

/**
 * @memberof module:overledger-types
 */
type DLTAndAddress = {
  dlt: string,
  address: string,
};

export default DLTAndAddress;
