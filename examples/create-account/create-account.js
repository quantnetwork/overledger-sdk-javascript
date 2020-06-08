//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
const mappId = 'network.quant.testnet';
const bpiKey = 'joNp29bJkQHwEwP3FmNZFgHTqCmciVu5NYD3LkEtk1I';
//  ---------------------------------------------------------
//  -------------- END VARIABLES TO UPDATE ------------------
//  ---------------------------------------------------------

; (async () => {
    try {
        const overledger = new OverledgerSDK(mappId, bpiKey, {
            dlts: [{ dlt: DltNameOptions.BITCOIN },
                // { dlt: DltNameOptions.ETHEREUM }, 
                // { dlt: DltNameOptions.XRP_LEDGER }
            ],
            provider: { network: 'testnet' },
        });

        // const bitcoinAccount = await overledger.dlts.bitcoin.createAccount();
        // console.log('Bitcoin account:\n', bitcoinAccount);
        // console.log("");

        // const ethAccount = await overledger.dlts.ethereum.createAccount();
        // console.log('Ethereum account:\n', ethAccount);
        // console.log("");

        // const xrpAccount = await overledger.dlts.ripple.createAccount();
        // console.log('XRP ledger account:\n', xrpAccount);
        // console.log("");
        const feeEstimate = await overledger.dlts.bitcoin.getEstimateFeeRate();
        console.log(feeEstimate);
    } catch (e) {
        console.error('error', e);
    }
})();

 // const feeEstimate = await overledger.dlts.bitcoin.getEstimateFeeRate();
 // console.log(`feeEstimate ${feeEstimate}`);