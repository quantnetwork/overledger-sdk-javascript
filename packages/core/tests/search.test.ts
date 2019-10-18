import axios from 'axios';
import OverledgerSDK from '../src';
import Search from '@overledger/search';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Search', () => {
  let search;
  beforeAll(() => {
    const mappId = 'mockMappId';
    const bpiKey = 'mockBpiKey';

    const options = {
      dlts: [],
      provider: {
        timeout: 5000,
      },
    };

    const sdk = new OverledgerSDK(mappId, bpiKey, options);
    search = new Search(sdk);

    expect(sdk.search).toEqual(search);
    expect(search.sdk).toEqual(sdk);
  });

  test('Can search for a transaction by transaction Hash', async () => {
    const transactionHash = '6F8E4F27A4D5FD75F8551D6C8AE803962070CC49E7B011D1157D3B5DEE981ED1';
    mockedAxios.get.mockResolvedValue({
      dlt: 'ripple',
      data: {
        type: 'payment',
        address: 'rEuggJAHrA3RvepChNHMRT1HJy87mJaWHU',
        sequence: 11,
        id: '6F8E4F27A4D5FD75F8551D6C8AE803962070CC49E7B011D1157D3B5DEE981ED1',
        specification: {},
        outcome: {},
      },
    } as any);
    await search.getTransaction(transactionHash);

    expect(mockedAxios.get).toBeCalledWith(`/transactions/${transactionHash}`);
  });

  test('Can search for a block by dlt and Hash', async () => {
    const dlt = 'ripple';
    const hash = 'CB260D04A2571F46367421040EA67096658C44659054C0FBD83D5DC2E4251734';
    mockedAxios.get.mockResolvedValue({
      stateHash: '0D86ED823D87C67EA459F3EEC6388C37C7B1CBB0D05C7895213919B285954896',
      closeTime: '2019-09-13T16:40:12.000Z',
      closeTimeResolution: 10,
      closeFlags: 0,
      ledgerHash: 'CB260D04A2571F46367421040EA67096658C44659054C0FBD83D5DC2E4251734',
      ledgerVersion: 376939,
      parentLedgerHash: '9CD5FE11364BAA0171E81DEBF5C49C61683D35B325EA63D6C05D6D3478FCC609',
      parentCloseTime: '2019-09-13T16:40:11.000Z',
      totalDrops: '99999996355638984',
      transactionHash: '51F73895F8E5046CC9939F1533E4889D65BCD9562E83088850A2907D03394B0F',
      transactions: []
    } as any);

    await search.getBlockByDltAndHash(dlt, hash);

    expect(axios.get).toBeCalledWith(`/${dlt}/blocks/${hash}`);
  });

  test('Can search for a block by dlt and Number', async () => {
    const dlt = 'ripple';
    const number = 376939;
    mockedAxios.get.mockResolvedValue({
      stateHash: '0D86ED823D87C67EA459F3EEC6388C37C7B1CBB0D05C7895213919B285954896',
      closeTime: '2019-09-13T16:40:12.000Z',
      closeTimeResolution: 10,
      closeFlags: 0,
      ledgerHash: 'CB260D04A2571F46367421040EA67096658C44659054C0FBD83D5DC2E4251734',
      ledgerVersion: 376939,
      parentLedgerHash: '9CD5FE11364BAA0171E81DEBF5C49C61683D35B325EA63D6C05D6D3478FCC609',
      parentCloseTime: '2019-09-13T16:40:11.000Z',
      totalDrops: '99999996355638984',
      transactionHash: '51F73895F8E5046CC9939F1533E4889D65BCD9562E83088850A2907D03394B0F',
      transactions: []
    } as any);

    await search.getBlockByDltAndNumber(dlt, number);

    expect(axios.get).toBeCalledWith(`/${dlt}/blocks/${number}`);
  });
});
