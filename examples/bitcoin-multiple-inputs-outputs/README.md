# Building

In order to run the example, first, make sure you have built the sdk by running the following command in the root folder of the project:

```
yarn run build
```

# Configuring the script

Next you will need to add some information into the script for it to run correctly, specifically:

* Your MAPPID and BPIKey
* Party A's blockchain addresses and associated private keys
* Party B's blockchain addresses
* Your Bitcoin transaction inputs and outputs. Note that as Bitcoin is an unspent transaction output (UTXO) based blockchain, you need to explicitly state where the funds you are spending have come from. For each transaction that has provided you with funds you are now spending, you need to add a new txInput (and set required properities). You also need to state where all of your funds are going by adding a new txOutput for each different address that will be paid. Note that you have the value of your inputs must equal the value of your outputs + extraFields.feePrice. Therefore if you do not want to spend all of your input amount, you need to add a txOutput to an address that you own with the change of the transaction. 

## Running the example

This example requires `bitcoin-scripts` examples to generate addresses and their linked scripts.


### Funding

The funding example shows a transaction composed of two inputs and funding three outputs:
* Inputs:
Two `p2wpkh` account generated with the script examples/create-account/create-account.js and funded using a bitcoin faucet.

* Outputs: 
**  A `HTLC` address: created with the script examples/bitcoin-scripts/p2wsh/htlc/create-p2wsh-payment-channel.js
** A Multisig SegWit address: created with the function `setMultiSigAccount` with the parameter `isSegwit` set to true
** A `p2wpkh` address: examples/create-account/create-account.js


### Redeem the funds

The redeem example shows a transaction to:

* Redeem the fund from the `HTLC` address
* Spend the fund at the multisig address






