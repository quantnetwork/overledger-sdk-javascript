/**
 * The list of transaction sub-type options for Bitcoin.
 * /

/**
 * @memberof module:overledger-dlt-bitcoin
 */

export enum TransactionBitcoinFunctionOptions {
  REDEEM_P2SH = 'REDEEM-P2SH',
  REDEEM_P2MS = 'REDEEM-P2MS',
  REDEEM_HTLC = 'REDEEM-HTLC',
  CANCEL_HTLC = 'REFUND-HTLC'
}

export default TransactionBitcoinFunctionOptions;
