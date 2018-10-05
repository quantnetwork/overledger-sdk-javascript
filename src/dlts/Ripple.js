import { RippleAPI } from 'ripple-lib';
import { dropsToXrp } from 'ripple-lib/dist/npm/common';
import { deriveKeypair, deriveAddress } from 'ripple-keypairs';
import AbstractDlt from './AbstractDlt';

class Ripple extends AbstractDlt {
  /**
   * Name of the DLT
   */
  name = 'ripple';

  /**
   * Symbol of the DLT
   */
  symbol = 'XRP';

  /**
   * @inheritdoc
   */
  constructor(sdk, options) {
    super(sdk, options);

    this.options = options;

    this.rippleAPI = new RippleAPI();

    if (options.privateKey) {
      this.setAccount(options.privateKey);
    }
  }

  /**
   * @inheritdoc
   */
  buildTransaction(fromAddress, toAddress, message, options) {
    if (typeof options.amount === 'undefined') {
      throw new Error('options.amount must be setup');
    }
    if (typeof options.feePrice === 'undefined') {
      throw new Error('options.feePrice must be setup');
    }
    if (typeof options.sequence === 'undefined') {
      throw new Error('options.sequence must be setup');
    }
    if (typeof options.maxLedgerVersion === 'undefined') {
      throw new Error('options.maxLedgerVersion must be setup');
    }
    const amountInXRP = dropsToXrp(options.amount);

    const address = fromAddress;
    const payment = {
      source: {
        address: fromAddress,
        amount: {
          value: amountInXRP,
          currency: 'XRP',
        },
      },
      destination: {
        address: toAddress,
        minAmount: {
          value: amountInXRP,
          currency: 'XRP',
        },
      },
      memos: [{
        data: message,
      }],
    };
    const instructions = {
      maxLedgerVersion: options.maxLedgerVersion,
      sequence: options.sequence,
      fee: options.feePrice,
    };

    return { address, payment, instructions };
  }

  /**
   * @inheritdoc
   */
  _sign(fromAddress, toAddress, message, options) {
    const built = this.buildTransaction(fromAddress, toAddress, message, options);

    return this.rippleAPI.preparePayment(built.address, built.payment, built.instructions)
      .then(
        prepared => this.rippleAPI.sign(prepared.txJSON, this.account.privateKey).signedTransaction,
      );
  }

  /**
   * @inheritdoc
   */
  createAccount() {
    const generated = this.rippleAPI.generateAddress();

    const account = {
      address: generated.address,
      privateKey: generated.secret,
    };

    return account;
  }

  /**
   * @inheritdoc
   */
  setAccount(key) {
    const keypair = deriveKeypair(key);
    const account = {
      address: keypair.publicKey,
      privateKey: key,
    };
    account.address = deriveAddress(keypair.publicKey);
    this.account = account;
  }
}

export default Ripple;
