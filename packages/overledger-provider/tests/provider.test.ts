import Provider from '../src';

describe('Provider', () => {
  test('Can construct the class without any options', () => {
    const mappId = 'mockMappId';
    const bpiKey = 'mockBpiKey';

    const network = new Provider(mappId, bpiKey);

    expect(network.mappId).toEqual(mappId);
    expect(network.bpiKey).toEqual(bpiKey);
    expect(network.options).toEqual({});
    expect(network.network).toEqual('testnet');
  });

  test('Can construct the class with options', () => {
    const mappId = 'mockMappId';
    const bpiKey = 'mockBpiKey';

    const options = {
      timeout: 5000,
      network: 'mainnet',
    };

    const network = new Provider(mappId, bpiKey, options);

    expect(network.mappId).toEqual(mappId);
    expect(network.bpiKey).toEqual(bpiKey);
    expect(network.options).toEqual(options);
    expect(network.network).toEqual('mainnet');
  });

  test('Can construct the class with a different network', () => {
    const mappId = 'mockMappId';
    const bpiKey = 'mockBpiKey';

    const options = {
      timeout: 5000,
      network: 'differentnetwork',
    };

    const network = new Provider(mappId, bpiKey, options);

    expect(network.mappId).toEqual(mappId);
    expect(network.bpiKey).toEqual(bpiKey);
    expect(network.options).toEqual(options);
    expect(network.network).toEqual(options.network);
  });

  describe('createRequest()', () => {
    const options = {
      timeout: 5000,
      network: 'mainnet',
    };

    let network;
    beforeAll(() => {
      const mappId = 'mockMappId';
      const bpiKey = 'mockBpiKey';

      network = new Provider(mappId, bpiKey, options);
    });

    test('Can create a request without a path', () => {
      const request = network.createRequest();

      expect(request.defaults.timeout).toEqual(options.timeout);
      expect(request.defaults.baseURL).toEqual('https://bpi.overledger.io/v1');
    });

    test('Can create a request with a path', () => {
      const request = network.createRequest('/test');

      expect(request.defaults.timeout).toEqual(options.timeout);
      expect(request.defaults.baseURL).toEqual('https://bpi.overledger.io/v1/test');
    });
  });
});
