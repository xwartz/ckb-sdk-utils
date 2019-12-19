"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blake2b_1 = __importDefault(require("./blake2b"));
const index_1 = require("../index");
exports.blake160 = (data, encode = 'binary') => {
    const formattedData = typeof data === 'string' ? index_1.hexToBytes(data) : data;
    const s = blake2b_1.default(32, null, null, index_1.PERSONAL);
    s.update(formattedData);
    return s.digest(encode).slice(0, encode === 'binary' ? 20 : 40);
};
exports.default = exports.blake160;
//# sourceMappingURL=blake160.js.map