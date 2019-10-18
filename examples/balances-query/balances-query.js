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

        const array = [
          {
            dlt: 'ethereum',
            address: ethereumAddress,
          },
          {
            dlt: 'ripple',
            address: rippleAddress,
          },
        ];

        const balances = await overledger.getBalances(array);
        console.log('Balances:\n', balances.data);
        console.log('\n');

    } catch (e) {
        console.error('error', e.response.data);
    }
})();
