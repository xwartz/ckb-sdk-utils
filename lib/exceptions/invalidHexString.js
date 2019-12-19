"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidHexString extends Error {
    constructor(hex) {
        super(`${hex} is an invalid hex string`);
    }
}
exports.InvalidHexString = InvalidHexString;
class HexStringShouldStartWith0x extends Error {
    constructor(hex) {
        super(`Hex string ${hex} should start with 0x`);
    }
}
exports.HexStringShouldStartWith0x = HexStringShouldStartWith0x;
exports.default = {
    InvalidHexString,
    HexStringShouldStartWith0x,
};
//# sourceMappingURL=invalidHexString.js.map