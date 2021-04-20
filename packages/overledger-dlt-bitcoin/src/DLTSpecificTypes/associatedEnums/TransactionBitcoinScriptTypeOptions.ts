/**
 * The list of transaction sub-type options for Bitcoin.
 * /

/**
 * @memberof module:overledger-dlt-bitcoin
 */

export enum TransactionBitcoinScriptTypeOptions {
  P2PK = 'P2PK',
  P2PKH = 'P2PKH',
  P2WPKH = 'P2WPKH',
  P2SH_P2WPKH = 'P2SH-P2WPKH',
  P2SH = 'P2SH',
  P2WSH = 'P2WSH',
  // Nested segwit
  P2SH_P2WSH = 'P2SH-P2WSH'
}

export default TransactionBitcoinScriptTypeOptions;
