"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util = __importStar(require("util"));
const jsbi_1 = __importDefault(require("jsbi"));
exports.JSBI = jsbi_1.default;
const ecpair_1 = __importDefault(require("./ecpair"));
const address_1 = require("./address");
const validators_1 = require("./validators");
const exceptions_1 = require("./exceptions");
const crypto_1 = __importDefault(require("./crypto"));
const script_1 = require("./serialization/script");
exports.serializeScript = script_1.serializeScript;
const transaction_1 = require("./serialization/transaction");
exports.serializeRawTransaction = transaction_1.serializeRawTransaction;
exports.serializeTransaction = transaction_1.serializeTransaction;
exports.serializeWitnessArgs = transaction_1.serializeWitnessArgs;
__export(require("./address"));
__export(require("./serialization"));
exports.blake2b = crypto_1.default.blake2b, exports.bech32 = crypto_1.default.bech32, exports.blake160 = crypto_1.default.blake160;
const textEncoder = new (typeof TextEncoder !== 'undefined' ? TextEncoder : util.TextEncoder)();
const textDecoder = new (typeof TextDecoder !== 'undefined' ? TextDecoder : util.TextDecoder)();
exports.PERSONAL = textEncoder.encode('ckb-default-hash');
exports.hexToBytes = (rawhex) => {
    if (rawhex === '')
        return new Uint8Array();
    if (typeof rawhex === 'string' && !rawhex.startsWith('0x')) {
        throw new exceptions_1.HexStringShouldStartWith0x(rawhex);
    }
    let hex = rawhex.toString(16);
    hex = hex.replace(/^0x/i, '');
    hex = hex.length % 2 ? `0${hex}` : hex;
    const bytes = [];
    for (let c = 0; c < hex.length; c += 2) {
        bytes.push(parseInt(hex.substr(c, 2), 16));
    }
    return new Uint8Array(bytes);
};
exports.bytesToHex = (bytes) => {
    const hex = [];
    for (let i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xf).toString(16));
    }
    return `0x${hex.join('')}`;
};
exports.bytesToUtf8 = (bytes) => textDecoder.decode(bytes);
exports.hexToUtf8 = (hex) => exports.bytesToUtf8(exports.hexToBytes(hex));
exports.utf8ToBytes = (str) => textEncoder.encode(str);
exports.utf8ToHex = (str) => exports.bytesToHex(exports.utf8ToBytes(str));
exports.scriptToHash = (script) => {
    if (!script)
        throw new exceptions_1.ArgumentRequired('Script');
    const serializedScript = script_1.serializeScript(script);
    const s = exports.blake2b(32, null, null, exports.PERSONAL);
    s.update(exports.hexToBytes(serializedScript));
    const digest = s.digest('hex');
    return `0x${digest}`;
};
exports.rawTransactionToHash = (rawTransaction) => {
    if (!rawTransaction)
        throw new exceptions_1.ArgumentRequired('Raw transaction');
    const serializedRawTransaction = transaction_1.serializeRawTransaction(rawTransaction);
    const s = exports.blake2b(32, null, null, exports.PERSONAL);
    s.update(exports.hexToBytes(serializedRawTransaction));
    const digest = s.digest('hex');
    return `0x${digest}`;
};
const reverseString = (str) => str
    .split('')
    .reverse()
    .join('');
exports.toHexInLittleEndian = (int, paddingBytes = 4) => {
    validators_1.assertToBeHexStringOrBigint(int);
    const hex = jsbi_1.default.BigInt(`${int}`).toString(16);
    const reversedHex = reverseString(hex);
    const frags = reversedHex.match(/\w{1,2}/g) || [];
    const hexInLittleEndian = frags
        .map(frag => reverseString(frag.padEnd(2, '0')))
        .join('')
        .padEnd(paddingBytes * 2, '0');
    return `0x${hexInLittleEndian}`;
};
exports.privateKeyToPublicKey = (privateKey) => {
    const keyPair = new ecpair_1.default(privateKey);
    return keyPair.publicKey;
};
exports.privateKeyToAddress = (privateKey, options) => address_1.pubkeyToAddress(exports.privateKeyToPublicKey(privateKey), options);
exports.calculateTransactionFee = (transactionSize, feeRate) => {
    validators_1.assertToBeHexStringOrBigint(transactionSize);
    validators_1.assertToBeHexStringOrBigint(feeRate);
    const ratio = jsbi_1.default.BigInt(1000);
    const base = jsbi_1.default.multiply(jsbi_1.default.BigInt(`${transactionSize}`), jsbi_1.default.BigInt(`${feeRate}`));
    const fee = jsbi_1.default.divide(base, ratio);
    if (jsbi_1.default.lessThan(jsbi_1.default.multiply(fee, ratio), base)) {
        return `0x${jsbi_1.default.add(fee, jsbi_1.default.BigInt(1)).toString(16)}`;
    }
    return `0x${fee.toString(16)}`;
};
exports.calculateSerializedTxSizeInBlock = (transaction) => {
    const EXTRA_SIZE_IN_BLOCK = 4;
    const serializedTransaction = transaction_1.serializeTransaction(transaction);
    return serializedTransaction.slice(2).length / 2 + EXTRA_SIZE_IN_BLOCK;
};
exports.parseEpoch = (epoch) => ({
    length: `0x${jsbi_1.default.bitwiseAnd(jsbi_1.default.signedRightShift(jsbi_1.default.BigInt(epoch), jsbi_1.default.BigInt(40)), jsbi_1.default.BigInt(0xffff)).toString(16)}`,
    index: `0x${jsbi_1.default.bitwiseAnd(jsbi_1.default.signedRightShift(jsbi_1.default.BigInt(epoch), jsbi_1.default.BigInt(24)), jsbi_1.default.BigInt(0xffff)).toString(16)}`,
    number: `0x${jsbi_1.default.bitwiseAnd(jsbi_1.default.BigInt(epoch), jsbi_1.default.BigInt(0xffffff)).toString(16)}`,
});
//# sourceMappingURL=index.js.map