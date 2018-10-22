[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![NPM package version](https://img.shields.io/npm/v/@quantnetwork/overledger-sdk.svg)](https://www.npmjs.com/package/@quantnetwork/overledger-sdk)


# Overledger Javascript SDK

Developer's guide to use Overledger SDK written in Javascript by Quant Network.




## Introduction

Overledger is an open source platform that allows distributed apps(DApps) to connect to multiple blockchains. DLT stands for **Distributed Ledger Technology**.
OverledgerSDK allows developers to create signed transactions & send them to the Bitcoin and Ethereum blockchains.




## Technologies

OverledgerSDK is a node module written in Javascript/ES6.




## Prerequisites

* Register for a free developer account on [Quant Developer's Portal](https://developer.quant.network)
* Register for a free mapp to get a mappId for your app.




## Installation

Developers would have to install OverledgerSDK as an npm module.

```
npm install @quantnetwork/overledger-sdk
```




## Getting started

NodeJS with babel
```javascript
import OverledgerSDK from '@quantnetwork/overledger-sdk';
```

NodeJS
```javascript
const OverledgerSDK = require('@quantnetwork/overledger-sdk');
```

Initialize the SDK with the 3 dlts available

```javascript
const overledger = new OverledgerSDK('mappId', 'bpiKey', {
    dlts: [
        { dlt: 'bitcoin' },
        { dlt: 'ethereum' },
        { dlt: 'ripple' }
    ]
});
```



## Usage

The SDK provides following functions:

* [configure](#configure)
* [sign](#sign)
* [send](#send)
* [loadDlt](#loadDlt)
* [readByMappId](#readByMappId)
* [readByTrannsactionId](#readByTransactionId)
* [setMappId](#setMappId)
* [getMappId](#getMappId)
* [setBpiKey](#setBpiKey)
* [getBpiKey](#getBpiKey)



### configure

Configure DLTs.

Usage: `configure(options)`

#### Parameters

This function has DLT Names as parameter.

|Name|Type|Description|
|---|---|---|
|`options`|Object|Object of the options type|

#### Return Value

This function does not have a return value.



### sign

Sign a transaction for a DLT.

Usage: `sign(dlts)`

#### Parameters

This function has array of DLT transaction data.

|Name|Type|Description|
|---|---|---|
|`dlts`|array|Array of DLT transaction data (DLT Name, From Address, To Address and Data)|

Example of DLT transaction data:
```javascript
[
    {
      dlt: 'bitcoin',
      fromAddress: '2NFj2CVhE5ru7werwXUNCbirUW6KDo2d',
      toAddress: '2NFj2CVhE5ru7werwXUNCbirUW6KDo2d',
      data: 'QNT test'
    },
    {
      dlt: 'ethereum',
      fromAddress: '0x930724bd974260Eb6C859abE2144f7e7ea73d7C1',
      toAddress: '0x0000000000000000000000000000000000000000',
      data: 'QNT test'
    },
    {
      dlt: 'ripple',
      fromAddress: 'rBLsJC9zuwn4H4z3LA8JD4fv2Nut4qf7ve',
      toAddress: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
      data: 'QNT test'
    }
]
```

#### Return Value

This function returns a Promise which resolves with a signedTransaction string.



### send

Send the signed transaction to the blockchain.

Usage: `send(signedTransactions)`

#### Parameters

This function takes Signed Transaction Hash as parameter.

|Name|Type|Description|
|---|---|---|
| `signedTransactions[object]`|object|Object of signed transaction|

```
signedTransactions = [
  {
    dlt: 'bitcoin',
    signedTransaction: 'SIGNEDTRANSACTIONHASH',
  },
  {
    dlt: 'ethereum',
    signedTransaction: 'SIGNEDTRANSACTIONHASH',
  },
]
```


#### Return Value

This function returns `Transaction Hash`



### readTransactionsByMappId

Read all transactions submitted by the mapp connected to the current API session.

#### Parameters

This function has no parameters.

#### Return value

This function returns a promise that resolves with an array of Overledger transaction objects with the following fields:

|Name|Type|Description|
|---|---|---|
|`mappId`|string|Identifier of a multi-chain application
|`overledgerTransactionId`|string|A transaction hash used to identify it, represented in hexadecimal
|`timestamp`|string|The timestamp when the transaction was received by Overledger
|`dltData`|array|Array of dltData type objects



### readByTransactionId

Read an Overledger transaction by its ID.

#### Parameters

|Name|Type|Description|
|--- |--- |---|
|`id`|String|A transaction hash used to identify it, represented in hexadecimal

#### Return value

This function returns a promise that resolves with an Overledger transaction containing the following fields:

|Name|Type|Description|
|---|---|---|
|`mappId`|string|Identifier of a multi-chain application|
|`overledgerTransactionId`|string|A transaction hash used to identify it, represented in hexadecimal
|`timestamp`|string|The timestamp when the transaction was received by Overledger
|`dltData`|array|Array of objects of the dltData type|

### setMappId

Set the multi-chain application ID.
Usage: `setMappId('network.quant.helloworld');`

#### Parameters

|Name|Type|Description|
|---|---|---|
|`id`|String|String representation of a multichain application id

#### Return value

This functionns has no return value



### getMappId

Get the multi-chain application identifier.
Usage: `const mappId = getMappId();`

#### Parameters

This function has no parameters.

#### Return value

This function returns a string representing the multi-chain application identifier.

|Name|Type|Description|
|---|---|---|
|`id`|string|String representation of a multichain application id



### setBpiKey

Set the Blockchain Programming Interface key.
Usage: `setBpiKey('bpiKey');`

#### Parameters

|Name|Type|Description|
|---|---|---|
|`bpiKey`|string|String representation of a BPI key.

#### Return value

This functions has no return value



### getBpiKey

Get the currently set Blockchain Programming Interface key.
Usage: `const bpiKey = getBpiKey();`

#### Parameters

This function has no parameters

#### Return value

This function returns a string representing the bpi key that is currently used.

|Name|Type|Description|
|---|---|---|
|`bpiKey`|string|String representation of the BPI key.




## Types

In this section we will provide a description of the common object types.

* [overledgerTransaction](#overledgerTransaction)
* [dltData](#dltData)



### overledgerTransaction

|Name|Type|Description|
|---|---|---|
|`mappId`|string|Identifier of a multi-chain application
|`overledgerTransactionId`|string|A transaction hash used to identify it, represented in hexadecimal
|`timestamp`|string|The timestamp when the transaction was received by Overledger
|`dltData`|array|Array of objects of the dltData type|



### dltData

|Name|Type|Description|
|---|---|---|
|`dlt`|string|String representation of the BPI key.
|`message`|string|Data to be sent to the DLT|
|`fromAddres`|string|Sender address|
|`toAddress`|string|Destination address|
|`changeAddress`|string|Address for the change to be submitted to|
|`fee`|string|Fee to pay for the transaction, represented in the lowest unit on the network (e.g.: satoshi, wei, drop etc)|
|`feeLimit`|string|Maximum fee to pay for the transaction to be submitted on the DLT|
|`callbackUrl`|string|Endpoint provided by the Mapp for the BPI layer to call back|
|`signedTransaction`|string|Hexadecimal string representation of a signed transaction|
