

/**
 * @memberof module:overledger-dlt-bitcoin
 */
// **IMPORTANT NOTE: A CHANGE HERE MAY MESS UP SMART CONTRACT INTERACTION AND THE SELECTED ENUM IS PARSED AND PREPARED BEFORE SENT TO OVERLEDGER */
export enum BitcoinTypeOptions { 
  NUMBER = 'NUMBER', 
  STRING = 'STRING', 
  HEX_STRING = 'HEX_STRING' 
}

export default BitcoinTypeOptions;
