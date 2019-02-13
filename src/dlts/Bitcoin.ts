import bitcoin from 'bitcoinjs-lib';
import AbstractDLT, { Options, Account, TransactionOptions as BaseTransactionOptions } from './AbstractDlt';
import OverledgerSDK from '../';
import { AxiosResponse } from 'axios';

class Bitcoin extends AbstractDLT {
  NON_DUST_AMOUNT: number = 546;
  addressType: string;
  privateKey: string;

  /**
   * Name of the DLT
   */
  name: string = 'bitcoin';

  /**
   * Symbol of the DLT
   */
  symbol: string = 'XBT';

  /**
   * @inheritdoc
   */
  constructor(sdk: OverledgerSDK, options: Options) {
    super(sdk, options);

    if (sdk.network === sdk.MAINNET) {
      this.addressType = bitcoin.networks.bitcoin;
    } else {
      this.addressType = bitcoin.networks.testnet;
    }

    if (options.privateKey) {
      this.setAccount(options.privateKey);
    }
  }

  /**
   * @inheritdoc
   */
  // @TODO: add return statement
  // @TODO: add option statement
  buildTransaction(toAddress: string, message: string, options: TransactionOptions): any {
    if (typeof options.sequence === 'undefined') {
      throw new Error('options.sequence must be setup');
    }

    if (typeof options.previousTransactionHash === 'undefined') {
      throw new Error('options.previousTransactionHash must be setup');
    }

    if (typeof options.value === 'undefined') {
      throw new Error('options.value must be setup');
    }

    if (typeof options.feePrice === 'undefined') {
      throw new Error('options.feePrice must be setup');
    }

    const tx = new bitcoin.TransactionBuilder(this.addressType);
    const data = Buffer.from(message, 'utf8'); // Message is inserted

    const embed = bitcoin.payments.embed({ data: [data] });
    tx.addInput(options.previousTransactionHash, options.sequence);
    tx.addOutput(toAddress, options.amount);
    tx.addOutput(embed.output, this.NON_DUST_AMOUNT);
    console.log(options.value - options.amount - this.NON_DUST_AMOUNT - options.feePrice);
    tx.addOutput(this.account.address, options.value - options.amount - this.NON_DUST_AMOUNT - options.feePrice);

    return tx;
  }

  /**
   * @inheritdoc
   */
  _sign(toAddress: string, message: string, options: TransactionOptions): Promise<string> {
    const transaction = this.buildTransaction(toAddress, message, options);
    transaction.sign(0, this.account.privateKey);

    return Promise.resolve(transaction.build().toHex());
  }

  /**
   * @inheritdoc
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
   * @inheritdoc
   */
  setAccount(privateKey: string): void {
    const keyPair = bitcoin.ECPair.fromWIF(privateKey, this.addressType);

    this.account = {
      privateKey: keyPair,
      address: bitcoin.payments
        .p2pkh({ pubkey: keyPair.publicKey, network: this.addressType }).address,
    };
  }

  /**
   * @inheritdoc
   */
  fundAccount(amount: string = '100000000', address: string = null): Promise<AxiosResponse> {
    return super.fundAccount(amount, address);
  }
}

interface TransactionOptions extends BaseTransactionOptions {
  previousTransactionHash: string;
  value: number;
  amount: number;
  feePrice: number;
}

export default Bitcoin;
