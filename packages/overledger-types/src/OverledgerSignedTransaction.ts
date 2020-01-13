/**
 * Overledger signed transaction data
 * @typedef {Object} OverledgerSignedTransaction
 * @property {string[]} transactions - The signed transaction blobs.
 * @property {string[]} signatures - The signasture blobs.
 */

// TODO: make signatures optional once it's updated in the BPI

/**
 * @memberof module:overledger-types
 */
type OverledgerSignedTransaction = {
  transactions: string[],
  signatures: string[],
};

export default OverledgerSignedTransaction;
