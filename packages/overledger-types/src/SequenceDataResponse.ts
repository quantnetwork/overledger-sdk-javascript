/**
 * Overledger sequence data response.
 * @typedef {Object[]} SequenceDataResponse
 * @property {string} dlt - The distributed ledger technology.
 * @property {string} address - The address the request was made for.
 * @property {number} sequence - The sequence number for the respective address.
 */

/**
 * @memberof module:overledger-types
 */
type SequenceDataResponse = [{
  dlt: string,
  address: string,
  sequence: number,
}];

export default SequenceDataResponse;
