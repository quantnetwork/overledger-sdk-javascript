import SequenceDataRequest from './SequenceDataRequest';
import SignedTransactionRequest from './SignedTransactionRequest';

/**
 * A wrapper object for the dlt data to be sent to Overledger.
 * @typedef {Object} APICallWrapper
 * @property {string} mappId - The unique multi-chain application ID received from the Overledger Developer Portal.
 * @property {(SignedTransactionRequest[]|SequenceDataRequest[])} dltData - The dlt data to be sent to Overledger
 */

/**
 * @memberof module:types
 */
export type APICallWrapper = {
  mappId: string,
  dltData: SignedTransactionRequest[] | SequenceDataRequest[],
};

export default APICallWrapper;
