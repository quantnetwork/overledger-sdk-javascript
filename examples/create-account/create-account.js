//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
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
            dlts: [{ dlt: DltNameOptions.BITCOIN },
            { dlt: DltNameOptions.ETHEREUM },
            { dlt: DltNameOptions.XRP_LEDGER }
            ],
            provider: { network: 'testnet' },
        });

        const bitcoinAccount = await overledger.dlts.bitcoin.createAccount();
        console.log('Bitcoin account:\n', bitcoinAccount);
        console.log("");

        const bitcoinAccountSegwit = await overledger.dlts.bitcoin.createAccount(true);
        console.log('Bitcoin account segwit:\n', bitcoinAccountSegwit);
        console.log("");

        const bitcoinAccountNestedSegwit = await overledger.dlts.bitcoin.createAccount(false, true);
        console.log('Bitcoin account nested segwit:\n', bitcoinAccountNestedSegwit);
        console.log("");

        const ethAccount = await overledger.dlts.ethereum.createAccount();
        console.log('Ethereum account:\n', ethAccount);
        console.log("");

        const xrpAccount = await overledger.dlts.ripple.createAccount();
        console.log('XRP ledger account:\n', xrpAccount);
        console.log("");
    } catch (e) {
        console.error('error', e);
    }
})();