import axios from 'axios';
import OverledgerSDK from '../src';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Dlt/Ripple', () => {
  let overledger;
  let account;
  let signedTransaction;

  beforeAll(() => {
    overledger = new OverledgerSDK('testmappid', 'testbpikey', {
      dlts: [{ dlt: 'ripple', }],
    });
  });

  test('Can create an account', () => {
    account = overledger.dlts.ripple.createAccount();
    overledger.dlts.ripple.setAccount(account.privateKey);

    expect(account.privateKey).toMatch(/s[1-9A-HJ-NP-Za-km-z]{28}/);
    expect(account.address).toMatch(/r[1-9A-HJ-NP-Za-km-z]{25,34}/);
  });

  test('Cannot sign a ripple transaction without defining the options', () => {
    expect(() => overledger.dlts.ripple.sign('rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh', 'message')).toThrow('Transaction options must be defined.');
  });

  test('Cannot sign a ripple transaction without specifying an amount', () => {
    expect(() => overledger.dlts.ripple.sign('rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh', 'message', {})).toThrow('options.amount must be set up');
  });

  test('Cannot sign a ripple transaction without specifying a feePrice', () => {
    expect(() => overledger.dlts.ripple.sign('rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh', 'message', {
      amount: '1',
    })).toThrow('options.feePrice must be set up');
  });

  test('Cannot sign a ripple transaction without specifying a sequence', () => {
    expect(() => overledger.dlts.ripple.sign('rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh', 'message', {
      amount: '1', feePrice: '12',
    })).toThrow('options.sequence must be set up');
  });

  test('Cannot sign a ripple transaction without specifying a maxLedgerVersion', () => {
    expect(() => overledger.dlts.ripple.sign('rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh', 'message', {
      amount: '1', feePrice: '12', maxLedgerVersion: '4294967295',
    })).toThrow('options.sequence must be set up');
  });

  test('Can sign a ripple transaction', async () => {
    signedTransaction = await overledger.dlts.ripple.sign('rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh', 'message', {
      amount: '1', feePrice: '12', sequence: 1, maxLedgerVersion: '100000000',
    });

    expect(signedTransaction.length).toBeGreaterThan(200);
    expect(signedTransaction.startsWith('120')).toBe(true);
  });

  test('Can send a ripple signedTransaction', async () => {
    mockedAxios.post.mockResolvedValue({ status: 'broadcasted', dlt: 'ripple', transactionHash: 'E8F7ED33E0FD8A06C33A00165508A556A958F2DC53AF4C5FC40FD93FA1A50693' } as any);
    const signedTransactionRequest = {
      dlt: 'ripple',
      fromAddress: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
      amount: 1,
      signedTransaction: {
        signatures: [],
        transactions: [signedTransaction],
      },
    }
    
    await overledger.dlts.ripple.send(signedTransactionRequest);

    expect(mockedAxios.post).toBeCalledWith('/transactions', {
      mappId: 'testmappid',
      dltData:
        [{
          dlt: 'ripple',
          fromAddress: expect.any(String),
          amount: expect.any(Number),
          signedTransaction: expect.any(Object),
        }],
    });
  });
});
