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
  NP2WPKH = 'P2SH-P2WPKH',
  P2SH = 'P2SH',
  P2WSH = 'P2WSH',
  // Nested segwit
  P2SHP2WSH = 'P2SH-P2WSH',
  // P2SHP2MS = 'P2SH-P2MS',
  // P2WSHP2MS = 'P2WSH-P2MS',
  // P2SHP2WSHP2MS = 'P2SH-P2WSH-P2MS'
}

export default TransactionBitcoinScriptTypeOptions;
