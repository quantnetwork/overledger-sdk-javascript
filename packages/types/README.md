[docs]: https://github.com/quantnetwork/overledger-sdk-javascript/blob/master/README.md
[repo]: https://github.com/quantnetwork/overledger-sdk-javascript

# @overledger/types

Package including all the types used by the [Overledger SDK][repo].

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @overledger/types
```

Or, if you prefer using [yarn](https://yarnpkg.com/):

```
yarn add @overledger/types
```

## Reference

## Modules

<dl>
<dt><a href="#module_types">types</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Account">Account</a> : <code>Object</code></dt>
<dd><p>An Overledger Account instance for a single DLT.</p>
</dd>
<dt><a href="#DLTAndAddress">DLTAndAddress</a> : <code>Object</code></dt>
<dd><p>DLT and Address pair</p>
</dd>
<dt><a href="#DLTOptions">DLTOptions</a> : <code>Object</code></dt>
<dd><p>Options for loading a DLT in the SDK</p>
</dd>
<dt><a href="#NetworkOptions">NetworkOptions</a> : <code>string</code></dt>
<dd><p>Overledger network options</p>
</dd>
<dt><a href="#SequenceDataRequest">SequenceDataRequest</a> : <code>Object</code></dt>
<dd><p>Overledger sequence request</p>
</dd>
<dt><a href="#SequenceDataResponse">SequenceDataResponse</a> : <code>Array.&lt;Object&gt;</code></dt>
<dd><p>Overledger sequence data response</p>
</dd>
<dt><a href="#TransactionOptions">TransactionOptions</a> : <code>Object</code></dt>
<dd><p>DLT transaction options.</p>
</dd>
</dl>

<a name="module_types"></a>

## types
<a name="Account"></a>

## Account
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| privateKey | <code>string</code> | The private key of the account, used for signing transactions. |
| address | <code>string</code> | The address or public key of the account, used for receiving messages. |

An Overledger Account instance for a single DLT.

<a name="DLTAndAddress"></a>

## DLTAndAddress
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| dlt | <code>string</code> | The distributed ledger technology. |
| address | <code>string</code> | The address on the respective dlt network. |

DLT and Address pair

<a name="DLTOptions"></a>

## DLTOptions
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| dlt | <code>string</code> | The distributed ledger technology. |
| [privateKey] | <code>string</code> | The private key of an account for the respecitve dlt. |

Options for loading a DLT in the SDK

<a name="NetworkOptions"></a>

## NetworkOptions
Overledger network options

<a name="SequenceDataRequest"></a>

## SequenceDataRequest
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| dlt | <code>string</code> | The distributed ledger technology. |
| address- | <code>string</code> | The address to search for. |

Overledger sequence request

<a name="SequenceDataResponse"></a>

## SequenceDataResponse
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| dlt | <code>string</code> | The distributed ledger technology. |
| address | <code>string</code> | The address the request was made for. |
| sequence | <code>number</code> | The sequence number for the respective address. |

Overledger sequence data response

<a name="TransactionOptions"></a>

## TransactionOptions
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [sequence] | <code>number</code> | This transaction's sequence in relation to the initiating account. |
| amount | <code>string</code> | The amount of tokens in the lowest unit available on the DLT. |

DLT transaction options.

