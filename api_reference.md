## Modules

<dl>
<dt><a href="#module_overledger-bundle">overledger-bundle</a></dt>
<dd></dd>
<dt><a href="#module_overledger-core">overledger-core</a></dt>
<dd></dd>
<dt><a href="#module_overledger-dlt-abstract">overledger-dlt-abstract</a></dt>
<dd></dd>
<dt><a href="#module_overledger-dlt-ethereum">overledger-dlt-ethereum</a></dt>
<dd></dd>
<dt><a href="#module_overledger-dlt-ripple">overledger-dlt-ripple</a></dt>
<dd></dd>
<dt><a href="#module_overledger-provider">overledger-provider</a></dt>
<dd></dd>
<dt><a href="#module_overledger-search">overledger-search</a></dt>
<dd></dd>
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
<dt><a href="#NetworkOptions">NetworkOptions</a> : <code>string</code></dt>
<dd><p>Overledger network options.</p>
</dd>
<dt><a href="#Options">Options</a> : <code>Object</code></dt>
<dd><p>Options for insantiating the SDK.</p>
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
<dt><a href="#TransactionOptions">TransactionOptions</a> : <code>Object</code></dt>
<dd><p>DLT transaction options.</p>
</dd>
<dt><a href="#UnsignedData">UnsignedData</a> : <code>Object</code></dt>
<dd><p>Unsigned transaction data.</p>
</dd>
</dl>

<a name="module_overledger-bundle"></a>

## overledger-bundle
<a name="module_overledger-bundle.default"></a>

### *overledger-bundle*.default
Main Overledger SDK bundle. Includes all the packages for all supported DLTs.

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
| options | [<code>SDKOptions</code>](#SDKOptions) | The DLT Options and Provider Options |

Create the Overledger SDK

<a name="module_overledger-core.OverledgerSDK+dlts"></a>

#### *overledgerSDK*.dlts
The object storing the DLTs loaded by the Overledger SDK

<a name="module_overledger-core.OverledgerSDK+loadDlt"></a>

#### *overledgerSDK*.loadDlt(config)

| Param | Type | Description |
| --- | --- | --- |
| config | [<code>DLTOptions</code>](#DLTOptions) | DLT name and an optional Private Key to use as the main account |

Load the DLT in the Overledger SDK

**Returns**: <code>AbstractDLT</code> - The loaded DLT class  
<a name="module_overledger-core.OverledgerSDK+validateOptions"></a>

#### *overledgerSDK*.validateOptions(options)

| Param | Type | Description |
| --- | --- | --- |
| options | [<code>SDKOptions</code>](#SDKOptions) | The DLT Options and Provider Options |

Validate the provided Overledger SDK Options

<a name="module_overledger-core.OverledgerSDK+buildWrapperApiCall"></a>

#### *overledgerSDK*.buildWrapperApiCall(signedTransactionRequest)

| Param | Type | Description |
| --- | --- | --- |
| signedTransactionRequest | [<code>Array.&lt;SignedTransactionRequest&gt;</code>](#SignedTransactionRequest) | Array of signed transactions |

Wrap the DLT Data with the API schema

**Returns**: [<code>APICallWrapper</code>](#APICallWrapper) - Object conforming to the API schema  
<a name="module_overledger-core.OverledgerSDK+sign"></a>

#### *overledgerSDK*.sign(unsignedData)

| Param | Type | Description |
| --- | --- | --- |
| unsignedData | [<code>Array.&lt;UnsignedData&gt;</code>](#UnsignedData) | Array of unsigned data |

Sign the provided transactions

**Returns**: [<code>Array.&lt;SignedTransactionRequest&gt;</code>](#SignedTransactionRequest) - Array of signed transaction requests wrapped by Overledger metadata  
<a name="module_overledger-core.OverledgerSDK+send"></a>

#### *overledgerSDK*.send(signedTransactions)

| Param | Type | Description |
| --- | --- | --- |
| signedTransactions | [<code>Array.&lt;SignedTransactionRequest&gt;</code>](#SignedTransactionRequest) | Array of Overledger signed transaction data |

Send signed transactions to Overledger

<a name="module_overledger-core.OverledgerSDK+getBalances"></a>

#### *overledgerSDK*.getBalances(balancesRequest)

| Param | Type | Description |
| --- | --- | --- |
| balancesRequest | [<code>Array.&lt;DLTAndAddress&gt;</code>](#DLTAndAddress) | Array of objects specifing the address and corresponding DLT |

Get the balances of the specified addresses

<a name="module_overledger-core.OverledgerSDK+getSequences"></a>

#### *overledgerSDK*.getSequences(sequenceRequest)

| Param | Type | Description |
| --- | --- | --- |
| sequenceRequest | [<code>Array.&lt;SequenceDataRequest&gt;</code>](#SequenceDataRequest) | Request for sequence numbers of the provided addresses |

Get the sequence numbers for the provided addresses

**Returns**: [<code>SequenceDataResponse</code>](#SequenceDataResponse) - Sequence response  
<a name="module_overledger-core.OverledgerSDK+readTransactionsByMappId"></a>

#### *overledgerSDK*.readTransactionsByMappId()
Get transactions submitted through Oberledger by the Multi-Chain Application ID used to create the SDK

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
| options | [<code>TransactionOptions</code>](#TransactionOptions) | 

Sign a transaction for the DLT

<a name="module_overledger-dlt-abstract.AbstractDLT+send"></a>

#### *abstractDLT*.send(signedTransaction)

| Param | Type |
| --- | --- |
| signedTransaction | [<code>SignedTransactionRequest</code>](#SignedTransactionRequest) | 

Send an Overledger signed transaction

<a name="module_overledger-dlt-abstract.AbstractDLT+buildSignedTransactionsApiCall"></a>

#### *abstractDLT*.buildSignedTransactionsApiCall(signedTransaction)

| Param | Type |
| --- | --- |
| signedTransaction | [<code>SignedTransactionRequest</code>](#SignedTransactionRequest) | 

Wrap a specific DLT signed transaction with the Overledger required fields

<a name="module_overledger-dlt-ethereum"></a>

## overledger-dlt-ethereum

* [overledger-dlt-ethereum](#module_overledger-dlt-ethereum)

    * _static_
        * [.default](#module_overledger-dlt-ethereum.default)

    * _inner_
        * [~Ethereum](#module_overledger-dlt-ethereum.Ethereum)

            * [new Ethereum(sdk, options)](#new_module_overledger-dlt-ethereum.Ethereum_new)

            * [.name](#module_overledger-dlt-ethereum.Ethereum+name)

            * [.symbol](#module_overledger-dlt-ethereum.Ethereum+symbol)

            * [.createAccount()](#module_overledger-dlt-ethereum.Ethereum+createAccount)

            * [.setAccount(privateKey)](#module_overledger-dlt-ethereum.Ethereum+setAccount)

            * [.buildTransaction(toAddress, message, options)](#module_overledger-dlt-ethereum.Ethereum+buildTransaction)

            * [._sign(toAddress, message, options)](#module_overledger-dlt-ethereum.Ethereum+_sign)


<a name="module_overledger-dlt-ethereum.default"></a>

### *overledger-dlt-ethereum*.default
Development package for Ethereum.

<a name="module_overledger-dlt-ethereum.Ethereum"></a>

### *overledger-dlt-ethereum*~Ethereum

* [~Ethereum](#module_overledger-dlt-ethereum.Ethereum)

    * [new Ethereum(sdk, options)](#new_module_overledger-dlt-ethereum.Ethereum_new)

    * [.name](#module_overledger-dlt-ethereum.Ethereum+name)

    * [.symbol](#module_overledger-dlt-ethereum.Ethereum+symbol)

    * [.createAccount()](#module_overledger-dlt-ethereum.Ethereum+createAccount)

    * [.setAccount(privateKey)](#module_overledger-dlt-ethereum.Ethereum+setAccount)

    * [.buildTransaction(toAddress, message, options)](#module_overledger-dlt-ethereum.Ethereum+buildTransaction)

    * [._sign(toAddress, message, options)](#module_overledger-dlt-ethereum.Ethereum+_sign)


<a name="new_module_overledger-dlt-ethereum.Ethereum_new"></a>

#### new Ethereum(sdk, options)

| Param | Type |
| --- | --- |
| sdk | <code>any</code> | 
| options | <code>Object</code> | 

<a name="module_overledger-dlt-ethereum.Ethereum+name"></a>

#### *ethereum*.name
Name of the DLT

<a name="module_overledger-dlt-ethereum.Ethereum+symbol"></a>

#### *ethereum*.symbol
Symbol of the DLT

<a name="module_overledger-dlt-ethereum.Ethereum+createAccount"></a>

#### *ethereum*.createAccount()
Create an account for a specific DLT

<a name="module_overledger-dlt-ethereum.Ethereum+setAccount"></a>

#### *ethereum*.setAccount(privateKey)

| Param | Type | Description |
| --- | --- | --- |
| privateKey | <code>string</code> | The privateKey |

Set an account for signing transactions for a specific DLT

<a name="module_overledger-dlt-ethereum.Ethereum+buildTransaction"></a>

#### *ethereum*.buildTransaction(toAddress, message, options)

| Param | Type |
| --- | --- |
| toAddress | <code>string</code> | 
| message | <code>string</code> | 
| options | [<code>TransactionOptions</code>](#TransactionOptions) | 

Build the transaction

<a name="module_overledger-dlt-ethereum.Ethereum+_sign"></a>

#### *ethereum*._sign(toAddress, message, options)

| Param | Type |
| --- | --- |
| toAddress | <code>string</code> | 
| message | <code>string</code> | 
| options | [<code>TransactionOptions</code>](#TransactionOptions) | 

Sign the transaction

<a name="module_overledger-dlt-ripple"></a>

## overledger-dlt-ripple

* [overledger-dlt-ripple](#module_overledger-dlt-ripple)

    * _static_
        * [.default](#module_overledger-dlt-ripple.default)

    * _inner_
        * [~Ripple](#module_overledger-dlt-ripple.Ripple)

            * [new Ripple(sdk, options)](#new_module_overledger-dlt-ripple.Ripple_new)

            * [.name](#module_overledger-dlt-ripple.Ripple+name)

            * [.symbol](#module_overledger-dlt-ripple.Ripple+symbol)

            * [.createAccount()](#module_overledger-dlt-ripple.Ripple+createAccount)

            * [.setAccount(privateKey)](#module_overledger-dlt-ripple.Ripple+setAccount)

            * [.buildTransaction(toAddress, message, options)](#module_overledger-dlt-ripple.Ripple+buildTransaction)

            * [._sign(toAddress, message, options)](#module_overledger-dlt-ripple.Ripple+_sign)


<a name="module_overledger-dlt-ripple.default"></a>

### *overledger-dlt-ripple*.default
Development package for Ripple (XRP Ledger).

<a name="module_overledger-dlt-ripple.Ripple"></a>

### *overledger-dlt-ripple*~Ripple

* [~Ripple](#module_overledger-dlt-ripple.Ripple)

    * [new Ripple(sdk, options)](#new_module_overledger-dlt-ripple.Ripple_new)

    * [.name](#module_overledger-dlt-ripple.Ripple+name)

    * [.symbol](#module_overledger-dlt-ripple.Ripple+symbol)

    * [.createAccount()](#module_overledger-dlt-ripple.Ripple+createAccount)

    * [.setAccount(privateKey)](#module_overledger-dlt-ripple.Ripple+setAccount)

    * [.buildTransaction(toAddress, message, options)](#module_overledger-dlt-ripple.Ripple+buildTransaction)

    * [._sign(toAddress, message, options)](#module_overledger-dlt-ripple.Ripple+_sign)


<a name="new_module_overledger-dlt-ripple.Ripple_new"></a>

#### new Ripple(sdk, options)

| Param | Type |
| --- | --- |
| sdk | <code>any</code> | 
| options | <code>Object</code> | 

<a name="module_overledger-dlt-ripple.Ripple+name"></a>

#### *ripple*.name
Name of the DLT

<a name="module_overledger-dlt-ripple.Ripple+symbol"></a>

#### *ripple*.symbol
Symbol of the DLT

<a name="module_overledger-dlt-ripple.Ripple+createAccount"></a>

#### *ripple*.createAccount()
Create an account for a specific DLT

<a name="module_overledger-dlt-ripple.Ripple+setAccount"></a>

#### *ripple*.setAccount(privateKey)

| Param | Type | Description |
| --- | --- | --- |
| privateKey | <code>string</code> | The privateKey |

Set an account for signing for a specific DLT

<a name="module_overledger-dlt-ripple.Ripple+buildTransaction"></a>

#### *ripple*.buildTransaction(toAddress, message, options)

| Param | Type |
| --- | --- |
| toAddress | <code>string</code> | 
| message | <code>string</code> | 
| options | [<code>TransactionOptions</code>](#TransactionOptions) | 

Build the transaction

<a name="module_overledger-dlt-ripple.Ripple+_sign"></a>

#### *ripple*._sign(toAddress, message, options)

| Param | Type | Description |
| --- | --- | --- |
| toAddress | <code>string</code> | receiver address |
| message | <code>string</code> | message in memos to display in the resulting transaction |
| options | [<code>TransactionOptions</code>](#TransactionOptions) | DLT transaction options |

Sign the transaction

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
| ProviderOptions | [<code>ProviderOptions</code>](#ProviderOptions) | Overledger network provider options |

<a name="module_overledger-provider.Provider+createRequest"></a>

#### *provider*.createRequest(path)

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Request endpoint resource path |

<a name="module_overledger-search"></a>

## overledger-search

* [overledger-search](#module_overledger-search)

    * _static_
        * [.default](#module_overledger-search.default)

    * _inner_
        * [~OverledgerSearch](#module_overledger-search.OverledgerSearch)

            * [new OverledgerSearch(sdk)](#new_module_overledger-search.OverledgerSearch_new)

            * [.getTransaction(transactionHash)](#module_overledger-search.OverledgerSearch+getTransaction)

            * [.getTransactionType(hash)](#module_overledger-search.OverledgerSearch+getTransactionType)

            * [.getBlockByDltAndNumber(dlt, blockNumber)](#module_overledger-search.OverledgerSearch+getBlockByDltAndNumber)

            * [.getBlockByDltAndHash(dlt, hash)](#module_overledger-search.OverledgerSearch+getBlockByDltAndHash)


<a name="module_overledger-search.default"></a>

### *overledger-search*.default
Search support package.

<a name="module_overledger-search.OverledgerSearch"></a>

### *overledger-search*~OverledgerSearch

* [~OverledgerSearch](#module_overledger-search.OverledgerSearch)

    * [new OverledgerSearch(sdk)](#new_module_overledger-search.OverledgerSearch_new)

    * [.getTransaction(transactionHash)](#module_overledger-search.OverledgerSearch+getTransaction)

    * [.getTransactionType(hash)](#module_overledger-search.OverledgerSearch+getTransactionType)

    * [.getBlockByDltAndNumber(dlt, blockNumber)](#module_overledger-search.OverledgerSearch+getBlockByDltAndNumber)

    * [.getBlockByDltAndHash(dlt, hash)](#module_overledger-search.OverledgerSearch+getBlockByDltAndHash)


<a name="new_module_overledger-search.OverledgerSearch_new"></a>

#### new OverledgerSearch(sdk)

| Param | Type |
| --- | --- |
| sdk | <code>Object</code> | 

<a name="module_overledger-search.OverledgerSearch+getTransaction"></a>

#### *overledgerSearch*.getTransaction(transactionHash)

| Param | Type | Description |
| --- | --- | --- |
| transactionHash | <code>string</code> | Transaction hash |

Get transaction by transaction hash (non-deterministic)

<a name="module_overledger-search.OverledgerSearch+getTransactionType"></a>

#### *overledgerSearch*.getTransactionType(hash)

| Param | Type | Description |
| --- | --- | --- |
| hash | <code>string</code> | hash |

Get the transaction type based on the hash

<a name="module_overledger-search.OverledgerSearch+getBlockByDltAndNumber"></a>

#### *overledgerSearch*.getBlockByDltAndNumber(dlt, blockNumber)

| Param | Type | Description |
| --- | --- | --- |
| dlt | <code>string</code> | The DLT name |
| blockNumber | <code>number</code> | The block number |

Get block by DLT and number

<a name="module_overledger-search.OverledgerSearch+getBlockByDltAndHash"></a>

#### *overledgerSearch*.getBlockByDltAndHash(dlt, hash)

| Param | Type | Description |
| --- | --- | --- |
| dlt | <code>string</code> | The DLT name |
| hash | <code>string</code> | The block hash |

Get block by DLT and hash

<a name="module_overledger-types"></a>

## overledger-types
<a name="Account"></a>

## Account
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| privateKey | <code>string</code> | The private key of the account, used for signing transactions. |
| address | <code>string</code> | The address or public key of the account, used for receiving messages. |

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

<a name="NetworkOptions"></a>

## NetworkOptions
Overledger network options.

<a name="Options"></a>

## Options
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [privateKey] | <code>string</code> | The private key of the user account. |

Options for insantiating the SDK.

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
| amount | <code>string</code> | The token amount in the lowest unit for the respective DLT. |
| signedTransaction | [<code>OverledgerSignedTransaction</code>](#OverledgerSignedTransaction) | The signed transaction object. |

Overledger signed transaction request object.

<a name="TransactionOptions"></a>

## TransactionOptions
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [sequence] | <code>number</code> | This transaction's sequence in relation to the initiating account. |
| amount | <code>string</code> | The amount of tokens in the lowest unit available on the DLT. |

DLT transaction options.

<a name="UnsignedData"></a>

## UnsignedData
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| dlt | <code>string</code> | The DLT used for this transaction. |
| toAddress | <code>string</code> | The recipient for this transaction. |
| message | <code>string</code> | The transaction message. |
| options | [<code>TransactionOptions</code>](#TransactionOptions) | The specific transaction options. |

Unsigned transaction data.

