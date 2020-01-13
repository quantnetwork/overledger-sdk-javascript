[docs]: https://github.com/quantnetwork/overledger-sdk-javascript/blob/master/README.md
[repo]: https://github.com/quantnetwork/overledger-sdk-javascript

# @quantnetwork/overledger-dlt-abstract

[Overledger SDK][repo] abstract class for dlt functions.

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @quantnetwork/overledger-dlt-abstract
```

Or, if you prefer using [yarn](https://yarnpkg.com/):

```
yarn add @quantnetwork/overledger-dlt-abstract
```

## API Reference

<a name="module_overledger-dlt-abstract"></a>

## overledger-dlt-abstract

* [overledger-dlt-abstract](#module_overledger-dlt-abstract)

    * _static_
        * [.default](#module_overledger-dlt-abstract.default)

    * _inner_
        * [~AbstractDLT](#module_overledger-dlt-abstract.AbstractDLT)

            * [new AbstractDLT(sdk, options)](#new_module_overledger-dlt-abstract.AbstractDLT_new)

            * [.getBalance(address)](#module_overledger-dlt-abstract.AbstractDLT+getBalance)

            * [.getSequence(address)](#module_overledger-dlt-abstract.AbstractDLT+getSequence)

            * [.sign(toAddress, message, options)](#module_overledger-dlt-abstract.AbstractDLT+sign)

            * [.send(signedTransaction)](#module_overledger-dlt-abstract.AbstractDLT+send)

            * [.buildSignedTransactionsApiCall(signedTransaction)](#module_overledger-dlt-abstract.AbstractDLT+buildSignedTransactionsApiCall)


<a name="module_overledger-dlt-abstract.default"></a>

### *overledger-dlt-abstract*.default
Abstract class for DLT modules. All DLT packages need to extend this class.

<a name="module_overledger-dlt-abstract.AbstractDLT"></a>

### *overledger-dlt-abstract*~AbstractDLT

* [~AbstractDLT](#module_overledger-dlt-abstract.AbstractDLT)

    * [new AbstractDLT(sdk, options)](#new_module_overledger-dlt-abstract.AbstractDLT_new)

    * [.getBalance(address)](#module_overledger-dlt-abstract.AbstractDLT+getBalance)

    * [.getSequence(address)](#module_overledger-dlt-abstract.AbstractDLT+getSequence)

    * [.sign(toAddress, message, options)](#module_overledger-dlt-abstract.AbstractDLT+sign)

    * [.send(signedTransaction)](#module_overledger-dlt-abstract.AbstractDLT+send)

    * [.buildSignedTransactionsApiCall(signedTransaction)](#module_overledger-dlt-abstract.AbstractDLT+buildSignedTransactionsApiCall)


<a name="new_module_overledger-dlt-abstract.AbstractDLT_new"></a>

#### new AbstractDLT(sdk, options)

| Param | Type |
| --- | --- |
| sdk | <code>any</code> | 
| options | <code>Object</code> | 

<a name="module_overledger-dlt-abstract.AbstractDLT+getBalance"></a>

#### *abstractDLT*.getBalance(address)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> | <code>null</code> | The address to query for |

Get the balance for a specific address

<a name="module_overledger-dlt-abstract.AbstractDLT+getSequence"></a>

#### *abstractDLT*.getSequence(address)

| Param | Type |
| --- | --- |
| address | <code>string</code> \| <code>Array.&lt;string&gt;</code> | 

Get the sequence for a specific address

<a name="module_overledger-dlt-abstract.AbstractDLT+sign"></a>

#### *abstractDLT*.sign(toAddress, message, options)

| Param | Type |
| --- | --- |
| toAddress | <code>string</code> | 
| message | <code>string</code> | 
| options | <code>TransactionOptions</code> | 

Sign a transaction for the DLT

<a name="module_overledger-dlt-abstract.AbstractDLT+send"></a>

#### *abstractDLT*.send(signedTransaction)

| Param | Type |
| --- | --- |
| signedTransaction | <code>SignedTransactionRequest</code> | 

Send an Overledger signed transaction

<a name="module_overledger-dlt-abstract.AbstractDLT+buildSignedTransactionsApiCall"></a>

#### *abstractDLT*.buildSignedTransactionsApiCall(signedTransaction)

| Param | Type |
| --- | --- |
| signedTransaction | <code>SignedTransactionRequest</code> | 

Wrap a specific DLT signed transaction with the Overledger required fields

