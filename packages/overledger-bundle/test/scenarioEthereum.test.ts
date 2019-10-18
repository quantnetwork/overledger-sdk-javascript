import axios from 'axios';
import OverledgerSDK from '../src';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Dlt/Ethereum', () => {
  let overledger;
  let account;
  let signedTransaction;

  beforeAll(() => {
    overledger = new OverledgerSDK('testmappid', 'testbpikey', {
      dlts: [{ dlt: 'ethereum', }],
    });
  });

  test('Can create an account', () => {
    account = overledger.dlts.ethereum.createAccount();
    overledger.dlts.ethereum.setAccount(account.privateKey);

    expect(account.privateKey.length).toBe(66);
    expect(account.address.length).toBe(42);
  });

  test('Cannot sign an ethereum transaction without defining the options', () => {
    expect(() => overledger.dlts.ethereum.sign('0x0000000000000000000000000000000000000000', 'message')).toThrow('Transaction options must be defined.');
  });

  test('Cannot sign an ethereum transaction without specifying an amount', () => {
    expect(() => overledger.dlts.ethereum.sign('0x0000000000000000000000000000000000000000', 'message', {})).toThrow('options.amount must be set up');
  });

  test('Cannot sign an ethereum transaction without specifying an feeLimit', () => {
    expect(() => overledger.dlts.ethereum.sign('0x0000000000000000000000000000000000000000', 'message', {
      amount: '0',
    })).toThrow('options.feeLimit must be set up');
  });

  test('Cannot sign an ethereum transaction without specifying an feePrice', () => {
    expect(() => overledger.dlts.ethereum.sign('0x0000000000000000000000000000000000000000', 'message', {
      amount: '0', feeLimit: '100',
    })).toThrow('options.feePrice must be set up');
  });

  test('Cannot sign an ethereum transaction without specifying a sequence', () => {
    expect(() => overledger.dlts.ethereum.sign('0x0000000000000000000000000000000000000000', 'message', {
      amount: '0', feeLimit: '100', feePrice: '1',
    })).toThrow('options.sequence must be set up');
  });

  test('Can sign an ethereum transaction', async () => {
    signedTransaction = await overledger.dlts.ethereum.sign('0x0000000000000000000000000000000000000000', 'message', {
      amount: '0', feeLimit: '100', feePrice: '1', sequence: 1,
    });

    expect(signedTransaction.length).toBeGreaterThan(200);
    expect(signedTransaction.startsWith('0x')).toBe(true);
  });

  test('Can send an ethereum signedTransaction', async () => {
    mockedAxios.post.mockResolvedValue({ status: 'broadcasted', dlt: 'ethereum', transactionHash: '0x712df767d7adea8a16aebbf080bc14daf21d3f00d3f95817db0b45abe7631711' } as any);
    const signedTransactionRequest = {
      dlt: 'ethereum',
      fromAddress: '0x0000000000000000000000000000000000000000',
      amount: 0,
      signedTransaction: {
        signatures: [],
        transactions: [signedTransaction],
      },
    }
    await overledger.dlts.ethereum.send(signedTransactionRequest);

    expect(mockedAxios.post).toBeCalledWith('/transactions', {
      mappId: 'testmappid',
      dltData: [{
        dlt: 'ethereum',
        fromAddress: expect.any(String),
        amount: expect.any(Number),
        signedTransaction: expect.any(Object),
      }],
    });
  });
});
