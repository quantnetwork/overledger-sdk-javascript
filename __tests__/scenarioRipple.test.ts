import axios from 'axios';
import OverledgerSDK from '../src';

jest.mock('axios');

describe('Dlt/Ripple', () => {
  let overledger;
  let account;
  let signedTransaction;

  beforeAll(() => {
    overledger = new OverledgerSDK('testmappid', 'testbpikey', {
      dlts: [{
        dlt: 'ripple',
      }],
    });
  });

  test('Can get name', () => {
    expect(overledger.dlts.ripple.name).toBe('ripple');
    expect(overledger.dlts.ripple.symbol).toBe('XRP');
  });

  test('Can create an account', () => {
    account = overledger.dlts.ripple.createAccount();

    expect(account.privateKey).toMatch(/s[1-9A-HJ-NP-Za-km-z]{28}/);
    expect(account.address).toMatch(/r[1-9A-HJ-NP-Za-km-z]{25,34}/);
  });

  test('Cannot sign a ripple transaction without an account setup', () => {
    expect(() => overledger.dlts.ripple.sign('rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh', 'QNT tt3')).toThrow('The account must be setup');
  });

  test('Can set the account previously created', () => {
    overledger.dlts.ripple.setAccount(account.privateKey);

    expect(overledger.dlts.ripple.account.privateKey).toBe(account.privateKey);
  });

  test('Cannot sign a ripple transaction without specifying an amount', () => {
    expect(() => overledger.dlts.ripple.sign('rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh', 'QNT tt3')).toThrow('options.amount must be setup');
  });

  test('Cannot sign a ripple transaction without specifying a feePrice', () => {
    expect(() => overledger.dlts.ripple.sign('rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh', 'QNT tt3', {
      amount: '1',
    })).toThrow('options.feePrice must be setup');
  });

  test('Cannot sign a ripple transaction without specifying a sequence', () => {
    expect(() => overledger.dlts.ripple.sign('rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh', 'QNT tt3', {
      amount: '1', feePrice: '0.000012',
    })).toThrow('options.sequence must be setup');
  });

  test('Cannot sign a ripple transaction without specifying a maxLedgerVersion', () => {
    expect(() => overledger.dlts.ripple.sign('rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh', 'QNT tt3', {
      amount: '1', feePrice: '0.000012', sequence: '1',
    })).toThrow('options.maxLedgerVersion must be setup');
  });

  test('Can sign a ripple transaction', async () => {
    signedTransaction = await overledger.dlts.ripple.sign('rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh', 'QNT tt3', {
      amount: '1', feePrice: '0.000012', sequence: 1, maxLedgerVersion: 100000000,
    });

    expect(signedTransaction.length).toBeGreaterThan(200);
    expect(signedTransaction.startsWith('120')).toBe(true);
  });

  test('Can send a ripple signedTransaction', async () => {
    axios.post.mockResolvedValue({ status: 'broadcasted', dlt: 'ripple', transactionHash: 'E8F7ED33E0FD8A06C33A00165508A556A958F2DC53AF4C5FC40FD93FA1A50693' });
    await overledger.dlts.ripple.send(signedTransaction);

    expect(axios.post).toBeCalledWith(`${overledger.overledgerUri}/transactions`, {
      mappId: 'testmappid',
      dltData:
        [{
          dlt: 'ripple',
          signedTransaction: expect.any(String),
        }],
    });
  });

  test('Can signAndSend a ripple transaction', async () => {
    axios.post.mockResolvedValue({ status: 'broadcasted', dlt: 'ripple', transactionHash: 'E8F7ED33E0FD8A06C33A00165508A556A958F2DC53AF4C5FC40FD93FA1A50693' });
    await overledger.dlts.ripple.signAndSend('rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh', 'QNT tt3', {
      amount: '1', feePrice: '0.000012', sequence: 1, maxLedgerVersion: 100000000,
    });

    expect(axios.post).toBeCalledWith(`${overledger.overledgerUri}/transactions`, {
      mappId: 'testmappid',
      dltData:
        [{
          dlt: 'ripple',
          signedTransaction: expect.any(String),
        }],
    });
  });
});
