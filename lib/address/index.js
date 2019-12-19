"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const exceptions_1 = require("../exceptions");
var AddressPrefix;
(function (AddressPrefix) {
    AddressPrefix["Mainnet"] = "ckb";
    AddressPrefix["Testnet"] = "ckt";
})(AddressPrefix = exports.AddressPrefix || (exports.AddressPrefix = {}));
var AddressType;
(function (AddressType) {
    AddressType["BinHash"] = "0x00";
    AddressType["HashIdx"] = "0x01";
    AddressType["DataCodeHash"] = "0x02";
    AddressType["TypeCodeHash"] = "0x04";
})(AddressType = exports.AddressType || (exports.AddressType = {}));
exports.defaultAddressOptions = {
    prefix: AddressPrefix.Testnet,
    type: AddressType.HashIdx,
    codeHashOrCodeHashIndex: '0x00',
};
exports.toAddressPayload = (args, type = AddressType.HashIdx, codeHashOrCodeHashIndex = '0x00') => {
    if (typeof args === 'string') {
        if (!args.startsWith('0x')) {
            throw new exceptions_1.HexStringShouldStartWith0x(args);
        }
        return new Uint8Array([...__1.hexToBytes(type), ...__1.hexToBytes(codeHashOrCodeHashIndex), ...__1.hexToBytes(args)]);
    }
    return new Uint8Array([...__1.hexToBytes(type), ...__1.hexToBytes(codeHashOrCodeHashIndex), ...args]);
};
exports.bech32Address = (arg, { prefix = AddressPrefix.Testnet, type = AddressType.HashIdx, codeHashOrCodeHashIndex = '0x00', } = exports.defaultAddressOptions) => __1.bech32.encode(prefix, __1.bech32.toWords(exports.toAddressPayload(arg, type, codeHashOrCodeHashIndex)));
exports.fullPayloadToAddress = ({ arg, prefix = AddressPrefix.Testnet, type = AddressType.DataCodeHash, codeHash, }) => exports.bech32Address(arg, {
    prefix,
    type,
    codeHashOrCodeHashIndex: codeHash,
});
exports.pubkeyToAddress = (pubkey, { prefix = AddressPrefix.Testnet, type = AddressType.HashIdx, codeHashOrCodeHashIndex = '0x00', } = exports.defaultAddressOptions) => {
    const publicKeyHash = __1.blake160(pubkey);
    return exports.bech32Address(publicKeyHash, {
        prefix,
        type,
        codeHashOrCodeHashIndex,
    });
};
exports.parseAddress = (address, encode = 'binary') => {
    const decoded = __1.bech32.decode(address);
    const data = __1.bech32.fromWords(new Uint8Array(decoded.words));
    return encode === 'binary' ? data : __1.bytesToHex(data);
};
//# sourceMappingURL=index.js.map