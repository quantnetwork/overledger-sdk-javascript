import axios from 'axios';
import OverledgerSDK from '../src';

jest.mock('axios');

describe('Dlt/BitcoinAndEthereum', () => {
  describe('Main read functions', () => {
    test('Can read transactions from mappId', async () => {
      const overledger = new OverledgerSDK('testmappid', 'testbpikey', {
        dlts: [
          {
            dlt: 'bitcoin',
          },
          {
            dlt: 'ethereum',
          },
        ],
      });

      axios.get.mockResolvedValue([
        {
          mappId: 'mappTestId',
          overledgerTransactionId: 'c2559f8d-d181-4ba3-9012-a47d6b6c6111',
          timestamp: '2018-09-07T10:29:50.695Z',
          dltData: [
            {
              dlt: 'ethereum',
              transactionHash: '0xa3f8277dd54f1341dec3dfae3ad844ad8a226faa511e05b7dfe1e9de55481111',
              status: 'broadcasted',
              errorReason: null,
              links: [],
            },
          ],
        },
      ]);

      await overledger.readTransactionsByMappId();

      expect(axios.get).toBeCalledWith(`${overledger.overledgerUri}/mapp/testmappid/transactions`);
    });

    test('Can read transactions by overledger transaction id', async () => {
      const overledger = new OverledgerSDK('testmappid', 'testbpikey', {
        dlts: [
          {
            dlt: 'bitcoin',
          },
          {
            dlt: 'ethereum',
          },
        ],
      });

      axios.get.mockResolvedValue({
        mappId: 'mappTestId',
        overledgerTransactionId: '70cb4832-bbd0-400f-a6d8-2add51deb111',
        timestamp: '2018-09-07T23:36:49.832Z',
        dltData: [
          {
            dlt: 'ethereum',
            transactionHash: '0x712df767d7adea8a16aebbf080bc14daf21d3f00d3f95817db0b45abe7631111',
            status: 'broadcasted',
            errorReason: null,
            links: [],
          },
        ],
      });

      const transactionId = '70cb4832-bbd0-400f-a6d8-2add51deb111';
      await overledger.readByTransactionId(transactionId);

      expect(axios.get).toBeCalledWith(`${overledger.overledgerUri}/transactions/${transactionId}`);
    });
  });

  describe('Using bitcoin & ethereum without injecting the privatekey in the DLT array', () => {
    let overledger;
    let signedTransactions;

    test('Load bitcoin and ethereum DLTs', async () => {
      overledger = new OverledgerSDK('testmappid', 'testbpikey', {
        dlts: [
          {
            dlt: 'bitcoin',
          },
          {
            dlt: 'ethereum',
          },
        ],
      });

      expect(overledger.dlts.ethereum).toBeDefined();
      expect(overledger.dlts.bitcoin).toBeDefined();
    });

    test('Can generate & set account for ethereum & bitcoin', async () => {
      const bitcoinAccount = overledger.dlts.bitcoin.createAccount();
      const ethereumAccount = overledger.dlts.ethereum.createAccount();

      overledger.dlts.bitcoin.setAccount(bitcoinAccount.privateKey);
      overledger.dlts.ethereum.setAccount(ethereumAccount.privateKey);

      expect(overledger.dlts.bitcoin.account.toWIF()).toBe(bitcoinAccount.privateKey);
      expect(overledger.dlts.ethereum.account.privateKey).toBe(ethereumAccount.privateKey);
    });

    test('Can sign bitcoin & ethereum transactions', async () => {
      signedTransactions = await overledger.sign([
        {
          dlt: 'bitcoin',
          fromAddress: '2NFj2CVhE5ru7werwXUNCbirUW6KDo2d',
          toAddress: '2NFj2CVhE5ru7werwXUNCbirUW6KDo2d',
          message: 'QNT test',
          options: {
            sequence: 0,
            previousTransactionHash: '716b436d084fa8a23cc623411f84bdb581036a79f9519eefb36754c5e6fe1111',
          },
        },
        {
          dlt: 'ethereum',
          fromAddress: '0x930724bd974260Eb6C859abE2144f7e7ea73d7C1',
          toAddress: '0x0000000000000000000000000000000000000000',
          message: 'QNT test',
          options: {
            amount: 0,
            feeLimit: 100,
            feePrice: 1,
            sequence: 1,
          },
        },
      ]);

      expect(signedTransactions).toEqual([
        {
          dlt: 'bitcoin',
          signedTransaction: expect.any(String),
        },
        {
          dlt: 'ethereum',
          signedTransaction: expect.any(String),
        },
      ]);
    });

    test('Can send bitcoin & ethereum signedTransactions', async () => {
      axios.post.mockResolvedValue([
        { dlt: 'bitcoin', status: 'broadcasted', transactionHash: '716b436d084fa8a23cc623411f84bdb581036a79f9519eefb36754c5e6fe1111' },
        { dlt: 'ethereum', status: 'broadcasted', transactionHash: '0x712df767d7adea8a16aebbf080bc14daf21d3f00d3f95817db0b45abe7631711' },
      ]);

      await overledger.send(signedTransactions);

      expect(axios.post).toBeCalledWith(`${overledger.overledgerUri}/transactions`, {
        mappId: 'testmappid',
        dltData:
          [
            {
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
            },
            {
              dlt: 'ethereum',
              amount: 0,
              callbackUrl: '',
              changeAddress: '',
              fee: 0,
              feeLimit: 0,
              fromAddress: '',
              message: '',
              toAddress: '',
              signedTransaction: expect.any(String),
            },
          ],
      });
    });
  });

  describe('Using bitcoin & ethereum with injecting the privatekey in the DLT array', () => {
    let overledger;
    let signedTransactions;

    test('Load bitcoin and ethereum DLTs', async () => {
      overledger = new OverledgerSDK('testmappid', 'testbpikey', {
        dlts: [
          {
            dlt: 'bitcoin', privateKey: 'cR6RJbsZWKdSu18MhFp6vJnBMXx1syHjMmhfVSfZAqjCakB8SBg5',
          },
          {
            dlt: 'ethereum', privateKey: '0xe58af4f4a4a509b0190d87bdcd6d05ec4c274cfdd2282f4d196da6466d56c621',
          },
        ],
      });

      expect(overledger.dlts.ethereum).toBeDefined();
      expect(overledger.dlts.bitcoin).toBeDefined();
    });

    test('Can generate & set account for ethereum & bitcoin', async () => {
      const bitcoinAccount = overledger.dlts.bitcoin.createAccount();
      const ethereumAccount = overledger.dlts.ethereum.createAccount();

      overledger.dlts.bitcoin.setAccount(bitcoinAccount.privateKey);
      overledger.dlts.ethereum.setAccount(ethereumAccount.privateKey);

      expect(overledger.dlts.bitcoin.account.toWIF()).toBe(bitcoinAccount.privateKey);
      expect(overledger.dlts.ethereum.account.privateKey).toBe(ethereumAccount.privateKey);
    });

    test('Can sign bitcoin & ethereum transactions', async () => {
      signedTransactions = await overledger.sign([
        {
          dlt: 'bitcoin',
          fromAddress: '2NFj2CVhE5ru7werwXUNCbirUW6KDo2d',
          toAddress: '2NFj2CVhE5ru7werwXUNCbirUW6KDo2d',
          message: 'QNT test',
          options: {
            sequence: 0,
            previousTransactionHash: '716b436d084fa8a23cc623411f84bdb581036a79f9519eefb36754c5e6fe1111',
          },
        },
        {
          dlt: 'ethereum',
          fromAddress: '0x930724bd974260Eb6C859abE2144f7e7ea73d7C1',
          toAddress: '0x0000000000000000000000000000000000000000',
          message: 'QNT test',
          options: {
            amount: 0,
            feeLimit: 100,
            feePrice: 1,
            sequence: 1,
          },
        },
      ]);

      expect(signedTransactions).toEqual([
        {
          dlt: 'bitcoin',
          signedTransaction: expect.any(String),
        },
        {
          dlt: 'ethereum',
          signedTransaction: expect.any(String),
        },
      ]);
    });

    test('Can send bitcoin & ethereum signedTransactions', async () => {
      axios.post.mockResolvedValue([
        { dlt: 'bitcoin', status: 'broadcasted', transactionHash: '716b436d084fa8a23cc623411f84bdb581036a79f9519eefb36754c5e6fe1111' },
        { dlt: 'ethereum', status: 'broadcasted', transactionHash: '0x712df767d7adea8a16aebbf080bc14daf21d3f00d3f95817db0b45abe7631711' },
      ]);

      await overledger.send(signedTransactions);

      expect(axios.post).toBeCalledWith(`${overledger.overledgerUri}/transactions`, {
        mappId: 'testmappid',
        dltData:
          [
            {
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
            },
            {
              dlt: 'ethereum',
              amount: 0,
              callbackUrl: '',
              changeAddress: '',
              fee: 0,
              feeLimit: 0,
              fromAddress: '',
              message: '',
              toAddress: '',
              signedTransaction: expect.any(String),
            },
          ],
      });
    });
  });
});
