[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![NPM package version](https://img.shields.io/npm/v/@quantnetwork/overledger-sdk.svg)](https://www.npmjs.com/package/@quantnetwork/overledger-sdk)

# Overledger Javascript SDK

Developer's guide to use Overledger SDK written in Javascript by Quant Network.

## Introduction to the Overledger SDK

Overledger is an operating system that allows distributed apps(MApps) to connect to multiple distributed ledger technologies (DLTs) or blockchains. The Overledger SDK allows developers to create signed transactions & send them simultaneously to all supported DLTs.

## Technologies

The Overledger SDK is a node module written in Javascript/ES6.

## Prerequisites

- Register for a free developer account on [Quant Developer's Portal](https://developer.quant.network)
- You will require a MAppId and BPI key:
  - Register your application in order to get a free MApp ID.
  - Verify your Quant token, and create a BPI key.

## Installation

The Overledger SDK can be easily installed as an npm module. This will ensure that all required dependencies are automatically included.

```
npm install @quantnetwork/overledger-sdk
```

Or if you prefer Yarn as the package manager.

```
yarn add @quantnetwork/overledger-sdk
```

## Development

To run the SDK in development mode, run the command `npm run dev` and every change will be automatically built.

## Getting started

NodeJS with babel

```javascript
import OverledgerSDK from "@quantnetwork/overledger-sdk";
```

NodeJS

```javascript
const OverledgerSDK = require("@quantnetwork/overledger-sdk").default;
```

Initialize the SDK with the 3 available dlts. Optionally, a timeout period can be specified (by default it's 1000ms).

```javascript
const overledger = new OverledgerSDK("mappId", "bpiKey", {
  dlts: [{ dlt: "bitcoin" }, { dlt: "ethereum" }, { dlt: "ripple" }],
  timeout: 1500, // Optional
});
```

## Usage

The SDK provides the following functions which return a promise with a standard axios response which includes the BPI data in the `data` field:

- Main functions
  - [configure](#configure)
  - [sign](#sign)
  - [send](#send)
  - [loadDlt](#loadDlt)
  - [readByMappId](#readByMappId)
  - [readByTrannsactionId](#readByTransactionId)
  - [setMappId](#setMappId)
  - [getMappId](#getMappId)
  - [setBpiKey](#setBpiKey)
  - [getBpiKey](#getBpiKey)
  - [getBalance](#getBalance)
  - [getBalances](#getBalances)
- DLT functions
  - [Faucet](#faucet)
  - [Account](#account)


### configure

Configure DLTs.

Usage: `configure(options)`

#### Parameters

This function has DLT Names as parameter.

| Name      | Type   | Description                |
| --------- | ------ | -------------------------- |
| `options` | Object | Object of the options type |

#### Return Value

This function does not have a return value.

### sign

Sign a transaction for a DLT.

Usage: `sign(dlts)`

#### Parameters

This function takes an array of DLT transaction data.

| Name   | Type  | Description                                                                 |
| ------ | ----- | --------------------------------------------------------------------------- |
| `dlts` | array | Array of DLT transaction data (DLT Name, From Address, To Address and Data) |

Example of DLT transaction data:

*Because the data differs between blockchain, the `options` object contains all the non-generic variables and can be different in each blockchain.*

```javascript
[
  {
    dlt: "bitcoin",
    toAddress: "2NFj2CVhE5ru7werwXUNCbirUW6KDo2d",
    message: "QNT test",
    options: {
      amount: 1,
      sequence: 2, // VOUT
      previousTransactionHash: '77b04805f40a7cba6ed49be10d200f41462bfa266f24db91114798178c802058',
      feePrice: 1e5,
      value: 1
    }
  },
  {
    dlt: "ethereum",
    toAddress: "0x0000000000000000000000000000000000000000",
    message: "QNT test",
    options: {
      amount: '1', // Amount in wei (1 ETH = 10^18 wei)
      sequence: 2, // nonce
      feeLimit: '10',
      feePrice: '10',
    }
  },
  {
    dlt: "ripple",
    toAddress: "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
    message: "QNT test",
    options: {
      amount: '1', // Amount in drops (1 XRP = 1,000,000 drops)
      feePrice: '0.000012', // Standard fee price on the XRP network
      sequence: 1, // Transaction index number for this account (e.g if it's the first transaction after funding the address, sequence is 1)
      maxLedgerVersion: '4294967295', // This is the maximum value that this option field can take
    }
  }
];
```

#### Return Value

This function returns a Promise which resolves with a signedTransaction string.

### send

Send the signed transaction to the blockchain.

Usage: `send(signedTransactions)`

#### Parameters

This function takes Signed Transaction Hash as parameter.

| Name                         | Type   | Description                  |
| ---------------------------- | ------ | ---------------------------- |
| `signedTransactions[object]` | object | Object of signed transaction |

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

| Name                      | Type   | Description                                                        |
| ------------------------- | ------ | ------------------------------------------------------------------ |
| `mappId`                  | string | Identifier of a multi-chain application                            |
| `overledgerTransactionId` | string | A transaction hash used to identify it, represented in hexadecimal |
| `timestamp`               | string | The timestamp when the transaction was received by Overledger      |
| `dltData`                 | array  | Array of dltData type objects                                      |

### readByTransactionId

Read an Overledger transaction by its ID.

#### Parameters

| Name | Type   | Description                                                        |
| ---- | ------ | ------------------------------------------------------------------ |
| `id` | String | A transaction hash used to identify it, represented in hexadecimal |

#### Return value

This function returns a promise that resolves with an Overledger transaction containing the following fields:

| Name                      | Type   | Description                                                        |
| ------------------------- | ------ | ------------------------------------------------------------------ |
| `mappId`                  | string | Identifier of a multi-chain application                            |
| `overledgerTransactionId` | string | A transaction hash used to identify it, represented in hexadecimal |
| `timestamp`               | string | The timestamp when the transaction was received by Overledger      |
| `dltData`                 | array  | Array of objects of the dltData type                               |

### setMappId

Set the multi-chain application ID.
Usage: `setMappId('network.quant.helloworld');`

#### Parameters

| Name | Type   | Description                                          |
| ---- | ------ | ---------------------------------------------------- |
| `id` | String | String representation of a multichain application id |

#### Return value

This functionns has no return value

### getMappId

Get the multi-chain application identifier.
Usage: `const mappId = getMappId();`

#### Parameters

This function has no parameters.

#### Return value

This function returns a string representing the multi-chain application identifier.

| Name | Type   | Description                                          |
| ---- | ------ | ---------------------------------------------------- |
| `id` | string | String representation of a multichain application id |

### setBpiKey

Set the Blockchain Programming Interface key.
Usage: `setBpiKey('bpiKey');`

#### Parameters

| Name     | Type   | Description                         |
| -------- | ------ | ----------------------------------- |
| `bpiKey` | string | String representation of a BPI key. |

#### Return value

This functions has no return value

### getBpiKey

Get the currently set Blockchain Programming Interface key.
Usage: `const bpiKey = getBpiKey();`

#### Parameters

This function has no parameters

#### Return value

This function returns a string representing the bpi key that is currently used.

| Name     | Type   | Description                           |
| -------- | ------ | ------------------------------------- |
| `bpiKey` | string | String representation of the BPI key. |

### getBalance

Get the balance of an address or, by default, the account that is currently set.

Usage: `overledger.dlts.{dltName}.getBalance(address);`

#### Parameters

| Name      | Type   | Description       |
| --------- | ------ | ------------------|
| `address` | string | Optional address. |

#### Return value

This function returns an object with the following fields.

| Name      | Type   | Description                                                       |
| --------- | ------ | ----------------------------------------------------------------- |
| `dlt`     | string | The DLT which the request has been submitted to                   |
| `address` | string | The address holding the balance                                   |
| `unit`    | string | The unit; satoshi for bitcoin, wei for ethereum, drops for ripple |
| `value`   | string | The amount of units this address holds                            |

### getBalances

Get the balances of multiple addresses
Usage:

```
const request = [
	{
		"dlt": "ethereum",
		"address": "0x0000000000000000000000000000000000000000"
	},
	{
		"dlt": "ripple",
		"address": "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh"
	}
]

overledger.getBalances(request);
```

#### Parameters

This function accepts an array of objects with the following fields:

| Name      | Type   | Description                                      |
| --------- | ------ | ------------------------------------------------ |
| `dlt`     | string | The dlt where this address should be searched on |
| `address` | string | The address for the balance query                |

#### Return value

This function returns an array of objects with the following fields.

| Name      | Type   | Description                                                       |
| --------- | ------ | ----------------------------------------------------------------- |
| `dlt`     | string | The DLT which the request has been submitted to                   |
| `address` | string | The address holding the balance                                   |
| `unit`    | string | The unit; satoshi for bitcoin, wei for ethereum, drops for ripple |
| `value`   | string | The amount of units this address holds                            |

### Faucet
As per default it would take the configured address.
From the DLT level `overledger.dlts.[dlt]`
Fund an account on our testnet.

Usage: `fundAccount(amount?, address?)`

#### Parameters

| Name      | Type   | Description                                                                                                               |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| `amount`  | string | _Optional_ The amount of tokens to fund, in the smallest unit (satoshi for Bitcoin, wei for Ethereum or drops for Ripple) |
| `address` | string | _Optional_ The address to fund                                                                                            |

#### Return Value

This function returns a `Promise`


## Types

In this section we will provide a description of the common object types.

- [overledgerTransaction](#overledgerTransaction)
- [dltData](#dltData)

### overledgerTransaction

| Name                      | Type   | Description                                                        |
| ------------------------- | ------ | ------------------------------------------------------------------ |
| `mappId`                  | string | Identifier of a multi-chain application                            |
| `overledgerTransactionId` | string | A transaction hash used to identify it, represented in hexadecimal |
| `timestamp`               | string | The timestamp when the transaction was received by Overledger      |
| `dltData`                 | array  | Array of objects of the dltData type                               |

### dltData

| Name                | Type   | Description                                                                                                  |
| ------------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| `dlt`               | string | String representation of the BPI key.                                                                        |
| `message`           | string | Data to be sent to the DLT                                                                                   |
| `fromAddres`        | string | Sender address                                                                                               |
| `toAddress`         | string | Destination address                                                                                          |
| `changeAddress`     | string | Address for the change to be submitted to                                                                    |
| `fee`               | string | Fee to pay for the transaction, represented in the lowest unit on the network (e.g.: satoshi, wei, drop etc) |
| `feeLimit`          | string | Maximum fee to pay for the transaction to be submitted on the DLT                                            |
| `callbackUrl`       | string | Endpoint provided by the Mapp for the BPI layer to call back                                                 |
| `signedTransaction` | string | Hexadecimal string representation of a signed transaction                                                    |

### Account
From the DLT level `overledger.dlts.[dlt]`

#### Set Account
This function sets the default account for the specified blockchain into the SDK, every transaction will be signed by this account
Usage: `setAccount(privateKey)`
*Must be a WIF key for bitcoin*

##### Parameters

This function takes:
- privateKey: the privateKey belonging to the specified blockchain

##### Return Value

This function has no return value.

#### Get Account
This function gets the default account for the specified blockchain from the SDK
Usage: `overledger.dlts.[dlt].account`

##### Return Value

This function returns
```
{
  privateKey: 'string' // The privateKey belonging to the specified blockchain
  address: 'string' // The address belonging to this privateKey
}
```
*For bitcoin, the privateKey is in the WIF format*

#### Create Account
This function creates an account for the specified blockchain from the SDK
Usage: `overledger.dlts.[dlt].createAccount()`

##### Return Value

This function returns
```
{
  privateKey: 'string' // The privateKey belonging to the specified blockchain
  address: 'string' // The address belonging to this privateKey
}
```
*For bitcoin, the privateKey is in the WIF format*

## Usage Example

In this simple usage example we will call the `getBalance` method to request the balance of the genesis address on Ripple (created by the blockchain on startup).

```
npm install @quantnetwork/overledger-sdk
```

```
// Boilerplate
const OverledgerSDK = require("@quantnetwork/overledger-sdk").default;
// Replace mappId and bipKey with your own credentials.
const overledger = new OverledgerSDK("mappId", "bpiKey", {
  dlts: [{ dlt: "bitcoin" }, { dlt: "ethereum" }, { dlt: "ripple" }]
});

// Method call
;(async () => {

  const rippleAddress = "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh"

  const response = await overledger.dlts.ripple.getBalance(rippleAddress);

  var rippleGenesisBalance = response.data
  // The lowest unit in XRP is called 'drop'
  console.log("The balance of the genesis address on the Quant Ripple Testnet is", rippleGenesisBalance.value, rippleGenesisBalance.unit);

})();
```
