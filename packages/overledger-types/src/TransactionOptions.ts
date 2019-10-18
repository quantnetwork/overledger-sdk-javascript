/**
 * DLT transaction options.
 * @typedef {Object} TransactionOptions
 * @property {number=} sequence - This transaction's sequence in relation to the initiating account.
 * @property {string} amount - The amount of tokens in the lowest unit available on the DLT.
 */

/**
 * @memberof module:overledger-types
 */
type TransactionOptions = {
  sequence?: number,
  amount: string,
};

export default TransactionOptions;
