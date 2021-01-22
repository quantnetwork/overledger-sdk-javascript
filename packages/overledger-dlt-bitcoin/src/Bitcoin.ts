import * as bitcoin from 'bitcoinjs-lib';
import { MAINNET } from '@quantnetwork/overledger-provider';
import AbstractDLT from '@quantnetwork/overledger-dlt-abstract';
import { Account, TransactionRequest, ValidationCheck, MultiSigAccount } from '@quantnetwork/overledger-types';
import TransactionBitcoinRequest from './DLTSpecificTypes/TransactionBitcoinRequest';
import TransactionBitcoinSubTypeOptions from './DLTSpecificTypes/associatedEnums/TransactionBitcoinSubTypeOptions';
import { AxiosInstance, AxiosPromise } from 'axios';
import TransactionBitcoinScriptTypeOptions from './DLTSpecificTypes/associatedEnums/TransactionBitcoinScriptTypeOptions';
import TransactionBitcoinTransferTypeOptions from './DLTSpecificTypes/associatedEnums/TransactionBitcoinTransferTypeOptions';
import * as varuint from 'bip174/src/lib/converter/varint';

/**
 * @memberof module:overledger-dlt-bitcoin
*/
class Bitcoin extends AbstractDLT {
  addressType: bitcoin.Network;
  request: AxiosInstance;
  account: Account;
  multisigAccount: MultiSigAccount;

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
  constructor(sdk: any) {
    super(sdk);
    if (sdk.network === MAINNET) {
      this.addressType = bitcoin.networks.bitcoin;
    } else {
      this.addressType = bitcoin.networks.testnet;
    }
  }

  getEstimateFeeRate(): AxiosPromise {
    try {
      this.request = this.sdk.provider.createRequest('/bitcoin');
      return this.request.get('/transactions/fee');
    } catch (e) {
      return e.response;
    }
  }

  /**
  * Takes the Overledger definition of a transaction and converts it into a specific Bitcoin transaction
  * @param {TransactionBitcoinRequest} thisTransaction - details on the information to include in this transaction for the Bitcoin distributed ledger
  * @return {Transaction} the Bitcoin transaction
  */
  buildTransaction(thisTransaction: TransactionBitcoinRequest): any {

    super.transactionValidation(thisTransaction);

    // const feePrice = Number(thisTransaction.extraFields.feePrice);
    // console.log(`network ${JSON.stringify(this.addressType)}`);
    // const NETWORK = bitcoin.networks.testnet;
    // const psbtObj = new bitcoin.Psbt({ network: NETWORK }); // set maximum fee rate = 0 to be flexible on fee rate
    const psbtObj = new bitcoin.Psbt({ network: this.addressType });
    console.log(`psbtObj ${JSON.stringify(psbtObj)}`);
    psbtObj.setMaximumFeeRate(0);
    psbtObj.setVersion(2); // These are defaults. This line is not needed.
    psbtObj.setLocktime(0);
    let counter = 0;
    while (counter < thisTransaction.txInputs.length) {
      console.log(`counter input ${counter}`);
      const rawTransactionInput = thisTransaction.txInputs[counter].rawTransaction.toString();
      const isSegwit = rawTransactionInput.substring(8, 12) === '0001';
      console.log(`isSegwit ${isSegwit}`);
      let input: UtxoInput = {
        hash: thisTransaction.txInputs[counter].linkedTx.toString(),
        index: parseInt(thisTransaction.txInputs[counter].linkedIndex, 10),
        nonWitnessUtxo: Buffer.from(rawTransactionInput.toString(), 'hex')
      };
      if (isSegwit) {
        input.witnessUtxo = {
          script: Buffer.from(thisTransaction.txInputs[counter].scriptPubKey.toString(), 'hex'),
          value: thisTransaction.txInputs[counter].amount
        };
      }
      if (thisTransaction.txInputs[counter].redeemScript !== undefined) {
        input.redeemScript = Buffer.from(thisTransaction.txInputs[counter].redeemScript.toString(), 'hex');
      }
      if (thisTransaction.txInputs[counter].witnessScript !== undefined) {
        input.witnessScript = Buffer.from(thisTransaction.txInputs[counter].witnessScript.toString(), 'hex')
      }
      console.log(`input ${JSON.stringify(input)}`);
      psbtObj.addInput(input);
      counter = counter + 1;
    }
    console.log(`inputs added`);
    counter = 0;
    while (counter < thisTransaction.txOutputs.length) {
      let output: UtxoOutput = {
        value: thisTransaction.txOutputs[counter].amount,
        address: thisTransaction.txOutputs[counter].toAddress.toString()
      }
      psbtObj.addOutput(<{ value: number, address: string }>output);
      console.log(`output ${output}`);
      counter = counter + 1;
    }

    const data = Buffer.from(thisTransaction.message, 'utf8'); // Message is inserted
    const dataLength = data.length;
    console.log(`data length ${dataLength}`);
    const unspendableReturnPayment = bitcoin.payments.embed({ data: [data], network: this.addressType });
    const dataOutput: UtxoOutput = {
      value: 0,
      script: unspendableReturnPayment.output
    };
    psbtObj.addOutput(<{ value: number, script: Buffer }>dataOutput);

    return psbtObj;
  }

  /**
  * validates an OVL transactionRequest according to XRP specific rules
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

      // if (!thisBitcoinTx.txOutputs[counter].amount || thisBitcoinTx.txOutputs[counter].amount === undefined) {
      if (thisBitcoinTx.txOutputs[counter].amount === undefined) {
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
   * Takes in an overledger definition of a transaction for XRP, converts it into a form that the XRP distributed ledger will understand, and then signs the transaction
   * @param {TransactionRequest} thisTransaction - an instantiated overledger definition of an XRP transaction
   */
  _sign(thisTransaction: TransactionRequest): Promise<string> {

    const thisBitcoinTransaction = <TransactionBitcoinRequest>thisTransaction;
    let psbtObj = this.buildTransaction(thisBitcoinTransaction);
    // for each input sign them:
    console.log(`psbtObj ${JSON.stringify(psbtObj)}`);
    let myKeyPair;
    if (this.account) {
      myKeyPair = bitcoin.ECPair.fromWIF(this.account.privateKey, this.addressType);
      console.log(`myKeyPair ${myKeyPair}`);
    }

    let counter = 0;
    while (counter < thisBitcoinTransaction.txInputs.length) {
      if (thisBitcoinTransaction.txInputs[counter].transferType
        && thisBitcoinTransaction.txInputs[counter].transferType === TransactionBitcoinTransferTypeOptions.REDEEM_P2MS) {
        if (!this.multisigAccount) {
          throw new Error('A multisig Account must be set up');
        } else {
          if (thisBitcoinTransaction.txInputs[counter].coSigners.length !== this.multisigAccount.numberCoSigners) {
            throw new Error(`coSigners must be ${this.multisigAccount.numberCoSigners}`);
          }
          const privateKeys = this.multisigAccount.keys.map(k => k.privateKeyWIF.toString());
          thisBitcoinTransaction.txInputs[counter].coSigners.map(signer => {
            if (!privateKeys.includes(signer)) {
              throw new Error('The current coSigner does not belong to the current multisig account');
            }
            const kPair = bitcoin.ECPair.fromWIF(signer, this.addressType);
            psbtObj.signInput(counter, kPair);
          });
          thisBitcoinTransaction.txInputs[counter].coSigners.map(signer => {
            console.log(`signer ${signer}`);
            const key = this.multisigAccount.keys.filter(k => k.privateKeyWIF.toString() === signer.toString());
            console.log(`key ${JSON.stringify(key)}`);
            if (key.length === 1) {
              psbtObj.validateSignaturesOfInput(counter, key[0].publicKey);
            } else {
              throw new Error('Signer is duplicated');
            }
          });
          psbtObj.finalizeInput(counter);
        }
      } else {
        psbtObj.signInput(counter, myKeyPair);
        psbtObj.validateSignaturesOfInput(counter);
        if (thisBitcoinTransaction.txInputs[counter].transferType
          && thisBitcoinTransaction.txInputs[counter].transferType === TransactionBitcoinTransferTypeOptions.REDEEM_HTLC) {
          const preImage = thisBitcoinTransaction.txInputs[counter].preimage;
          psbtObj.finalizeInput(counter, (inputIndex, input, script, isSegwit, isP2SH, isP2WSH) => {
            return this.getFinalScripts(preImage, inputIndex, input, script, isSegwit, isP2SH, isP2WSH)
          });
        } else {
          psbtObj.finalizeInput(counter);
        }
      }
      counter = counter + 1;
    }
    return Promise.resolve(psbtObj.extractTransaction(true).toHex());
  }

  getFinalScripts(preImage, inputIndex, input, script, isSegwit, isP2SH, isP2WSH) {
    console.log(`getFinalScripts inputIndex: ${JSON.stringify(inputIndex)} input: ${JSON.stringify(input)} script: ${script.toString('hex')} isSegwit: ${isSegwit} isP2SH: ${isP2SH} isP2WSH: ${isP2WSH} preimage: ${preImage}`);
    let finaliseRedeem;
    if (isSegwit && isP2SH) {
      finaliseRedeem = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2wsh({
          redeem: {
            input: bitcoin.script.compile([
              input.partialSig[0].signature,
              Buffer.from(preImage, 'utf8')
            ]),
            output: Buffer.from(script, 'hex')
          }
        })
      });
      return { finalScriptSig: finaliseRedeem.input, finalScriptWitness: witnessStackToScriptWitness(finaliseRedeem.witness) };
    } else if (isP2SH) {
      finaliseRedeem = bitcoin.payments.p2sh({
        redeem: {
          input: bitcoin.script.compile([
            input.partialSig[0].signature,
            Buffer.from(preImage, 'utf8')
          ]),
          output: Buffer.from(script, 'hex')
        }
      });
      return { finalScriptSig: finaliseRedeem.input };
    } else if (isP2WSH) {
      finaliseRedeem = bitcoin.payments.p2wsh({
        redeem: {
          input: bitcoin.script.compile([
            input.partialSig[0].signature,
            Buffer.from(preImage, 'utf8')
          ]),
          output: Buffer.from(script, 'hex')
        }
      });
      return { finalScriptWitness: witnessStackToScriptWitness(finaliseRedeem.witness) };
    }
  }

  /**
   * Create a Bitcoin account
   *
   * @return {Account} the new Bitcoin account
   */
  createAccount(isSegwit: boolean = false): Account {

    const keyPair = bitcoin.ECPair.makeRandom({ network: this.addressType });
    const privateKey = keyPair.toWIF();
    const { address, pubkey } = isSegwit
      ? bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: this.addressType })
      : bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: this.addressType });
    return {
      privateKey,
      address,
      isSegwit,
      publicKey: pubkey.toString('hex'),
      password: "",
      provider: "",
    };
  }

  // createMultiSigAccount(): 

  /**
   * Set an account for signing transactions for a specific DLT
   *
   * @param {Account} accountInfo The standardised account information
   */
  setAccount(accountInfo: Account): void {
    console.log(`setAccount ${accountInfo.privateKey}`);
    if (!accountInfo.privateKey) {
      throw new Error("accountInfo.privateKey must be set");
    }
    const keyPair = bitcoin.ECPair.fromWIF(accountInfo.privateKey, this.addressType);
    let privateKey = accountInfo.privateKey;
    let isSegwit = accountInfo.isSegwit;
    let address = isSegwit
      ? bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: this.addressType }).address
      : bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: this.addressType }).address;
    let publicKey = keyPair.publicKey.toString('hex');
    let provider = accountInfo.provider ? accountInfo.provider : "";
    let password = accountInfo.password ? accountInfo.password : "";
    this.account = {
      privateKey,
      address,
      isSegwit,
      publicKey,
      provider,
      password,
    }
    console.log(`this.account ${JSON.stringify(this.account)}`);
  }

  // setAccount P2WPKH !!! TO DO
  // setAccount P2SHP2WPKH

  setMultiSigAccount(numberCoSigners: number, privateKeys: [string], scriptType: string): void {
    if (privateKeys.length < numberCoSigners) {
      throw new Error('Number of cosigners must be less or equal to the length of private keys');
    }
    const keys = <[{ publicKey: Buffer, privateKey: Buffer, privateKeyWIF: string }]>privateKeys.map(pk => {
      const keyPair = bitcoin.ECPair.fromWIF(pk, this.addressType);
      return { publicKey: keyPair.publicKey, privateKey: keyPair.privateKey, privateKeyWIF: pk }
    });
    const p2ms = bitcoin.payments.p2ms({
      m: numberCoSigners,
      pubkeys: keys.map(k => k.publicKey),
      network: this.addressType
    });
    console.log(`p2ms ${JSON.stringify(p2ms)}`);
    if (scriptType !== undefined) {
      if (scriptType === TransactionBitcoinScriptTypeOptions.P2SH) {
        const p2sh = bitcoin.payments.p2sh({ redeem: p2ms, network: this.addressType });
        console.log(`p2sh ${JSON.stringify(p2sh)}`);
        this.multisigAccount = {
          keys,
          address: p2sh.address,
          numberCoSigners,
          script: p2sh.output.toString('hex'),
          redeemScript: p2sh.redeem.output.toString('hex')
        }
      } else if (scriptType === TransactionBitcoinScriptTypeOptions.P2WSH) {
        const p2wsh = bitcoin.payments.p2wsh({ redeem: p2ms, network: this.addressType });
        this.multisigAccount = {
          keys,
          address: p2wsh.address,
          numberCoSigners,
          script: p2wsh.output.toString('hex'),
          witnessScript: p2wsh.redeem.output.toString('hex')
        }
      } else if (scriptType === TransactionBitcoinScriptTypeOptions.P2SHP2WSH) {
        const p2wsh = bitcoin.payments.p2wsh({ redeem: p2ms, network: this.addressType });
        const p2sh = bitcoin.payments.p2sh({ redeem: p2wsh, network: this.addressType });
        this.multisigAccount = {
          keys,
          address: p2sh.address,
          numberCoSigners,
          script: p2sh.output.toString('hex'),
          redeemScript: p2sh.redeem.output.toString('hex'),
          witnessScript: p2wsh.redeem.output.toString('hex')
        }
        console.log(`multisigAccount ${JSON.stringify(this.multisigAccount)}`);
      } else {
        throw new Error('scriptType not supported');
      }
    } else {
      throw new Error('Script type must be defined');
    }
  }

  /**
  * Allows a user to build a smart contract query for the Bitcoin distributed ledger (currently not supported for Bitcoin)
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
  * validates an OVL smart contract query according to Bitcoin specific rules
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

// From psbt library : not exported in psbt nor in bitcoinjs-lib yet
function witnessStackToScriptWitness(witness) {
  let buffer = Buffer.allocUnsafe(0);
  function writeSlice(slice) {
    buffer = Buffer.concat([buffer, Buffer.from(slice)]);
  }
  function writeVarInt(i) {
    const currentLen = buffer.length;
    const varintLen = varuint.encodingLength(i);
    buffer = Buffer.concat([buffer, Buffer.allocUnsafe(varintLen)]);
    varuint.encode(i, buffer, currentLen);
  }
  function writeVarSlice(slice) {
    writeVarInt(slice.length);
    writeSlice(slice);
  }
  function writeVector(vector) {
    writeVarInt(vector.length);
    vector.forEach(writeVarSlice);
  }
  writeVector(witness);
  return buffer;
}

interface UtxoInput {
  hash: string;
  index: number;
  nonWitnessUtxo?: Buffer;
  witnessUtxo?: { script: Buffer, value: number };
  redeemScript?: Buffer;
  witnessScript?: Buffer;
};

interface UtxoOutput {
  value: number;
  address?: string;
  script?: Buffer;
}

export default Bitcoin;
