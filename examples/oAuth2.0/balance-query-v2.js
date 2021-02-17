//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;

//This class is the example of how we can use new way of authorising with tokens.
//we currently don't have /v2 in our environment.
//The version 2 for creating overledgerSDk is with the use of 'accessToken' and the 
//provider

const ethereumAddress = '0x650A87cfB9165C9F4Ccc7B971D971f50f753e761';
const xrpAddress = 'rhTa8RGotyJQAW8sS2tFVVfvcHYXaps9hC';

; (async () => {
  try {

    const overledger = new OverledgerSDK('eyJraWQiOiJ0UUtsM01LUFJuOEZJRmhCdng0Y3JETnU4MTNscVhkbVFjR05ZWmxFaWRrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIyZmVjODFkYS0xYzZlLTQ1YjEtODM3OC04OGYxNDU5MGU4ZGYiLCJldmVudF9pZCI6ImVlNzNiMDJjLTA3NTAtNDRkMi04OTZiLTUwNTc5Y2NkZTc3OSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoicGhvbmUgb3BlbmlkIHJzMlwvd3JpdGUudHJhbnNhY3Rpb24gcHJvZmlsZSByczJcL3JlYWQudHJhbnNhY3Rpb24gcnMyXC9zZWFyY2gudHJhbnNhY3Rpb24gZW1haWwgcnMzXC93ZWJob29rLnJlYWQgcnMzXC93ZWJob29rLndyaXRlIiwiYXV0aF90aW1lIjoxNjEzNTcwNjcxLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9Fc0QyT1VUREQiLCJleHAiOjE2MTM1NzQyNzEsImlhdCI6MTYxMzU3MDY3MSwidmVyc2lvbiI6MiwianRpIjoiMmYwZjdmODEtMjkwYy00ODhmLTkwNDItMjM5MGUxZDUzZjhlIiwiY2xpZW50X2lkIjoiMmQ1YzliaDEwNGZ1OXZhMnViamxrNHN1OTciLCJ1c2VybmFtZSI6Im1haHNhNSJ9.JO_YRIogQEg9Y0GzpVzNBOJWwaRDBxjbOslX44G-kEAItjiHLmAfVyOjTeoJbnBIl3oGP7IezEP9vp9gckdYssSHsAg9USAkYVzgsxeLiVIRW6irnMPQD76NfHBISSASgK87b8Kdb6NaorewgJWgu_U-thugKM0YCHbuMHBFrUDzqe1VL3oQYFiYgPcOyBPVxDqPwC5RuV1gwVoFG5M_EcWOQW5u3NIHl1zEt8bWf6ppxJ1MVRpynMJ8Pim2LebpbiK9YavBebwPVrA3-Vn6y5f4T7nK3imtTkSuFi_DVdacfNPIFSvCNLoB-uiewyq8YMsarPPOmWxJ384ofNL6DQ',
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