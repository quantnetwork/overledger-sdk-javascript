# Overledger Party A to Party B Transaction

This example contains three scripts which go through the following steps:
1. Create and fund Testnet accounts for party A
2. Create and fund Testnet accounts for party B
3. Send a multiple DLT transation from party A to party B

## Building

In order to run the examples, first, make sure you have built the sdk by running the following command in the root folder of the project:

```
npm run build
```

## Running the example

Each script has a section at the beginning where a couple of variables need to be initialised. First, set a mappId and BPI key in all of the scripts. For scripts 1 and 2, these are the only variables that need to be initialised.

Open two terminal windows in the a-to-b-transaction folder and run:

```
node 1-partyA.js
```

Then, in a separate window run

```
node 2-partyB.js
```

The first two scripts are functionally identical, but the logs differ for ease of use. The output is going to be accounts for each supported DLT, together with the response returned by the Overledger faucets used to fund the accounts with tokens.

Taking the output of the initial two scripts, fill in the variables at the beggining of the third script. Once that's done, run:

```
node 3-transactions.js
```

If all went well, the output should look like this:

```
{
  "mappId": "network.quant.examples.a-to-b-transaction",
  "overledgerTransactionId": "f0c1f314-7cda-4f67-8a21-3761d09af452",
  "timestamp": "2019-04-29T14:05:40.189878Z",
  "dltData": [
    {
      "dlt": "bitcoin",
      "transactionHash": "cba56fa5543cab114ff54b315a453a89912ce34737e7d1a799e22f9f00b501d9",
      "status": {
        "status": "broadcasted",
        "code": null,
        "message": null
      },
      "links": []
    },
    {
      "dlt": "ethereum",
      "transactionHash": "0x4016406d985f0273d841353c95e88906fc805c700b7a5bf4c79124df1dd53985",
      "status": {
        "status": "broadcasted",
        "code": "0",
        "message": "Successfully broadcasted"
      },
      "links": []
    },
    {
      "dlt": "ripple",
      "transactionHash": "A7606719C83BCE64A43D102FB7D6DDF0B1A8E7014512D395E0756D1D7EBA287F",
      "status": {
        "status": "broadcasted",
        "code": "tesSUCCESS",
        "message": "The transaction was applied. Only final in a validated ledger."
      },
      "links": []
    }
  ]
}
```
