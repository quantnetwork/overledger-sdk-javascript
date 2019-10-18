[docs]: https://github.com/quantnetwork/overledger-sdk-javascript/blob/master/README.md
[repo]: https://github.com/quantnetwork/overledger-sdk-javascript

# @overledger/dlt-ripple

[Overledger SDK][repo] module for interaction with the Ripple distributed ledger technology.

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @overledger/dlt-ripple
```

Or, if you prefer using [yarn](https://yarnpkg.com/):

```
yarn add @overledger/dlt-ripple
```

## API Reference

<a name="module_dlt-ripple"></a>

## dlt-ripple

* [dlt-ripple](#module_dlt-ripple)

    * _static_
        * [.default](#module_dlt-ripple.default)

    * _inner_
        * [~Ripple](#module_dlt-ripple.Ripple)

            * [new Ripple(sdk, options)](#new_module_dlt-ripple.Ripple_new)

            * [.name](#module_dlt-ripple.Ripple+name)

            * [.symbol](#module_dlt-ripple.Ripple+symbol)

            * [.createAccount()](#module_dlt-ripple.Ripple+createAccount)

            * [.setAccount(privateKey)](#module_dlt-ripple.Ripple+setAccount)

            * [.buildTransaction(toAddress, message, options)](#module_dlt-ripple.Ripple+buildTransaction)

            * [._sign(toAddress, message, options)](#module_dlt-ripple.Ripple+_sign)


<a name="module_dlt-ripple.default"></a>

### *dlt-ripple*.default
Development package for Ripple (XRP Ledger).

<a name="module_dlt-ripple.Ripple"></a>

### *dlt-ripple*~Ripple

* [~Ripple](#module_dlt-ripple.Ripple)

    * [new Ripple(sdk, options)](#new_module_dlt-ripple.Ripple_new)

    * [.name](#module_dlt-ripple.Ripple+name)

    * [.symbol](#module_dlt-ripple.Ripple+symbol)

    * [.createAccount()](#module_dlt-ripple.Ripple+createAccount)

    * [.setAccount(privateKey)](#module_dlt-ripple.Ripple+setAccount)

    * [.buildTransaction(toAddress, message, options)](#module_dlt-ripple.Ripple+buildTransaction)

    * [._sign(toAddress, message, options)](#module_dlt-ripple.Ripple+_sign)


<a name="new_module_dlt-ripple.Ripple_new"></a>

#### new Ripple(sdk, options)

| Param | Type |
| --- | --- |
| sdk | <code>any</code> | 
| options | <code>Object</code> | 

<a name="module_dlt-ripple.Ripple+name"></a>

#### *ripple*.name
Name of the DLT

<a name="module_dlt-ripple.Ripple+symbol"></a>

#### *ripple*.symbol
Symbol of the DLT

<a name="module_dlt-ripple.Ripple+createAccount"></a>

#### *ripple*.createAccount()
Create an account for a specific DLT

<a name="module_dlt-ripple.Ripple+setAccount"></a>

#### *ripple*.setAccount(privateKey)

| Param | Type | Description |
| --- | --- | --- |
| privateKey | <code>string</code> | The privateKey |

Set an account for signing for a specific DLT

<a name="module_dlt-ripple.Ripple+buildTransaction"></a>

#### *ripple*.buildTransaction(toAddress, message, options)

| Param | Type |
| --- | --- |
| toAddress | <code>string</code> | 
| message | <code>string</code> | 
| options | <code>TransactionOptions</code> | 

Build the transaction

<a name="module_dlt-ripple.Ripple+_sign"></a>

#### *ripple*._sign(toAddress, message, options)

| Param | Type |
| --- | --- |
| toAddress | <code>string</code> | 
| message | <code>string</code> | 
| options | <code>TransactionOptions</code> | 

Sign the transaction

