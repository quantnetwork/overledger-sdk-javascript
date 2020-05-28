
// const csv = require('csv-parser');
// const util = require('util');
// const csv = require('csvtojson');
// const createReadStream = util.promisify(fs.createReadStream);

// ---- sender: 
// Bitcoin account:
//  { privateKey: 'cTmdFnuSqY8xrUKPuVeUip2LyRAwwwv8LqA6G1nLDmBNfPjzrK3s',
//   address: 'mgjbZZqZg1r9Yqo8gjyBL3Y2Mu4XttAu1T' }


// ---- receiver:
// Bitcoin account:
//  { privateKey: 'cNoXs1M34cVWhfQvd9cDSRkCfy9hLEGohzEfUrzUy7cdvMKTAhTk',
//   address: 'mqbdQXAAipkAJeKjCVDSg3TJ92y9yxg5yt' }

// npx ts-node sender-wallet.ts
// ----------------------------------------------------------------------------

const fs = require('fs');
const neatCsv = require('neat-csv');


const senderAddress = 'mgjbZZqZg1r9Yqo8gjyBL3Y2Mu4XttAu1T';
const senderPrivateKey = 'cTmdFnuSqY8xrUKPuVeUip2LyRAwwwv8LqA6G1nLDmBNfPjzrK3s';
const receiverAddress = 'mqbdQXAAipkAJeKjCVDSg3TJ92y9yxg5yt';
const valueToSend = 0.0001;
const csvFile = './sender-utxos.csv';

interface UtxoCSVObject {
  address: string;
  txHash: string;
  outputIndex: number;
  btcValue: number;
}

async function createUtxosObjects(csvFilePath): Promise<UtxoCSVObject[]> {
  const readStream = fs.createReadStream(csvFilePath);
  const csvObjects = await neatCsv(readStream);
  return csvObjects;
}


async function runExample() {
  const utxos: UtxoCSVObject[] = await createUtxosObjects(csvFile);
  console.log(`CSV OBJECT ${JSON.stringify(utxos)}`);
  const values = utxos.filter((txn) => txn.btcValue > valueToSend);
  console.log(`values ${JSON.stringify(values)}`);
}

;(async () => {
  return runExample();
})();




