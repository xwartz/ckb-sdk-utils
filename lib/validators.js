"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("./exceptions");
const address_1 = require("./address");
exports.assertToBeHexString = (value) => {
    if (typeof value !== 'string' || !value.startsWith('0x') || Number.isNaN(+value)) {
        throw new exceptions_1.InvalidHexString(value);
    }
    return true;
};
exports.assertToBeHexStringOrBigint = (value) => {
    if (typeof value === 'bigint') {
        return true;
    }
    if (typeof value === 'string') {
        if (!value.startsWith('0x')) {
            throw new exceptions_1.HexStringShouldStartWith0x(value);
        }
        return true;
    }
    throw new TypeError(`${value} should be type of string or bigint`);
};
exports.assertToBeAddressPayload = (payload) => {
    if (!payload.startsWith('0x0100') || payload.length !== 46) {
        throw new exceptions_1.InvalidAddressPayload(payload);
    }
    return true;
};
exports.assertToBeAddress = (address) => {
    if (address.length !== 46) {
        throw new exceptions_1.InvalidAddress(address);
    }
    try {
        const payload = address_1.parseAddress(address, 'hex');
        exports.assertToBeAddressPayload(payload);
    }
    catch (err) {
        throw new exceptions_1.InvalidAddress(address);
    }
    return true;
};
exports.default = {
    assertToBeHexString: exports.assertToBeHexString,
    assertToBeHexStringOrBigint: exports.assertToBeHexStringOrBigint,
    assertToBeAddressPayload: exports.assertToBeAddressPayload,
    assertToBeAddress: exports.assertToBeAddress,
};
//# sourceMappingURL=validators.js.map