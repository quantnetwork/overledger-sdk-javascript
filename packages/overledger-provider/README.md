[docs]: https://github.com/quantnetwork/overledger-sdk-javascript/blob/master/README.md
[repo]: https://github.com/quantnetwork/overledger-sdk-javascript

# @quantnetwork/overledger-provider

Class used for the [Overledger SDK][repo] Gateway connection.

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @quantnetwork/overledger-provider
```

Or, if you prefer using [yarn](https://yarnpkg.com/):

```
yarn add @quantnetwork/overledger-provider
```

## API Reference

<a name="module_overledger-provider"></a>

## overledger-provider

* [overledger-provider](#module_overledger-provider)

    * _static_
        * [.TESTNET](#module_overledger-provider.TESTNET)

        * [.MAINNET](#module_overledger-provider.MAINNET)

        * [.default](#module_overledger-provider.default)

    * _inner_
        * [~Provider](#module_overledger-provider.Provider)

            * [new Provider(mappId, bpiKey, ProviderOptions)](#new_module_overledger-provider.Provider_new)

            * [.createRequest(path)](#module_overledger-provider.Provider+createRequest)


<a name="module_overledger-provider.TESTNET"></a>

### *overledger-provider*.TESTNET
Constant for the testnet URL.

<a name="module_overledger-provider.MAINNET"></a>

### *overledger-provider*.MAINNET
Constant for the mainnet URL (placeholder).

<a name="module_overledger-provider.default"></a>

### *overledger-provider*.default
Network provider package.

<a name="module_overledger-provider.Provider"></a>

### *overledger-provider*~Provider

* [~Provider](#module_overledger-provider.Provider)

    * [new Provider(mappId, bpiKey, ProviderOptions)](#new_module_overledger-provider.Provider_new)

    * [.createRequest(path)](#module_overledger-provider.Provider+createRequest)


<a name="new_module_overledger-provider.Provider_new"></a>

#### new Provider(mappId, bpiKey, ProviderOptions)

| Param | Type | Description |
| --- | --- | --- |
| mappId | <code>string</code> | The Multi-chain Application ID |
| bpiKey | <code>string</code> | The Overledger Blockchain Programming Interface license key |
| ProviderOptions | <code>ProviderOptions</code> | Overledger network provider options |

<a name="module_overledger-provider.Provider+createRequest"></a>

#### *provider*.createRequest(path)

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Request endpoint resource path |

