// Replace the dependency by @overledger/bundle if you're in your own project
const OverledgerSDK = require('../../packages/bundle').default;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
const mappId = '<ENTER YOUR MAPPID>';
const bpiKey = '<ENTER YOUR BPIKEY>';

const ethereumAddress = '0x1a90dbb13861a29bFC2e464549D28bE44846Dbe4';
const rippleAddress = 'rHVsZPVPjYJMR3Xa8YH7r7MapS7s5cyqgB';

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
