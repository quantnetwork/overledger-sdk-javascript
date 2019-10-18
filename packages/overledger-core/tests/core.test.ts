import OverledgerSDK from '../src';

describe('Core', () => {
  const mappId = 'mockMappId';
  const bpiKey = 'mockBpiKey';
  let sdk;
  beforeAll(() => {
    const sdkOptions = {
      dlts: [
        { dlt: 'ethereum' },
        { dlt: 'ripple' },
      ],
    };

    sdk = new OverledgerSDK(mappId, bpiKey, sdkOptions);
  });

  test('Should not be able to initialize the connector with a wrong DLT name', () => {
    const mappId = 'mockMappId';
    const bpiKey = 'mockBpiKey';

    const sdkOptions = {
      dlts: [
        { dlt: 'wrongdltname' },
      ],
    };

    try {
      new OverledgerSDK(mappId, bpiKey, sdkOptions);
    } catch (e) {
      console.log(e);
      expect(e).toEqual('Could not find the package for this DLT. Please install @quantnetwork/overledger-dlt-wrongdltname manually.');
    }
  });

  test('getMappId()', () => {
    expect(sdk.getMappId()).toEqual(mappId);
  });


  test('setMappId()', () => {
    const newMappId = 'test';
    sdk.setMappId(newMappId);
    expect(sdk.getMappId()).toEqual(newMappId);
  });


  test('getBpiKey()', () => {
    const newBpiKey = 'test';
    sdk.setBpiKey(newBpiKey);
    expect(sdk.getBpiKey()).toEqual(newBpiKey);
  });
});
