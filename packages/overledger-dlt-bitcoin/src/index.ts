/**
 * @module overledger-dlt-bitcoin
 */

import Bitcoin from './Bitcoin';
import TransactionBitcoinSubTypeOptions from './DLTSpecificTypes/associatedEnums/TransactionBitcoinSubTypeOptions';
import TransactionBitcoinRequest from './DLTSpecificTypes/TransactionBitcoinRequest';
import TransactionBitcoinResponse from './DLTSpecificTypes/TransactionBitcoinResponse';
import TransactionBitcoinScriptTypeOptions from './DLTSpecificTypes/associatedEnums/TransactionBitcoinScriptTypeOptions';
import TransactionBitcoinTransferTypeOptions from './DLTSpecificTypes/associatedEnums/TransactionBitcoinTransferTypeOptions';
import { generateHashTimeLockContractCode, createHashTimeLockContractPaymentChannel } from './BitcoinSmartContractHelper';

/**
 * Objects and interfaces used when interacting with the Bitcoin blockchain package
 */
export {
    TransactionBitcoinSubTypeOptions,
    TransactionBitcoinRequest,
    TransactionBitcoinResponse,
    TransactionBitcoinScriptTypeOptions,
    TransactionBitcoinTransferTypeOptions,
    generateHashTimeLockContractCode,
    createHashTimeLockContractPaymentChannel
};
/**
 * Development package for Bitcoin blockchain.
 */
export default Bitcoin;
