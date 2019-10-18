# Overledger Search

This example contains two scripts to return the balance and sequence for addresses. Please note these features are not supported for Bitcoin at the moment.

## Building

In order to run the examples, first, make sure you have built the sdk by running the following command in the root folder of the project:

```
npm run build
```

## Running the example

Each script has a section at the beginning where a couple of variables need to be initialised. First, set a mappId and BPI key. Then you can just run:

```
node get-address-balance.js
```

```
node get-address-sequence.js
```

The first command will print the balances of the addresses declared, while the second one will print the sequences of those addresses.