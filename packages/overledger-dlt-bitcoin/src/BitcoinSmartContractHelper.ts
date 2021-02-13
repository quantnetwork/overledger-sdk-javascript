const bitcoin = require('bitcoinjs-lib');
import TransactionBitcoinScriptTypeOptions from './DLTSpecificTypes/associatedEnums/TransactionBitcoinScriptTypeOptions';

export function generateHashTimeLockContractCode(claimPublicKey: Buffer | HexString, refundPublicKey: Buffer | HexString, paymentHashSecret: Buffer | HexString, timelock: number) {
  let claimKey = (claimPublicKey instanceof Buffer) ? claimPublicKey.toString('hex') : claimPublicKey;
  let refundKey = (refundPublicKey instanceof Buffer) ? refundPublicKey.toString('hex') : refundPublicKey;
  let hashSecret = (paymentHashSecret instanceof Buffer) ? paymentHashSecret : Buffer.from(paymentHashSecret, 'hex');
  // let tLock = bitcoin.script.number.encode(timelock).reverse();
  let tLock = bitcoin.script.number.encode(timelock);
  // if (tLock.length < 4) {
  //   // padding for 4 bytes
  //   const diff = 4 - tLock.length;
  //   const buf = Buffer.alloc(diff);
  //   tLock = Buffer.concat([tLock, buf]);
  // }
  console.log(`tLock ${tLock.toString('hex')}`);
  return bitcoin.script.fromASM(
    `
     OP_HASH160
      ${bitcoin.crypto.ripemd160(hashSecret).toString('hex')}
      OP_EQUAL
      OP_IF
        ${claimKey}
      OP_ELSE
        ${tLock.toString('hex')}
        OP_CHECKLOCKTIMEVERIFY
        OP_DROP
        ${refundKey}
      OP_ENDIF
      OP_CHECKSIG
    `
      .trim()
      .replace(/\s+/g, ' '),
  );
}

export function generateHashTimeLockContractCode2(claimPublicKey: Buffer | HexString, refundPublicKey: Buffer | HexString, paymentHashSecret: Buffer | HexString, timelock: number) {
  let claimKey = (claimPublicKey instanceof Buffer) ? claimPublicKey.toString('hex') : claimPublicKey;
  let refundKey = (refundPublicKey instanceof Buffer) ? refundPublicKey.toString('hex') : refundPublicKey;
  let hashSecret = (paymentHashSecret instanceof Buffer) ? paymentHashSecret : Buffer.from(paymentHashSecret, 'hex');
  // let tLock = bitcoin.script.number.encode(timelock).reverse();
  let tLock = bitcoin.script.number.encode(timelock);
  // if (tLock.length < 4) {
  //   // padding for 4 bytes
  //   const diff = 4 - tLock.length;
  //   const buf = Buffer.alloc(diff);
  //   tLock = Buffer.concat([tLock, buf]);
  // }
  console.log(`tLock ${tLock.toString('hex')}`);
  return bitcoin.script.fromASM(
    `
     OP_HASH160
      ${bitcoin.crypto.ripemd160(hashSecret).toString('hex')}
      OP_EQUAL
      OP_IF
        ${claimKey}
        OP_CHECKSIG
      OP_ELSE 
        ${tLock.toString('hex')}
        OP_CHECKLOCKTIMEVERIFY
        OP_DROP
        ${refundKey}
        OP_CHECKSIG
      OP_ENDIF
    `
      .trim()
      .replace(/\s+/g, ' '),
  );
}

export function createHashTimeLockContractPaymentChannel(currentPaymentChannel, scriptType, addressType) {
  if (scriptType === TransactionBitcoinScriptTypeOptions.P2SH) {
    const p2sh = bitcoin.payments.p2sh({ redeem: { output: currentPaymentChannel, network: addressType }, network: addressType });
    return p2sh;
  }
  if (scriptType === TransactionBitcoinScriptTypeOptions.P2WSH) {
    const p2wsh = bitcoin.payments.p2wsh({ redeem: { output: currentPaymentChannel, network: addressType }, network: addressType });
    return p2wsh;
  }
  if (scriptType === TransactionBitcoinScriptTypeOptions.P2SH_P2WSH) {
    const p2wsh = bitcoin.payments.p2wsh({ redeem: { output: currentPaymentChannel, network: addressType }, network: addressType });
    const p2sh = bitcoin.payments.p2sh({ redeem: p2wsh, network: addressType });
    return { p2sh, p2wsh };
  }
  return false;
}

type HexString = string;