// Replace the dependency by @overledger/bundle if you're in your own project
const OverledgerSDK = require('../../packages/overledger-bundle').default;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
// const mappId = '<ENTER YOUR MAPPID>';
// const bpiKey = '<ENTER YOUR BPIKEY>';
const mappId = 'network.quant.software';
const bpiKey = 'bpiKeyTest';

const ethereumAddress = '0x650A87cfB9165C9F4Ccc7B971D971f50f753e761';
const rippleAddress = 'rhTa8RGotyJQAW8sS2tFVVfvcHYXaps9hC';

//  ---------------------------------------------------------
//  -------------- END VARIABLES TO UPDATE ------------------
//  ---------------------------------------------------------

; (async () => {
    try {
        const overledger = new OverledgerSDK(mappId, bpiKey, {
            dlts: [{ dlt: 'ethereum' }, { dlt: 'ripple' }],
            provider: { network: 'testnet' },
        });

        const ethereumAddressBalance = await overledger.dlts.ethereum.getBalance(ethereumAddress);
        console.log('Ethereum address balance:\n', ethereumAddressBalance.data);
        console.log('\n');

        const rippleAddressBalance = await overledger.dlts.ripple.getBalance(rippleAddress);
        console.log('Ripple address balance:\n', rippleAddressBalance.data);
        console.log('\n');
    } catch (e) {
        console.error('error', e.response.data);
    }
})();
