
import SmartContract from './SmartContract';

/**
 * An generic object used to describe an output to a utxo transaction
 * @typedef {Object} TransactionOutput
 * @property {string} toAddress - who is receiving this spendable output
 * @property {string} asset - the particular asset being moved by this transaction. Do not use if the native asset is being moved (e.g. BTC for Bitcoin)
 * @property {number} amount - the amount that is to be sent in this output in the lowest unit for the respective DLT
 * @property {SmartContract} smartContract - is there a particular enforcement on the spending of this output? Do not use if only the sender's signature is required
 */

/**
 * @memberof module:overledger-types
 */
type TransactionOutput = {
  toAddress: string,
  asset?: string,
  amount?: number,
  smartContract?: SmartContract,
};

export default TransactionOutput;
