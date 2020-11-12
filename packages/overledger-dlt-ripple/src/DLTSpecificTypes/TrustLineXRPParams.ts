/**
* A generic object used to describe an Overledger transaction request for the XRP Ledger. Note that this object inherits many parameters from TransactionAccountsRequest.
 * @typedef {Object} TrustlineXRPRequest
 * @property {Object} subType - a redefinition of the TransactionRequest object, to add more XRP specific information
 * @property {string} feePrice - the fee to pay for this transaction to enter the XRP ledger. It is denoted in drops where the current minimum allowed is 12.
 * @property {string} maxLedgerVersion - The maximum ledger version the transaction can be included in
 */

/**
 * @memberof module:overledger-dlt-xrp
 */
interface TrustLineXRPOptions {
  maxCredit: string;
  authorized?: boolean;
  frozen?: boolean;
  ripplingDisabled?: boolean;
}

export default TrustLineXRPOptions;
