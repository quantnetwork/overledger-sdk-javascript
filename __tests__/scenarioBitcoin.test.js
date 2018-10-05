import axios from 'axios';
import OverledgerSDK from '../src';

jest.mock('axios');

describe('Dlt/Bitcoin', () => {
  let overledger;
  let account;
  let signedTransaction;

  beforeAll(() => {
    overledger = new OverledgerSDK('testmappid', 'testbpikey', {
      dlts: [{
        dlt: 'bitcoin',
        network: 'testnet',
      }],
    });
  });

  test('Can get name', () => {
    expect(overledger.dlts.bitcoin.name).toBe('bitcoin');
    expect(overledger.dlts.bitcoin.symbol).toBe('XBT');
  });

  test('Can create a account', () => {
    account = overledger.dlts.bitcoin.createAccount();

    expect(account.privateKey.length).toBe(52);
    expect(account.address.length).toBe(34);
  });

  test('Cannot sign a bitcoin transaction without a account setup', () => {
    expect(() => overledger.dlts.bitcoin.sign('2NFj2CVhE5ru7werwXUNCbirUW6KDo2d', '2NFj2CVhE5ru7werwXUNCbirUW6KDo2d', 'QNT tt3')).toThrow('The account must be setup');
  });

  test('Can set the account previously created', () => {
    overledger.dlts.bitcoin.setAccount(account.privateKey);

    expect(overledger.dlts.bitcoin.account.toWIF()).toBe(account.privateKey);
  });

  test('Cannot sign a bitcoin transaction without specifying a sequence', () => {
    expect(() => overledger.dlts.bitcoin.sign('2NFj2CVhE5ru7werwXUNCbirUW6KDo2d', '2NFj2CVhE5ru7werwXUNCbirUW6KDo2d', 'QNT tt3')).toThrow('options.sequence must be setup');
  });

  test('Cannot sign a bitcoin transaction without specifying a previousTransactionHash', () => {
    expect(() => overledger.dlts.bitcoin.sign('2NFj2CVhE5ru7werwXUNCbirUW6KDo2d', '2NFj2CVhE5ru7werwXUNCbirUW6KDo2d', 'QNT tt3', { sequence: 1 })).toThrow('options.previousTransactionHash must be setup');
  });

  test('Can sign a bitcoin transaction', async () => {
    signedTransaction = await overledger.dlts.bitcoin.sign('2NFj2CVhE5ru7werwXUNCbirUW6KDo2d', '2NFj2CVhE5ru7werwXUNCbirUW6KDo2d', 'QNT tt3', { sequence: 1, previousTransactionHash: '716b436d084fa8a23cc623411f84bdb581036a79f9519eefb36754c5e6fe1111' });

    expect(signedTransaction.length).toBeGreaterThan(340);
    expect(signedTransaction.startsWith('020')).toBe(true);
  });

  test('Can send a bitcoin signedTransaction', async () => {
    axios.post.mockResolvedValue({ status: 'broadcasted', dlt: 'bitcoin', transactionHash: '0123000000000000000000' });
    await overledger.dlts.bitcoin.send(signedTransaction);

    expect(axios.post).toBeCalledWith(`${overledger.overledgerUri}/transactions`, {
      mappId: 'testmappid',
      dltData:
        [{
          dlt: 'bitcoin',
          amount: 0,
          callbackUrl: '',
          changeAddress: '',
          fee: 0,
          feeLimit: 0,
          fromAddress: '',
          message: '',
          toAddress: '',
          signedTransaction: expect.any(String),
        }],
    });
  });

  test('Can sendAndSign a bitcoin transaction', async () => {
    axios.post.mockResolvedValue({ status: 'broadcasted', dlt: 'bitcoin', transactionHash: '0123000000000000000000' });
    await overledger.dlts.bitcoin.sendAndSign('2NFj2CVhE5ru7werwXUNCbirUW6KDo2d', '2NFj2CVhE5ru7werwXUNCbirUW6KDo2d', 'QNT tt3', { sequence: 1, previousTransactionHash: '716b436d084fa8a23cc623411f84bdb581036a79f9519eefb36754c5e6fe1111' });

    expect(axios.post).toBeCalledWith(`${overledger.overledgerUri}/transactions`, {
      mappId: 'testmappid',
      dltData:
        [{
          dlt: 'bitcoin',
          amount: 0,
          callbackUrl: '',
          changeAddress: '',
          fee: 0,
          feeLimit: 0,
          fromAddress: '',
          message: '',
          toAddress: '',
          signedTransaction: expect.any(String),
        }],
    });
  });
});
