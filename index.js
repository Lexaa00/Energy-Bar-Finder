'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
process.stdin.resume();
process.stdin.setEncoding('utf-8');
var inputString = '';
var inputLines = [];
var currentLine = 0;
process.stdin.on('data', function (chunk) {
    inputString += chunk;
});
process.stdin.on('end', function () {
    inputLines = inputString.split('\n').map(function (s) { return s.replace(/\r$/, ''); });
    inputString = '';
    main();
});
function readLine() {
    return inputLines[currentLine++];
}
/*
  Junior style: jednostavno i čitko, sa puno any tipova i klasičnim for petljama.
  Vrati "brand:type" za čokoladu sa najviše energije po gramu iz zadate zemlje.
*/
function energyBar(country) {
    return __awaiter(this, void 0, void 0, function () {
        var q, baseUrl, firstResp, totalPages, all, i, p, url, resp, j, best, bestEnergy, bestAvgPrice, k, it, kcal, weights, w, prices, pp, sumW, t, avgW, energy, avgPrice, sumP, u, brand, type, candidate, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!country)
                        return [2 /*return*/, 'NONE'];
                    q = encodeURIComponent(country.trim());
                    baseUrl = 'https://jsonmock.hackerrank.com/api/chocolates?countryOfOrigin=' + q;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, axios_1.default.get(baseUrl)];
                case 2:
                    firstResp = _a.sent();
                    totalPages = (firstResp && firstResp.data && typeof firstResp.data.total_pages === 'number')
                        ? firstResp.data.total_pages
                        : 1;
                    all = [];
                    if (firstResp && firstResp.data && Array.isArray(firstResp.data.data)) {
                        for (i = 0; i < firstResp.data.data.length; i++) {
                            all.push(firstResp.data.data[i]);
                        }
                    }
                    p = 2;
                    _a.label = 3;
                case 3:
                    if (!(p <= totalPages)) return [3 /*break*/, 6];
                    url = baseUrl + '&page=' + p;
                    return [4 /*yield*/, axios_1.default.get(url)];
                case 4:
                    resp = _a.sent();
                    if (resp && resp.data && Array.isArray(resp.data.data)) {
                        for (j = 0; j < resp.data.data.length; j++) {
                            all.push(resp.data.data[j]);
                        }
                    }
                    _a.label = 5;
                case 5:
                    p++;
                    return [3 /*break*/, 3];
                case 6:
                    if (all.length === 0)
                        return [2 /*return*/, 'NONE'];
                    best = null;
                    bestEnergy = -Infinity;
                    bestAvgPrice = Infinity;
                    // iteriraj kroz sve cokolade
                    for (k = 0; k < all.length; k++) {
                        it = all[k];
                        kcal = null;
                        if (it && it.nutritionalInformation && typeof it.nutritionalInformation.kcal === 'number') {
                            kcal = it.nutritionalInformation.kcal;
                        }
                        weights = [];
                        if (Array.isArray(it.weights)) {
                            for (w = 0; w < it.weights.length; w++) {
                                if (typeof it.weights[w] === 'number') {
                                    weights.push(it.weights[w]);
                                }
                            }
                        }
                        prices = [];
                        if (Array.isArray(it.prices)) {
                            for (pp = 0; pp < it.prices.length; pp++) {
                                if (typeof it.prices[pp] === 'number') {
                                    prices.push(it.prices[pp]);
                                }
                            }
                        }
                        if (kcal === null || weights.length === 0) {
                            // ne mozemo za ovu stavku izracunati energiju
                            continue;
                        }
                        sumW = 0;
                        for (t = 0; t < weights.length; t++)
                            sumW += weights[t];
                        avgW = Math.floor(sumW / weights.length);
                        energy = Math.floor(kcal * 0.01 * avgW);
                        avgPrice = Infinity;
                        if (prices.length > 0) {
                            sumP = 0;
                            for (u = 0; u < prices.length; u++)
                                sumP += prices[u];
                            avgPrice = Math.floor(sumP / prices.length);
                        }
                        brand = (it.brand ? it.brand : '');
                        type = (it.type ? it.type : '');
                        candidate = brand + ':' + type;
                        // uporedivanje sa trenutnim najboljim
                        if (energy > bestEnergy) {
                            bestEnergy = energy;
                            bestAvgPrice = avgPrice;
                            best = candidate;
                        }
                        else if (energy === bestEnergy) {
                            if (avgPrice < bestAvgPrice) {
                                bestAvgPrice = avgPrice;
                                best = candidate;
                            }
                        }
                    }
                    return [2 /*return*/, best ? best : 'NONE'];
                case 7:
                    e_1 = _a.sent();
                    // ako nesto pukne, vrati NONE (jednostavno)
                    return [2 /*return*/, 'NONE'];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var country, ans;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    country = (readLine() || '').trim();
                    return [4 /*yield*/, energyBar(country)];
                case 1:
                    ans = _a.sent();
                    console.log(ans);
                    return [2 /*return*/];
            }
        });
    });
}
