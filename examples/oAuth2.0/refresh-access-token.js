//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;

const clientID = '<clientId>'; //your app clientId
const refreshToken = '<refreshToken>'; //refresh token that is issued by authorisation server

; (async () => {
  try {
    const awsprovider = new OverledgerSDK();

    const response = await awsprovider.refreshAccessToken(clientID, refreshToken);
    console.log('response code: ', response.status)
    console.log('response:\n', response.data);

  } catch (e) {
    console.error('error', e.response.statusText);
  }
})();