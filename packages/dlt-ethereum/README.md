[docs]: https://github.com/quantnetwork/overledger-sdk-javascript/blob/master/README.md
[repo]: https://github.com/quantnetwork/overledger-sdk-javascript

# @overledger/dlt-ethereum

[Overledger SDK][repo] module for interaction with the Ethereum distributed ledger technology.

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @overledger/dlt-ethereum
```

Or, if you prefer using [yarn](https://yarnpkg.com/):

```
yarn add @overledger/dlt-ethereum
```

## API Reference

<a name="module_dlt-ethereum"></a>

## dlt-ethereum

* [dlt-ethereum](#module_dlt-ethereum)

    * _static_
        * [.default](#module_dlt-ethereum.default)

    * _inner_
        * [~Ethereum](#module_dlt-ethereum.Ethereum)

            * [new Ethereum(sdk, options)](#new_module_dlt-ethereum.Ethereum_new)

            * [.name](#module_dlt-ethereum.Ethereum+name)

            * [.symbol](#module_dlt-ethereum.Ethereum+symbol)

            * [.createAccount()](#module_dlt-ethereum.Ethereum+createAccount)

            * [.setAccount(privateKey)](#module_dlt-ethereum.Ethereum+setAccount)

            * [.buildTransaction(toAddress, message, options)](#module_dlt-ethereum.Ethereum+buildTransaction)

            * [._sign(toAddress, message, options)](#module_dlt-ethereum.Ethereum+_sign)


<a name="module_dlt-ethereum.default"></a>

### *dlt-ethereum*.default
Development package for Ethereum.

<a name="module_dlt-ethereum.Ethereum"></a>

### *dlt-ethereum*~Ethereum

* [~Ethereum](#module_dlt-ethereum.Ethereum)

    * [new Ethereum(sdk, options)](#new_module_dlt-ethereum.Ethereum_new)

    * [.name](#module_dlt-ethereum.Ethereum+name)

    * [.symbol](#module_dlt-ethereum.Ethereum+symbol)

    * [.createAccount()](#module_dlt-ethereum.Ethereum+createAccount)

    * [.setAccount(privateKey)](#module_dlt-ethereum.Ethereum+setAccount)

    * [.buildTransaction(toAddress, message, options)](#module_dlt-ethereum.Ethereum+buildTransaction)

    * [._sign(toAddress, message, options)](#module_dlt-ethereum.Ethereum+_sign)


<a name="new_module_dlt-ethereum.Ethereum_new"></a>

#### new Ethereum(sdk, options)

| Param | Type |
| --- | --- |
| sdk | <code>any</code> | 
| options | <code>Object</code> | 

<a name="module_dlt-ethereum.Ethereum+name"></a>

#### *ethereum*.name
Name of the DLT

<a name="module_dlt-ethereum.Ethereum+symbol"></a>

#### *ethereum*.symbol
Symbol of the DLT

<a name="module_dlt-ethereum.Ethereum+createAccount"></a>

#### *ethereum*.createAccount()
Create an account for a specific DLT

<a name="module_dlt-ethereum.Ethereum+setAccount"></a>

#### *ethereum*.setAccount(privateKey)

| Param | Type | Description |
| --- | --- | --- |
| privateKey | <code>string</code> | The privateKey |

Set an account for signing transactions for a specific DLT

<a name="module_dlt-ethereum.Ethereum+buildTransaction"></a>

#### *ethereum*.buildTransaction(toAddress, message, options)

| Param | Type |
| --- | --- |
| toAddress | <code>string</code> | 
| message | <code>string</code> | 
| options | <code>TransactionOptions</code> | 

Build the transaction

<a name="module_dlt-ethereum.Ethereum+_sign"></a>

#### *ethereum*._sign(toAddress, message, options)

| Param | Type |
| --- | --- |
| toAddress | <code>string</code> | 
| message | <code>string</code> | 
| options | <code>TransactionOptions</code> | 

Sign the transaction

