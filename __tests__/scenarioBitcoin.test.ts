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
      }],
      network: 'testnet',
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
    expect(() => overledger.dlts.bitcoin.sign('2NFj2CVhE5ru7werwXUNCbirUW6KDo2d', 'QNT tt3')).toThrow('The bitcoin account must be setup');
  });

  test('Cannot fund without the address parameter if no account are setup', async () => {
    expect(() => overledger.dlts.bitcoin.fundAccount()).toThrow('The account must be setup');
  });

  test('Can set the account previously created', () => {
    overledger.dlts.bitcoin.setAccount(account.privateKey);

    expect(overledger.dlts.bitcoin.account.privateKey.toWIF()).toBe(account.privateKey);
  });

  test('Can fund the setup account with the default amount', () => {
    overledger.dlts.bitcoin.fundAccount();

    axios.post.mockResolvedValue({ status: 'OK',
    message: null,
    address: 'muW84hNaxfzForQumMihF1Kp6yErJ5bHMD',
    amount: 1,
    txnHash:
     '0f0736ec4d85128edd6fefa770dcf456aa6e2cff737e6f5edf26dea1be67a9bc',
    vout: 1 });
    expect(axios.post).toBeCalledWith(`/faucet/fund/bitcoin/${account.address}/100000000`);
  });

  test('Can fund the setup account with a specific amount', () => {
    overledger.dlts.bitcoin.fundAccount(10);

    axios.post.mockResolvedValue({ status: 'OK',
    message: null,
    address: 'muW84hNaxfzForQumMihF1Kp6yErJ5bHMD',
    amount: 1,
    txnHash:
     '0f0736ec4d85128edd6fefa770dcf456aa6e2cff737e6f5edf26dea1be67a9bc',
    vout: 1 });
    expect(axios.post).toBeCalledWith(`/faucet/fund/bitcoin/${account.address}/10`);
  });

  test('Can fund an account with a specific amount', () => {
    const newAccount = overledger.dlts.bitcoin.createAccount();
    overledger.dlts.bitcoin.fundAccount(10, newAccount.address);

    axios.post.mockResolvedValue({ status: 'OK',
    message: null,
    address: 'muW84hNaxfzForQumMihF1Kp6yErJ5bHMD',
    amount: 1,
    txnHash:
     '0f0736ec4d85128edd6fefa770dcf456aa6e2cff737e6f5edf26dea1be67a9bc',
    vout: 1 });
    expect(axios.post).toBeCalledWith(`/faucet/fund/bitcoin/${newAccount.address}/10`);
  });

  test('Cannot sign a bitcoin transaction without specifying a sequence', () => {
    expect(() => overledger.dlts.bitcoin.sign('2NFj2CVhE5ru7werwXUNCbirUW6KDo2d', 'QNT tt3')).toThrow('options.sequence must be setup');
  });

  test('Cannot sign a bitcoin transaction without specifying a previousTransactionHash', () => {
    expect(() => overledger.dlts.bitcoin.sign('2NFj2CVhE5ru7werwXUNCbirUW6KDo2d', 'QNT tt3', { sequence: 1 })).toThrow('options.previousTransactionHash must be setup');
  });

  // @TODO: Needs to be fix
  test.skip('Can sign a bitcoin transaction', async () => {
    signedTransaction = await overledger.dlts.bitcoin.sign('2NFj2CVhE5ru7werwXUNCbirUW6KDo2d', 'QNT tt3', { sequence: 1, previousTransactionHash: '716b436d084fa8a23cc623411f84bdb581036a79f9519eefb36754c5e6fe1111' });

    expect(signedTransaction.length).toBeGreaterThan(340);
    expect(signedTransaction.startsWith('020')).toBe(true);
  });

  // @TODO: Needs to be fix
  test.skip('Can send a bitcoin signedTransaction', async () => {
    axios.post.mockResolvedValue({ status: 'broadcasted', dlt: 'bitcoin', transactionHash: '0123000000000000000000' });
    await overledger.dlts.bitcoin.send(signedTransaction);

    expect(axios.post).toBeCalledWith(`${overledger.overledgerUri}/transactions`, {
      mappId: 'testmappid',
      dltData:
        [{
          dlt: 'bitcoin',
          signedTransaction: expect.any(String),
        }],
    });
  });

  // @TODO: Needs to be fix
  test.skip('Can signAndSend a bitcoin transaction', async () => {
    axios.post.mockResolvedValue({ status: 'broadcasted', dlt: 'bitcoin', transactionHash: '0123000000000000000000' });
    await overledger.dlts.bitcoin.signAndSend('2NFj2CVhE5ru7werwXUNCbirUW6KDo2d', 'QNT tt3', { sequence: 1, previousTransactionHash: '716b436d084fa8a23cc623411f84bdb581036a79f9519eefb36754c5e6fe1111' });

    expect(axios.post).toBeCalledWith(`${overledger.overledgerUri}/transactions`, {
      mappId: 'testmappid',
      dltData:
        [{
          dlt: 'bitcoin',
          signedTransaction: expect.any(String),
        }],
    });
  });
});
