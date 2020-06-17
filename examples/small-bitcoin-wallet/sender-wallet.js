"use strict";
// npx ts-node sender-wallet.ts: run only the .ts file examples (if exist)
// npx tsc sender-wallet.ts (generate the js file)
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require('fs');
var neatCsv = require('neat-csv');
var coinSelect = require('coinselect');
var fetch = require('node-fetch');
var createCsvWriter = require('csv-writer').createObjectCsvWriter;
var previousEstimateFee = { fastestFee: 44, halfHourFee: 42, hourFee: 36 }; // (curl https://bitcoinfees.earn.com/api/v1/fees/recommended)
var serviceEstimateFeeUrl = 'https://bitcoinfees.earn.com/api/v1/fees/recommended';
function createUtxosObjects(overledger, csvFilePath, addScript) {
    return __awaiter(this, void 0, void 0, function () {
        var readStream, txnInputs;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    readStream = fs.createReadStream(csvFilePath);
                    return [4 /*yield*/, neatCsv(readStream)];
                case 1:
                    txnInputs = _a.sent();
                    if (addScript) {
                        return [2 /*return*/, Promise.all(txnInputs.map(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                var script;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, getUtxoScriptPubKey(overledger, tx.txHash, parseInt(tx.outputIndex, 10))];
                                        case 1:
                                            script = _a.sent();
                                            return [2 /*return*/, __assign({}, tx, { script: script })];
                                    }
                                });
                            }); }))];
                    }
                    return [2 /*return*/, txnInputs];
            }
        });
    });
}
function getUtxoScriptPubKey(overledger, txnHash, index) {
    return __awaiter(this, void 0, void 0, function () {
        var bitcoinTransaction, scriptPubKey, scriptHex;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, overledger.search.getTransaction(txnHash)];
                case 1:
                    bitcoinTransaction = _a.sent();
                    scriptPubKey = bitcoinTransaction.data.data.vout.filter(function (out) {
                        return out.n === index;
                    });
                    scriptHex = scriptPubKey[0].scriptPubKey.hex;
                    // const scriptAsm = scriptPubKey[0].scriptPubKey.asm;
                    return [2 /*return*/, Buffer.from(scriptHex.toString(), "hex")];
            }
        });
    });
}
function updateCsvFile(overledger, senderChangeAddress, txnsInputsNotUsed, txnHashInputsToAdd, csvFilePath) {
    return __awaiter(this, void 0, void 0, function () {
        var csvWriter, newChangeInput, totalRecords;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    csvWriter = createCsvWriter({
                        path: csvFilePath,
                        header: [
                            { id: 'address', title: 'address' },
                            { id: 'txHash', title: 'txHash' },
                            { id: 'outputIndex', title: 'outputIndex' },
                            { id: 'value', title: 'value' }
                        ]
                    });
                    return [4 /*yield*/, Promise.all(txnHashInputsToAdd.map(function (txnHash) { return __awaiter(_this, void 0, void 0, function () {
                            var bitcoinTransaction, vout, changeOutputVout;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, overledger.search.getTransaction(txnHash)];
                                    case 1:
                                        bitcoinTransaction = _a.sent();
                                        console.log(bitcoinTransaction);
                                        vout = bitcoinTransaction.data.data.vout;
                                        console.log(bitcoinTransaction.data.data.vout);
                                        console.log(bitcoinTransaction.data.data.vin);
                                        changeOutputVout = vout.filter(function (o) {
                                            if (o.scriptPubKey !== undefined && o.scriptPubKey.addresses !== undefined) {
                                                return o.scriptPubKey.addresses.includes(senderChangeAddress);
                                            }
                                            return false;
                                        });
                                        console.log("changeOutputVout " + JSON.stringify(changeOutputVout));
                                        return [2 /*return*/, {
                                                address: changeOutputVout[0].scriptPubKey.addresses[0],
                                                txHash: bitcoinTransaction.data.data.txid,
                                                outputIndex: changeOutputVout[0].n,
                                                value: changeOutputVout[0].value
                                            }];
                                }
                            });
                        }); }))];
                case 1:
                    newChangeInput = _a.sent();
                    if (txnsInputsNotUsed !== undefined) {
                        totalRecords = txnsInputsNotUsed.concat(newChangeInput);
                    }
                    else {
                        totalRecords = newChangeInput;
                    }
                    console.log("newChangeInput " + JSON.stringify(totalRecords));
                    return [4 /*yield*/, csvWriter.writeRecords(totalRecords)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateCsvFile = updateCsvFile;
function utxosWithSatoshisValues(txnInputs) {
    var txnInputsWithSatoshisValues = txnInputs.map(function (txn) {
        return __assign({}, txn, { value: btcToSatoshiValue(txn.value) });
    });
    return txnInputsWithSatoshisValues;
}
function btcToSatoshiValue(btcValue) {
    return btcValue * 1e8;
}
function addChangeAddressForChangeOutput(outputs, senderChangeAddress) {
    var finalOutputs = outputs.map(function (output) {
        if (!output.address) {
            return __assign({}, output, { address: senderChangeAddress });
        }
        else {
            return output;
        }
    });
    return finalOutputs;
}
function computeCoins(overledger, csvFilePath, senderAddress, receiverAddress, senderChangeAddress, valueToSend, addScript, userFeeUsed, defaultServiceFeeUsed, userEstimateFee, priority) {
    return __awaiter(this, void 0, void 0, function () {
        var feeRate, txnInputs, senderTxnInputs, txnInputsWithSatoshisValues, coinSelected, outputsWithChangeAddress, coinSelectedHashes, coinsToKeep, MIN_FEE, diff_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getEstimateFeeRate(userFeeUsed, defaultServiceFeeUsed, userEstimateFee, priority)];
                case 1:
                    feeRate = _a.sent();
                    console.log("feeRate computeCoins " + feeRate);
                    return [4 /*yield*/, createUtxosObjects(overledger, csvFilePath, addScript)];
                case 2:
                    txnInputs = _a.sent();
                    console.log("txnInputs " + JSON.stringify(txnInputs));
                    senderTxnInputs = txnInputs.filter(function (t) { return t.address === senderAddress; });
                    txnInputsWithSatoshisValues = utxosWithSatoshisValues(senderTxnInputs);
                    coinSelected = coinSelect(txnInputsWithSatoshisValues, [{ address: receiverAddress, value: btcToSatoshiValue(valueToSend) }], feeRate);
                    console.log("coinSelected " + JSON.stringify(coinSelected));
                    outputsWithChangeAddress = addChangeAddressForChangeOutput(coinSelected.outputs, senderChangeAddress);
                    coinSelectedHashes = coinSelected.inputs.map(function (sel) { return sel.txHash; });
                    coinsToKeep = txnInputs.filter(function (t) { return !coinSelectedHashes.includes(t.txHash); });
                    MIN_FEE = 256;
                    if (coinSelected.fee < MIN_FEE) {
                        diff_1 = MIN_FEE - coinSelected.fee;
                        coinSelected = __assign({}, coinSelected, { fee: MIN_FEE });
                        outputsWithChangeAddress = outputsWithChangeAddress.map(function (output) {
                            if (output.address === senderChangeAddress) {
                                return __assign({}, output, { value: output.value - diff_1 });
                            }
                            else {
                                return output;
                            }
                        });
                        return [2 /*return*/, __assign({}, coinSelected, { coinsToKeep: coinsToKeep, outputsWithChangeAddress: outputsWithChangeAddress })];
                    }
                    return [2 /*return*/, __assign({}, coinSelected, { coinsToKeep: coinsToKeep, outputsWithChangeAddress: outputsWithChangeAddress })];
            }
        });
    });
}
exports.computeCoins = computeCoins;
function computeBtcRequestTxns(coinSelectTxInputs, coinSelectTxOutputs) {
    var txInputs = coinSelectTxInputs.map(function (input) {
        return {
            linkedTx: input.txHash,
            linkedIndex: input.outputIndex,
            fromAddress: input.address,
            amount: input.value
        };
    });
    var txOutputs = coinSelectTxOutputs.map(function (output) {
        return {
            toAddress: output.address,
            amount: output.value
        };
    });
    return { txInputs: txInputs, txOutputs: txOutputs };
}
exports.computeBtcRequestTxns = computeBtcRequestTxns;
function getEstimateFeeFromService(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, estimatedFees;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    estimatedFees = _a.sent();
                    console.log(estimatedFees);
                    return [2 /*return*/, estimatedFees];
            }
        });
    });
}
function getEstimateFeeRate(userFeeUsed, defaultServiceFeeUsed, userEstimateFee, priority) {
    return __awaiter(this, void 0, void 0, function () {
        var estimatedfFees, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!userFeeUsed) return [3 /*break*/, 1];
                    if (userEstimateFee && userEstimateFee !== undefined) {
                        return [2 /*return*/, Math.round(userEstimateFee)];
                    }
                    else {
                        console.log("User fee is used; Please set the fee rate for the transaction. The last recommended fees are: " + JSON.stringify(previousEstimateFee));
                    }
                    return [3 /*break*/, 10];
                case 1:
                    if (!(priority && priority !== undefined)) return [3 /*break*/, 9];
                    if (!defaultServiceFeeUsed) return [3 /*break*/, 2];
                    return [2 /*return*/, previousEstimateFee[priority]];
                case 2:
                    if (!(serviceEstimateFeeUrl && serviceEstimateFeeUrl !== undefined)) return [3 /*break*/, 7];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, getEstimateFeeFromService(serviceEstimateFeeUrl.toString())];
                case 4:
                    estimatedfFees = _a.sent();
                    return [2 /*return*/, estimatedfFees[priority]];
                case 5:
                    e_1 = _a.sent();
                    console.log("Cannot get the latest estimated fees; default fees are used: " + JSON.stringify(previousEstimateFee));
                    return [2 /*return*/, previousEstimateFee[priority]];
                case 6: return [3 /*break*/, 8];
                case 7:
                    console.log("Please make sure the url service to get the estimate fee is correct");
                    _a.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    console.log("Please set the priority for the default estimate fee to be used");
                    _a.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.getEstimateFeeRate = getEstimateFeeRate;
// response code: 500 responseMessage Internal Server Error, response: {\\\"result\\\":null,\\\"error\\\":{\\\"code\\\":-26,\\\"message\\\":\\\"min relay fee not met, 374 < 403 (code 66)\\\"},\\\"id\\\":\\\"1\\\"}\\n\",\"details\":\"uri=/transactions\"}],\"errorCount\":1}" 
// 374 2 inputs/ 2 outputs
