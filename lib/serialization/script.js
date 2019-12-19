"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const exceptions_1 = require("../exceptions");
exports.serializeCodeHash = (codeHash) => _1.serializeArray(codeHash);
exports.serializeHashType = (hashType) => {
    if (hashType === 'data')
        return '0x00';
    if (hashType === 'type')
        return '0x01';
    throw new TypeError("Hash type must be either of 'data' or 'type'");
};
exports.serializeArgs = (args) => _1.serializeFixVec(args);
exports.serializeScript = (script) => {
    if (!script)
        throw new exceptions_1.ArgumentRequired('Script');
    const { codeHash = '', hashType, args = '' } = script;
    const serializedCodeHash = exports.serializeCodeHash(codeHash);
    const serializedHashType = exports.serializeHashType(hashType);
    const serializedArgs = exports.serializeArgs(args);
    const table = new Map([['codeHash', serializedCodeHash], ['hashType', serializedHashType], ['args', serializedArgs]]);
    return _1.serializeTable(table);
};
//# sourceMappingURL=script.js.map