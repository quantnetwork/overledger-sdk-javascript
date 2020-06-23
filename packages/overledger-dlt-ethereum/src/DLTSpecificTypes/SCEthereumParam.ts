import TypeOptions from './associatedEnums/TypeOptions';
import BytesBOptions from './associatedEnums/BytesBOptions';
import UintIntBOptions from './associatedEnums/UintIntBOptions';
import { SCFunctionParam } from '@quantnetwork/overledger-types';

/**
 * A description of an Ethereum smart contract function parameter.
 * @typedef {Object} SCEthereumParam
 * @property {object} type - information on the selectedType from the valid options.
 * If an integer or byte type was chosen then further information is required on the exact number of bytes being used.
 * If an integer is used, then selectedIntegerLength is required. If a byte is used then selectedBytesLength is required
 * @property {object} value - information on the parameter's value
 * @property {string} name - the parameter's name
 */

/**
* @memberof module:overledger-dlt-ethereum
*/
interface SCEthereumParam extends SCFunctionParam {
  type: { selectedType: TypeOptions, selectedIntegerLength?: UintIntBOptions, selectedBytesLength?: BytesBOptions, selectedArrayLength?: number };
  value: Object;
  name?: string;
}

export default SCEthereumParam;
