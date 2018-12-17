import axios from 'axios';
import OverledgerSDK from '../src';

jest.mock('axios');

describe('Dlt/Common', () => {

  [
    { type: 'ethereum', symbol: 'ETH' },
    { type: 'ripple', symbol: 'XRP' },
    { type: 'bitcoin', symbol: 'XBT' },
  ].forEach((dlt) => {
    describe(dlt.type, () => {

      let overledger;
      let account;

      beforeAll(() => {
        overledger = new OverledgerSDK('testmappid', 'testbpikey', {
          dlts: [{
            dlt: dlt.type,
          }],
        });

        account = overledger.dlts[dlt.type].createAccount();
      });

      test('Can get name', () => {
        expect(overledger.dlts[dlt.type].name).toBe(dlt.type);
        expect(overledger.dlts[dlt.type].symbol).toBe(dlt.symbol);
      });

      test('Cannot sign a transaction without an account setup', () => {
        expect(() => overledger.dlts[dlt.type].sign(account.address, 'QNT tt3')).toThrow(`The ${dlt.type} account must be setup`);
      });

      test('Cannot fund without the address parameter if no account are setup', async () => {
        expect(() => overledger.dlts[dlt.type].fundAccount()).toThrow('The account must be setup');
      });

      test('Cannot getBalance without the address parameter if no account are setup', async () => {
        expect(() => overledger.dlts[dlt.type].getBalance()).toThrow('The account must be setup');
      });

      test('Can set the account previously created', () => {
        overledger.dlts[dlt.type].setAccount(account.privateKey);

        expect(overledger.dlts[dlt.type].account.address).toBe(account.address);
      });

      test('Can fund the setup account with a specific amount', () => {
        overledger.dlts[dlt.type].fundAccount(10);

        axios.post.mockResolvedValue({ status: 'ok', message: 'successfully added to the queue' });
        expect(axios.post).toBeCalledWith(`/faucet/fund/${dlt.type}/${account.address}/10`);
      });

      test('Can fund an account with a specific amount', () => {
        const newAccount = overledger.dlts[dlt.type].createAccount();
        overledger.dlts[dlt.type].fundAccount(10, newAccount.address);

        axios.post.mockResolvedValue({ status: 'ok', message: 'successfully added to the queue' });
        expect(axios.post).toBeCalledWith(`/faucet/fund/${dlt.type}/${newAccount.address}/10`);
      });

      test('Can getBalance the setup account', () => {
        overledger.dlts[dlt.type].getBalance();

        axios.post.mockResolvedValue({ unit: 'wei', value: '0' });
        expect(axios.post).toBeCalledWith('/balances', {
          dlt: dlt.type,
          address: account.address,
        });
      });

      test('Can getBalance an account with a specific address', () => {
        const newAccount = overledger.dlts[dlt.type].createAccount();
        overledger.dlts[dlt.type].getBalance(newAccount.address);

        axios.post.mockResolvedValue({ unit: 'wei', value: '0' });
        expect(axios.post).toBeCalledWith('/balances', {
          dlt: dlt.type,
          address: newAccount.address,
        });
      });
    });
  });
});
