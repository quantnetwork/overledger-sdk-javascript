import web3Utils from 'web3-utils';
import Accounts from 'web3-eth-accounts';
import AbstractDLT from './AbstractDlt';

class Ethereum extends AbstractDLT {
  /**
   * Name of the DLT
   */
  name = 'ethereum';

  /**
   * Symbol of the DLT
   */
  symbol = 'ETH';

  /**
   * @inheritdoc
   */
  constructor(sdk, options) {
    super(sdk, options);

    this.options = options;

    if (options.privateKey) {
      this.setAccount(options.privateKey);
    }

    if (sdk.network === sdk.MAINNET) {
      this.chainId = 1;
    } else {
      this.chainId = 500;
    }
  }

  /**
   * @inheritdoc
   */
  buildTransaction(fromAddress, toAddress, message, options) {
    if (typeof options.amount === 'undefined') {
      throw new Error('options.amount must be setup');
    }

    if (typeof options.feeLimit === 'undefined') {
      throw new Error('options.feeLimit must be setup');
    }

    if (typeof options.feePrice === 'undefined') {
      throw new Error('options.feePrice must be setup');
    }

    if (typeof options.sequence === 'undefined') {
      throw new Error('options.sequence must be setup');
    }

    const transaction = {
      nonce: options.sequence,
      chainId: this.chainId,
      to: toAddress,
      gas: options.feeLimit,
      gasPrice: options.feePrice,
      value: options.amount,
      data: web3Utils.asciiToHex(message),
    };

    return transaction;
  }

  /**
   * @inheritdoc
   */
  _sign(fromAddress, toAddress, message, options) {
    const transaction = this.buildTransaction(fromAddress, toAddress, message, options);

    return new Promise((resolve, reject) => {
      this.account.signTransaction(transaction, (err, data) => {
        if (err) {
          return reject(err);
        }

        return resolve(data.rawTransaction);
      });
    });
  }

  get utils() {
    return web3Utils;
  }

  /**
   * @inheritdoc
   */
  createAccount() {
    const account = new Accounts();
    return account.create();
  }

  /**
   * @inheritdoc
   */
  setAccount(privateKey) {
    const account = new Accounts();
    this.account = account.privateKeyToAccount(privateKey);
  }
}

export default Ethereum;
