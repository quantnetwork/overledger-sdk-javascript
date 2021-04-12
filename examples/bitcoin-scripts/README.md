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

The examples are supporting three types of scripts addresses:

* `p2sh`: pay-to-script-hash which is the legacy type of script for smart contract addresses.
* `p2wsh`: pay-to-witness-script-hash which is the SegWit (Segregated Witness) type of script for smart contract addresses
* `p2sh-p2wsh`: nested witness script hash used to wrap a witness script hash `p2wsh` address within a legacy `p2sh` script type address, used in the wallets which are not supporting SegWit (Segregated Witness) transactions.

Inside each sub-section of script type, two sort of smart contracts are used:

* Hash Time Lock Contract `HTLC`
* Multisignature n-of-m


The scripts that are needed in the UTXOs inputs of the transaction you are building, are the following:

* The `ScriptPubKey`, the locking script of the utxo (PubKey Script). It is the script placed on the output of the utxo to ensure that only the correct receiver can unlock and spend the utxo.

* The `redeemScript`, it is the script which must be provided to unlock bitcoin sent to a `p2sh` or `p2sh-p2wsh`, bitcoin is locked to the hash of the of a redeemScript, ensuring that only someone who  an provide the redeemScript and add any required signatures and secret in case of a `Hash Time Lock Contract (HTLC)` can spend the bitcoin at that address.

* The `witnessScript`, it is the script which must be provided to unlock bitcoin sent to a `p2wsh` or `p2sh-p2wsh`, bitcoin is locked to the hash of the of a witnessScript, ensuring that only someone who can provide the witnessScript and add any required signatures and secret in case of a `Hash Time Lock Contract (HTLC)` can spend the bitcoin at that address. The witness script is equivalent to the redeem script but in case of a SegWit address.

Noting also that the field `linkedRawTransaction` is needed, the raw of the transaction the UTXO input is part of.

Additional fields are involved in the creation or refund of a `Hash Time Lock Contract (HTLC)` address: 

* The `preimage` or the `secret` that must be provided to create a `HTLC` address or to unlock bitcoin at a `HTLC` address.

* The `timeLock` to be set in case of a `HTLC` address creation. It is a time condition placed at a UTXO level to refund bitcoin at a `HTLC` address.

* The `nLocktime` and the `sequence` must be provided to cancel and refund the bitcoin at a `HTLC` address. The `nLocktime` is a time condition placed on the transaction level that you are building. The `nLocktime` should be greater or equal to the `timeLock` and the `sequence` smaller than the max `0xffffffff` because the transaction is not executed until the time lock is reached, if it is sent before it is reached. The transaction stays in a `non-final` state until times condition are verified.


### Hash Time Lock Contract (HTLC) scripts


#### Create off-chain the smart contract address and the linked scripts

For example, in the case of a `p2sh` smart contract address, you should run:

```
node create-p2sh-payment-channel.js
```

It gives the `p2sh` smart contract address (`p2wsh` address in case of a SegWit address), the scriptPubKey (output script), and the redeem script (witness script in case of a p2wsh adress and both in case of a p2sh-p2wsh address) that must be provided to redeem or refund the bitcoin locked at the smart contract address.

#### Fund the smart contract address

After having performed the necessary changes to the script with the fields obtained at the previous creation step, you should run:

For example, to fund the `p2sh` smart contract address you obtained at the previous step, you should run:

```
node fund-p2sh-payment-channel.js
```

#### Redeem the fund

After having performed the necessary changes to the script with the fields obtained at the creation and fund steps, you should run:

```
node redeem-p2sh-payment-channel.js
```

#### Cancel and refund

After having performed the necessary changes to the script with the fields obtained at the creation and fund steps, you should run:

```
node cancel-p2sh-payment-channel.js
```

### Multisignature scripts

The n-of-m multisig addresses and related scripts (redeem script and witness script) are created by setting up a multisig account, passing to the function `setMultisigAccount` the number of co-signers (number of signatures) needed to spend the bitcoin, the list of the accounts and the type of the address, `isSegwit` (`p2wsh`) or `isNestedSegwit` (`p2sh-p2wsh`). By default it will create a `p2sh` non Segwit address.

#### Create and fund a multisig n-of-m address

For example, in the case of a `p2sh` multisig address, you should run:

```
node fund-p2sh-multisig.js
```

#### Redeem the fund

After having performed the necessary changes to the script with the fields obtained at the previous step, you should run:

```
node redeem-p2sh-multisig.js
```


