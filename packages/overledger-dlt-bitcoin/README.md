[docs]: https://github.com/quantnetwork/overledger-sdk-javascript/blob/master/README.md
[repo]: https://github.com/quantnetwork/overledger-sdk-javascript

# @quantnetwork/overledger-dlt-bitcoin

[Overledger SDK][repo] module for interaction with the Bitcoin distributed ledger technology.

## Installation

Install using [npm](https://www.npmjs.org/):
```
npm install @quantnetwork/overledger-dlt-bitcoin
```

Or, if you prefer using [yarn](https://yarnpkg.com/):

```
yarn add @quantnetwork/overledger-dlt-bitcoin
```

## API Reference

<a name="module_overledger-dlt-bitcoin"></a>

## overledger-dlt-bitcoin

* [overledger-dlt-bitcoin](#module_overledger-dlt-bitcoin)

    * _static_
        * [.default](#module_overledger-dlt-bitcoin.default)

    * _inner_
        * [~Bitcoin](#module_overledger-dlt-bitcoin.Bitcoin)

            * [new Bitcoin(sdk, options)](#new_module_overledger-dlt-bitcoin.Bitcoin_new)

            * [.name](#module_overledger-dlt-bitcoin.Bitcoin+name)

            * [.symbol](#module_overledger-dlt-bitcoin.Bitcoin+symbol)

            * [.buildTransaction(thisTransaction)](#module_overledger-dlt-bitcoin.Bitcoin+buildTransaction)

            * [._transactionValidation(thisTransaction)](#module_overledger-dlt-bitcoin.Bitcoin+_transactionValidation)

            * [._sign(thisTransaction)](#module_overledger-dlt-bitcoin.Bitcoin+_sign)

            * [.createAccount()](#module_overledger-dlt-bitcoin.Bitcoin+createAccount)

            * [.setAccount(privateKey)](#module_overledger-dlt-bitcoin.Bitcoin+setAccount)

            * [._buildSmartContractQuery(dltAddress, contractQueryDetails)](#module_overledger-dlt-bitcoin.Bitcoin+_buildSmartContractQuery)

            * [._smartContractQueryValidation(contractQueryDetails)](#module_overledger-dlt-bitcoin.Bitcoin+_smartContractQueryValidation)


<a name="module_overledger-dlt-bitcoin.default"></a>

### *overledger-dlt-bitcoin*.default
Development package for Bitcoin blockchain.

<a name="module_overledger-dlt-bitcoin.Bitcoin"></a>

### *overledger-dlt-bitcoin*~Bitcoin

* [~Bitcoin](#module_overledger-dlt-bitcoin.Bitcoin)

    * [new Bitcoin(sdk, options)](#new_module_overledger-dlt-bitcoin.Bitcoin_new)

    * [.name](#module_overledger-dlt-bitcoin.Bitcoin+name)

    * [.symbol](#module_overledger-dlt-bitcoin.Bitcoin+symbol)

    * [.buildTransaction(thisTransaction)](#module_overledger-dlt-bitcoin.Bitcoin+buildTransaction)

    * [._transactionValidation(thisTransaction)](#module_overledger-dlt-bitcoin.Bitcoin+_transactionValidation)

    * [._sign(thisTransaction)](#module_overledger-dlt-bitcoin.Bitcoin+_sign)

    * [.createAccount()](#module_overledger-dlt-bitcoin.Bitcoin+createAccount)

    * [.setAccount(privateKey)](#module_overledger-dlt-bitcoin.Bitcoin+setAccount)

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

<a name="module_overledger-dlt-bitcoin.Bitcoin+buildTransaction"></a>

#### *bitcoin*.buildTransaction(thisTransaction)

| Param | Type | Description |
| --- | --- | --- |
| thisTransaction | <code>TransactionRequest</code> | details on the information to include in this transaction for the Bitcoin distributed ledger |

Takes the Overledger definition of a transaction and converts it into a specific Bitcoin transaction

**Returns**: <code>Transaction</code> - the Bitcoin transaction  
<a name="module_overledger-dlt-bitcoin.Bitcoin+_transactionValidation"></a>

#### *bitcoin*._transactionValidation(thisTransaction)

| Param | Description |
| --- | --- |
| thisTransaction | The transaction request |

validates an OVL transactionRequest according to Bitcoin specific rules

<a name="module_overledger-dlt-bitcoin.Bitcoin+_sign"></a>

#### *bitcoin*._sign(thisTransaction)

| Param | Type | Description |
| --- | --- | --- |
| thisTransaction | <code>TransactionRequest</code> | an instantiated overledger definition of a Bitcoin transaction |

Takes in an overledger definition of a transaction for Bitcoin, converts it into a form that the Bitcoin distributed ledger will understand, and then signs the transaction

<a name="module_overledger-dlt-bitcoin.Bitcoin+createAccount"></a>

#### *bitcoin*.createAccount()
Create a Bitcoin account

**Returns**: <code>Account</code> - the new Bitcoin account  
<a name="module_overledger-dlt-bitcoin.Bitcoin+setAccount"></a>

#### *bitcoin*.setAccount(privateKey)

| Param | Type | Description |
| --- | --- | --- |
| privateKey | <code>string</code> | The privateKey |

Set an account for signing transactions for a specific DLT

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
