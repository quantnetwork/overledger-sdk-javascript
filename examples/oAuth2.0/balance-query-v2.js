//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;

//This class is the example of how we can use new way of authorising with tokens.
//we currently don't have /v2 in our environment.
//The version 2 for creating overledgerSDk is with the use of 'accessToken' and the 
//provider

const ethereumAddress = '0x650A87cfB9165C9F4Ccc7B971D971f50f753e761';
const xrpAddress = 'rhTa8RGotyJQAW8sS2tFVVfvcHYXaps9hC';
const accessToken = '<accessToken>'; //access token that is issued by authorisation server

; (async () => {
  try {

    const overledger = new OverledgerSDK(accessToken,
      {
        dlts: [{ dlt: DltNameOptions.ETHEREUM }, { dlt: DltNameOptions.XRP_LEDGER }],
        provider: { network: 'testnet' },
      });

    const array = [
      {
        dlt: DltNameOptions.ETHEREUM,
        address: ethereumAddress,
      },
      {
        dlt: DltNameOptions.XRP_LEDGER,
        address: xrpAddress,
      },
    ];

    const balances = await overledger.getBalances(array);
    console.log('Balances:\n', balances.data);
    console.log("");

  } catch (e) {
    console.error('error', e.stack);
  }
})();
