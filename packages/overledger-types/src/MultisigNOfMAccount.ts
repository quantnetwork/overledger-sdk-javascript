import Account from './Account';

/**
 * An Overledger Account instance for a single DLT.
 * @typedef {Object} MultisigNOfMAccount
 * @property {[Account]} accounts - The list of accounts participating in the multisig account.
 * @property {number} numberCoSigners - The number of signers needed to sign a multisig transaction.
 * @property {string} multisigAddress - The address of the multisig account.
 * @property {boolean} isSegwit - Define if the multisig account is a segwit p2wsh account in the Bitcoin DLT
 * @property {boolean} isNestedSegwit -  Define if the account is a  nested segwit account p2sh-p2wsh in the Bitcoin DLT
 * @property {string} script - locking script or scriptPubKey.
 * @property {string} redeemScript - script of the smart contract to unlock the BTC in case of a legacy account p2sh
 * @property {string} witnessScript - script of the smart contract to unlock the BTC in case of a segwit account p2wsh
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
    witnessScript?: string,
};

export default MultisigNOfMAccount;
