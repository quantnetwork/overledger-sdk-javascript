# Overledger Search

This example contains two scripts to return the balance and sequence for addresses.

## Building

In order to run the examples, first, make sure you have built the sdk by running the following command in the root folder of the project:

```
yarn run build
```

## Running the example

Each script has a section at the beginning where a couple of variables need to be initialised. First, set a mappId and BPI key. Then you can just run the following scripts from the 'address-queries' directory:

```
node get-address-balance.js
```

```
node get-address-sequence.js
```

The first command will print the balances of the addresses declared, while the second one will print the sequences of those addresses.