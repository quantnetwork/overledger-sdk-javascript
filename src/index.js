"use strict";
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
var axios_1 = require("axios");
var Search_1 = require("./Search");
var ucFirst_1 = require("./utils/ucFirst");
var fs_1 = require("fs");
var OverledgerSDK = /** @class */ (function () {
    /**
     * @param {string} mappId
     * @param {string} bpiKey
     * @param {Object} options
     */
    function OverledgerSDK(mappId, bpiKey, options) {
        this.TESTNET = 'testnet';
        this.MAINNET = 'mainnet';
        /**
         * The object storing the DLTs loaded by the Overledger sdk
         */
        this.dlts = {};
        this.mappId = mappId;
        this.bpiKey = bpiKey;
        this.validateOptions(options);
        this.configure(options);
    }
    /**
     * Validate the provided options
     *
     * @param {Object} options
     */
    OverledgerSDK.prototype.validateOptions = function (options) {
        if (!options.dlts) {
            throw new Error('The dlts are missing');
        }
    };
    /**
     * Configure the provided options
     *
     * @param {Object} options
     */
    OverledgerSDK.prototype.configure = function (options) {
        var _this = this;
        options.dlts.forEach(function (dltConfig) {
            var dlt = _this.loadDlt(dltConfig);
            _this.dlts[dlt.name] = dlt;
        });
        this.network = options.network || this.TESTNET;
        if (this.network === this.MAINNET) {
            this.overledgerUri = 'https://bpi.overledger.io/v1';
        }
        else {
            this.overledgerUri = 'http://bpi.devnet.overledger.io/v1';
        }
        this.request = axios_1["default"].create({
            baseURL: this.overledgerUri,
            timeout: 1000,
            headers: {
                Authorization: "Bearer " + this.mappId + ":" + this.bpiKey
            }
        });
        this.search = new Search_1["default"](this);
    };
    /**
     * Sign transactions for the provided DLTs
     *
     * @param {Object} dlts Object of the DLTs where you want to send a transaction
     */
    OverledgerSDK.prototype.sign = function (dlts) {
        return __awaiter(this, void 0, void 0, function () {
            var responseDlts;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Array.isArray(dlts)) {
                            throw new Error('The dlts object must be an array');
                        }
                        return [4 /*yield*/, Promise.all(dlts.map(function (dlt) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _a = {
                                                dlt: dlt.dlt
                                            };
                                            return [4 /*yield*/, this.dlts[dlt.dlt].sign(dlt.toAddress, dlt.message, dlt.options)];
                                        case 1: return [2 /*return*/, (_a.signedTransaction = _b.sent(),
                                                _a)];
                                    }
                                });
                            }); }))];
                    case 1:
                        responseDlts = _a.sent();
                        return [2 /*return*/, responseDlts];
                }
            });
        });
    };
    /**
     * Wrap the DLTData with the api schema
     *
     * @param {array} dltData
     */
    OverledgerSDK.prototype.buildWrapperApiCall = function (dltData) {
        return {
            mappId: this.mappId,
            dltData: dltData
        };
    };
    /**
     * Send signed transactions to the provided DLTs
     *
     * @param {Object} signedTransactions Object of the DLTs where you want to send a transaction
     */
    OverledgerSDK.prototype.send = function (signedTransactions) {
        var _this = this;
        var apiCall = signedTransactions.map(function (dlt) { return _this.dlts[dlt.dlt].buildApiCall(dlt.signedTransaction); });
        console.log(this.buildWrapperApiCall(apiCall), this.overledgerUri + "/transactions");
        return this.request.post(this.overledgerUri + "/transactions", this.buildWrapperApiCall(apiCall));
    };
    /**
     * Load the dlt to the Overledger SDK
     *
     * @param {Object} config
     *
     * @return {Provider}
     */
    OverledgerSDK.prototype.loadDlt = function (config) {
      console.log(`./dlts/${config.dlt}`);

        console.log('TETEQTQETEUYQTEU oihegwoi hgewhasi` gyhioqewachsghadcgwioeasg coiagoi');
        // Need to improve this loading
        var Provider = require(__dirname + "/dlts/" + ucFirst_1["default"](config.dlt));
        console.log(__dirname + "/dlts/" + ucFirst_1["default"](config.dlt));
        if (fs_1["default"].existsSync(config.dlt)) {
            console.log('oigherdsoihgoirwehdsoihgewo ihegwoi hoigewh');
        }
        else {
            console.log('gorifhwsdodhfa');
        }
        return new Provider(this, config);
    };
    /**
     * Read by mapp id
     */
    OverledgerSDK.prototype.readTransactionsByMappId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.request.get(this.overledgerUri + "/mapp/" + this.mappId + "/transactions")];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        e_1 = _a.sent();
                        return [2 /*return*/, e_1.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * read by overledger transaction id
     *
     * @param {string} ovlTransactionId
     */
    OverledgerSDK.prototype.readByTransactionId = function (ovlTransactionId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.request.get(this.overledgerUri + "/transactions/" + ovlTransactionId)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        e_2 = _a.sent();
                        return [2 /*return*/, e_2.response.data];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Set the mapp id
     *
     * @param {string} mappId
     */
    OverledgerSDK.prototype.setMappId = function (mappId) {
        this.mappId = mappId;
    };
    /**
     * get the mapp id
     */
    OverledgerSDK.prototype.getMappId = function () {
        return this.mappId;
    };
    /**
     * set the bpi key
     *
     * @param {string} bpiKey
     */
    OverledgerSDK.prototype.setBpiKey = function (bpiKey) {
        this.bpiKey = bpiKey;
    };
    /**
     * get the bpi key
     */
    OverledgerSDK.prototype.getBpiKey = function () {
        return this.bpiKey;
    };
    return OverledgerSDK;
}());
exports["default"] = OverledgerSDK;
