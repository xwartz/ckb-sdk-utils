"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
exports.offsetSize = 4;
exports.fullLengthSize = 4;
exports.getOffsets = (elmLengths) => {
    const headerLength = exports.fullLengthSize + exports.offsetSize * elmLengths.length;
    const offsets = [headerLength];
    elmLengths.forEach((_, idx) => {
        if (idx) {
            offsets.push(offsets[offsets.length - 1] + elmLengths[idx - 1]);
        }
    });
    return offsets;
};
exports.serializeArray = (array) => {
    if (typeof array !== 'string' && !Array.isArray(array)) {
        throw new TypeError('The array to be serialized should by type of string or bytes');
    }
    const bytes = typeof array === 'string' ? __1.hexToBytes(array) : array;
    return __1.bytesToHex(bytes);
};
exports.serializeStruct = (struct) => {
    let res = '';
    struct.forEach(value => {
        res += exports.serializeArray(value).slice(2);
    });
    return `0x${res}`;
};
exports.serializeFixVec = (fixVec) => {
    if (typeof fixVec !== 'string' && !Array.isArray(fixVec)) {
        throw new TypeError('The fixed vector to be serialized should be a string or an array of bytes');
    }
    const vec = typeof fixVec === 'string' ? [...__1.hexToBytes(fixVec)].map(b => `0x${b.toString(16)}`) : fixVec;
    const serializedItemVec = vec.map(item => exports.serializeArray(item).slice(2));
    const header = __1.toHexInLittleEndian(`0x${serializedItemVec.length.toString(16)}`).slice(2);
    return `0x${header}${serializedItemVec.join('')}`;
};
exports.serializeDynVec = (dynVec) => {
    if (!Array.isArray(dynVec)) {
        throw new TypeError('The dynamic vector to be serialized should be an array of bytes');
    }
    const serializedItemVec = dynVec.map(item => exports.serializeArray(item).slice(2));
    const body = serializedItemVec.join('');
    let offsets = '';
    if (serializedItemVec.length) {
        offsets = exports.getOffsets(serializedItemVec.map(item => item.length / 2))
            .map(offset => __1.toHexInLittleEndian(`0x${offset.toString(16)}`).slice(2))
            .join('');
    }
    const headerLength = exports.fullLengthSize + exports.offsetSize * serializedItemVec.length;
    const fullLength = __1.toHexInLittleEndian(`0x${(headerLength + body.length / 2).toString(16)}`).slice(2);
    return `0x${fullLength}${offsets}${body}`;
};
exports.serializeTable = (table) => {
    const bodyElms = [];
    table.forEach(value => {
        bodyElms.push(exports.serializeArray(value).slice(2));
    });
    const body = bodyElms.join('');
    const headerLength = exports.fullLengthSize + exports.offsetSize * table.size;
    const fullLength = __1.toHexInLittleEndian(`0x${(headerLength + body.length / 2).toString(16)}`).slice(2);
    const offsets = exports.getOffsets(bodyElms.map(arg => arg.length / 2))
        .map(offset => __1.toHexInLittleEndian(`0x${offset.toString(16)}`).slice(2))
        .join('');
    return `0x${fullLength}${offsets}${body}`;
};
exports.serializeOption = (innerItem) => (!innerItem ? '0x' : innerItem);
//# sourceMappingURL=index.js.map