/**
 * An Overledger Account instance for a single DLT.
 * @typedef {Object} Account
 * @property {string} privateKey - The private key of the account, used for signing transactions.
 * @property {string} address - The address or public key of the account, used for receiving messages.
 */

/**
 * @memberof module:types
 */
type Account = {
  privateKey: string,
  address: string,
};

export default Account;
