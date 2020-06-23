
import EthereumTypeOptions from './associatedEnums/TypeOptions';

/**
 * This function is used to prepare the parameter definition for the web3 package
 * @param param - the parameter definition
 */
function computeParamType(param: any): string {
  let paramType = param.type.selectedType.toString();
  let paramArrayLength = param.type.selectedArrayLength;
  if (paramType === EthereumTypeOptions.ADDRESS) {
    paramType = 'address';
  } else if (paramType === EthereumTypeOptions.ADDRESS_ARRAY) {
    paramType = paramArrayLength ? `address[${paramArrayLength.toString()}]`:'address[]';
  } else if (paramType === EthereumTypeOptions.BOOLEAN) {
    paramType = 'bool';
  } else if (paramType === EthereumTypeOptions.BOOLEAN_ARRAY) {
    paramType = paramArrayLength ? `bool[${paramArrayLength.toString()}]`:'bool[]';
  } else if (paramType === EthereumTypeOptions.BYTES_B) {
    paramType = `bytes${param.type.selectedBytesLength.toString()}`;
  } else if (paramType === EthereumTypeOptions.BYTES_B_ARRAY) {
    paramType = paramArrayLength ? `bytes${param.type.selectedBytesLength.toString()}[${paramArrayLength.toString()}]` : `bytes${param.type.selectedBytesLength.toString()}[]`;
  } else if (paramType === EthereumTypeOptions.INT_B) {
    paramType = `int${param.type.selectedIntegerLength.toString()}`;
  } else if (paramType === EthereumTypeOptions.INT_B_ARRAY) {
    paramType = paramArrayLength ? `int${param.type.selectedIntegerLength.toString()}[${paramArrayLength.toString()}]` : `int${param.type.selectedIntegerLength.toString()}[]`;
  } else if (paramType === EthereumTypeOptions.STRING) {
    paramType = 'string';
  } else if (paramType === EthereumTypeOptions.UINT_B) {
    paramType = `uint${param.type.selectedIntegerLength.toString()}`;
  } else if (paramType === EthereumTypeOptions.UINT_B_ARRAY) {
    paramType = paramArrayLength ? `uint${param.type.selectedIntegerLength.toString()}[${paramArrayLength.toString()}]` : `uint${param.type.selectedIntegerLength.toString()}[]`;
  }
  return paramType;
}

export default computeParamType;
