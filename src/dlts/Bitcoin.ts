import bitcoin from 'bitcoinjs-lib';
import AbstractDLT, { Options, Account, TransactionOptions as BaseTransactionOptions } from './AbstractDlt';
import OverledgerSDK from '../';

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

    const tx = new bitcoin.TransactionBuilder(this.addressType);
    const data = Buffer.from(message); // Message is inserted

    const embed = bitcoin.payments.embed({ data: [data] });
    tx.addInput(options.previousTransactionHash, options.sequence);
    tx.addOutput(toAddress, options.amount);
    tx.addOutput(embed.output, this.NON_DUST_AMOUNT);

    return tx;
  }

  /**
   * @inheritdoc
   */
  _sign(toAddress: string, message: string, options: TransactionOptions): Promise<string> {
    const transaction = this.buildTransaction(toAddress, message, options);
    transaction.sign(0, this.account);

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
    this.account = bitcoin.ECPair.fromWIF(privateKey, this.addressType);
  }
}

interface TransactionOptions extends BaseTransactionOptions {
  previousTransactionHash: string;
}

export default Bitcoin;
