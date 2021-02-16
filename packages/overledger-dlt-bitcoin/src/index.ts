/**
 * @module overledger-dlt-bitcoin
 */

import Bitcoin from './Bitcoin';
import TransactionBitcoinSubTypeOptions from './DLTSpecificTypes/associatedEnums/TransactionBitcoinSubTypeOptions';
import TransactionBitcoinRequest from './DLTSpecificTypes/TransactionBitcoinRequest';
import TransactionBitcoinResponse from './DLTSpecificTypes/TransactionBitcoinResponse';
import TransactionBitcoinScriptTypeOptions from './DLTSpecificTypes/associatedEnums/TransactionBitcoinScriptTypeOptions';
import TransactionBitcoinFunctionTypeOptions from './DLTSpecificTypes/associatedEnums/TransactionBitcoinFunctionTypeOptions';
import { generateHashTimeLockContractCode, generateHashTimeLockContractCode2, createHashTimeLockContractPaymentChannel } from './BitcoinSmartContractHelper';

/**
 * Objects and interfaces used when interacting with the Bitcoin blockchain package
 */
export {
    TransactionBitcoinSubTypeOptions,
    TransactionBitcoinRequest,
    TransactionBitcoinResponse,
    TransactionBitcoinScriptTypeOptions,
    TransactionBitcoinFunctionTypeOptions,
    generateHashTimeLockContractCode,
    generateHashTimeLockContractCode2,
    createHashTimeLockContractPaymentChannel
};
/**
 * Development package for Bitcoin blockchain.
 */
export default Bitcoin;
