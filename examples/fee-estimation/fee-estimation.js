const OverledgerSDK = require('@quantnetwork/overledger-bundle/dist').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------

const mappId = '...';
const bpiKey = '...';

//  ---------------------------------------------------------
//  -------------- END VARIABLES TO UPDATE ------------------
//  ---------------------------------------------------------
// --------

; (async () => {
    try {
        const overledger = new OverledgerSDK(mappId, bpiKey, {
            dlts: [{ dlt: DltNameOptions.BITCOIN }, { dlt: DltNameOptions.ETHEREUM }, { dlt: DltNameOptions.XRP_LEDGER }],
            provider: { network: 'testnet' , timeout: '1200000'},
        });

        let requestRipple = {
            dlt: "ripple",
            data: "0"
        }

        let requestBitcoin = {
            dlt: "bitcoin",
            data: "15"
        }

        console.log("going to call fee estimation");
        const feeEstimationResponseRipple = await overledger.getFeeEstimation(requestRipple.dlt, requestRipple.data);
        const feeEstimationResponseBitcoin = await overledger.getFeeEstimation(requestBitcoin.dlt, requestBitcoin.data);

        console.log("");
        console.log('feeEstimationResponse for dlt: ' + feeEstimationResponseRipple.data.dlt + ", data:" + feeEstimationResponseRipple.data.data);
        console.log('feeEstimationResponse for dlt: ' + feeEstimationResponseBitcoin.data.dlt + ", data:" + feeEstimationResponseBitcoin.data.data);
        console.log("");

    } catch (e) {
        console.error('error', e);
        //console.error('error', e.response.data.errors);
    }
})();
