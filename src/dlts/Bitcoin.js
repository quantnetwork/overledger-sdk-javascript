import bitcoin from 'bitcoinjs-lib';
import AbstractDLT from './AbstractDlt';

class Bitcoin extends AbstractDLT {
  NON_DUST_AMOUNT = 546;

  /**
   * Name of the DLT
   */
  name = 'bitcoin';

  /**
   * Symbol of the DLT
   */
  symbol = 'XBT';

  /**
   * @inheritdoc
   */
  constructor(sdk, options) {
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
  buildTransaction(fromAddress, toAddress, message, options) {
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
    tx.addOutput(embed.output, this.NON_DUST_AMOUNT);

    return tx;
  }

  /**
   * @inheritdoc
   */
  _sign(fromAddress, toAddress, message, options) {
    const transaction = this.buildTransaction(fromAddress, toAddress, message, options);
    transaction.sign(0, this.account);

    return transaction.build().toHex();
  }

  /**
   * @inheritdoc
   */
  createAccount() {
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
  setAccount(privateKey) {
    this.account = bitcoin.ECPair.fromWIF(privateKey, this.addressType);
  }
}

export default Bitcoin;
