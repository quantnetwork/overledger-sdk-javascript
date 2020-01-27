# Overledger JavaScript SDK

Welcome to the developer's guide to use the Overledger SDK written in Javascript by Quant Network.

## Introduction to the Overledger SDK

Overledger is a blockchain operating system that allows applications to connect to multiple distributed ledger technologies (DLTs) or blockchains, thus becoming Multi-chain Applications (MApps). The Overledger SDK enables developers to create signed transactions and send them simultaneously to all supported DLTs through the Overledger Blockchain Programming Interface (BPI).

## Technologies

The Overledger SDK is a collection of node packages written in Typescript. Currently, the supported DLTs are Ethereum and Ripple. Bitcoin support will be re-enabled once the migration to the public testnet is complete.

## Prerequisites

- Register for a free developer account on [Quant Developer's Portal](https://developer.quant.network)
- You will require a MApp ID and BPI key:
  - Register your application in order to get a free MApp ID.
  - Verify your Quant token, and create a BPI key.
- Node.js 10

## Installation

The Overledger SDK can be installed as a node module. If all supported DLTs are necessary, 
the bundle package can be installed, which will include all required dependencies.

```
npm install @quantnetwork/overledger-bundle
```

Alternatively, the suite of packages allows developers to chose which blockchains/DLTs they would like to utilise by installing the core package and the individual DLT packages.

```
npm install @quantnetwork/overledger-core
```

```
npm install @quantnetwork/overledger-dlt-ethereum
```


## Getting started

Initialize the SDK with the available DLTs. Optionally, a timeout period can be specified (by default it is 5000ms).

```javascript
const OverledgerSDK = require("@quantnetwork/overledger-bundle").default;

const overledger = new OverledgerSDK("mappId", "bpiKey", {
  dlts: [{ dlt: "ethereum" }, { dlt: "ripple" }],
  timeout: 1500, // Optional
  provider: { network: 'testnet' }, // Optional
});
```

## API Reference

The SDK packages provide functions for interacting with the Overledger BPI Gateway as well as support for offline account generation and transaction signing.
The functions which interact with the Overldger BPI (send, get) return a promise with a standard Axios response which includes the BPI data in the `data` field.

Please check the examples folder for details on how to sign and send transactions, as well as do account queries. The api reference page can be found [here](api_reference.md).

## Examples

Examples can be found in the examples folder.

Don't forget to setup your `mappId` and `bpiKey`, you can get these on the [developer portal](https://developer.quant.network).

## Development

The Overledger JavaScript SDK manages multiple packages through [Lerna](https://lerna.js.org/). To develop the SDK, first install lerna:

```
npm install -g lerna
```

To build the project, download the yarn package manager and run:

```
yarn run build
```

This will build and link the packages together.

### Running tests

Make your changes and then from the root directory:

```
yarn test
```

To run tests on a specific package, change directories to that specific package and run the test command there.

### Documentation

Please update the documentation after your changes by editing the JSDoc annotations inside the source files and then run the following command from the root directory:

```
yarn run docs
```

### License

The Apache 2.0 license can be found [here](LICENSE).
