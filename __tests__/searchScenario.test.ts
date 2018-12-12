import axios from 'axios';
import OverledgerSDK from '../src';

jest.mock('axios');

describe('Search', () => {
  let overledger;

  beforeAll(() => {
    overledger = new OverledgerSDK('testmappid', 'testbpikey', {
      dlts: [{
        dlt: 'bitcoin',
      }],
    });
  });

  test('Can search for a transaction by transaction Hash', async () => {
    const transactionHash = 'a91894a935135295ba9ba65cc142b59d9c729e71a063528d90e05152ca97b5d0';
    axios.get.mockResolvedValue({
      dlt: 'bitcoin',
      data: {
        m: {
          amount: 0,
          confirmations: 4,
          generated: true,
          blockhash: '7344f80e63ebdcb88f778c672f1a9c4079d5c825eb499cef31e9fa4af9bd964a',
          blockindex: 0,
          blocktime: 1542972409,
          txid: transactionHash,
          walletconflicts: [],
          time: 1542972409,
          timereceived: 1542972409,
          'bip125-replaceable': 'no',
          details: [
            {
              account: '',
              address: 'mtDXgSPMdQKZjPbBDdXp76hGEr1eURdAnY',
              category: 'immature',
              amount: 25.00009766,
              vout: 0,
            },
          ],
          hex: '020000000001010000000000000000000000000000000000000000000000000000000000000000ffffffff0502e1000101ffffffff02261f0395000000002321036cc71c479d3183a48fa5ade2d80252518b4e9c068cf114d5e593eb9034b3a3fcac0000000000000000266a24aa21a9edca0b61538213b30dd40ac1cb7127f7fe86b13ae07ac88d61a2fc4ec2a1eed2890120000000000000000000000000000000000000000000000000000000000000000000000000'
        },
      },
    });
    await overledger.search.getTransaction(transactionHash);

    expect(axios.get).toBeCalledWith(`/transactions/${transactionHash}`);
  });

  test('Can search for a block by dlt and Hash', async () => {
    const dlt = 'bitcoin';
    const hash = '7344f80e63ebdcb88f778c672f1a9c4079d5c825eb499cef31e9fa4af9bd964a';
    axios.get.mockResolvedValue({
      dlt,
      data: {
        m: {
          amount: 0,
          confirmations: 4,
          generated: true,
          blockhash: '7344f80e63ebdcb88f778c672f1a9c4079d5c825eb499cef31e9fa4af9bd964a',
          blockindex: 0,
          blocktime: 1542972409,
          txid: hash,
          walletconflicts: [],
          time: 1542972409,
          timereceived: 1542972409,
          'bip125-replaceable': 'no',
          details: [
            {
              account: '',
              address: 'mtDXgSPMdQKZjPbBDdXp76hGEr1eURdAnY',
              category: 'immature',
              amount: 25.00009766,
              vout: 0,
            },
          ],
          hex: '020000000001010000000000000000000000000000000000000000000000000000000000000000ffffffff0502e1000101ffffffff02261f0395000000002321036cc71c479d3183a48fa5ade2d80252518b4e9c068cf114d5e593eb9034b3a3fcac0000000000000000266a24aa21a9edca0b61538213b30dd40ac1cb7127f7fe86b13ae07ac88d61a2fc4ec2a1eed2890120000000000000000000000000000000000000000000000000000000000000000000000000'
        },
      },
    });

    await overledger.search.getBlockByDltAndHash('bitcoin', hash);

    expect(axios.get).toBeCalledWith(`/chains/${dlt}/blocks/byHash/${hash}`);
  });

  test('Can search for a block by dlt and Number', async () => {
    const dlt = 'bitcoin';
    const number = 42;
    axios.get.mockResolvedValue({
      dlt,
      data: {
        m: {
          amount: 0,
          confirmations: 4,
          generated: true,
          blockhash: '7344f80e63ebdcb88f778c672f1a9c4079d5c825eb499cef31e9fa4af9bd964a',
          blockindex: number,
          blocktime: 1542972409,
          txid: '7344f80e63ebdcb88f778c672f1a9c4079d5c825eb499cef31e9fa4af9bd964a',
          walletconflicts: [],
          time: 1542972409,
          timereceived: 1542972409,
          'bip125-replaceable': 'no',
          details: [
            {
              account: '',
              address: 'mtDXgSPMdQKZjPbBDdXp76hGEr1eURdAnY',
              category: 'immature',
              amount: 25.00009766,
              vout: 0,
            },
          ],
          hex: '020000000001010000000000000000000000000000000000000000000000000000000000000000ffffffff0502e1000101ffffffff02261f0395000000002321036cc71c479d3183a48fa5ade2d80252518b4e9c068cf114d5e593eb9034b3a3fcac0000000000000000266a24aa21a9edca0b61538213b30dd40ac1cb7127f7fe86b13ae07ac88d61a2fc4ec2a1eed2890120000000000000000000000000000000000000000000000000000000000000000000000000'
        },
      },
    });
    await overledger.search.getBlockByDltAndNumber('bitcoin', number);

    expect(axios.get).toBeCalledWith(`/chains/${dlt}/blocks/byNumber/${number}`);
  });
});
