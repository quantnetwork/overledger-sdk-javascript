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
var Search = /** @class */ (function () {
    /**
     * @param {Object} sdk
     * @param {Object} options
     */
    function Search(sdk) {
        this.sdk = sdk;
        this.request = axios_1["default"].create({
            baseURL: this.sdk.overledgerUri + "/search",
            timeout: 1000,
            headers: { Authorization: "Bearer " + this.sdk.mappId + ":" + this.sdk.bpiKey }
        });
    }
    /**
     * Get transaction by a transaction hash (non-deterministic)
     *
     * @param {string} transactionHash Transaction hash
     */
    Search.prototype.getTransaction = function (transactionHash) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.request.get("/transactions/" + transactionHash)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [2 /*return*/, e_1.response];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get whoami
     *
     * @param {string} hash hash
     */
    Search.prototype.whoami = function (hash) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.request.get("/whoami/" + hash)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 2:
                        e_2 = _a.sent();
                        return [2 /*return*/, e_2.response];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get block
     *
     * @param {string} hashOrNumber hash or number
     */
    Search.prototype.getBlockByDltAndHash = function (dlt, hashOrNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.request.get("/chains/" + dlt + "/blocks/" + hashOrNumber)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 2:
                        e_3 = _a.sent();
                        return [2 /*return*/, e_3.response];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Search;
}());
exports["default"] = Search;
