"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidAddressPayload extends Error {
    constructor(payload) {
        super(`${payload} is not a single-sig address payload`);
    }
}
exports.InvalidAddressPayload = InvalidAddressPayload;
class InvalidAddress extends Error {
    constructor(addr) {
        super(`${addr} is not a single-sig address`);
    }
}
exports.InvalidAddress = InvalidAddress;
exports.default = {
    InvalidAddressPayload,
    InvalidAddress,
};
//# sourceMappingURL=invalidAddress.js.map