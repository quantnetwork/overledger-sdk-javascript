import SCFunctionDefinition from './SmartContractFunctionDefinition';

/**
 * A generic object to describe a smart contract.
 * @typedef {Object} SmartContract
 * @property {string} code - the code of this smart contract
 * @property {string} id - the identifier of this smart contract
 * @property {SCFunctionDefinition[]} interface - the interface of this smart contract, defined one function at a time
 * @property {SCFunctionDefinition[]} functionCall - information on what function of the smart contract to call, and with what parameters. Defined one function at a time
 * @property {Object} additionalFields - are there any distributed ledger specific fields required to describe this smart contract? Before adding a field here,
 * inspect the objects that extend this one to see if there is a parameter that is suitable embedded within them. Check the documentation for more information on this
 */

/**
 * @memberof module:overledger-types
 */
type SmartContract = {
  code: string,
  id?: string,
  interface?: SCFunctionDefinition[],
  functionCall?: SCFunctionDefinition[],
  extraFields?: any,
};

export default SmartContract;
