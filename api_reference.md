## Modules

<dl>
<dt><a href="#module_bundle">bundle</a></dt>
<dd></dd>
<dt><a href="#module_core">core</a></dt>
<dd></dd>
<dt><a href="#module_dlt-abstract">dlt-abstract</a></dt>
<dd></dd>
<dt><a href="#module_dlt-ethereum">dlt-ethereum</a></dt>
<dd></dd>
<dt><a href="#module_dlt-ripple">dlt-ripple</a></dt>
<dd></dd>
<dt><a href="#module_provider">provider</a></dt>
<dd></dd>
<dt><a href="#module_search">search</a></dt>
<dd></dd>
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

<a name="module_bundle"></a>

## bundle
<a name="module_bundle.default"></a>

### *bundle*.default
Main Overledger SDK bundle. Includes all the packages for all supported DLTs.

<a name="module_core"></a>

## core

* [core](#module_core)

    * _static_
        * [.default](#module_core.default)

    * _inner_
        * [~OverledgerSDK](#module_core.OverledgerSDK)

            * [new OverledgerSDK(mappId, bpiKey, options)](#new_module_core.OverledgerSDK_new)

            * [.dlts](#module_core.OverledgerSDK+dlts)

            * [.loadDlt(config)](#module_core.OverledgerSDK+loadDlt)

            * [.validateOptions(options)](#module_core.OverledgerSDK+validateOptions)

            * [.buildWrapperApiCall(signedTransactionRequest)](#module_core.OverledgerSDK+buildWrapperApiCall)

            * [.sign(unsignedData)](#module_core.OverledgerSDK+sign)

            * [.send(signedTransactions)](#module_core.OverledgerSDK+send)

            * [.getBalances(balancesRequest)](#module_core.OverledgerSDK+getBalances)

            * [.getSequences(sequenceRequest)](#module_core.OverledgerSDK+getSequences)

            * [.readTransactionsByMappId()](#module_core.OverledgerSDK+readTransactionsByMappId)

            * [.readOverledgerTransaction(overledgerTransactionId)](#module_core.OverledgerSDK+readOverledgerTransaction)

            * [.setMappId(mappId)](#module_core.OverledgerSDK+setMappId)

            * [.getMappId()](#module_core.OverledgerSDK+getMappId)

            * [.setBpiKey(bpiKey)](#module_core.OverledgerSDK+setBpiKey)

            * [.getBpiKey()](#module_core.OverledgerSDK+getBpiKey)


<a name="module_core.default"></a>

### *core*.default
Core Overledger SDK class. Individual dlt packages must be installed manually.

<a name="module_core.OverledgerSDK"></a>

### *core*~OverledgerSDK

* [~OverledgerSDK](#module_core.OverledgerSDK)

    * [new OverledgerSDK(mappId, bpiKey, options)](#new_module_core.OverledgerSDK_new)

    * [.dlts](#module_core.OverledgerSDK+dlts)

    * [.loadDlt(config)](#module_core.OverledgerSDK+loadDlt)

    * [.validateOptions(options)](#module_core.OverledgerSDK+validateOptions)

    * [.buildWrapperApiCall(signedTransactionRequest)](#module_core.OverledgerSDK+buildWrapperApiCall)

    * [.sign(unsignedData)](#module_core.OverledgerSDK+sign)

    * [.send(signedTransactions)](#module_core.OverledgerSDK+send)

    * [.getBalances(balancesRequest)](#module_core.OverledgerSDK+getBalances)

    * [.getSequences(sequenceRequest)](#module_core.OverledgerSDK+getSequences)

    * [.readTransactionsByMappId()](#module_core.OverledgerSDK+readTransactionsByMappId)

    * [.readOverledgerTransaction(overledgerTransactionId)](#module_core.OverledgerSDK+readOverledgerTransaction)

    * [.setMappId(mappId)](#module_core.OverledgerSDK+setMappId)

    * [.getMappId()](#module_core.OverledgerSDK+getMappId)

    * [.setBpiKey(bpiKey)](#module_core.OverledgerSDK+setBpiKey)

    * [.getBpiKey()](#module_core.OverledgerSDK+getBpiKey)


<a name="new_module_core.OverledgerSDK_new"></a>

#### new OverledgerSDK(mappId, bpiKey, options)

| Param | Type | Description |
| --- | --- | --- |
| mappId | <code>string</code> | The Multi-chain Application ID |
| bpiKey | <code>string</code> | The Overledger Blockchain Programming Interface license key |
| options | <code>SDKOptions</code> | The DLT Options and Provider Options |

Create the Overledger SDK

<a name="module_core.OverledgerSDK+dlts"></a>

#### *overledgerSDK*.dlts
The object storing the DLTs loaded by the Overledger SDK

<a name="module_core.OverledgerSDK+loadDlt"></a>

#### *overledgerSDK*.loadDlt(config)

| Param | Type | Description |
| --- | --- | --- |
| config | [<code>DLTOptions</code>](#DLTOptions) | DLT name and an optional Private Key to use as the main account |

Load the DLT in the Overledger SDK

**Returns**: <code>AbstractDLT</code> - The loaded DLT class  
<a name="module_core.OverledgerSDK+validateOptions"></a>

#### *overledgerSDK*.validateOptions(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>SDKOptions</code> | The DLT Options and Provider Options |

Validate the provided Overledger SDK Options

<a name="module_core.OverledgerSDK+buildWrapperApiCall"></a>

#### *overledgerSDK*.buildWrapperApiCall(signedTransactionRequest)

| Param | Type | Description |
| --- | --- | --- |
| signedTransactionRequest | <code>Array.&lt;SignedTransactionRequest&gt;</code> | Array of signed transactions |

Wrap the DLT Data with the API schema

**Returns**: <code>APICallWrapper</code> - Object conforming to the API schema  
<a name="module_core.OverledgerSDK+sign"></a>

#### *overledgerSDK*.sign(unsignedData)

| Param | Type | Description |
| --- | --- | --- |
| unsignedData | <code>Array.&lt;UnsignedData&gt;</code> | Array of unsigned data |

Sign the provided transactions

**Returns**: <code>Array.&lt;SignedTransactionRequest&gt;</code> - Array of signed transaction requests wrapped by Overledger metadata  
<a name="module_core.OverledgerSDK+send"></a>

#### *overledgerSDK*.send(signedTransactions)

| Param | Type | Description |
| --- | --- | --- |
| signedTransactions | <code>Array.&lt;SignedTransactionRequest&gt;</code> | Array of Overledger signed transaction data |

Send signed transactions to Overledger

<a name="module_core.OverledgerSDK+getBalances"></a>

#### *overledgerSDK*.getBalances(balancesRequest)

| Param | Type | Description |
| --- | --- | --- |
| balancesRequest | [<code>Array.&lt;DLTAndAddress&gt;</code>](#DLTAndAddress) | Array of objects specifing the address and corresponding DLT |

Get the balances of the specified addresses

<a name="module_core.OverledgerSDK+getSequences"></a>

#### *overledgerSDK*.getSequences(sequenceRequest)

| Param | Type | Description |
| --- | --- | --- |
| sequenceRequest | [<code>Array.&lt;SequenceDataRequest&gt;</code>](#SequenceDataRequest) | Request for sequence numbers of the provided addresses |

Get the sequence numbers for the provided addresses

**Returns**: [<code>SequenceDataResponse</code>](#SequenceDataResponse) - Sequence response  
<a name="module_core.OverledgerSDK+readTransactionsByMappId"></a>

#### *overledgerSDK*.readTransactionsByMappId()
Get transactions submitted through Oberledger by the Multi-Chain Application ID used to create the SDK

<a name="module_core.OverledgerSDK+readOverledgerTransaction"></a>

#### *overledgerSDK*.readOverledgerTransaction(overledgerTransactionId)

| Param | Type | Description |
| --- | --- | --- |
| overledgerTransactionId | <code>string</code> | Overledger Transaction ID |

Get the transaction specified by the Overledger Transaction ID

<a name="module_core.OverledgerSDK+setMappId"></a>

#### *overledgerSDK*.setMappId(mappId)

| Param | Type | Description |
| --- | --- | --- |
| mappId | <code>string</code> | Multi-Chain Application ID |

Set the Multi-Chain Application ID

<a name="module_core.OverledgerSDK+getMappId"></a>

#### *overledgerSDK*.getMappId()
Get the Multi-Chain Application ID

<a name="module_core.OverledgerSDK+setBpiKey"></a>

#### *overledgerSDK*.setBpiKey(bpiKey)

| Param | Type |
| --- | --- |
| bpiKey | <code>string</code> | 

Set the Overledger Blockchain Programming Interface license key

<a name="module_core.OverledgerSDK+getBpiKey"></a>

#### *overledgerSDK*.getBpiKey()
Get the Overledger Blockchain Programming Interface license key

<a name="module_dlt-abstract"></a>

## dlt-abstract

* [dlt-abstract](#module_dlt-abstract)

    * _static_
        * [.default](#module_dlt-abstract.default)

    * _inner_
        * [~AbstractDLT](#module_dlt-abstract.AbstractDLT)

            * [new AbstractDLT(sdk, options)](#new_module_dlt-abstract.AbstractDLT_new)

            * [.getBalance(address)](#module_dlt-abstract.AbstractDLT+getBalance)

            * [.getSequence(address)](#module_dlt-abstract.AbstractDLT+getSequence)

            * [.sign(toAddress, message, options)](#module_dlt-abstract.AbstractDLT+sign)

            * [.send(signedTransaction)](#module_dlt-abstract.AbstractDLT+send)

            * [.buildSignedTransactionsApiCall(signedTransaction)](#module_dlt-abstract.AbstractDLT+buildSignedTransactionsApiCall)


<a name="module_dlt-abstract.default"></a>

### *dlt-abstract*.default
Abstract class for DLT modules. All DLT packages need to extend this class.

<a name="module_dlt-abstract.AbstractDLT"></a>

### *dlt-abstract*~AbstractDLT

* [~AbstractDLT](#module_dlt-abstract.AbstractDLT)

    * [new AbstractDLT(sdk, options)](#new_module_dlt-abstract.AbstractDLT_new)

    * [.getBalance(address)](#module_dlt-abstract.AbstractDLT+getBalance)

    * [.getSequence(address)](#module_dlt-abstract.AbstractDLT+getSequence)

    * [.sign(toAddress, message, options)](#module_dlt-abstract.AbstractDLT+sign)

    * [.send(signedTransaction)](#module_dlt-abstract.AbstractDLT+send)

    * [.buildSignedTransactionsApiCall(signedTransaction)](#module_dlt-abstract.AbstractDLT+buildSignedTransactionsApiCall)


<a name="new_module_dlt-abstract.AbstractDLT_new"></a>

#### new AbstractDLT(sdk, options)

| Param | Type |
| --- | --- |
| sdk | <code>any</code> | 
| options | <code>Object</code> | 

<a name="module_dlt-abstract.AbstractDLT+getBalance"></a>

#### *abstractDLT*.getBalance(address)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> | <code>null</code> | The address to query for |

Get the balance for a specific address

<a name="module_dlt-abstract.AbstractDLT+getSequence"></a>

#### *abstractDLT*.getSequence(address)

| Param | Type |
| --- | --- |
| address | <code>string</code> \| <code>Array.&lt;string&gt;</code> | 

Get the sequence for a specific address

<a name="module_dlt-abstract.AbstractDLT+sign"></a>

#### *abstractDLT*.sign(toAddress, message, options)

| Param | Type |
| --- | --- |
| toAddress | <code>string</code> | 
| message | <code>string</code> | 
| options | [<code>TransactionOptions</code>](#TransactionOptions) | 

Sign a transaction for the DLT

<a name="module_dlt-abstract.AbstractDLT+send"></a>

#### *abstractDLT*.send(signedTransaction)

| Param | Type |
| --- | --- |
| signedTransaction | <code>SignedTransactionRequest</code> | 

Send an Overledger signed transaction

<a name="module_dlt-abstract.AbstractDLT+buildSignedTransactionsApiCall"></a>

#### *abstractDLT*.buildSignedTransactionsApiCall(signedTransaction)

| Param | Type |
| --- | --- |
| signedTransaction | <code>SignedTransactionRequest</code> | 

Wrap a specific DLT signed transaction with the Overledger required fields

<a name="module_dlt-ethereum"></a>

## dlt-ethereum

* [dlt-ethereum](#module_dlt-ethereum)

    * _static_
        * [.default](#module_dlt-ethereum.default)

    * _inner_
        * [~Ethereum](#module_dlt-ethereum.Ethereum)

            * [new Ethereum(sdk, options)](#new_module_dlt-ethereum.Ethereum_new)

            * [.name](#module_dlt-ethereum.Ethereum+name)

            * [.symbol](#module_dlt-ethereum.Ethereum+symbol)

            * [.createAccount()](#module_dlt-ethereum.Ethereum+createAccount)

            * [.setAccount(privateKey)](#module_dlt-ethereum.Ethereum+setAccount)

            * [.buildTransaction(toAddress, message, options)](#module_dlt-ethereum.Ethereum+buildTransaction)

            * [._sign(toAddress, message, options)](#module_dlt-ethereum.Ethereum+_sign)


<a name="module_dlt-ethereum.default"></a>

### *dlt-ethereum*.default
Development package for Ethereum.

<a name="module_dlt-ethereum.Ethereum"></a>

### *dlt-ethereum*~Ethereum

* [~Ethereum](#module_dlt-ethereum.Ethereum)

    * [new Ethereum(sdk, options)](#new_module_dlt-ethereum.Ethereum_new)

    * [.name](#module_dlt-ethereum.Ethereum+name)

    * [.symbol](#module_dlt-ethereum.Ethereum+symbol)

    * [.createAccount()](#module_dlt-ethereum.Ethereum+createAccount)

    * [.setAccount(privateKey)](#module_dlt-ethereum.Ethereum+setAccount)

    * [.buildTransaction(toAddress, message, options)](#module_dlt-ethereum.Ethereum+buildTransaction)

    * [._sign(toAddress, message, options)](#module_dlt-ethereum.Ethereum+_sign)


<a name="new_module_dlt-ethereum.Ethereum_new"></a>

#### new Ethereum(sdk, options)

| Param | Type |
| --- | --- |
| sdk | <code>any</code> | 
| options | <code>Object</code> | 

<a name="module_dlt-ethereum.Ethereum+name"></a>

#### *ethereum*.name
Name of the DLT

<a name="module_dlt-ethereum.Ethereum+symbol"></a>

#### *ethereum*.symbol
Symbol of the DLT

<a name="module_dlt-ethereum.Ethereum+createAccount"></a>

#### *ethereum*.createAccount()
Create an account for a specific DLT

<a name="module_dlt-ethereum.Ethereum+setAccount"></a>

#### *ethereum*.setAccount(privateKey)

| Param | Type | Description |
| --- | --- | --- |
| privateKey | <code>string</code> | The privateKey |

Set an account for signing transactions for a specific DLT

<a name="module_dlt-ethereum.Ethereum+buildTransaction"></a>

#### *ethereum*.buildTransaction(toAddress, message, options)

| Param | Type |
| --- | --- |
| toAddress | <code>string</code> | 
| message | <code>string</code> | 
| options | [<code>TransactionOptions</code>](#TransactionOptions) | 

Build the transaction

<a name="module_dlt-ethereum.Ethereum+_sign"></a>

#### *ethereum*._sign(toAddress, message, options)

| Param | Type |
| --- | --- |
| toAddress | <code>string</code> | 
| message | <code>string</code> | 
| options | [<code>TransactionOptions</code>](#TransactionOptions) | 

Sign the transaction

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
| options | [<code>TransactionOptions</code>](#TransactionOptions) | 

Build the transaction

<a name="module_dlt-ripple.Ripple+_sign"></a>

#### *ripple*._sign(toAddress, message, options)

| Param | Type |
| --- | --- |
| toAddress | <code>string</code> | 
| message | <code>string</code> | 
| options | [<code>TransactionOptions</code>](#TransactionOptions) | 

Sign the transaction

<a name="module_provider"></a>

## provider

* [provider](#module_provider)

    * _static_
        * [.TESTNET](#module_provider.TESTNET)

        * [.MAINNET](#module_provider.MAINNET)

        * [.default](#module_provider.default)

    * _inner_
        * [~Provider](#module_provider.Provider)


<a name="module_provider.TESTNET"></a>

### *provider*.TESTNET
Constant for the testnet URL.

<a name="module_provider.MAINNET"></a>

### *provider*.MAINNET
Constant for the mainnet URL (placeholder).

<a name="module_provider.default"></a>

### *provider*.default
Network provider package.

<a name="module_provider.Provider"></a>

### *provider*~Provider
<a name="module_search"></a>

## search

* [search](#module_search)

    * _static_
        * [.default](#module_search.default)

    * _inner_
        * [~OverledgerSearch](#module_search.OverledgerSearch)

            * [new OverledgerSearch(sdk)](#new_module_search.OverledgerSearch_new)

            * [.getTransaction(transactionHash)](#module_search.OverledgerSearch+getTransaction)

            * [.getTransactionType(hash)](#module_search.OverledgerSearch+getTransactionType)

            * [.getBlockByDltAndNumber(dlt, blockNumber)](#module_search.OverledgerSearch+getBlockByDltAndNumber)

            * [.getBlockByDltAndHash(dlt, hash)](#module_search.OverledgerSearch+getBlockByDltAndHash)


<a name="module_search.default"></a>

### *search*.default
Search support package.

<a name="module_search.OverledgerSearch"></a>

### *search*~OverledgerSearch

* [~OverledgerSearch](#module_search.OverledgerSearch)

    * [new OverledgerSearch(sdk)](#new_module_search.OverledgerSearch_new)

    * [.getTransaction(transactionHash)](#module_search.OverledgerSearch+getTransaction)

    * [.getTransactionType(hash)](#module_search.OverledgerSearch+getTransactionType)

    * [.getBlockByDltAndNumber(dlt, blockNumber)](#module_search.OverledgerSearch+getBlockByDltAndNumber)

    * [.getBlockByDltAndHash(dlt, hash)](#module_search.OverledgerSearch+getBlockByDltAndHash)


<a name="new_module_search.OverledgerSearch_new"></a>

#### new OverledgerSearch(sdk)

| Param | Type |
| --- | --- |
| sdk | <code>Object</code> | 

<a name="module_search.OverledgerSearch+getTransaction"></a>

#### *overledgerSearch*.getTransaction(transactionHash)

| Param | Type | Description |
| --- | --- | --- |
| transactionHash | <code>string</code> | Transaction hash |

Get transaction by transaction hash (non-deterministic)

<a name="module_search.OverledgerSearch+getTransactionType"></a>

#### *overledgerSearch*.getTransactionType(hash)

| Param | Type | Description |
| --- | --- | --- |
| hash | <code>string</code> | hash |

Get the transaction type based on the hash

<a name="module_search.OverledgerSearch+getBlockByDltAndNumber"></a>

#### *overledgerSearch*.getBlockByDltAndNumber(dlt, blockNumber)

| Param | Type | Description |
| --- | --- | --- |
| dlt | <code>string</code> | The DLT name |
| blockNumber | <code>number</code> | The block number |

Get block by DLT and number

<a name="module_search.OverledgerSearch+getBlockByDltAndHash"></a>

#### *overledgerSearch*.getBlockByDltAndHash(dlt, hash)

| Param | Type | Description |
| --- | --- | --- |
| dlt | <code>string</code> | The DLT name |
| hash | <code>string</code> | The block hash |

Get block by DLT and hash

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

