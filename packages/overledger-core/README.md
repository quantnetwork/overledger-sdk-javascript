[docs]: https://github.com/quantnetwork/overledger-sdk-javascript/blob/master/README.md
[repo]: https://github.com/quantnetwork/overledger-sdk-javascript

# @quantnetwork/overledger-core

Core [Overledger SDK][repo] package.

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @quantnetwork/overledger-core
```

Or, if you prefer using [yarn](https://yarnpkg.com/):

```
yarn add @quantnetwork/overledger-core
```

## API Reference

<a name="module_overledger-core"></a>

## overledger-core

* [overledger-core](#module_overledger-core)

    * _static_
        * [.default](#module_overledger-core.default)

    * _inner_
        * [~OverledgerSDK](#module_overledger-core.OverledgerSDK)

            * [new OverledgerSDK(mappId, bpiKey, options)](#new_module_overledger-core.OverledgerSDK_new)

            * [.dlts](#module_overledger-core.OverledgerSDK+dlts)

            * [.loadDlt(config)](#module_overledger-core.OverledgerSDK+loadDlt)

            * [.validateOptions(options)](#module_overledger-core.OverledgerSDK+validateOptions)

            * [.buildWrapperApiCall(signedTransactionRequest)](#module_overledger-core.OverledgerSDK+buildWrapperApiCall)

            * [.sign(unsignedData)](#module_overledger-core.OverledgerSDK+sign)

            * [.send(signedTransactions)](#module_overledger-core.OverledgerSDK+send)

            * [.getBalances(balancesRequest)](#module_overledger-core.OverledgerSDK+getBalances)

            * [.getSequences(sequenceRequest)](#module_overledger-core.OverledgerSDK+getSequences)

            * [.readTransactionsByMappId()](#module_overledger-core.OverledgerSDK+readTransactionsByMappId)

            * [.readOverledgerTransaction(overledgerTransactionId)](#module_overledger-core.OverledgerSDK+readOverledgerTransaction)

            * [.setMappId(mappId)](#module_overledger-core.OverledgerSDK+setMappId)

            * [.getMappId()](#module_overledger-core.OverledgerSDK+getMappId)

            * [.setBpiKey(bpiKey)](#module_overledger-core.OverledgerSDK+setBpiKey)

            * [.getBpiKey()](#module_overledger-core.OverledgerSDK+getBpiKey)


<a name="module_overledger-core.default"></a>

### *overledger-core*.default
Core Overledger SDK class. Individual dlt packages must be installed manually.

<a name="module_overledger-core.OverledgerSDK"></a>

### *overledger-core*~OverledgerSDK

* [~OverledgerSDK](#module_overledger-core.OverledgerSDK)

    * [new OverledgerSDK(mappId, bpiKey, options)](#new_module_overledger-core.OverledgerSDK_new)

    * [.dlts](#module_overledger-core.OverledgerSDK+dlts)

    * [.loadDlt(config)](#module_overledger-core.OverledgerSDK+loadDlt)

    * [.validateOptions(options)](#module_overledger-core.OverledgerSDK+validateOptions)

    * [.buildWrapperApiCall(signedTransactionRequest)](#module_overledger-core.OverledgerSDK+buildWrapperApiCall)

    * [.sign(unsignedData)](#module_overledger-core.OverledgerSDK+sign)

    * [.send(signedTransactions)](#module_overledger-core.OverledgerSDK+send)

    * [.getBalances(balancesRequest)](#module_overledger-core.OverledgerSDK+getBalances)

    * [.getSequences(sequenceRequest)](#module_overledger-core.OverledgerSDK+getSequences)

    * [.readTransactionsByMappId()](#module_overledger-core.OverledgerSDK+readTransactionsByMappId)

    * [.readOverledgerTransaction(overledgerTransactionId)](#module_overledger-core.OverledgerSDK+readOverledgerTransaction)

    * [.setMappId(mappId)](#module_overledger-core.OverledgerSDK+setMappId)

    * [.getMappId()](#module_overledger-core.OverledgerSDK+getMappId)

    * [.setBpiKey(bpiKey)](#module_overledger-core.OverledgerSDK+setBpiKey)

    * [.getBpiKey()](#module_overledger-core.OverledgerSDK+getBpiKey)


<a name="new_module_overledger-core.OverledgerSDK_new"></a>

#### new OverledgerSDK(mappId, bpiKey, options)

| Param | Type | Description |
| --- | --- | --- |
| mappId | <code>string</code> | The Multi-chain Application ID |
| bpiKey | <code>string</code> | The Overledger Blockchain Programming Interface license key |
| options | <code>SDKOptions</code> | The DLT Options and Provider Options |

Create the Overledger SDK

<a name="module_overledger-core.OverledgerSDK+dlts"></a>

#### *overledgerSDK*.dlts
The object storing the DLTs loaded by the Overledger SDK

<a name="module_overledger-core.OverledgerSDK+loadDlt"></a>

#### *overledgerSDK*.loadDlt(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>DLTOptions</code> | DLT name and an optional Private Key to use as the main account |

Load the DLT in the Overledger SDK

**Returns**: <code>AbstractDLT</code> - The loaded DLT class  
<a name="module_overledger-core.OverledgerSDK+validateOptions"></a>

#### *overledgerSDK*.validateOptions(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>SDKOptions</code> | The DLT Options and Provider Options |

Validate the provided Overledger SDK Options

<a name="module_overledger-core.OverledgerSDK+buildWrapperApiCall"></a>

#### *overledgerSDK*.buildWrapperApiCall(signedTransactionRequest)

| Param | Type | Description |
| --- | --- | --- |
| signedTransactionRequest | <code>Array.&lt;SignedTransactionRequest&gt;</code> | Array of signed transactions |

Wrap the DLT Data with the API schema

**Returns**: <code>APICallWrapper</code> - Object conforming to the API schema  
<a name="module_overledger-core.OverledgerSDK+sign"></a>

#### *overledgerSDK*.sign(unsignedData)

| Param | Type | Description |
| --- | --- | --- |
| unsignedData | <code>Array.&lt;UnsignedData&gt;</code> | Array of unsigned data |

Sign the provided transactions

**Returns**: <code>Array.&lt;SignedTransactionRequest&gt;</code> - Array of signed transaction requests wrapped by Overledger metadata  
<a name="module_overledger-core.OverledgerSDK+send"></a>

#### *overledgerSDK*.send(signedTransactions)

| Param | Type | Description |
| --- | --- | --- |
| signedTransactions | <code>Array.&lt;SignedTransactionRequest&gt;</code> | Array of Overledger signed transaction data |

Send signed transactions to Overledger

<a name="module_overledger-core.OverledgerSDK+getBalances"></a>

#### *overledgerSDK*.getBalances(balancesRequest)

| Param | Type | Description |
| --- | --- | --- |
| balancesRequest | <code>Array.&lt;DLTAndAddress&gt;</code> | Array of objects specifing the address and corresponding DLT |

Get the balances of the specified addresses

<a name="module_overledger-core.OverledgerSDK+getSequences"></a>

#### *overledgerSDK*.getSequences(sequenceRequest)

| Param | Type | Description |
| --- | --- | --- |
| sequenceRequest | <code>Array.&lt;SequenceDataRequest&gt;</code> | Request for sequence numbers of the provided addresses |

Get the sequence numbers for the provided addresses

**Returns**: <code>SequenceDataResponse</code> - Sequence response  
<a name="module_overledger-core.OverledgerSDK+readTransactionsByMappId"></a>

#### *overledgerSDK*.readTransactionsByMappId()
Get transactions submitted through Overledger by the Multi-Chain Application ID used to create the SDK

<a name="module_overledger-core.OverledgerSDK+readOverledgerTransaction"></a>

#### *overledgerSDK*.readOverledgerTransaction(overledgerTransactionId)

| Param | Type | Description |
| --- | --- | --- |
| overledgerTransactionId | <code>string</code> | Overledger Transaction ID |

Get the transaction specified by the Overledger Transaction ID

<a name="module_overledger-core.OverledgerSDK+setMappId"></a>

#### *overledgerSDK*.setMappId(mappId)

| Param | Type | Description |
| --- | --- | --- |
| mappId | <code>string</code> | Multi-Chain Application ID |

Set the Multi-Chain Application ID

<a name="module_overledger-core.OverledgerSDK+getMappId"></a>

#### *overledgerSDK*.getMappId()
Get the Multi-Chain Application ID

<a name="module_overledger-core.OverledgerSDK+setBpiKey"></a>

#### *overledgerSDK*.setBpiKey(bpiKey)

| Param | Type |
| --- | --- |
| bpiKey | <code>string</code> | 

Set the Overledger Blockchain Programming Interface license key

<a name="module_overledger-core.OverledgerSDK+getBpiKey"></a>

#### *overledgerSDK*.getBpiKey()
Get the Overledger Blockchain Programming Interface license key

