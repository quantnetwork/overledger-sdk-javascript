
import SmartContract from './SmartContract';

/**
 * An generic object used to describe an input to a utxo transaction
 * @typedef {Object} TransactionInput
 * @property {string} linkedTx - the previous transaction that contains the output you want to use
 * @property {string} linkedIndex - the index (in the linked previous transaction) of the output you want to use
 * @property {string} fromAddress - who is spending the referenced output as an input in this transaction
 * @property {number} amount - the amount that is contained in the referenced output in the lowest unit for the respective DLT. Set to 0 if not appropriate (i.e. no value is being exchanged)
 * @property {string} asset - the particular asset being moved by this transaction. Do not use if the native asset is being moved (e.g. BTC for Bitcoin)
 * @property {SmartContract} smartContract - is there a particular enforcement on the spending of this input? Do not use if only the sender's signature is required
 */

/**
 * @memberof module:overledger-types
 */
type TransactionInput = {
  linkedTx: string,
  linkedIndex: string,
  fromAddress: string,
  amount?: number,
  asset?: object,
  nLocktime?: number, // transaction level (not utxo one)
  sequence?: number,
  smartContract?: SmartContract,
  rawTransaction?: Buffer | string,
  scriptPubKey?: Buffer | string,
  redeemScript?: Buffer | string,
  witnessScript?: Buffer | string,
  preimage? : Buffer | string
  transferType?: string,
  coSigners?: [string]
};

export default TransactionInput;
