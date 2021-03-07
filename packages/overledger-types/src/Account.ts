/**
 * An Overledger Account instance for a single DLT.
 * @typedef {Object} Account
 * @property {string} privateKey - The private key of the account, used for signing transactions.
 * @property {string} address - The address of the account, used for receiving messages
 * @property {string} publicKey - The public key of the account. The address parameter will be a representation of this public key.
 * @property {string} password - For some accounts, they may be protected by a password, or a password is used instead of a private key
 * @property {string} provider - If the account is stored or managed not by the user, then this person is the provider

 */

/**
 * @memberof module:overledger-types
 */
type Account = {
  keys: AccountBase,
  address: string,
  isSegwit?: boolean,
  password?: string,
  provider?: string,
};

export default Account;


type MultiSigAccount = {
  keys: [AccountBase],
  address: string,
  numberCoSigners: number,
  script?: string,
  redeemScript?: string,
  witnessScript?: string
};

type AccountBase = {
  privateKeyWIF: string,
  privateKey?: Buffer | string
  publicKey?: Buffer | string
}