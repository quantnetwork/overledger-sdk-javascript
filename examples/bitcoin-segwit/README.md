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

## Running the examples

The scripts that might be needed in the UTXOs inputs of the transaction you are building, are the following:

* The `ScriptPubKey`, the locking script of the utxo (PubKey Script). It is the script placed on the output of the utxo to ensure that only the correct receiver can unlock and spend the utxo.

* The `redeemScript`, is the script which must be provided to unlock bitcoin sent to a `p2sh` or `p2sh-p2wsh`, bitcoin is locked to the hash of the of a redeemScript, ensuring that only someone who  an provide the redeemScript and add the required signature.

Noting also that the field `linkedRawTransaction` is needed, the raw of the transaction the UTXO input is part of.

### Native SegWit transaction

A normal Segwit transaction is performed from a SegWit `p2wpkh` address to a `p2wpkh` address. It shows the way to create a SegWit `p2pkh` account by setting the field `isSegwit` to `true`.

To run the example, you should provide the fields needed for the UTXOs inputs and then do:

```
node a-to-b-transaction-native-segwit.js
```

### Nested SegWit transaction 

A nested SegWit account `p2sh-p2wpkh` is created for wallet not supporting SegWit transaction. A nested witness `p2wpkh` is then wrapped with a legacy `p2sh` script type address.


#### Create and fund the account

After having performed the necessary changes to the script with the fields needed at the UTXOs inputs, you should run:

```
node a-to-b-transaction-fund-nested-segwit.js
```

#### Redeem the fund


After having performed the necessary changes to the script with the fields needed at the UTXOs inputs where some of them are obtained at the creation step, you should run:

```
node a-to-b-transaction-redeem-nested-segwit.js
```
