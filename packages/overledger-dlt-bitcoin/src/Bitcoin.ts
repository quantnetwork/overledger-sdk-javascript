import * as bitcoin from 'bitcoinjs-lib';
import { MAINNET } from '@quantnetwork/overledger-provider';
import AbstractDLT from '@quantnetwork/overledger-dlt-abstract';
import { Options, Account, TransactionRequest, ValidationCheck } from '@quantnetwork/overledger-types';
import TransactionBitcoinRequest from './DLTSpecificTypes/TransactionBitcoinRequest';
import TransactionBitcoinSubTypeOptions from './DLTSpecificTypes/associatedEnums/TransactionBitcoinSubTypeOptions';
import { AxiosInstance, AxiosPromise } from 'axios';

/**
 * @memberof module:overledger-dlt-bitcoin
*/
class Bitcoin extends AbstractDLT {
  addressType: bitcoin.Network;
  request: AxiosInstance;
  account: Account;
  options: Object;
  /**
   * Name of the DLT
   */
  name: string = 'bitcoin';

  /**
   * Symbol of the DLT
   */
  symbol: string = 'XBT';

  /**
   * @param {any} sdk - the sdk instance
   * @param {Object} options - any additional options to instantiate this dlt
   */
  constructor(sdk: any, options: Options = {}) {
    super(sdk, options);
    if (sdk.network === MAINNET) {
      this.addressType = bitcoin.networks.bitcoin;
    } else {
      this.addressType = bitcoin.networks.testnet;
    }
    if (options.privateKey) {
      this.setAccount(options.privateKey);
    }
  }

  getEstimateFeeRate():AxiosPromise {
    try {
      this.request = this.sdk.provider.createRequest('/bitcoin');
      return this.request.get('/transactions/fee');
    } catch (e) {
      return e.response;
    }
  }

  /**
   * Takes the Overledger definition of a transaction and converts it into a specific Bitcoin transaction.
   * @param {TransactionRequest} thisTransaction - details on the information to include in this transaction for the Bitcoin distributed ledger
   * @return {Transaction} the Bitcoin transaction
   */
  buildTransaction(thisTransaction: TransactionBitcoinRequest): any {

    super.transactionValidation(thisTransaction);

    // const feePrice = Number(thisTransaction.extraFields.feePrice);
    let tx;
    tx = new bitcoin.TransactionBuilder(this.addressType, 0); // set maximum fee rate = 0 to be flexible on fee rate
    const data = Buffer.from(thisTransaction.message, 'utf8'); // Message is inserted
    let counter = 0;
    while (counter < thisTransaction.txInputs.length) {
      tx.addInput(thisTransaction.txInputs[counter].linkedTx, parseInt(thisTransaction.txInputs[counter].linkedIndex, 10));
      counter = counter + 1;
    }
    counter = 0;
    while (counter < thisTransaction.txOutputs.length) {
      tx.addOutput(thisTransaction.txOutputs[counter].toAddress, thisTransaction.txOutputs[counter].amount);
      counter = counter + 1;
    }
    const ret = bitcoin.script.compile(
      [
        bitcoin.opcodes.OP_RETURN,
        data,
      ]);
    tx.addOutput(ret, 0);

    return tx;
  }

  /**
 * Validates an OVL transactionRequest according to Bitcoin specific rules.
 * @param thisTransaction - The transaction request
 */
  _transactionValidation(thisTransaction: TransactionRequest): ValidationCheck {

    const thisBitcoinTx = <TransactionBitcoinRequest>thisTransaction;

    if (!Object.values(TransactionBitcoinSubTypeOptions).includes(thisBitcoinTx.subType.name)) {
      return {
        success: false,
        failingField: 'subType',
        error: 'You must select a subType from TransactionSubTypeOptions',
      };
    }
    if ((!thisBitcoinTx.extraFields) || (thisBitcoinTx.extraFields === undefined)) {
      return {
        success: false,
        failingField: 'extraFields',
        error: 'All transactions for Bitcoin must have the extraFields field set with feePrice parameters within it',
      };
    }
    if ((thisBitcoinTx.extraFields.feePrice === '') || (thisBitcoinTx.extraFields.feePrice == null) || (thisBitcoinTx.extraFields.feePrice === undefined)) {
      return {
        success: false,
        failingField: 'extraFields.feePrice',
        error: 'All transactions for Bitcoin must have the extraFields.feePrice field set and it must be convertable to a number',
      };
    }
    // make sure an amount is in each txInput and txOutput
    let counter = 0;
    let totalInputAmount = 0;
    let totalOutputAmount = 0;
    while (counter < thisBitcoinTx.txInputs.length) {

      if (!thisBitcoinTx.txInputs[counter].amount || thisBitcoinTx.txInputs[counter].amount === undefined) {
        return {
          success: false,
          failingField: 'thisBitcoinTx.txInputs.amount',
          error: 'All transactions inputs for Bitcoin must have an amount field',
        };
      }
      totalInputAmount = totalInputAmount + thisBitcoinTx.txInputs[counter].amount;
      counter = counter + 1;
    }
    counter = 0;
    while (counter < thisBitcoinTx.txOutputs.length) {

      if (!thisBitcoinTx.txOutputs[counter].amount || thisBitcoinTx.txOutputs[counter].amount === undefined) {
        return {
          success: false,
          failingField: 'thisBitcoinTx.txOutputs.amount',
          error: 'All transactions outputs for Bitcoin must have an amount field',
        };
      }
      totalOutputAmount = totalOutputAmount + thisBitcoinTx.txOutputs[counter].amount;
      counter = counter + 1;
    }
    // make sure that the fee price + transaction amounts equal the input amount (minus dust??)
    // this way we can alert the user if he expected change to be given automatically!

    if (totalInputAmount - totalOutputAmount - parseInt(thisBitcoinTx.extraFields.feePrice, 10) !== 0) { // providing a bit of leway for javascript parsing errors
      return {
        success: false,
        failingField: 'amount',
        error: 'All transactions for Bitcoin must satisfy the following logic: TotalInputAmounts - TotalOutputAmounts - feePrice = 0',
      };
    }

    return { success: true };
  }

  /**
   * Takes in an overledger definition of a transaction for Bitcoin, converts it into a form that the Bitcoin distributed ledger will understand, and then signs the transaction.
   * @param {TransactionRequest} thisTransaction - an instantiated overledger definition of an XRP transaction
   */
  _sign(thisTransaction: TransactionRequest): Promise<string> {

    const thisBitcoinTransaction = <TransactionBitcoinRequest>thisTransaction;
    const transaction = this.buildTransaction(thisBitcoinTransaction);
    // for each input sign them:
    const myKeyPair = bitcoin.ECPair.fromWIF(this.account.privateKey, this.addressType);
    let counter = 0;
    while (counter < thisBitcoinTransaction.txInputs.length) {
      // currently we are only supporting the p2pkh script
      transaction.sign({ prevOutScriptType: 'p2pkh', vin: counter, keyPair: myKeyPair });
      counter = counter + 1;
    }
    return Promise.resolve(transaction.build().toHex());
  }

  /**
   * Create a Bitcoin account
   *
   * @return {Account} the new Bitcoin account
   */
  createAccount(): Account {

    const keyPair = bitcoin.ECPair.makeRandom({ network: this.addressType });
    const privateKey = keyPair.toWIF();
    const { address } = bitcoin.payments
      .p2pkh({ pubkey: keyPair.publicKey, network: this.addressType });

    return {
      privateKey,
      address,
    };

  }

  /**
   * Set an account for signing transactions for a specific DLT.
   *
   * @param {string} privateKey The privateKey
   */
  setAccount(myPrivateKey: string): void {

    const keyPair = bitcoin.ECPair.fromWIF(myPrivateKey, this.addressType);
    this.account = {
      privateKey: myPrivateKey,
      address: bitcoin.payments
        .p2pkh({ pubkey: keyPair.publicKey, network: this.addressType }).address,
    };

  }

  /**
 * Allows a user to build a smart contract query for the Bitcoin distributed ledger (currently not supported for Bitcoin).
 * @param {string} dltAddress - the user's Bitcoin address
 * @param {Object} contractQueryDetails - the definition of the smart contract function the user wants to interact with, including information on what parameters to use in the function call.
 *
 * @return {Object} success indicates if this query building was correct, if yes then it will be in the response field of the object
 */
  _buildSmartContractQuery(dltAddress: string, contractQueryDetails: Object): ValidationCheck {

    return {
      success: false,
      failingField: `${dltAddress} ${JSON.stringify(contractQueryDetails)}`,
      error: 'The Bitcoin SDK does not currently support smart contract queries',
    };
  }

  /**
 * Validates an OVL smart contract query according to Bitcoin specific rules.
 * @param contractQueryDetails - the query details
 *
 * @return {Object} success indicates if this query building was correct, if yes then it will be in the response field of the object
 */
  _smartContractQueryValidation(contractQueryDetails: Object): ValidationCheck {

    return {
      success: false,
      failingField: JSON.stringify(contractQueryDetails),
      error: 'The Bitcoin SDK does not currently support smart contract validation',
    };
  }
}

export default Bitcoin;
