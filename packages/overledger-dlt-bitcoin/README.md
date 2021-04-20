[docs]: https://github.com/quantnetwork/overledger-sdk-javascript/blob/master/README.md
[repo]: https://github.com/quantnetwork/overledger-sdk-javascript

# @quantnetwork/overledger-dlt-bitcoin

[Overledger SDK][repo] module for interaction with the Bitcoin distributed ledger technology.

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @quantnetwork/overledger-dlt-bitcoin
```

Or, if you prefer using [yarn](https://yarnpkg.com/):

```
yarn add @quantnetwork/overledger-dlt-bitcoin
```

## API Reference

## Modules

<dl>
<dt><a href="#module_overledger-dlt-bitcoin">overledger-dlt-bitcoin</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#witnessStackToScriptWitness">witnessStackToScriptWitness()</a></dt>
<dd><p>From psbt library : not exported in psbt nor in bitcoinjs-lib yet but needed in the finalize step of psbt signing (getFinalScripts function)</p>
</dd>
<dt><a href="#isAddressOutput">isAddressOutput()</a></dt>
<dd><p>Test if the data passed in the utxo output is an address or a script pub key</p>
</dd>
</dl>

<a name="module_overledger-dlt-bitcoin"></a>

## overledger-dlt-bitcoin

* [overledger-dlt-bitcoin](#module_overledger-dlt-bitcoin)

    * _static_
        * [.BitcoinTypeOptions](#module_overledger-dlt-bitcoin.BitcoinTypeOptions)

        * [.default](#module_overledger-dlt-bitcoin.default)

    * _inner_
        * [~Bitcoin](#module_overledger-dlt-bitcoin.Bitcoin)

            * [new Bitcoin(sdk, options)](#new_module_overledger-dlt-bitcoin.Bitcoin_new)

            * [.name](#module_overledger-dlt-bitcoin.Bitcoin+name)

            * [.symbol](#module_overledger-dlt-bitcoin.Bitcoin+symbol)

            * [.getSmartContractParameters(input)](#module_overledger-dlt-bitcoin.Bitcoin+getSmartContractParameters)

            * [.prepareTransaction(thisTransaction)](#module_overledger-dlt-bitcoin.Bitcoin+prepareTransaction)

            * [.preparePsbtObject(inputsOutputs)](#module_overledger-dlt-bitcoin.Bitcoin+preparePsbtObject)

            * [._transactionValidation(thisTransaction)](#module_overledger-dlt-bitcoin.Bitcoin+_transactionValidation)

            * [._sign(thisTransaction)](#module_overledger-dlt-bitcoin.Bitcoin+_sign)

            * [.getFinalScripts()](#module_overledger-dlt-bitcoin.Bitcoin+getFinalScripts)

            * [.createAccount()](#module_overledger-dlt-bitcoin.Bitcoin+createAccount)

            * [.setAccount(accountInfo)](#module_overledger-dlt-bitcoin.Bitcoin+setAccount)

            * [.setMultiSigAccount(multisigAccountInfo)](#module_overledger-dlt-bitcoin.Bitcoin+setMultiSigAccount)

            * [._buildSmartContractQuery(dltAddress, contractQueryDetails)](#module_overledger-dlt-bitcoin.Bitcoin+_buildSmartContractQuery)

            * [._smartContractQueryValidation(contractQueryDetails)](#module_overledger-dlt-bitcoin.Bitcoin+_smartContractQueryValidation)


<a name="module_overledger-dlt-bitcoin.BitcoinTypeOptions"></a>

### *overledger-dlt-bitcoin*.BitcoinTypeOptions
<a name="module_overledger-dlt-bitcoin.default"></a>

### *overledger-dlt-bitcoin*.default
Development package for Bitcoin blockchain.

<a name="module_overledger-dlt-bitcoin.Bitcoin"></a>

### *overledger-dlt-bitcoin*~Bitcoin

* [~Bitcoin](#module_overledger-dlt-bitcoin.Bitcoin)

    * [new Bitcoin(sdk, options)](#new_module_overledger-dlt-bitcoin.Bitcoin_new)

    * [.name](#module_overledger-dlt-bitcoin.Bitcoin+name)

    * [.symbol](#module_overledger-dlt-bitcoin.Bitcoin+symbol)

    * [.getSmartContractParameters(input)](#module_overledger-dlt-bitcoin.Bitcoin+getSmartContractParameters)

    * [.prepareTransaction(thisTransaction)](#module_overledger-dlt-bitcoin.Bitcoin+prepareTransaction)

    * [.preparePsbtObject(inputsOutputs)](#module_overledger-dlt-bitcoin.Bitcoin+preparePsbtObject)

    * [._transactionValidation(thisTransaction)](#module_overledger-dlt-bitcoin.Bitcoin+_transactionValidation)

    * [._sign(thisTransaction)](#module_overledger-dlt-bitcoin.Bitcoin+_sign)

    * [.getFinalScripts()](#module_overledger-dlt-bitcoin.Bitcoin+getFinalScripts)

    * [.createAccount()](#module_overledger-dlt-bitcoin.Bitcoin+createAccount)

    * [.setAccount(accountInfo)](#module_overledger-dlt-bitcoin.Bitcoin+setAccount)

    * [.setMultiSigAccount(multisigAccountInfo)](#module_overledger-dlt-bitcoin.Bitcoin+setMultiSigAccount)

    * [._buildSmartContractQuery(dltAddress, contractQueryDetails)](#module_overledger-dlt-bitcoin.Bitcoin+_buildSmartContractQuery)

    * [._smartContractQueryValidation(contractQueryDetails)](#module_overledger-dlt-bitcoin.Bitcoin+_smartContractQueryValidation)


<a name="new_module_overledger-dlt-bitcoin.Bitcoin_new"></a>

#### new Bitcoin(sdk, options)

| Param | Type | Description |
| --- | --- | --- |
| sdk | <code>any</code> | the sdk instance |
| options | <code>Object</code> | any additional options to instantiate this dlt |

<a name="module_overledger-dlt-bitcoin.Bitcoin+name"></a>

#### *bitcoin*.name
Name of the DLT

<a name="module_overledger-dlt-bitcoin.Bitcoin+symbol"></a>

#### *bitcoin*.symbol
Symbol of the DLT

<a name="module_overledger-dlt-bitcoin.Bitcoin+getSmartContractParameters"></a>

#### *bitcoin*.getSmartContractParameters(input)

| Param | Type | Description |
| --- | --- | --- |
| input | <code>TransactionInput</code> | utxo input |

Takes the utxo input and if it includes a smart contract field extract its parameters into a structure used for psbt data input objects

**Returns**: <code>any</code> - smart contract parameters for that input  
<a name="module_overledger-dlt-bitcoin.Bitcoin+prepareTransaction"></a>

#### *bitcoin*.prepareTransaction(thisTransaction)

| Param | Type | Description |
| --- | --- | --- |
| thisTransaction | <code>TransactionBitcoinRequest</code> | details on the information to include in this transaction for the Bitcoin distributed ledger |

Takes the Overledger definition of a transaction and converts it into a specific Bitcoin transaction

**Returns**: <code>UtxosPrepare</code> - Utxos in a form accepted to build the psbt object for signing  
<a name="module_overledger-dlt-bitcoin.Bitcoin+preparePsbtObject"></a>

#### *bitcoin*.preparePsbtObject(inputsOutputs)

| Param | Type | Description |
| --- | --- | --- |
| inputsOutputs | <code>UtxosPrepare</code> | inputs, outputs and data needed to build the psbt object |

Takes the inputs, outputs and the data resulting from the prepareTransaction and create a psbt object for signing

**Returns**: <code>any</code> - The psbt object filled and the inputs outputs initially obtained from the prepareTransaction needed to know the type of utxos transactions it will be signed  
<a name="module_overledger-dlt-bitcoin.Bitcoin+_transactionValidation"></a>

#### *bitcoin*._transactionValidation(thisTransaction)

| Param | Description |
| --- | --- |
| thisTransaction | The transaction request |

validates an OVL transactionRequest according to XRP specific rules

<a name="module_overledger-dlt-bitcoin.Bitcoin+_sign"></a>

#### *bitcoin*._sign(thisTransaction)

| Param | Type | Description |
| --- | --- | --- |
| thisTransaction | <code>TransactionRequest</code> | an instantiated overledger definition of an XRP transaction |

Takes in an overledger definition of a transaction for XRP, converts it into a form that the XRP distributed ledger will understand, and then signs the transaction

<a name="module_overledger-dlt-bitcoin.Bitcoin+getFinalScripts"></a>

#### *bitcoin*.getFinalScripts()
Function overloading for the getFinalScripts in the psbt library. This function will be called in case of a non supported type of redeem script, like HTLC.
Finalize the psbt object with the data that should be provided to unlock the bitcoin

<a name="module_overledger-dlt-bitcoin.Bitcoin+createAccount"></a>

#### *bitcoin*.createAccount()
Create a Bitcoin account

**Returns**: <code>Account</code> - the new Bitcoin account  
<a name="module_overledger-dlt-bitcoin.Bitcoin+setAccount"></a>

#### *bitcoin*.setAccount(accountInfo)

| Param | Type | Description |
| --- | --- | --- |
| accountInfo | <code>Account</code> | The standardised account information |

Set an account for signing transactions for a specific DLT

<a name="module_overledger-dlt-bitcoin.Bitcoin+setMultiSigAccount"></a>

#### *bitcoin*.setMultiSigAccount(multisigAccountInfo)

| Param | Type |
| --- | --- |
| multisigAccountInfo | <code>MultisigNOfMAccount</code> | 

Set a multisig n-of-m account for signing transactions for a specific DLT

<a name="module_overledger-dlt-bitcoin.Bitcoin+_buildSmartContractQuery"></a>

#### *bitcoin*._buildSmartContractQuery(dltAddress, contractQueryDetails)

| Param | Type | Description |
| --- | --- | --- |
| dltAddress | <code>string</code> | the user's Bitcoin address |
| contractQueryDetails | <code>Object</code> | the definition of the smart contract function the user wants to interact with, including information on what parameters to use in the function call. |

Allows a user to build a smart contract query for the Bitcoin distributed ledger (currently not supported for Bitcoin)

**Returns**: <code>Object</code> - success indicates if this query building was correct, if yes then it will be in the response field of the object  
<a name="module_overledger-dlt-bitcoin.Bitcoin+_smartContractQueryValidation"></a>

#### *bitcoin*._smartContractQueryValidation(contractQueryDetails)

| Param | Description |
| --- | --- |
| contractQueryDetails | the query details |

validates an OVL smart contract query according to Bitcoin specific rules

**Returns**: <code>Object</code> - success indicates if this query building was correct, if yes then it will be in the response field of the object  
<a name="witnessStackToScriptWitness"></a>

## witnessStackToScriptWitness()
From psbt library : not exported in psbt nor in bitcoinjs-lib yet but needed in the finalize step of psbt signing (getFinalScripts function)

<a name="isAddressOutput"></a>

## isAddressOutput()
Test if the data passed in the utxo output is an address or a script pub key

