[docs]: https://github.com/quantnetwork/overledger-sdk-javascript/blob/master/README.md
[repo]: https://github.com/quantnetwork/overledger-sdk-javascript

# @quantnetwork/overledger-dlt-ethereum

[Overledger SDK][repo] module for interaction with the Ethereum distributed ledger technology.

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @quantnetwork/overledger-dlt-ethereum
```

Or, if you prefer using [yarn](https://yarnpkg.com/):

```
yarn add @quantnetwork/overledger-dlt-ethereum
```

## API Reference

<a name="module_overledger-dlt-ethereum"></a>

## overledger-dlt-ethereum

* [overledger-dlt-ethereum](#module_overledger-dlt-ethereum)

    * _static_
        * [.default](#module_overledger-dlt-ethereum.default)

    * _inner_
        * [~Ethereum](#module_overledger-dlt-ethereum.Ethereum)

            * [new Ethereum(sdk, options)](#new_module_overledger-dlt-ethereum.Ethereum_new)

            * [.name](#module_overledger-dlt-ethereum.Ethereum+name)

            * [.symbol](#module_overledger-dlt-ethereum.Ethereum+symbol)

            * [.createAccount()](#module_overledger-dlt-ethereum.Ethereum+createAccount)

            * [.setAccount(privateKey)](#module_overledger-dlt-ethereum.Ethereum+setAccount)

            * [.buildTransaction(toAddress, message, options)](#module_overledger-dlt-ethereum.Ethereum+buildTransaction)

            * [._sign(toAddress, message, options)](#module_overledger-dlt-ethereum.Ethereum+_sign)


<a name="module_overledger-dlt-ethereum.default"></a>

### *overledger-dlt-ethereum*.default
Development package for Ethereum.

<a name="module_overledger-dlt-ethereum.Ethereum"></a>

### *overledger-dlt-ethereum*~Ethereum

* [~Ethereum](#module_overledger-dlt-ethereum.Ethereum)

    * [new Ethereum(sdk, options)](#new_module_overledger-dlt-ethereum.Ethereum_new)

    * [.name](#module_overledger-dlt-ethereum.Ethereum+name)

    * [.symbol](#module_overledger-dlt-ethereum.Ethereum+symbol)

    * [.createAccount()](#module_overledger-dlt-ethereum.Ethereum+createAccount)

    * [.setAccount(privateKey)](#module_overledger-dlt-ethereum.Ethereum+setAccount)

    * [.buildTransaction(toAddress, message, options)](#module_overledger-dlt-ethereum.Ethereum+buildTransaction)

    * [._sign(toAddress, message, options)](#module_overledger-dlt-ethereum.Ethereum+_sign)


<a name="new_module_overledger-dlt-ethereum.Ethereum_new"></a>

#### new Ethereum(sdk, options)

| Param | Type |
| --- | --- |
| sdk | <code>any</code> | 
| options | <code>Object</code> | 

<a name="module_overledger-dlt-ethereum.Ethereum+name"></a>

#### *ethereum*.name
Name of the DLT

<a name="module_overledger-dlt-ethereum.Ethereum+symbol"></a>

#### *ethereum*.symbol
Symbol of the DLT

<a name="module_overledger-dlt-ethereum.Ethereum+createAccount"></a>

#### *ethereum*.createAccount()
Create an account for a specific DLT

**Returns**: <code>Account</code> - (privateKey, address)  
<a name="module_overledger-dlt-ethereum.Ethereum+setAccount"></a>

#### *ethereum*.setAccount(privateKey)

| Param | Type | Description |
| --- | --- | --- |
| privateKey | <code>string</code> | The privateKey |

Set an account for signing transactions for a specific DLT

<a name="module_overledger-dlt-ethereum.Ethereum+buildTransaction"></a>

#### *ethereum*.buildTransaction(toAddress, message, options)

| Param | Type | Description |
| --- | --- | --- |
| toAddress | <code>string</code> |  |
| message | <code>string</code> |  |
| options | <code>TransactionOptions</code> | Transaction details |

Build the transaction

<a name="module_overledger-dlt-ethereum.Ethereum+_sign"></a>

#### *ethereum*._sign(toAddress, message, options)

| Param | Type |
| --- | --- |
| toAddress | <code>string</code> | 
| message | <code>string</code> | 
| options | <code>TransactionOptions</code> | 

Sign the transaction

