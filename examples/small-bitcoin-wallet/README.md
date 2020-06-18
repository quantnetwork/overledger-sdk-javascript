# Overledger small bitcoin wallet

This example contains a script ```run-bitcoin-wallet.js``` which allows you to send a bitcoin transaction. It contains the sender address, the receiver address, the sender changer output address (for now, it will be the same as the sender address) and the value to send.

Unspent transactions output must be specified in the ```sender-utxos.csv``` file for the sender address used in the JS file.

## Building

In order to run the example, first, make sure you have built the sdk by running the following command in the root folder of the project:

```
yarn run build
```

Run the .ts file containing the utility functions to compute from the .csv file inputs and outputs for the Bitcoin transaction:

```npx tsc sender-wallet.ts (generate the js file) ```

And then send the transaction by running:

```node run-bitcoin-wallet.js```

## Configuring the script

Next you will need to add some information into the script for it to run correctly, specifically:

* Your MAPPID and BPIKey
* sender's blockchain address and associated private key
* Receiver's blockchain address 
* sender's change address: will be the same for now as the initial sender's address
* Value to send
* userFeeRate in case you would like to set your own fee

You need to configure the arguments of the of function ```computeCoins``` called inside the main call of ```run-bitcoin-wallet.js```:

```computeCoins(overledger, csvFilePath, senderAddress, receiverAddress, senderChangeAddress, valueToSend, addScript, userFeeUsed, defaultServiceFeeUsed, userEstimateFee, priority) ```

where:
 * overledger: instance of overledgerSDK
 * csvFilePath: path of the csv file that contains utxos: address,txHash,outputIndex,value
 * senderAddress: the address of the sender
 * receiverAddress: the address the btc are sent to
 * senderChangeAddress: change output address, this address will be the same as the sender address for this version of the wallet
 * valueToSend: btc amount to send
 * addScript: boolean used to call or not the scriptPubKey to compute the estimated transaction bytes instead of the defaults/estimated values for scriptPubKey length proposed by the coinselect library of bitcoinJS
 * userFeeUsed: boolean used to call or not the fee rate set by the user in userEstimateFee. If false it will get the service's fee rates
 * defaultServiceFeeUsed: boolean used to call or not the default service rate. If false it will call the service to get the latest fee rates
 * priority: in case of using the service fee rates, priority should be choosen from "fastestFee", "halfHourFee", "hourFee"
 

## Running the example

Now that you have performed the necessary changes to the script, open a terminal window in the small-bitxoin-wallet directory and run:

```node run-bitcoin-wallet.js ```