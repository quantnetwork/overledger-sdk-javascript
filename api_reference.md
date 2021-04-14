## Modules

<dl>
<dt><a href="#module_overledger-bundle">overledger-bundle</a></dt>
<dd></dd>
<dt><a href="#module_overledger-core">overledger-core</a></dt>
<dd></dd>
<dt><a href="#module_overledger-dlt-abstract">overledger-dlt-abstract</a></dt>
<dd></dd>
<dt><a href="#module_overledger-dlt-bitcoin">overledger-dlt-bitcoin</a></dt>
<dd></dd>
<dt><a href="#module_overledger-dlt-corda">overledger-dlt-corda</a></dt>
<dd></dd>
<dt><a href="#module_overledger-dlt-ethereum">overledger-dlt-ethereum</a></dt>
<dd></dd>
<dt><a href="#module_overledger-dlt-hyperledger_fabric">overledger-dlt-hyperledger_fabric</a></dt>
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

## Functions

<dl>
<dt><a href="#witnessStackToScriptWitness">witnessStackToScriptWitness()</a></dt>
<dd><p>From psbt library : not exported in psbt nor in bitcoinjs-lib yet but needed in the finalize step of psbt signing (getFinalScripts function)</p>
</dd>
<dt><a href="#isAddressOutput">isAddressOutput()</a></dt>
<dd><p>Test if the data passed in the utxo output is an address or a script pub key</p>
</dd>
<dt><a href="#computeParamType">computeParamType(param)</a></dt>
<dd><p>This function is used to prepare the parameter definition for the web3 package</p>
</dd>
<dt><a href="#computeParamType">computeParamType(param)</a></dt>
<dd><p>This function is used to prepare the parameter definition for the web3 package</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#CordaParam">CordaParam</a> : <code>Object</code></dt>
<dd><p>A description of an Corda smart contract function parameter.</p>
</dd>
<dt><a href="#AtomicSwapXRPParams">AtomicSwapXRPParams</a> : <code>Object</code></dt>
<dd><p>An object used to describe the atomic swap params required for XRP</p>
</dd>
<dt><a href="#TrustlineXRPRequest">TrustlineXRPRequest</a> : <code>Object</code></dt>
<dd><p>A generic object used to describe an Overledger transaction request for the XRP Ledger. Note that this object inherits many parameters from TransactionAccountsRequest.</p>
</dd>
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

            * [.sendUnsigned(unsignedTransactions)](#module_overledger-core.OverledgerSDK+sendUnsigned)

            * [.getBalances(balancesRequest)](#module_overledger-core.OverledgerSDK+getBalances)

            * [.callNodeResource(nodeResourceRequest)](#module_overledger-core.OverledgerSDK+callNodeResource)

            * [.subscribeStatusUpdate(subStatusRequest)](#module_overledger-core.OverledgerSDK+subscribeStatusUpdate)

            * [.unSubscribeStatusUpdate(unSubStatusReq)](#module_overledger-core.OverledgerSDK+unSubscribeStatusUpdate)

            * [.getSequences(sequenceRequest)](#module_overledger-core.OverledgerSDK+getSequences)

            * [.readTransactionsByMappId()](#module_overledger-core.OverledgerSDK+readTransactionsByMappId)

            * [.readOverledgerTransaction(overledgerTransactionId)](#module_overledger-core.OverledgerSDK+readOverledgerTransaction)

            * [.getFeeEstimation(address, blockNumber)](#module_overledger-core.OverledgerSDK+getFeeEstimation)

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

    * [.sendUnsigned(unsignedTransactions)](#module_overledger-core.OverledgerSDK+sendUnsigned)

    * [.getBalances(balancesRequest)](#module_overledger-core.OverledgerSDK+getBalances)

    * [.callNodeResource(nodeResourceRequest)](#module_overledger-core.OverledgerSDK+callNodeResource)

    * [.subscribeStatusUpdate(subStatusRequest)](#module_overledger-core.OverledgerSDK+subscribeStatusUpdate)

    * [.unSubscribeStatusUpdate(unSubStatusReq)](#module_overledger-core.OverledgerSDK+unSubscribeStatusUpdate)

    * [.getSequences(sequenceRequest)](#module_overledger-core.OverledgerSDK+getSequences)

    * [.readTransactionsByMappId()](#module_overledger-core.OverledgerSDK+readTransactionsByMappId)

    * [.readOverledgerTransaction(overledgerTransactionId)](#module_overledger-core.OverledgerSDK+readOverledgerTransaction)

    * [.getFeeEstimation(address, blockNumber)](#module_overledger-core.OverledgerSDK+getFeeEstimation)

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
| unsignedData | <code>Array.&lt;TransactionRequest&gt;</code> | the provided transactions in the standard overledger form |

Sign the provided transactions

**Returns**: [<code>Array.&lt;SignedTransactionRequest&gt;</code>](#SignedTransactionRequest) - Array of signed transaction requests wrapped by Overledger metadata  
<a name="module_overledger-core.OverledgerSDK+send"></a>

#### *overledgerSDK*.send(signedTransactions)

| Param | Type | Description |
| --- | --- | --- |
| signedTransactions | [<code>Array.&lt;SignedTransactionRequest&gt;</code>](#SignedTransactionRequest) | Array of Overledger signed transaction data |

Send signed transactions to Overledger

<a name="module_overledger-core.OverledgerSDK+sendUnsigned"></a>

#### *overledgerSDK*.sendUnsigned(unsignedTransactions)

| Param | Type | Description |
| --- | --- | --- |
| unsignedTransactions | [<code>UnsignedTransactionRequest</code>](#UnsignedTransactionRequest) | Unsigned transaction data |

Send unsigned transactions to Overledger

<a name="module_overledger-core.OverledgerSDK+getBalances"></a>

#### *overledgerSDK*.getBalances(balancesRequest)

| Param | Type | Description |
| --- | --- | --- |
| balancesRequest | [<code>Array.&lt;DLTAndAddress&gt;</code>](#DLTAndAddress) | Array of objects specifing the address and corresponding DLT |

Get the balances of the specified addresses

<a name="module_overledger-core.OverledgerSDK+callNodeResource"></a>

#### *overledgerSDK*.callNodeResource(nodeResourceRequest)

| Param | Type | Description |
| --- | --- | --- |
| nodeResourceRequest | [<code>NodeResourceRequest</code>](#NodeResourceRequest) | object specifing the resource to call on this node |

Call a resource of a node

<a name="module_overledger-core.OverledgerSDK+subscribeStatusUpdate"></a>

#### *overledgerSDK*.subscribeStatusUpdate(subStatusRequest)

| Param | Type | Description |
| --- | --- | --- |
| subStatusRequest | [<code>StatusRequest</code>](#StatusRequest) | object specifing the transaction request for subscribe status |

subscribe status of transaction

<a name="module_overledger-core.OverledgerSDK+unSubscribeStatusUpdate"></a>

#### *overledgerSDK*.unSubscribeStatusUpdate(unSubStatusReq)

| Param | Type | Description |
| --- | --- | --- |
| unSubStatusReq | [<code>StatusRequest</code>](#StatusRequest) | object specifing the transaction request for unsubscribe status |

unsubscribe status of transaction

<a name="module_overledger-core.OverledgerSDK+getSequences"></a>

#### *overledgerSDK*.getSequences(sequenceRequest)

| Param | Type | Description |
| --- | --- | --- |
| sequenceRequest | [<code>Array.&lt;SequenceDataRequest&gt;</code>](#SequenceDataRequest) | Request for sequence numbers of the provided addresses |

Get the sequence numbers for the provided addresses

**Returns**: [<code>SequenceDataResponse</code>](#SequenceDataResponse) - Sequence response  
<a name="module_overledger-core.OverledgerSDK+readTransactionsByMappId"></a>

#### *overledgerSDK*.readTransactionsByMappId()
Get transactions submitted through Overledger by the Multi-Chain Application ID used to create the SDK

<a name="module_overledger-core.OverledgerSDK+readOverledgerTransaction"></a>

#### *overledgerSDK*.readOverledgerTransaction(overledgerTransactionId)

| Param | Type | Description |
| --- | --- | --- |
| overledgerTransactionId | <code>string</code> | Overledger Transaction ID |

Get the transaction specified by the Overledger Transaction ID

<a name="module_overledger-core.OverledgerSDK+getFeeEstimation"></a>

#### *overledgerSDK*.getFeeEstimation(address, blockNumber)

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | The address to query for |
| blockNumber | <code>number</code> | The number of blocks |

Get the fee estimation for a DLT

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

            * [new AbstractDLT(sdk)](#new_module_overledger-dlt-abstract.AbstractDLT_new)

            * [.createAccount()](#module_overledger-dlt-abstract.AbstractDLT+createAccount)

            * [.setAccount(AccountInfo)](#module_overledger-dlt-abstract.AbstractDLT+setAccount)

            * [.getBalance(address)](#module_overledger-dlt-abstract.AbstractDLT+getBalance)

            * [.getSequence(address)](#module_overledger-dlt-abstract.AbstractDLT+getSequence)

            * [.sign(thisTransaction)](#module_overledger-dlt-abstract.AbstractDLT+sign)

            * [.transactionValidation(thisTransaction)](#module_overledger-dlt-abstract.AbstractDLT+transactionValidation)

            * [.send(signedTransaction)](#module_overledger-dlt-abstract.AbstractDLT+send)

            * [.buildSmartContractQuery(dltAddress, contractQueryDetails)](#module_overledger-dlt-abstract.AbstractDLT+buildSmartContractQuery)

            * [.smartContractQueryValidation(thisTransaction)](#module_overledger-dlt-abstract.AbstractDLT+smartContractQueryValidation)

            * [.buildSignedTransactionsApiCall(signedTransaction)](#module_overledger-dlt-abstract.AbstractDLT+buildSignedTransactionsApiCall)


<a name="module_overledger-dlt-abstract.default"></a>

### *overledger-dlt-abstract*.default
Abstract class for DLT modules. All DLT packages need to extend this class.

<a name="module_overledger-dlt-abstract.AbstractDLT"></a>

### *overledger-dlt-abstract*~AbstractDLT

* [~AbstractDLT](#module_overledger-dlt-abstract.AbstractDLT)

    * [new AbstractDLT(sdk)](#new_module_overledger-dlt-abstract.AbstractDLT_new)

    * [.createAccount()](#module_overledger-dlt-abstract.AbstractDLT+createAccount)

    * [.setAccount(AccountInfo)](#module_overledger-dlt-abstract.AbstractDLT+setAccount)

    * [.getBalance(address)](#module_overledger-dlt-abstract.AbstractDLT+getBalance)

    * [.getSequence(address)](#module_overledger-dlt-abstract.AbstractDLT+getSequence)

    * [.sign(thisTransaction)](#module_overledger-dlt-abstract.AbstractDLT+sign)

    * [.transactionValidation(thisTransaction)](#module_overledger-dlt-abstract.AbstractDLT+transactionValidation)

    * [.send(signedTransaction)](#module_overledger-dlt-abstract.AbstractDLT+send)

    * [.buildSmartContractQuery(dltAddress, contractQueryDetails)](#module_overledger-dlt-abstract.AbstractDLT+buildSmartContractQuery)

    * [.smartContractQueryValidation(thisTransaction)](#module_overledger-dlt-abstract.AbstractDLT+smartContractQueryValidation)

    * [.buildSignedTransactionsApiCall(signedTransaction)](#module_overledger-dlt-abstract.AbstractDLT+buildSignedTransactionsApiCall)


<a name="new_module_overledger-dlt-abstract.AbstractDLT_new"></a>

#### new AbstractDLT(sdk)

| Param | Type |
| --- | --- |
| sdk | <code>any</code> | 

<a name="module_overledger-dlt-abstract.AbstractDLT+createAccount"></a>

#### *abstractDLT*.createAccount()
Create an account for a specific DLT

Abstract method to be implemented in each DLT

<a name="module_overledger-dlt-abstract.AbstractDLT+setAccount"></a>

#### *abstractDLT*.setAccount(AccountInfo)

| Param | Type | Description |
| --- | --- | --- |
| AccountInfo | [<code>Account</code>](#Account) | The standardised Account Object |

Set an account for signing transactions for a specific DLT

Abstract method to be implemented in each DLT

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

#### *abstractDLT*.sign(thisTransaction)

| Param | Type | Description |
| --- | --- | --- |
| thisTransaction | <code>TransactionRequest</code> | the transaction information |

Converts an Overledger transaction to the correct format for the DLT in question and signs it

<a name="module_overledger-dlt-abstract.AbstractDLT+transactionValidation"></a>

#### *abstractDLT*.transactionValidation(thisTransaction)

| Param | Description |
| --- | --- |
| thisTransaction | the transaction to check the formatting of |

Takes the given transaction and validates it

**Returns**: <code>ValidationCheck</code> - - returns an object {success: boolean, failingField: string, error: string}.
 If 'success' = true, the validation passes, otherwise, the 'failingField' parameter will contain
 the first failing transaction field and error will contain information on this problem  
<a name="module_overledger-dlt-abstract.AbstractDLT+send"></a>

#### *abstractDLT*.send(signedTransaction)

| Param | Type |
| --- | --- |
| signedTransaction | [<code>SignedTransactionRequest</code>](#SignedTransactionRequest) | 

Send an Overledger signed transaction

<a name="module_overledger-dlt-abstract.AbstractDLT+buildSmartContractQuery"></a>

#### *abstractDLT*.buildSmartContractQuery(dltAddress, contractQueryDetails)

| Param | Type | Description |
| --- | --- | --- |
| dltAddress | <code>string</code> | the user's dlt address |
| contractQueryDetails | <code>smartContract</code> | The details on the smart contract query |

Allows a smart contract to be queried.

<a name="module_overledger-dlt-abstract.AbstractDLT+smartContractQueryValidation"></a>

#### *abstractDLT*.smartContractQueryValidation(thisTransaction)

| Param | Description |
| --- | --- |
| thisTransaction | the transaction to check the formatting of |

Takes the given smartContractQuery and validates it

**Returns**: <code>ValidationCheck</code> - - returns an object {success: boolean, failingField: string, error: string}.
 If 'success' = true, the validation passes, otherwise, the 'failingField' parameter will contain
 the first failing transaction field and error will contain information on this problem  
<a name="module_overledger-dlt-abstract.AbstractDLT+buildSignedTransactionsApiCall"></a>

#### *abstractDLT*.buildSignedTransactionsApiCall(signedTransaction)

| Param | Type |
| --- | --- |
| signedTransaction | [<code>SignedTransactionRequest</code>](#SignedTransactionRequest) | 

Wrap a specific DLT signed transaction with the Overledger required fields

<a name="module_overledger-dlt-bitcoin"></a>

## overledger-dlt-bitcoin

* [overledger-dlt-bitcoin](#module_overledger-dlt-bitcoin)

    * _static_
        * [.BitcoinTypeOptions](#module_overledger-dlt-bitcoin.BitcoinTypeOptions)

        * [.default](#module_overledger-dlt-bitcoin.default)

    * _inner_
        * [~Bitcoin](#module_overledger-dlt-bitcoin.Bitcoin)

            * [new Bitcoin(sdk, options)](#new_module_overledger-dlt-bitcoin.Bitcoin_new)

            * [.name](#module_overledger-dlt-bitcoin.Bitcoin+name)

            * [.symbol](#module_overledger-dlt-bitcoin.Bitcoin+symbol)

            * [.getSmartContractParameters(input)](#module_overledger-dlt-bitcoin.Bitcoin+getSmartContractParameters)

            * [.prepareTransaction(thisTransaction)](#module_overledger-dlt-bitcoin.Bitcoin+prepareTransaction)

            * [.preparePsbtObject(inputsOutputs)](#module_overledger-dlt-bitcoin.Bitcoin+preparePsbtObject)

            * [._transactionValidation(thisTransaction)](#module_overledger-dlt-bitcoin.Bitcoin+_transactionValidation)

            * [._sign(thisTransaction)](#module_overledger-dlt-bitcoin.Bitcoin+_sign)

            * [.getFinalScripts()](#module_overledger-dlt-bitcoin.Bitcoin+getFinalScripts)

            * [.createAccount()](#module_overledger-dlt-bitcoin.Bitcoin+createAccount)

            * [.setAccount(accountInfo)](#module_overledger-dlt-bitcoin.Bitcoin+setAccount)

            * [.setMultiSigAccount(multisigAccountInfo)](#module_overledger-dlt-bitcoin.Bitcoin+setMultiSigAccount)

            * [._buildSmartContractQuery(dltAddress, contractQueryDetails)](#module_overledger-dlt-bitcoin.Bitcoin+_buildSmartContractQuery)

            * [._smartContractQueryValidation(contractQueryDetails)](#module_overledger-dlt-bitcoin.Bitcoin+_smartContractQueryValidation)


<a name="module_overledger-dlt-bitcoin.BitcoinTypeOptions"></a>

### *overledger-dlt-bitcoin*.BitcoinTypeOptions
<a name="module_overledger-dlt-bitcoin.default"></a>

### *overledger-dlt-bitcoin*.default
Development package for Bitcoin blockchain.

<a name="module_overledger-dlt-bitcoin.Bitcoin"></a>

### *overledger-dlt-bitcoin*~Bitcoin

* [~Bitcoin](#module_overledger-dlt-bitcoin.Bitcoin)

    * [new Bitcoin(sdk, options)](#new_module_overledger-dlt-bitcoin.Bitcoin_new)

    * [.name](#module_overledger-dlt-bitcoin.Bitcoin+name)

    * [.symbol](#module_overledger-dlt-bitcoin.Bitcoin+symbol)

    * [.getSmartContractParameters(input)](#module_overledger-dlt-bitcoin.Bitcoin+getSmartContractParameters)

    * [.prepareTransaction(thisTransaction)](#module_overledger-dlt-bitcoin.Bitcoin+prepareTransaction)

    * [.preparePsbtObject(inputsOutputs)](#module_overledger-dlt-bitcoin.Bitcoin+preparePsbtObject)

    * [._transactionValidation(thisTransaction)](#module_overledger-dlt-bitcoin.Bitcoin+_transactionValidation)

    * [._sign(thisTransaction)](#module_overledger-dlt-bitcoin.Bitcoin+_sign)

    * [.getFinalScripts()](#module_overledger-dlt-bitcoin.Bitcoin+getFinalScripts)

    * [.createAccount()](#module_overledger-dlt-bitcoin.Bitcoin+createAccount)

    * [.setAccount(accountInfo)](#module_overledger-dlt-bitcoin.Bitcoin+setAccount)

    * [.setMultiSigAccount(multisigAccountInfo)](#module_overledger-dlt-bitcoin.Bitcoin+setMultiSigAccount)

    * [._buildSmartContractQuery(dltAddress, contractQueryDetails)](#module_overledger-dlt-bitcoin.Bitcoin+_buildSmartContractQuery)

    * [._smartContractQueryValidation(contractQueryDetails)](#module_overledger-dlt-bitcoin.Bitcoin+_smartContractQueryValidation)


<a name="new_module_overledger-dlt-bitcoin.Bitcoin_new"></a>

#### new Bitcoin(sdk, options)

| Param | Type | Description |
| --- | --- | --- |
| sdk | <code>any</code> | the sdk instance |
| options | <code>Object</code> | any additional options to instantiate this dlt |

<a name="module_overledger-dlt-bitcoin.Bitcoin+name"></a>

#### *bitcoin*.name
Name of the DLT

<a name="module_overledger-dlt-bitcoin.Bitcoin+symbol"></a>

#### *bitcoin*.symbol
Symbol of the DLT

<a name="module_overledger-dlt-bitcoin.Bitcoin+getSmartContractParameters"></a>

#### *bitcoin*.getSmartContractParameters(input)

| Param | Type | Description |
| --- | --- | --- |
| input | <code>TransactionInput</code> | utxo input |

Takes the utxo input and if it includes a smart contract field extract its parameters into a structure used for psbt data input objects

**Returns**: <code>any</code> - smart contract parameters for that input  
<a name="module_overledger-dlt-bitcoin.Bitcoin+prepareTransaction"></a>

#### *bitcoin*.prepareTransaction(thisTransaction)

| Param | Type | Description |
| --- | --- | --- |
| thisTransaction | <code>TransactionBitcoinRequest</code> | details on the information to include in this transaction for the Bitcoin distributed ledger |

Takes the Overledger definition of a transaction and converts it into a specific Bitcoin transaction

**Returns**: <code>UtxosPrepare</code> - Utxos in a form accepted to build the psbt object for signing  
<a name="module_overledger-dlt-bitcoin.Bitcoin+preparePsbtObject"></a>

#### *bitcoin*.preparePsbtObject(inputsOutputs)

| Param | Type | Description |
| --- | --- | --- |
| inputsOutputs | <code>UtxosPrepare</code> | inputs, outputs and data needed to build the psbt object |

Takes the inputs, outputs and the data resulting from the prepareTransaction and create a psbt object for signing

**Returns**: <code>any</code> - The psbt object filled and the inputs outputs initially obtained from the prepareTransaction needed to know the type of utxos transactions it will be signed  
<a name="module_overledger-dlt-bitcoin.Bitcoin+_transactionValidation"></a>

#### *bitcoin*._transactionValidation(thisTransaction)

| Param | Description |
| --- | --- |
| thisTransaction | The transaction request |

validates an OVL transactionRequest according to XRP specific rules

<a name="module_overledger-dlt-bitcoin.Bitcoin+_sign"></a>

#### *bitcoin*._sign(thisTransaction)

| Param | Type | Description |
| --- | --- | --- |
| thisTransaction | <code>TransactionRequest</code> | an instantiated overledger definition of an XRP transaction |

Takes in an overledger definition of a transaction for XRP, converts it into a form that the XRP distributed ledger will understand, and then signs the transaction

<a name="module_overledger-dlt-bitcoin.Bitcoin+getFinalScripts"></a>

#### *bitcoin*.getFinalScripts()
Function overloading for the getFinalScripts in the psbt library. This function will be called in case of a non supported type of redeem script, like HTLC.
Finalize the psbt object with the data that should be provided to unlock the bitcoin

<a name="module_overledger-dlt-bitcoin.Bitcoin+createAccount"></a>

#### *bitcoin*.createAccount()
Create a Bitcoin account

**Returns**: [<code>Account</code>](#Account) - the new Bitcoin account  
<a name="module_overledger-dlt-bitcoin.Bitcoin+setAccount"></a>

#### *bitcoin*.setAccount(accountInfo)

| Param | Type | Description |
| --- | --- | --- |
| accountInfo | [<code>Account</code>](#Account) | The standardised account information |

Set an account for signing transactions for a specific DLT

<a name="module_overledger-dlt-bitcoin.Bitcoin+setMultiSigAccount"></a>

#### *bitcoin*.setMultiSigAccount(multisigAccountInfo)

| Param | Type |
| --- | --- |
| multisigAccountInfo | <code>MultisigNOfMAccount</code> | 

Set a multisig n-of-m account for signing transactions for a specific DLT

<a name="module_overledger-dlt-bitcoin.Bitcoin+_buildSmartContractQuery"></a>

#### *bitcoin*._buildSmartContractQuery(dltAddress, contractQueryDetails)

| Param | Type | Description |
| --- | --- | --- |
| dltAddress | <code>string</code> | the user's Bitcoin address |
| contractQueryDetails | <code>Object</code> | the definition of the smart contract function the user wants to interact with, including information on what parameters to use in the function call. |

Allows a user to build a smart contract query for the Bitcoin distributed ledger (currently not supported for Bitcoin)

**Returns**: <code>Object</code> - success indicates if this query building was correct, if yes then it will be in the response field of the object  
<a name="module_overledger-dlt-bitcoin.Bitcoin+_smartContractQueryValidation"></a>

#### *bitcoin*._smartContractQueryValidation(contractQueryDetails)

| Param | Description |
| --- | --- |
| contractQueryDetails | the query details |

validates an OVL smart contract query according to Bitcoin specific rules

**Returns**: <code>Object</code> - success indicates if this query building was correct, if yes then it will be in the response field of the object  
<a name="module_overledger-dlt-corda"></a>

## overledger-dlt-corda

* [overledger-dlt-corda](#module_overledger-dlt-corda)

    * _static_
        * [.CordaTypeOptions](#module_overledger-dlt-corda.CordaTypeOptions)

        * [.default](#module_overledger-dlt-corda.default)

    * _inner_
        * [~Corda](#module_overledger-dlt-corda.Corda)

            * [new Corda(sdk)](#new_module_overledger-dlt-corda.Corda_new)

            * [.name](#module_overledger-dlt-corda.Corda+name)

            * [.symbol](#module_overledger-dlt-corda.Corda+symbol)

            * [.createAccount()](#module_overledger-dlt-corda.Corda+createAccount)

            * [.setAccount(accountInfo)](#module_overledger-dlt-corda.Corda+setAccount)

            * [.buildTransaction()](#module_overledger-dlt-corda.Corda+buildTransaction)

            * [.buildWorkflow(thisTransaction)](#module_overledger-dlt-corda.Corda+buildWorkflow)

            * [.create_UUID()](#module_overledger-dlt-corda.Corda+create_UUID)

            * [._transactionValidation()](#module_overledger-dlt-corda.Corda+_transactionValidation)

            * [.getTransactionQueryInfo()](#module_overledger-dlt-corda.Corda+getTransactionQueryInfo)

            * [.workflowValidation(thisWorkflow)](#module_overledger-dlt-corda.Corda+workflowValidation)

            * [._sign(thisTransaction)](#module_overledger-dlt-corda.Corda+_sign)

            * [._smartContractQueryValidation()](#module_overledger-dlt-corda.Corda+_smartContractQueryValidation)

            * [._buildSmartContractQuery()](#module_overledger-dlt-corda.Corda+_buildSmartContractQuery)


<a name="module_overledger-dlt-corda.CordaTypeOptions"></a>

### *overledger-dlt-corda*.CordaTypeOptions
<a name="module_overledger-dlt-corda.default"></a>

### *overledger-dlt-corda*.default
Development package for Corda.

<a name="module_overledger-dlt-corda.Corda"></a>

### *overledger-dlt-corda*~Corda

* [~Corda](#module_overledger-dlt-corda.Corda)

    * [new Corda(sdk)](#new_module_overledger-dlt-corda.Corda_new)

    * [.name](#module_overledger-dlt-corda.Corda+name)

    * [.symbol](#module_overledger-dlt-corda.Corda+symbol)

    * [.createAccount()](#module_overledger-dlt-corda.Corda+createAccount)

    * [.setAccount(accountInfo)](#module_overledger-dlt-corda.Corda+setAccount)

    * [.buildTransaction()](#module_overledger-dlt-corda.Corda+buildTransaction)

    * [.buildWorkflow(thisTransaction)](#module_overledger-dlt-corda.Corda+buildWorkflow)

    * [.create_UUID()](#module_overledger-dlt-corda.Corda+create_UUID)

    * [._transactionValidation()](#module_overledger-dlt-corda.Corda+_transactionValidation)

    * [.getTransactionQueryInfo()](#module_overledger-dlt-corda.Corda+getTransactionQueryInfo)

    * [.workflowValidation(thisWorkflow)](#module_overledger-dlt-corda.Corda+workflowValidation)

    * [._sign(thisTransaction)](#module_overledger-dlt-corda.Corda+_sign)

    * [._smartContractQueryValidation()](#module_overledger-dlt-corda.Corda+_smartContractQueryValidation)

    * [._buildSmartContractQuery()](#module_overledger-dlt-corda.Corda+_buildSmartContractQuery)


<a name="new_module_overledger-dlt-corda.Corda_new"></a>

#### new Corda(sdk)

| Param | Type | Description |
| --- | --- | --- |
| sdk | <code>any</code> | the sdk instance |

<a name="module_overledger-dlt-corda.Corda+name"></a>

#### *corda*.name
Name of the DLT

<a name="module_overledger-dlt-corda.Corda+symbol"></a>

#### *corda*.symbol
Symbol of the DLT

<a name="module_overledger-dlt-corda.Corda+createAccount"></a>

#### *corda*.createAccount()
Create an Corda account

**Returns**: [<code>Account</code>](#Account) - the new Corda account  
<a name="module_overledger-dlt-corda.Corda+setAccount"></a>

#### *corda*.setAccount(accountInfo)

| Param | Type | Description |
| --- | --- | --- |
| accountInfo | [<code>Account</code>](#Account) | The standardised account information |

Set an account for this specific DLT

<a name="module_overledger-dlt-corda.Corda+buildTransaction"></a>

#### *corda*.buildTransaction()
Takes the Overledger definition of a transaction and converts it into a specific Corda transaction

<a name="module_overledger-dlt-corda.Corda+buildWorkflow"></a>

#### *corda*.buildWorkflow(thisTransaction)

| Param | Type | Description |
| --- | --- | --- |
| thisTransaction | <code>WorkflowCorda</code> | details on the information to include in this workflow for the Corda distributed ledger node |

Takes the Overledger definition of a Corda workflow and converts it into a specific Corda Workflow

**Returns**: <code>Workflow</code> - the Corda transaction  
<a name="module_overledger-dlt-corda.Corda+create_UUID"></a>

#### *corda*.create_UUID()
Creates a new UUID

<a name="module_overledger-dlt-corda.Corda+_transactionValidation"></a>

#### *corda*._transactionValidation()
validates an OVL transactionRequest according to Corda specific rules

<a name="module_overledger-dlt-corda.Corda+getTransactionQueryInfo"></a>

#### *corda*.getTransactionQueryInfo()
Get the information required to query for a particular transaction hash

<a name="module_overledger-dlt-corda.Corda+workflowValidation"></a>

#### *corda*.workflowValidation(thisWorkflow)

| Param | Type | Description |
| --- | --- | --- |
| thisWorkflow | <code>WorkflowCorda</code> | The workflow details |

validates an OVL Corda workflow according to Corda specific rules

<a name="module_overledger-dlt-corda.Corda+_sign"></a>

#### *corda*._sign(thisTransaction)

| Param | Type | Description |
| --- | --- | --- |
| thisTransaction | <code>TransactionRequest</code> | an instantiated overledger definition of an Corda transaction |

Takes in an overledger definition of a transaction for Corda, converts it into a form that the Corda distributed ledger will understand, and then signs the transaction

<a name="module_overledger-dlt-corda.Corda+_smartContractQueryValidation"></a>

#### *corda*._smartContractQueryValidation()
validates an OVL smart contract query according to Corda specific rules

<a name="module_overledger-dlt-corda.Corda+_buildSmartContractQuery"></a>

#### *corda*._buildSmartContractQuery()
Allows a user to build a smart contract query for the Corda distributed ledger

<a name="module_overledger-dlt-ethereum"></a>

## overledger-dlt-ethereum

* [overledger-dlt-ethereum](#module_overledger-dlt-ethereum)

    * _static_
        * [.EthereumBytesOptions](#module_overledger-dlt-ethereum.EthereumBytesOptions)

        * [.EthereumTypeOptions](#module_overledger-dlt-ethereum.EthereumTypeOptions)

        * [.EthereumUintIntOptions](#module_overledger-dlt-ethereum.EthereumUintIntOptions)

        * [.default](#module_overledger-dlt-ethereum.default)

    * _inner_
        * [~Ethereum](#module_overledger-dlt-ethereum.Ethereum)

            * [new Ethereum(sdk)](#new_module_overledger-dlt-ethereum.Ethereum_new)

            * [.name](#module_overledger-dlt-ethereum.Ethereum+name)

            * [.symbol](#module_overledger-dlt-ethereum.Ethereum+symbol)

            * [.createAccount()](#module_overledger-dlt-ethereum.Ethereum+createAccount)

            * [.setAccount(accountInfo)](#module_overledger-dlt-ethereum.Ethereum+setAccount)

            * [.buildTransaction(thisTransaction)](#module_overledger-dlt-ethereum.Ethereum+buildTransaction)

            * [._transactionValidation(thisTransaction)](#module_overledger-dlt-ethereum.Ethereum+_transactionValidation)

            * [._smartContractQueryValidation(contractQueryDetails)](#module_overledger-dlt-ethereum.Ethereum+_smartContractQueryValidation)

            * [.computeTransactionDataForConstructorWithParams(smartContractCode, paramsList)](#module_overledger-dlt-ethereum.Ethereum+computeTransactionDataForConstructorWithParams)

            * [.computeTransactionDataForFunctionCall(functionName, paramsList)](#module_overledger-dlt-ethereum.Ethereum+computeTransactionDataForFunctionCall)

            * [._sign(thisTransaction)](#module_overledger-dlt-ethereum.Ethereum+_sign)

            * [._buildSmartContractQuery(dltAddress, contractQueryDetails)](#module_overledger-dlt-ethereum.Ethereum+_buildSmartContractQuery)

            * [.computeSCQueryInputValuesList(inputFunctionParams)](#module_overledger-dlt-ethereum.Ethereum+computeSCQueryInputValuesList)

            * [.computeSCQueryOutputTypesList(outputFunctionTypes)](#module_overledger-dlt-ethereum.Ethereum+computeSCQueryOutputTypesList)


<a name="module_overledger-dlt-ethereum.EthereumBytesOptions"></a>

### *overledger-dlt-ethereum*.EthereumBytesOptions
<a name="module_overledger-dlt-ethereum.EthereumTypeOptions"></a>

### *overledger-dlt-ethereum*.EthereumTypeOptions
<a name="module_overledger-dlt-ethereum.EthereumUintIntOptions"></a>

### *overledger-dlt-ethereum*.EthereumUintIntOptions
<a name="module_overledger-dlt-ethereum.default"></a>

### *overledger-dlt-ethereum*.default
Development package for Ethereum.

<a name="module_overledger-dlt-ethereum.Ethereum"></a>

### *overledger-dlt-ethereum*~Ethereum

* [~Ethereum](#module_overledger-dlt-ethereum.Ethereum)

    * [new Ethereum(sdk)](#new_module_overledger-dlt-ethereum.Ethereum_new)

    * [.name](#module_overledger-dlt-ethereum.Ethereum+name)

    * [.symbol](#module_overledger-dlt-ethereum.Ethereum+symbol)

    * [.createAccount()](#module_overledger-dlt-ethereum.Ethereum+createAccount)

    * [.setAccount(accountInfo)](#module_overledger-dlt-ethereum.Ethereum+setAccount)

    * [.buildTransaction(thisTransaction)](#module_overledger-dlt-ethereum.Ethereum+buildTransaction)

    * [._transactionValidation(thisTransaction)](#module_overledger-dlt-ethereum.Ethereum+_transactionValidation)

    * [._smartContractQueryValidation(contractQueryDetails)](#module_overledger-dlt-ethereum.Ethereum+_smartContractQueryValidation)

    * [.computeTransactionDataForConstructorWithParams(smartContractCode, paramsList)](#module_overledger-dlt-ethereum.Ethereum+computeTransactionDataForConstructorWithParams)

    * [.computeTransactionDataForFunctionCall(functionName, paramsList)](#module_overledger-dlt-ethereum.Ethereum+computeTransactionDataForFunctionCall)

    * [._sign(thisTransaction)](#module_overledger-dlt-ethereum.Ethereum+_sign)

    * [._buildSmartContractQuery(dltAddress, contractQueryDetails)](#module_overledger-dlt-ethereum.Ethereum+_buildSmartContractQuery)

    * [.computeSCQueryInputValuesList(inputFunctionParams)](#module_overledger-dlt-ethereum.Ethereum+computeSCQueryInputValuesList)

    * [.computeSCQueryOutputTypesList(outputFunctionTypes)](#module_overledger-dlt-ethereum.Ethereum+computeSCQueryOutputTypesList)


<a name="new_module_overledger-dlt-ethereum.Ethereum_new"></a>

#### new Ethereum(sdk)

| Param | Type | Description |
| --- | --- | --- |
| sdk | <code>any</code> | the sdk instance |

<a name="module_overledger-dlt-ethereum.Ethereum+name"></a>

#### *ethereum*.name
Name of the DLT

<a name="module_overledger-dlt-ethereum.Ethereum+symbol"></a>

#### *ethereum*.symbol
Symbol of the DLT

<a name="module_overledger-dlt-ethereum.Ethereum+createAccount"></a>

#### *ethereum*.createAccount()
Create an Ethereum account

**Returns**: [<code>Account</code>](#Account) - the new Ethereum account  
<a name="module_overledger-dlt-ethereum.Ethereum+setAccount"></a>

#### *ethereum*.setAccount(accountInfo)

| Param | Type | Description |
| --- | --- | --- |
| accountInfo | [<code>Account</code>](#Account) | The standardised account information |

Set an account for signing transactions for a specific DLT

<a name="module_overledger-dlt-ethereum.Ethereum+buildTransaction"></a>

#### *ethereum*.buildTransaction(thisTransaction)

| Param | Type | Description |
| --- | --- | --- |
| thisTransaction | <code>TransactionEthereumRequest</code> | details on the information to include in this transaction for the Ethereum distributed ledger |

Takes the Overledger definition of a transaction and converts it into a specific Ethereum transaction

**Returns**: <code>Transaction</code> - the Ethereum transaction  
<a name="module_overledger-dlt-ethereum.Ethereum+_transactionValidation"></a>

#### *ethereum*._transactionValidation(thisTransaction)

| Param | Description |
| --- | --- |
| thisTransaction | The transaction request |

validates an OVL transactionRequest according to Ethereum specific rules

<a name="module_overledger-dlt-ethereum.Ethereum+_smartContractQueryValidation"></a>

#### *ethereum*._smartContractQueryValidation(contractQueryDetails)

| Param | Type | Description |
| --- | --- | --- |
| contractQueryDetails | <code>SmartContract</code> | The transaction request |

validates an OVL smart contract query according to Ethereum specific rules

<a name="module_overledger-dlt-ethereum.Ethereum+computeTransactionDataForConstructorWithParams"></a>

#### *ethereum*.computeTransactionDataForConstructorWithParams(smartContractCode, paramsList)

| Param | Type | Description |
| --- | --- | --- |
| smartContractCode | <code>string</code> | the bytecode of the smart contract (without the byte code information on the constructor variables) |
| paramsList | <code>Array.&lt;SCEthereumParam&gt;</code> | the list of parameters that this constructor takes as input |

Convert Overledger object description of a smart contract constructor and parameters into Ethereum versions

**Returns**: <code>string</code> - the bytecode of the smart contract and the parameters  
<a name="module_overledger-dlt-ethereum.Ethereum+computeTransactionDataForFunctionCall"></a>

#### *ethereum*.computeTransactionDataForFunctionCall(functionName, paramsList)

| Param | Type | Description |
| --- | --- | --- |
| functionName | <code>string</code> | the name of the smart contract function to call |
| paramsList | <code>Array.&lt;SCEthereumParam&gt;</code> | the list of parameters that this function takes as input |

Convert Overledger object description of a smart contract function and parameters into Ethereum versions

**Returns**: <code>string</code> - the bytecode of this function call  
<a name="module_overledger-dlt-ethereum.Ethereum+_sign"></a>

#### *ethereum*._sign(thisTransaction)

| Param | Type | Description |
| --- | --- | --- |
| thisTransaction | <code>TransactionRequest</code> | an instantiated overledger definition of an ethereum transaction |

Takes in an overledger definition of a transaction for ethereum, converts it into a form that the Ethereum distributed ledger will understand, and then signs the transaction

<a name="module_overledger-dlt-ethereum.Ethereum+_buildSmartContractQuery"></a>

#### *ethereum*._buildSmartContractQuery(dltAddress, contractQueryDetails)

| Param | Type | Description |
| --- | --- | --- |
| dltAddress | <code>string</code> | the user's Ethereum address |
| contractQueryDetails | <code>SmartContractEthereum</code> | the definition of the smart contract function the user wants to interact with, including information on what parameters to use in the function call. |

Allows a user to build a smart contract query for the Ethereum distributed ledger

**Returns**: <code>Object</code> - success indicates if this query building was correct, if yes then it will be in the response field of the object  
<a name="module_overledger-dlt-ethereum.Ethereum+computeSCQueryInputValuesList"></a>

#### *ethereum*.computeSCQueryInputValuesList(inputFunctionParams)

| Param | Type | Description |
| --- | --- | --- |
| inputFunctionParams | <code>Array.&lt;SCEthereumParam&gt;</code> | the list of input parameters |

computes the input parameters into the smart contract function query

<a name="module_overledger-dlt-ethereum.Ethereum+computeSCQueryOutputTypesList"></a>

#### *ethereum*.computeSCQueryOutputTypesList(outputFunctionTypes)

| Param | Type |
| --- | --- |
| outputFunctionTypes | <code>Array.&lt;SCEthereumParam&gt;</code> | 

computes the output parameters into the smart contract function query

<a name="module_overledger-dlt-hyperledger_fabric"></a>

## overledger-dlt-hyperledger_fabric

* [overledger-dlt-hyperledger_fabric](#module_overledger-dlt-hyperledger_fabric)

    * _static_
        * [.HyperledgerFabricTypeOptions](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabricTypeOptions)

        * [.default](#module_overledger-dlt-hyperledger_fabric.default)

    * _inner_
        * [~HyperledgerFabric](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric)

            * [new HyperledgerFabric(sdk)](#new_module_overledger-dlt-hyperledger_fabric.HyperledgerFabric_new)

            * [.name](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+name)

            * [.symbol](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+symbol)

            * [.createAccount()](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+createAccount)

            * [.setAccount(accountInfo)](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+setAccount)

            * [.buildTransaction(thisTransaction)](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+buildTransaction)

            * [._transactionValidation(thisTransaction)](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+_transactionValidation)

            * [._smartContractQueryValidation(contractQueryDetails)](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+_smartContractQueryValidation)

            * [.computeTransactionDataForFunctionCall(invocationType, paramsList)](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+computeTransactionDataForFunctionCall)

            * [._sign(thisTransaction)](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+_sign)

            * [.getTransactionQueryInfo()](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+getTransactionQueryInfo)

            * [._buildSmartContractQuery(dltAddress, contractQueryDetails)](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+_buildSmartContractQuery)

            * [.computeSCQueryInputValuesList(inputFunctionParams)](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+computeSCQueryInputValuesList)

            * [.computeSCQueryOutputTypesList(outputFunctionTypes)](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+computeSCQueryOutputTypesList)


<a name="module_overledger-dlt-hyperledger_fabric.HyperledgerFabricTypeOptions"></a>

### *overledger-dlt-hyperledger_fabric*.HyperledgerFabricTypeOptions
<a name="module_overledger-dlt-hyperledger_fabric.default"></a>

### *overledger-dlt-hyperledger_fabric*.default
Development package for HyperledgerFabric.

<a name="module_overledger-dlt-hyperledger_fabric.HyperledgerFabric"></a>

### *overledger-dlt-hyperledger_fabric*~HyperledgerFabric

* [~HyperledgerFabric](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric)

    * [new HyperledgerFabric(sdk)](#new_module_overledger-dlt-hyperledger_fabric.HyperledgerFabric_new)

    * [.name](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+name)

    * [.symbol](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+symbol)

    * [.createAccount()](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+createAccount)

    * [.setAccount(accountInfo)](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+setAccount)

    * [.buildTransaction(thisTransaction)](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+buildTransaction)

    * [._transactionValidation(thisTransaction)](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+_transactionValidation)

    * [._smartContractQueryValidation(contractQueryDetails)](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+_smartContractQueryValidation)

    * [.computeTransactionDataForFunctionCall(invocationType, paramsList)](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+computeTransactionDataForFunctionCall)

    * [._sign(thisTransaction)](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+_sign)

    * [.getTransactionQueryInfo()](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+getTransactionQueryInfo)

    * [._buildSmartContractQuery(dltAddress, contractQueryDetails)](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+_buildSmartContractQuery)

    * [.computeSCQueryInputValuesList(inputFunctionParams)](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+computeSCQueryInputValuesList)

    * [.computeSCQueryOutputTypesList(outputFunctionTypes)](#module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+computeSCQueryOutputTypesList)


<a name="new_module_overledger-dlt-hyperledger_fabric.HyperledgerFabric_new"></a>

#### new HyperledgerFabric(sdk)

| Param | Type | Description |
| --- | --- | --- |
| sdk | <code>any</code> | the sdk instance |

<a name="module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+name"></a>

#### *hyperledgerFabric*.name
Name of the DLT

<a name="module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+symbol"></a>

#### *hyperledgerFabric*.symbol
Symbol of the DLT

<a name="module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+createAccount"></a>

#### *hyperledgerFabric*.createAccount()
Create an Hyperledger Fabric account

**Returns**: [<code>Account</code>](#Account) - the new Hyperledger Fabric account  
<a name="module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+setAccount"></a>

#### *hyperledgerFabric*.setAccount(accountInfo)

| Param | Type | Description |
| --- | --- | --- |
| accountInfo | [<code>Account</code>](#Account) | The standardised account information |

Set an account for this specific DLT

<a name="module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+buildTransaction"></a>

#### *hyperledgerFabric*.buildTransaction(thisTransaction)

| Param | Type | Description |
| --- | --- | --- |
| thisTransaction | <code>TransactionHyperledgerFabricRequest</code> | details on the information to include in this transaction for the Hyperledger Fabric distributed ledger |

Takes the Overledger definition of a transaction and converts it into a specific Hyperledger Fabric transaction

**Returns**: <code>Transaction</code> - the Hyperledger Fabric transaction  
<a name="module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+_transactionValidation"></a>

#### *hyperledgerFabric*._transactionValidation(thisTransaction)

| Param | Description |
| --- | --- |
| thisTransaction | The transaction request |

validates an OVL transactionRequest according to Hyperledger Fabric specific rules

<a name="module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+_smartContractQueryValidation"></a>

#### *hyperledgerFabric*._smartContractQueryValidation(contractQueryDetails)

| Param | Type | Description |
| --- | --- | --- |
| contractQueryDetails | <code>SmartContract</code> | The transaction request |

validates an OVL smart contract query according to Hyperledger Fabric specific rules

<a name="module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+computeTransactionDataForFunctionCall"></a>

#### *hyperledgerFabric*.computeTransactionDataForFunctionCall(invocationType, paramsList)

| Param | Type | Description |
| --- | --- | --- |
| invocationType | <code>string</code> | the type of smart contract function call |
| paramsList | <code>Array.&lt;SCHyperledgerFabricParam&gt;</code> | the list of parameters that this function takes as input |

Convert Overledger object description of a smart contract function and parameters into Hyperledger Fabric versions

**Returns**: <code>string</code> - the bytecode of this function call  
<a name="module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+_sign"></a>

#### *hyperledgerFabric*._sign(thisTransaction)

| Param | Type | Description |
| --- | --- | --- |
| thisTransaction | <code>TransactionRequest</code> | an instantiated overledger definition of a Hyperledger Fabric transaction |

Takes in an overledger definition of a transaction for Hyperledger Fabric, converts it into a form that the Hyperledger Fabric distributed ledger will understand, and then signs the transaction

<a name="module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+getTransactionQueryInfo"></a>

#### *hyperledgerFabric*.getTransactionQueryInfo()
Get the information required to query for a particular transaction hash

<a name="module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+_buildSmartContractQuery"></a>

#### *hyperledgerFabric*._buildSmartContractQuery(dltAddress, contractQueryDetails)

| Param | Type | Description |
| --- | --- | --- |
| dltAddress | <code>string</code> | the user's Hyperledger Fabric address |
| contractQueryDetails | <code>SmartContractHyperledgerFabric</code> | the definition of the smart contract function the user wants to interact with, including information on what parameters to use in the function call. |

Allows a user to build a smart contract query for the Hyperledger Fabric distributed ledger

**Returns**: <code>Object</code> - success indicates if this query building was correct, if yes then it will be in the response field of the object  
<a name="module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+computeSCQueryInputValuesList"></a>

#### *hyperledgerFabric*.computeSCQueryInputValuesList(inputFunctionParams)

| Param | Type | Description |
| --- | --- | --- |
| inputFunctionParams | <code>Array.&lt;SCHyperledgerFabricParam&gt;</code> | the list of input parameters |

computes the input parameters into the smart contract function query

<a name="module_overledger-dlt-hyperledger_fabric.HyperledgerFabric+computeSCQueryOutputTypesList"></a>

#### *hyperledgerFabric*.computeSCQueryOutputTypesList(outputFunctionTypes)

| Param | Type |
| --- | --- |
| outputFunctionTypes | <code>Array.&lt;SCHyperledgerFabricParam&gt;</code> | 

computes the output parameters into the smart contract function query

<a name="module_overledger-dlt-ripple"></a>

## overledger-dlt-ripple

* [overledger-dlt-ripple](#module_overledger-dlt-ripple)

    * _static_
        * [.default](#module_overledger-dlt-ripple.default)

    * _inner_
        * [~Ripple](#module_overledger-dlt-ripple.Ripple)

            * [new Ripple(sdk)](#new_module_overledger-dlt-ripple.Ripple_new)

            * [.name](#module_overledger-dlt-ripple.Ripple+name)

            * [.symbol](#module_overledger-dlt-ripple.Ripple+symbol)

            * [.createAccount()](#module_overledger-dlt-ripple.Ripple+createAccount)

            * [.setAccount(accountInfo)](#module_overledger-dlt-ripple.Ripple+setAccount)

            * [.buildTransaction(thisTransaction)](#module_overledger-dlt-ripple.Ripple+buildTransaction)

            * [._transactionValidation(thisTransaction)](#module_overledger-dlt-ripple.Ripple+_transactionValidation)

            * [._sign(thisTransaction)](#module_overledger-dlt-ripple.Ripple+_sign)

            * [._buildSmartContractQuery(dltAddress, contractQueryDetails)](#module_overledger-dlt-ripple.Ripple+_buildSmartContractQuery)

            * [._smartContractQueryValidation(contractQueryDetails)](#module_overledger-dlt-ripple.Ripple+_smartContractQueryValidation)

            * [.computeFeePrice(initialFee, transactionType, fulfillment)](#module_overledger-dlt-ripple.Ripple+computeFeePrice)

            * [.computeEscrowConditionFulfillment(hashAlgorithmInput)](#module_overledger-dlt-ripple.Ripple+computeEscrowConditionFulfillment)

            * [.isValidISODateFormat(dateTime)](#module_overledger-dlt-ripple.Ripple+isValidISODateFormat)

            * [.isValidDate(dateTimeCreate, dateTimeCancel)](#module_overledger-dlt-ripple.Ripple+isValidDate)

            * [.isValidRippleAddress(address)](#module_overledger-dlt-ripple.Ripple+isValidRippleAddress)


<a name="module_overledger-dlt-ripple.default"></a>

### *overledger-dlt-ripple*.default
Development package for Ripple (XRP Ledger).

<a name="module_overledger-dlt-ripple.Ripple"></a>

### *overledger-dlt-ripple*~Ripple

* [~Ripple](#module_overledger-dlt-ripple.Ripple)

    * [new Ripple(sdk)](#new_module_overledger-dlt-ripple.Ripple_new)

    * [.name](#module_overledger-dlt-ripple.Ripple+name)

    * [.symbol](#module_overledger-dlt-ripple.Ripple+symbol)

    * [.createAccount()](#module_overledger-dlt-ripple.Ripple+createAccount)

    * [.setAccount(accountInfo)](#module_overledger-dlt-ripple.Ripple+setAccount)

    * [.buildTransaction(thisTransaction)](#module_overledger-dlt-ripple.Ripple+buildTransaction)

    * [._transactionValidation(thisTransaction)](#module_overledger-dlt-ripple.Ripple+_transactionValidation)

    * [._sign(thisTransaction)](#module_overledger-dlt-ripple.Ripple+_sign)

    * [._buildSmartContractQuery(dltAddress, contractQueryDetails)](#module_overledger-dlt-ripple.Ripple+_buildSmartContractQuery)

    * [._smartContractQueryValidation(contractQueryDetails)](#module_overledger-dlt-ripple.Ripple+_smartContractQueryValidation)

    * [.computeFeePrice(initialFee, transactionType, fulfillment)](#module_overledger-dlt-ripple.Ripple+computeFeePrice)

    * [.computeEscrowConditionFulfillment(hashAlgorithmInput)](#module_overledger-dlt-ripple.Ripple+computeEscrowConditionFulfillment)

    * [.isValidISODateFormat(dateTime)](#module_overledger-dlt-ripple.Ripple+isValidISODateFormat)

    * [.isValidDate(dateTimeCreate, dateTimeCancel)](#module_overledger-dlt-ripple.Ripple+isValidDate)

    * [.isValidRippleAddress(address)](#module_overledger-dlt-ripple.Ripple+isValidRippleAddress)


<a name="new_module_overledger-dlt-ripple.Ripple_new"></a>

#### new Ripple(sdk)

| Param | Type |
| --- | --- |
| sdk | <code>any</code> | 

<a name="module_overledger-dlt-ripple.Ripple+name"></a>

#### *ripple*.name
Name of the DLT

<a name="module_overledger-dlt-ripple.Ripple+symbol"></a>

#### *ripple*.symbol
Symbol of the DLT

<a name="module_overledger-dlt-ripple.Ripple+createAccount"></a>

#### *ripple*.createAccount()
Create an XRP account

**Returns**: [<code>Account</code>](#Account) - (privateKey, address)  
<a name="module_overledger-dlt-ripple.Ripple+setAccount"></a>

#### *ripple*.setAccount(accountInfo)

| Param | Type | Description |
| --- | --- | --- |
| accountInfo | [<code>Account</code>](#Account) | The standardised account information |

Set an account for signing for a specific DLT

<a name="module_overledger-dlt-ripple.Ripple+buildTransaction"></a>

#### *ripple*.buildTransaction(thisTransaction)

| Param | Type | Description |
| --- | --- | --- |
| thisTransaction | <code>TransactionXRPRequest</code> | details on the information to include in this transaction for the XRP distributed ledger |

Takes the Overledger definition of a transaction and converts it into a specific XRP transaction

**Returns**: <code>Transaction</code> - the XRP transaction  
<a name="module_overledger-dlt-ripple.Ripple+_transactionValidation"></a>

#### *ripple*._transactionValidation(thisTransaction)

| Param | Description |
| --- | --- |
| thisTransaction | The transaction request |

validates an OVL transactionRequest according to XRP specific rules

<a name="module_overledger-dlt-ripple.Ripple+_sign"></a>

#### *ripple*._sign(thisTransaction)

| Param | Type | Description |
| --- | --- | --- |
| thisTransaction | <code>TransactionRequest</code> | an instantiated overledger definition of an XRP transaction |

Takes in an overledger definition of a transaction for XRP, converts it into a form that the XRP distributed ledger will understand, and then signs the transaction

<a name="module_overledger-dlt-ripple.Ripple+_buildSmartContractQuery"></a>

#### *ripple*._buildSmartContractQuery(dltAddress, contractQueryDetails)

| Param | Type | Description |
| --- | --- | --- |
| dltAddress | <code>string</code> | the user's XRP address |
| contractQueryDetails | <code>Object</code> | the definition of the smart contract function the user wants to interact with, including information on what parameters to use in the function call. |

Allows a user to build a smart contract query for the XRP distributed ledger (currently not supported for XRP)

**Returns**: <code>Object</code> - success indicates if this query building was correct, if yes then it will be in the response field of the object  
<a name="module_overledger-dlt-ripple.Ripple+_smartContractQueryValidation"></a>

#### *ripple*._smartContractQueryValidation(contractQueryDetails)

| Param | Description |
| --- | --- |
| contractQueryDetails | the query details |

validates an OVL smart contract query according to XRP specific rules

**Returns**: <code>Object</code> - success indicates if this query building was correct, if yes then it will be in the response field of the object  
<a name="module_overledger-dlt-ripple.Ripple+computeFeePrice"></a>

#### *ripple*.computeFeePrice(initialFee, transactionType, fulfillment)

| Param | Description |
| --- | --- |
| initialFee |  |
| transactionType | what type of transaction is this |
| fulfillment | is there an escrow fulfillment to be added to the transaction |

<a name="module_overledger-dlt-ripple.Ripple+computeEscrowConditionFulfillment"></a>

#### *ripple*.computeEscrowConditionFulfillment(hashAlgorithmInput)

| Param |
| --- |
| hashAlgorithmInput | 

Takes a string hash algorith input and generates both the bytecode version of the condition to be placed on the ledger and also the bytecode version of its pre-image fulfillment

<a name="module_overledger-dlt-ripple.Ripple+isValidISODateFormat"></a>

#### *ripple*.isValidISODateFormat(dateTime)

| Param | Description |
| --- | --- |
| dateTime | the date to check |

Checking the given parameter passes the ISODate format

<a name="module_overledger-dlt-ripple.Ripple+isValidDate"></a>

#### *ripple*.isValidDate(dateTimeCreate, dateTimeCancel)

| Param | Description |
| --- | --- |
| dateTimeCreate | the escrow creation time |
| dateTimeCancel | the escrow cancelation time |

Checking the given parameter passes the ISODate format

<a name="module_overledger-dlt-ripple.Ripple+isValidRippleAddress"></a>

#### *ripple*.isValidRippleAddress(address)

| Param | Description |
| --- | --- |
| address | the address to check |

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

            * [.getTransaction(transactionHash, dlt, extraFields)](#module_overledger-search.OverledgerSearch+getTransaction)

            * [.getTransactionType(hash)](#module_overledger-search.OverledgerSearch+getTransactionType)

            * [.getBlockByDltAndNumber(dlt, blockNumber)](#module_overledger-search.OverledgerSearch+getBlockByDltAndNumber)

            * [.getBlockHeightByDlt(dlt)](#module_overledger-search.OverledgerSearch+getBlockHeightByDlt)

            * [.getBlockByDltAndHash(dlt, hash)](#module_overledger-search.OverledgerSearch+getBlockByDltAndHash)

            * [.smartContractQuery(dlt, contractQueryDetails)](#module_overledger-search.OverledgerSearch+smartContractQuery)


<a name="module_overledger-search.default"></a>

### *overledger-search*.default
Search support package.

<a name="module_overledger-search.OverledgerSearch"></a>

### *overledger-search*~OverledgerSearch

* [~OverledgerSearch](#module_overledger-search.OverledgerSearch)

    * [new OverledgerSearch(sdk)](#new_module_overledger-search.OverledgerSearch_new)

    * [.getTransaction(transactionHash, dlt, extraFields)](#module_overledger-search.OverledgerSearch+getTransaction)

    * [.getTransactionType(hash)](#module_overledger-search.OverledgerSearch+getTransactionType)

    * [.getBlockByDltAndNumber(dlt, blockNumber)](#module_overledger-search.OverledgerSearch+getBlockByDltAndNumber)

    * [.getBlockHeightByDlt(dlt)](#module_overledger-search.OverledgerSearch+getBlockHeightByDlt)

    * [.getBlockByDltAndHash(dlt, hash)](#module_overledger-search.OverledgerSearch+getBlockByDltAndHash)

    * [.smartContractQuery(dlt, contractQueryDetails)](#module_overledger-search.OverledgerSearch+smartContractQuery)


<a name="new_module_overledger-search.OverledgerSearch_new"></a>

#### new OverledgerSearch(sdk)

| Param | Type |
| --- | --- |
| sdk | <code>Object</code> | 

<a name="module_overledger-search.OverledgerSearch+getTransaction"></a>

#### *overledgerSearch*.getTransaction(transactionHash, dlt, extraFields)

| Param | Type | Description |
| --- | --- | --- |
| transactionHash | <code>string</code> | Transaction hash |
| dlt | <code>string</code> | the dlt that the transactionHash resides on *Optional* |
| extraFields | <code>string</code> | any extra fields required to perform this transaction search *Optional* |

Get transaction by transaction hash

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

<a name="module_overledger-search.OverledgerSearch+getBlockHeightByDlt"></a>

#### *overledgerSearch*.getBlockHeightByDlt(dlt)

| Param | Type | Description |
| --- | --- | --- |
| dlt | <code>string</code> | The DLT name |

Get block by DLT and number

<a name="module_overledger-search.OverledgerSearch+getBlockByDltAndHash"></a>

#### *overledgerSearch*.getBlockByDltAndHash(dlt, hash)

| Param | Type | Description |
| --- | --- | --- |
| dlt | <code>string</code> | The DLT name |
| hash | <code>string</code> | The block hash |

Get block by DLT and hash

<a name="module_overledger-search.OverledgerSearch+smartContractQuery"></a>

#### *overledgerSearch*.smartContractQuery(dlt, contractQueryDetails)

| Param | Description |
| --- | --- |
| dlt | the distributed ledger that this smart contract is on |
| contractQueryDetails | details on this smart contract query |

Query a smart contract

<a name="module_overledger-types"></a>

## overledger-types

* [overledger-types](#module_overledger-types)

    * [.DltNameOptions](#module_overledger-types.DltNameOptions)

    * [.SCInteropOptions](#module_overledger-types.SCInteropOptions)


<a name="module_overledger-types.DltNameOptions"></a>

### *overledger-types*.DltNameOptions
<a name="module_overledger-types.SCInteropOptions"></a>

### *overledger-types*.SCInteropOptions
<a name="witnessStackToScriptWitness"></a>

## witnessStackToScriptWitness()
From psbt library : not exported in psbt nor in bitcoinjs-lib yet but needed in the finalize step of psbt signing (getFinalScripts function)

<a name="isAddressOutput"></a>

## isAddressOutput()
Test if the data passed in the utxo output is an address or a script pub key

<a name="computeParamType"></a>

## computeParamType(param)

| Param | Description |
| --- | --- |
| param | the parameter definition |

This function is used to prepare the parameter definition for the web3 package

<a name="computeParamType"></a>

## computeParamType(param)

| Param | Description |
| --- | --- |
| param | the parameter definition |

This function is used to prepare the parameter definition for the web3 package

<a name="CordaParam"></a>

## CordaParam
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>object</code> | information on the selectedType from the valid options. If an integer or byte type was chosen then further information is required on the exact number of bytes being used. If an integer is used, then selectedIntegerLength is required. If a byte is used then selectedBytesLength is required |
| value | <code>object</code> | information on the parameter's value |
| name | <code>string</code> | the parameter's name |

A description of an Corda smart contract function parameter.

<a name="AtomicSwapXRPParams"></a>

## AtomicSwapXRPParams
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| allowCancelAfter | <code>Object</code> | from when can the escrow be executed? In ISOString format |
| allowExecuteAfter | <code>Object</code> | from when can the escrow be cancelled? In ISOString format |
| hashAlgorithmInputString | <code>Object</code> | this is the sha256 hash algorithm input as a string. It will NOT be placed on the ledger when creating a transaction. |
| hashAlgorithmCondition | <code>Object</code> | this is if there has been a hash string placed onto another chain and now we want to add it to this chain. |
| escrowSequence | <code>string</code> | The sequence number of the escrow you are executing or cancelling |
| hashAlgorithmFulfillment | <code>string</code> | This is the value to unlock the escrow (the input to the sha256 hash algorithm) |
| owner | <code>string</code> | The address that funded the escrow |

An object used to describe the atomic swap params required for XRP

<a name="TrustlineXRPRequest"></a>

## TrustlineXRPRequest
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| subType | <code>Object</code> | a redefinition of the TransactionRequest object, to add more XRP specific information |
| feePrice | <code>string</code> | the fee to pay for this transaction to enter the XRP ledger. It is denoted in drops where the current minimum allowed is 12. |
| maxLedgerVersion | <code>string</code> | The maximum ledger version the transaction can be included in |

A generic object used to describe an Overledger transaction request for the XRP Ledger. Note that this object inherits many parameters from TransactionAccountsRequest.

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

