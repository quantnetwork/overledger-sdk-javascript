/**
 * An Overledger Account instance for a single DLT.
 * @typedef {Object} Account
 * @property {string} privateKey - The private key of the account, used for signing transactions.
 * @property {string} address - The address of the account, used for receiving messages
 * @property {string} publicKey - The public key of the account. The address parameter will be a representation of this public key.
 * @property {boolean} isSegwit - Define if the account is a segwit p2wpkh account in the Bitcoin DLT
 * @property {boolean} isNestedSegwit -  Define if the account is a  nested segwit account p2sh-p2wpkh in the Bitcoin DLT
 * @property {string} script - locking script or scriptPubKey, needed for a nested segwit account
 * @property {string} redeemScript - script to unlock the BTC, needed for a nested segwit account
 * @property {string} password - For some accounts, they may be protected by a password, or a password is used instead of a private key
 * @property {string} provider - If the account is stored or managed not by the user, then this person is the provider

 */

/**
 * @memberof module:overledger-types
 */
type Account = {
  privateKey: string,
  address: string,
  publicKey?: string,
  isSegwit?: boolean,
  isNestedSegwit?: boolean,
  script?: string,
  redeemScript?: string,
  provider?: string,
  password?: string
};

export default Account;