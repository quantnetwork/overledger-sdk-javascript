[docs]: https://github.com/quantnetwork/overledger-sdk-javascript/blob/master/README.md
[repo]: https://github.com/quantnetwork/overledger-sdk-javascript

# @quantnetwork/overledger-types

Package including all the types used by the [Overledger SDK][repo].

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @quantnetwork/overledger-types
```

Or, if you prefer using [yarn](https://yarnpkg.com/):

```
yarn add @quantnetwork/overledger-types
```

## Reference

## Modules

<dl>
<dt><a href="#module_overledger-types">overledger-types</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Account">Account</a> : <code>Object</code></dt>
<dd><p>An Overledger Account instance for a single DLT.</p>
</dd>
<dt><a href="#APICallWrapper">APICallWrapper</a> : <code>Object</code></dt>
<dd><p>A wrapper object for the dlt data to be sent to Overledger.</p>
</dd>
<dt><a href="#DLTAndAddress">DLTAndAddress</a> : <code>Object</code></dt>
<dd><p>DLT and Address pair.</p>
</dd>
<dt><a href="#DLTOptions">DLTOptions</a> : <code>Object</code></dt>
<dd><p>Options for loading a DLT in the SDK.</p>
</dd>
<dt><a href="#dlt">dlt</a> : <code>string</code></dt>
<dd><p>Fee estimation from different DLT</p>
</dd>
<dt><a href="#NetworkOptions">NetworkOptions</a> : <code>string</code></dt>
<dd><p>Overledger network options.</p>
</dd>
<dt><a href="#NodeResourceRequest">NodeResourceRequest</a> : <code>Object</code></dt>
<dd><p>Overledger node resource request object.</p>
</dd>
<dt><a href="#OverledgerSignedTransaction">OverledgerSignedTransaction</a> : <code>Object</code></dt>
<dd><p>Overledger signed transaction data.</p>
</dd>
<dt><a href="#ProviderOptions">ProviderOptions</a> : <code>Object</code></dt>
<dd><p>Overledger network provider options.</p>
</dd>
<dt><a href="#SDKOptions">SDKOptions</a> : <code>Object</code></dt>
<dd><p>Overledger SDK options.</p>
</dd>
<dt><a href="#SequenceDataRequest">SequenceDataRequest</a> : <code>Object</code></dt>
<dd><p>Overledger sequence request.</p>
</dd>
<dt><a href="#SequenceDataResponse">SequenceDataResponse</a> : <code>Array.&lt;Object&gt;</code></dt>
<dd><p>Overledger sequence data response.</p>
</dd>
<dt><a href="#SignedTransactionRequest">SignedTransactionRequest</a> : <code>Object</code></dt>
<dd><p>Overledger signed transaction request object.</p>
</dd>
<dt><a href="#SmartContractFunctionParam">SmartContractFunctionParam</a> : <code>Object</code></dt>
<dd><p>A generic object to describe a smart contract function parameter.</p>
</dd>
<dt><a href="#StatusRequest">StatusRequest</a> : <code>Object</code></dt>
<dd><p>Status request.</p>
</dd>
<dt><a href="#UnsignedTransactionRequest">UnsignedTransactionRequest</a> : <code>Object</code></dt>
<dd><p>Overledger signed transaction request object.</p>
</dd>
<dt><a href="#validationCheck">validationCheck</a> : <code>Object</code></dt>
<dd><p>A generic object to describe a validationCheck.</p>
</dd>
</dl>

<a name="module_overledger-types"></a>

## overledger-types

* [overledger-types](#module_overledger-types)

    * [.DltNameOptions](#module_overledger-types.DltNameOptions)

    * [.SCInteropOptions](#module_overledger-types.SCInteropOptions)


<a name="module_overledger-types.DltNameOptions"></a>

### *overledger-types*.DltNameOptions
<a name="module_overledger-types.SCInteropOptions"></a>

### *overledger-types*.SCInteropOptions
<a name="Account"></a>

## Account
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| privateKey | <code>string</code> | The private key of the account, used for signing transactions. |
| address | <code>string</code> | The address of the account, used for receiving messages |
| publicKey | <code>string</code> | The public key of the account. The address parameter will be a representation of this public key. |
| isSegwit | <code>boolean</code> | Define if the account is a segwit p2wpkh account in the Bitcoin DLT |
| isNestedSegwit | <code>boolean</code> | Define if the account is a  nested segwit account p2sh-p2wpkh in the Bitcoin DLT |
| script | <code>string</code> | locking script or scriptPubKey, needed for a nested segwit account |
| redeemScript | <code>string</code> | script to unlock the BTC, needed for a nested segwit account |
| password | <code>string</code> | For some accounts, they may be protected by a password, or a password is used instead of a private key |
| provider | <code>string</code> | If the account is stored or managed not by the user, then this person is the provider |

An Overledger Account instance for a single DLT.

<a name="APICallWrapper"></a>

## APICallWrapper
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| mappId | <code>string</code> | The unique multi-chain application ID received from the Overledger Developer Portal. |
| dltData | [<code>Array.&lt;SignedTransactionRequest&gt;</code>](#SignedTransactionRequest) \| [<code>Array.&lt;SequenceDataRequest&gt;</code>](#SequenceDataRequest) | The dlt data to be sent to Overledger |

A wrapper object for the dlt data to be sent to Overledger.

<a name="DLTAndAddress"></a>

## DLTAndAddress
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| dlt | <code>string</code> | The distributed ledger technology. |
| address | <code>string</code> | The address on the respective dlt network. |

DLT and Address pair.

<a name="DLTOptions"></a>

## DLTOptions
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| dlt | <code>string</code> | The distributed ledger technology. |
| [privateKey] | <code>string</code> | The private key of an account for the respecitve dlt. |

Options for loading a DLT in the SDK.

<a name="dlt"></a>

## dlt
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | from the fee estimation call |

Fee estimation from different DLT

<a name="NetworkOptions"></a>

## NetworkOptions
Overledger network options.

<a name="NodeResourceRequest"></a>

## NodeResourceRequest
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| dlt | <code>string</code> | The distributed ledger technology. |
| node | <code>Object</code> | The node on the distributed ledger network |
| nodePermissions | <code>Object</code> | If there is any permissioned to access this node |
| endpoint | <code>Object</code> | The OVL endpoint associated with this resource |
| resourceObject | <code>Object</code> | The payload this resource requires |

Overledger node resource request object.

<a name="OverledgerSignedTransaction"></a>

## OverledgerSignedTransaction
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| transactions | <code>Array.&lt;string&gt;</code> | The signed transaction blobs. |
| signatures | <code>Array.&lt;string&gt;</code> | The signasture blobs. |

Overledger signed transaction data.

<a name="ProviderOptions"></a>

## ProviderOptions
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [network] | [<code>NetworkOptions</code>](#NetworkOptions) | The network, either testnet, mainnet or custom. |
| [timeout] | <code>number</code> | Request timeout period specified in milliseconds. |

Overledger network provider options.

<a name="SDKOptions"></a>

## SDKOptions
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| dlts | [<code>Array.&lt;DLTOptions&gt;</code>](#DLTOptions) | The dlts to be loaded. |
| [provider] | [<code>ProviderOptions</code>](#ProviderOptions) | The network provider options. |

Overledger SDK options.

<a name="SequenceDataRequest"></a>

## SequenceDataRequest
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| dlt | <code>string</code> | The distributed ledger technology. |
| address | <code>string</code> | The address to search for. |

Overledger sequence request.

<a name="SequenceDataResponse"></a>

## SequenceDataResponse
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| dlt | <code>string</code> | The distributed ledger technology. |
| address | <code>string</code> | The address the request was made for. |
| sequence | <code>number</code> | The sequence number for the respective address. |

Overledger sequence data response.

<a name="SignedTransactionRequest"></a>

## SignedTransactionRequest
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| dlt | <code>string</code> | The distributed ledger technology. |
| fromAddress | <code>string</code> | The address initiating the transaction. |
| signedTransaction | [<code>OverledgerSignedTransaction</code>](#OverledgerSignedTransaction) | The signed transaction object. |

Overledger signed transaction request object.

<a name="SmartContractFunctionParam"></a>

## SmartContractFunctionParam
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>object</code> | information on the parameter's type |
| name | <code>string</code> | the parameter's name |
| value | <code>object</code> | information on the parameter's value |
| options | <code>object</code> | information on the valid values that this parameter can take |

A generic object to describe a smart contract function parameter.

<a name="StatusRequest"></a>

## StatusRequest
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| mappId | <code>string</code> | mappId |
| callbackUrl | <code>string</code> | The address which the updates send to. |
| timestamp | <code>string</code> | The timestamp |
| overledgerTransactionId | <code>string</code> | The overledgerTransactionId |

Status request.

<a name="UnsignedTransactionRequest"></a>

## UnsignedTransactionRequest
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| dlt | <code>string</code> | The distributed ledger technology. |
| txObject | <code>Object</code> | The unsigned transaction object. |

Overledger signed transaction request object.

<a name="validationCheck"></a>

## validationCheck
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| success | <code>boolean</code> | was the validation check successful? |
| failingField | <code>string</code> | if it was not successful, what was the first field that failed? |
| error | <code>string</code> | Is there any more information on this error? |

A generic object to describe a validationCheck.

