import * as bitcoin from 'bitcoinjs-lib';
import { MAINNET } from '@quantnetwork/overledger-provider';
import AbstractDLT from '@quantnetwork/overledger-dlt-abstract';
import { TransactionInput } from '@quantnetwork/overledger-types';
import { Account, TransactionRequest, ValidationCheck, MultisigNOfMAccount } from '@quantnetwork/overledger-types';
import TransactionBitcoinRequest from './DLTSpecificTypes/TransactionBitcoinRequest';
import TransactionBitcoinSubTypeOptions from './DLTSpecificTypes/associatedEnums/TransactionBitcoinSubTypeOptions';
import { AxiosInstance, AxiosPromise } from 'axios';
import TransactionBitcoinScriptTypeOptions from './DLTSpecificTypes/associatedEnums/TransactionBitcoinScriptTypeOptions';
import TransactionBitcoinFunctionOptions from './DLTSpecificTypes/associatedEnums/TransactionBitcoinFunctionOptions';
import * as varuint from 'bip174/src/lib/converter/varint';


/**
 * @memberof module:overledger-dlt-bitcoin
*/
class Bitcoin extends AbstractDLT {
  addressType: bitcoin.Network;
  request: AxiosInstance;
  account: Account;
  multisigAccount: MultisigNOfMAccount;

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
  * Takes the utxo input and if it includes a smart contract field extract its parameters into a structure used for psbt data input objects
  * @param {TransactionInput} input - utxo input
  * @return {any} smart contract parameters for that input
  */
  getSmartContractParameters(input: TransactionInput): any {
    let transferType;
    let finalSCData: any = {};
    console.log(`input ${JSON.stringify(input)}`);
    if (input.smartContract) {
      if (input.smartContract.functionCall.length === 1) {
        const fnCall = input.smartContract.functionCall[0];
        transferType = fnCall.functionName;
        finalSCData.transferType = transferType;
        fnCall.inputParams.map(p => {
          finalSCData[p.name] = p.value;
        });
      } else {
        throw new Error(`A unique call can be made in Bitcoin`);
      }
      console.log(`finalSCData ${JSON.stringify(finalSCData)}`);
      return finalSCData;
    }
  }

  /**
  * Takes the Overledger definition of a transaction and converts it into a specific Bitcoin transaction
  * @param {TransactionBitcoinRequest} thisTransaction - details on the information to include in this transaction for the Bitcoin distributed ledger
  * @return {UtxosPrepare} Utxos in a form accepted to build the psbt object for signing
  */
  prepareTransaction(thisTransaction: TransactionBitcoinRequest): UtxosPrepare {
    const inputs = new Array();
    const outputs = new Array();
    super.transactionValidation(thisTransaction);
    let preimage;
    let transferType;
    let coSigners;
    thisTransaction.txInputs.forEach(txInput => {
      const rawTransactionInput = txInput.linkedRawTransaction.toString();
      const isSegwit = rawTransactionInput.substring(8, 12) === '0001';
      const scData = this.getSmartContractParameters(txInput);
      let input: UtxoInput = {
        hash: txInput.linkedTx.toString(),
        index: parseInt(txInput.linkedIndex, 10),
        sequence: txInput.linkedTxSequence ? txInput.linkedTxSequence : 0xffffffff,
        nonWitnessUtxo: Buffer.from(rawTransactionInput.toString(), 'hex')
      };
      if (isSegwit) {
        if (txInput.scriptPubKey !== undefined) {
          input.witnessUtxo = {
            script: Buffer.from(txInput.scriptPubKey.toString(), 'hex'),
            value: txInput.amount
          };
        } else {
          throw new Error(`scriptPubKey field must be provided in a Segwit utxo transaction input`);
        }
      }
      if (scData) {
        if (scData.redeemScript) {
          input.redeemScript = Buffer.from(scData.redeemScript.toString(), 'hex');
        }
        if (scData.witnessScript) {
          input.witnessScript = Buffer.from(scData.witnessScript.toString(), 'hex');
        }
        transferType = scData.transferType ? scData.transferType : undefined;
        coSigners = scData.coSigners ? scData.coSigners : undefined;
        preimage = (transferType && transferType === TransactionBitcoinFunctionOptions.CANCEL_HTLC) ? '' : scData.preimage;
      }
      inputs.push({
        input,
        transferType,
        coSigners,
        preimage,
        nLocktime: txInput.linkedTxLockTime
      });
    });
    thisTransaction.txOutputs.forEach(txOutput => {
      let output = {
        value: txOutput.amount,
        address: txOutput.toAddress.toString()
      } as UtxoAddressOutput;
      outputs.push(output);
    });
    const data = Buffer.from(thisTransaction.message, 'utf8'); // Message is inserted

    return { inputs, outputs, data };
  }

  /**
  * Takes the inputs, outputs and the data resulting from the prepareTransaction and create a psbt object for signing
  * @param {UtxosPrepare} inputsOutputs - inputs, outputs and data needed to build the psbt object
  * @return {any} The psbt object filled and the inputs outputs initially obtained from the prepareTransaction needed to know the type of utxos transactions it will be signed
  */
  preparePsbtObject(inputsOutputs: UtxosPrepare): any {

    // const feePrice = Number(thisTransaction.extraFields.feePrice); // set maximum fee rate = 0 to be flexible on fee rate
    const psbtObj = new bitcoin.Psbt({ network: this.addressType });
    psbtObj.setMaximumFeeRate(0);
    psbtObj.setVersion(2); // These are defaults. This line is not needed.
    let maxLockTime = 0;
    if (inputsOutputs.inputs && inputsOutputs.inputs.length > 0) {
      maxLockTime = inputsOutputs.inputs.reduce((max, input) => {
        const tLock = input.nLocktime;
        console.log(`tLock maxLockTime ${tLock} `);
        if (tLock && tLock > max) {
          return tLock;
        } else {
          return max;
        }
      }, 0);
    }
    console.log(`maxLockTime ${maxLockTime}`);
    const nLockTime = Math.max(0, maxLockTime);
    console.log(`nLockTime ${nLockTime}`);
    psbtObj.setLocktime(nLockTime);

    inputsOutputs.inputs.forEach(inp => {
      const input = inp.input;
      psbtObj.addInput(input);
    });

    inputsOutputs.outputs.forEach(outp => {
      const output = outp;
      if (isAddressOutput(output)) {
        psbtObj.addOutput(<{ value: number, address: string }>output);
      } else {
        psbtObj.addOutput(<{ value: number, script: Buffer }>output);
      }
    });

    const data = inputsOutputs.data; // Message is inserted
    const dataLength = data.length;
    if (data && dataLength > 0) {
      const unspendableReturnPayment = bitcoin.payments.embed({ data: [data], network: this.addressType });
      const dataOutput = {
        value: 0,
        script: unspendableReturnPayment.output
      } as UtxoScriptOutput;
      psbtObj.addOutput(dataOutput);
    }

    return { psbtObj, inputsOutputs };
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
    let build = this.prepareTransaction(thisBitcoinTransaction);
    let { psbtObj, inputsOutputs } = this.preparePsbtObject(build);
    let myKeyPair;
    if (this.account) {
      myKeyPair = bitcoin.ECPair.fromWIF(this.account.privateKey, this.addressType);
    }
    inputsOutputs.inputs.forEach((input, pos) => {
      if (input.transferType
        && input.transferType === TransactionBitcoinFunctionOptions.REDEEM_P2MS) {
        if (!this.multisigAccount) {
          throw new Error('A multisig Account must be set up');
        } else {
          if (input.coSigners.length !== this.multisigAccount.numberCoSigners) {
            throw new Error(`coSigners must be ${this.multisigAccount.numberCoSigners}`);
          }
          const privateKeys = this.multisigAccount.accounts.map(k => k.privateKey.toString());
          input.coSigners.map(signer => {
            if (!privateKeys.includes(signer)) {
              throw new Error('The current multisig co-signer does not belong to the current multisig account');
            }
            const kPair = bitcoin.ECPair.fromWIF(signer, this.addressType);
            psbtObj.signInput(pos, kPair);
          });
          input.coSigners.map(signer => {
            const key = this.multisigAccount.accounts.filter(k => k.privateKey.toString() === signer.toString());
            if (key.length === 1) {
              psbtObj.validateSignaturesOfInput(pos, Buffer.from(key[0].publicKey, 'hex'));
            } else {
              throw new Error('Signer is duplicated');
            }
          });
          psbtObj.finalizeInput(pos);
        }
      } else {
        psbtObj.signInput(pos, myKeyPair);
        psbtObj.validateSignaturesOfInput(pos);
        if (input.transferType
          && (input.transferType === TransactionBitcoinFunctionOptions.REDEEM_HTLC
            || input.transferType === TransactionBitcoinFunctionOptions.CANCEL_HTLC)) {
          const preImage = input.preimage;
          psbtObj.finalizeInput(pos, (_inputIndex, input, script, isSegwit, isP2SH, isP2WSH) => {
            return this.getFinalScripts(preImage, _inputIndex, input, script, isSegwit, isP2SH, isP2WSH)
          });
        } else {
          psbtObj.finalizeInput(pos);
        }
      }
    });
    return Promise.resolve(psbtObj.extractTransaction(true).toHex());
  }

  getFinalScripts(preImage, _inputIndex, input, script, isSegwit, isP2SH, isP2WSH) {
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
  createAccount(isSegwit: boolean = false, isNestedSegwit: boolean = false): Account {
    const keyPair = bitcoin.ECPair.makeRandom({ network: this.addressType });
    const privateKey = keyPair.toWIF();
    const payment = !isSegwit && !isNestedSegwit
      ? bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: this.addressType })
      : isSegwit ? bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: this.addressType })
        : bitcoin.payments.p2sh({ redeem: bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: this.addressType }), network: this.addressType });
    return {
      privateKey,
      address: payment.address,
      publicKey: keyPair.publicKey.toString('hex'),
      isSegwit,
      isNestedSegwit,
      script: isNestedSegwit ? payment.output.toString('hex') : undefined,
      redeemScript: isNestedSegwit ? payment.redeem.output.toString('hex') : undefined,
      password: "",
      provider: "",
    };
  }

  /**
   * Set an account for signing transactions for a specific DLT
   *
   * @param {Account} accountInfo The standardised account information
   */
  setAccount(accountInfo: Account): void {
    console.log(`setAccount ${accountInfo.privateKey}`);
    const privateKey = accountInfo.privateKey;
    if (!privateKey) {
      throw new Error("accountInfo.privateKey must be set");
    }
    const keyPair = bitcoin.ECPair.fromWIF(privateKey, this.addressType);
    const publicKey = keyPair.publicKey.toString('hex');
    const isSegwit = accountInfo.isSegwit;
    const isNestedSegwit = accountInfo.isNestedSegwit;
    const payment = !isSegwit && !isNestedSegwit
      ? bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: this.addressType })
      : isSegwit ? bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: this.addressType })
        : bitcoin.payments.p2sh({ redeem: bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: this.addressType }), network: this.addressType });
    const address = payment.address;
    const script = isNestedSegwit ? payment.output.toString('hex') : undefined;
    const redeemScript = isNestedSegwit ? payment.redeem.output.toString('hex') : undefined;
    const provider = accountInfo.provider ? accountInfo.provider : "";
    const password = accountInfo.password ? accountInfo.password : "";
    this.account = {
      privateKey,
      address,
      publicKey,
      isSegwit,
      isNestedSegwit,
      script,
      redeemScript,
      provider,
      password
    }
  }

  setMultiSigAccount(multisigAccountInfo: MultisigNOfMAccount): void {
    if (multisigAccountInfo.accounts.length < multisigAccountInfo.numberCoSigners) {
      throw new Error('Number of cosigners must be less or equal to the length of private keys');
    }
    const accounts = multisigAccountInfo.accounts.map(account => {
      const keyPair = bitcoin.ECPair.fromWIF(account.privateKey, this.addressType);
      return { ...account, publicKey: keyPair.publicKey.toString('hex') }
    });
    const p2ms = bitcoin.payments.p2ms({
      m: multisigAccountInfo.numberCoSigners,
      pubkeys: accounts.map(k => Buffer.from(k.publicKey, 'hex')),
      network: this.addressType
    });
    const scriptType = !multisigAccountInfo.isSegwit && !multisigAccountInfo.isNestedSegwit
      ? TransactionBitcoinScriptTypeOptions.P2SH
      : multisigAccountInfo.isSegwit ? TransactionBitcoinScriptTypeOptions.P2WSH
        : TransactionBitcoinScriptTypeOptions.P2SH_P2WSH;

    if (scriptType !== undefined) {
      if (scriptType === TransactionBitcoinScriptTypeOptions.P2SH) {
        const p2sh = bitcoin.payments.p2sh({ redeem: p2ms, network: this.addressType });
        console.log(`p2sh ${JSON.stringify(p2sh)}`);
        this.multisigAccount = {
          accounts,
          multisigAddress: p2sh.address,
          numberCoSigners: multisigAccountInfo.numberCoSigners,
          script: p2sh.output.toString('hex'),
          redeemScript: p2sh.redeem.output.toString('hex')
        }
      } else if (scriptType === TransactionBitcoinScriptTypeOptions.P2WSH) {
        const p2wsh = bitcoin.payments.p2wsh({ redeem: p2ms, network: this.addressType });
        this.multisigAccount = {
          accounts,
          multisigAddress: p2wsh.address,
          numberCoSigners: multisigAccountInfo.numberCoSigners,
          script: p2wsh.output.toString('hex'),
          witnessScript: p2wsh.redeem.output.toString('hex')
        }
      } else if (scriptType === TransactionBitcoinScriptTypeOptions.P2SH_P2WSH) {
        const p2wsh = bitcoin.payments.p2wsh({ redeem: p2ms, network: this.addressType });
        const p2sh = bitcoin.payments.p2sh({ redeem: p2wsh, network: this.addressType });
        this.multisigAccount = {
          accounts,
          multisigAddress: p2sh.address,
          numberCoSigners: multisigAccountInfo.numberCoSigners,
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


function isAddressOutput(output: UtxoAddressOutput | UtxoScriptOutput): output is UtxoAddressOutput {
  return (output as UtxoAddressOutput).address !== undefined;
}


interface UtxoInput {
  hash: string;
  index: number;
  sequence?: number;
  nonWitnessUtxo?: Buffer;
  witnessUtxo?: { script: Buffer, value: number };
  redeemScript?: Buffer;
  witnessScript?: Buffer;
};

interface UtxoInputWithCharacteristics {
  input: UtxoInput;
  tranferType?: TransactionBitcoinFunctionOptions;
  coSigners?: string;
  preimage?: string;
  nLocktime?: number;
}


interface UtxoAddressOutput {
  value: number;
  address: string;
}

interface UtxoScriptOutput {
  value: number;
  script: Buffer;
}

interface UtxosPrepare {
  inputs: UtxoInputWithCharacteristics[],
  outputs: (UtxoAddressOutput | UtxoScriptOutput)[],
  data: Buffer
}

export default Bitcoin;
