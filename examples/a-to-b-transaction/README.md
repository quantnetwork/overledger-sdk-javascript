# Overledger Party A to Party B Transaction

This example contains a script which goes through the following steps:
1. Create and fund Testnet accounts for party A
2. Create and fund Testnet accounts for party B
3. Send a multiple DLT transation from party A to party B

## Building

In order to run the example, first, make sure you have built the sdk by running the following command in the root folder of the project:

```
yarn run build
```

## Running the example

Open a terminal window in the a-to-b-transaction directory and run:

```
node a-to-b-transactions
```

If all went well, the output should look like this:

```
{
  "mappId": "network.quant.examples.a-to-b-transaction",
  "overledgerTransactionId": "f0c1f314-7cda-4f67-8a21-3761d09af452",
  "timestamp": "2019-04-29T14:05:40.189878Z",
  "dltData": [
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
