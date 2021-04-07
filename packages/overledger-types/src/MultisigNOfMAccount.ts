import Account from "./Account";

/**
 * An Overledger Account instance for a single DLT.
 * @typedef {Object} MultisigNOfMAccount
 * @property {[Account]} accounts - The set of the private keys participating in the multisig account and optionally the corresponding public keys.
 * @property {string} multisigAddress - The address of the multisig account, used for receiving messages.
 * @property {number} numberCoSigners - The number of signers needed to sign a transaction.
 * @property {string} script - locking script or scriptPubKey.
 * @property {string} redeemScript - p2sh script of the smart contract
 * @property {string} witnessScript - p2wsh script of the smart contract
 */

/**
 * @memberof module:overledger-types
 */
type MultisigNOfMAccount = {
    accounts: Account[],
    numberCoSigners: number,
    multisigAddress?: string,
    isSegwit?: boolean,
    isNestedSegwit?: boolean,
    script?: string,
    redeemScript?: string,
    witnessScript?: string
};

export default MultisigNOfMAccount;