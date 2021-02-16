/**
 * The list of transaction sub-type options for Bitcoin.
 * /

/**
 * @memberof module:overledger-dlt-bitcoin
 */

export enum TransactionBitcoinTransferTypeOptions {
  REDEEM_P2MS = 'REDEEM-P2MS',
  REDEEM_HTLC = 'REDEEM-HTLC',
  CANCEL_HTLC = 'REFUND-HTLC'
}

export default TransactionBitcoinTransferTypeOptions;
