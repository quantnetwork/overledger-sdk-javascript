/**
 * Overledger signed transaction request object.
 * @typedef {Object} SignedTransactionRequest
 * @property {string} dlt - The distributed ledger technology.
 * @property {string} fromAddress - The address initiating the transaction.
 * @property {string} amount - The token amount in the lowest unit for the respective DLT.
 * @property {OverledgerSignedTransaction} signedTransaction - The signed transaction object.
 */

import OverledgerSignedTransaction from './OverledgerSignedTransaction';

/**
 * @memberof module:overledger-types
 */
type SignedTransactionRequest = {
  dlt: string,
  fromAddress: string,
  amount: string,
  signedTransaction: OverledgerSignedTransaction,
};

export default SignedTransactionRequest;
