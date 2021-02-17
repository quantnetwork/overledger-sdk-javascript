/**
 * @module overledger-dlt-bitcoin
 */

import Bitcoin from './Bitcoin';
import TransactionBitcoinSubTypeOptions from './DLTSpecificTypes/associatedEnums/TransactionBitcoinSubTypeOptions';
import TransactionBitcoinRequest from './DLTSpecificTypes/TransactionBitcoinRequest';
import TransactionBitcoinResponse from './DLTSpecificTypes/TransactionBitcoinResponse';
import TransactionBitcoinScriptTypeOptions from './DLTSpecificTypes/associatedEnums/TransactionBitcoinScriptTypeOptions';
import TransactionBitcoinFunctionOptions from './DLTSpecificTypes/associatedEnums/TransactionBitcoinFunctionOptions';
import { generateHashTimeLockContractCode, generateHashTimeLockContractCode2, createHashTimeLockContractPaymentChannel } from './BitcoinSmartContractHelper';

/**
 * Objects and interfaces used when interacting with the Bitcoin blockchain package
 */
export {
    TransactionBitcoinSubTypeOptions,
    TransactionBitcoinRequest,
    TransactionBitcoinResponse,
    TransactionBitcoinScriptTypeOptions,
    TransactionBitcoinFunctionOptions,
    generateHashTimeLockContractCode,
    generateHashTimeLockContractCode2,
    createHashTimeLockContractPaymentChannel
};
/**
 * Development package for Bitcoin blockchain.
 */
export default Bitcoin;
