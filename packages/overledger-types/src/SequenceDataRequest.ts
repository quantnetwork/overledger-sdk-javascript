/**
 * Overledger sequence request
 * @typedef {Object} SequenceDataRequest
 * @property {string} dlt - The distributed ledger technology.
 * @property {string} address- The address to search for.
 */

/**
 * @memberof module:overledger-types
 */
type SequenceDataRequest = {
  dlt: string,
  address: string,
};

export default SequenceDataRequest;
