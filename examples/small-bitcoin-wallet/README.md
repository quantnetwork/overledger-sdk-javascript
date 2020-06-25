# Overledger small bitcoin wallet

This example contains a script ```run-bitcoin-wallet.js``` which allows you to send a bitcoin transaction. It contains the sender address, the receiver address, the sender changer output address (for now, it will be the same as the sender address) and the value to send.

Unspent transactions output must be specified in the ```sender-utxos.csv``` file for the sender address used in the JS file.
An example of the ```sender-utxos.csv``` would be:

```
address,txHash,outputIndex,value
muxP7kJNsV6v32m52gvsqHJTKLHiB53p9w,27ab7afc5ef53fbf99348e15dc54b397d2c2e2858d89b63141ad864d97a8c614,1,0.00003724
muxP7kJNsV6v32m52gvsqHJTKLHiB53p9w,9240fae9789b80895851792d0aac73e6aa744ebb6bf8a88044e39fd7af57b968,1,0.00007366
muxP7kJNsV6v32m52gvsqHJTKLHiB53p9w,68480372e0b35e0e23df8aaf018eeb747b110e1f6e621095202691ba0fc2d83a,1,0.0001
muxP7kJNsV6v32m52gvsqHJTKLHiB53p9w,0b4c7c60b36c077130da3496ff2ef781ad761845c4bb262375732af8322270b1,1,0.00098322
muxP7kJNsV6v32m52gvsqHJTKLHiB53p9w,fb50c2cb326b2d95250d07f13174fa7239021b9d234fe321261219aa0bf6d62b,1,0.00013544
```


## Building

In order to run the example, first, make sure you have built the sdk by running the following command in the root folder of the project:

```
yarn run build
```

If you want to run the .ts file containing the utility functions to compute from the .csv file inputs and outputs for the Bitcoin transaction: npx tsc sender-wallet.ts (generate the js file)


## Configuring the script

Next you will need to add some information into the script for it to run correctly, specifically:

* Your MAPPID and BPIKey
* sender's blockchain address and associated private key
* Receiver's blockchain address 
* sender's change address: is required (for now) to be the same as the initial sender's address
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