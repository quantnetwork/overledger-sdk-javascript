// TODO: make signatures optional once it's updated in the BPI

/**
 * Overledger signed transaction data
 * @typedef {Object} OverledgerSignedTransaction
 * @property {string[]} transactions - The signed transaction blobs.
 * @property {string[]} signatures - The signasture blobs.
 */

/**
 * @memberof module:types
 */
type OverledgerSignedTransaction = {
  transactions: string[],
  signatures: string[],
};

export default OverledgerSignedTransaction;
