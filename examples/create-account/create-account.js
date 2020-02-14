const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
const mappId = '...';
const bpiKey = '...';
//  ---------------------------------------------------------
//  -------------- END VARIABLES TO UPDATE ------------------
//  ---------------------------------------------------------

; (async () => {
    try {
        const overledger = new OverledgerSDK(mappId, bpiKey, {
          dlts: [{ dlt: DltNameOptions.ethereum }, { dlt: DltNameOptions.xrp }],
            provider: { network: 'testnet' },
        });

        const bitcoinAccount = await overledger.dlts.bitcoin.createAccount();
        console.log('Bitcoin account:\n', bitcoinAccount);
        console.log("");

        const ethAccount = await overledger.dlts.ethereum.createAccount();
        console.log('Ethereum account:\n', ethAccount);
        console.log("");

        const xrpAccount = await overledger.dlts.ripple.createAccount();
        console.log('XRP account:\n', xrpAccount);
        console.log("");

    } catch (e) {
        console.error('error', e);
    }
})();