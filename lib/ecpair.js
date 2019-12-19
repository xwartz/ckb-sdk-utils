"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elliptic_1 = require("elliptic");
const _1 = require(".");
const exceptions_1 = require("./exceptions");
const ec = new elliptic_1.ec('secp256k1');
class ECPair {
    constructor(sk, { compressed = true } = {
        compressed: true,
    }) {
        this.compressed = false;
        this.getPrivateKey = (enc = 'hex') => {
            if (enc === 'hex') {
                return this.privateKey;
            }
            return this.key.getPrivate(enc);
        };
        this.getPublicKey = (enc) => {
            if (enc === 'hex') {
                return this.publicKey;
            }
            return this.key.getPublic(this.compressed, enc);
        };
        this.sign = (message) => {
            const msg = typeof message === 'string' ? _1.hexToBytes(message) : message;
            return `0x${this.key
                .sign(msg, {
                canonical: true,
            })
                .toDER('hex')}`;
        };
        this.verify = (message, sig) => {
            const msg = typeof message === 'string' ? _1.hexToBytes(message) : message;
            const signature = typeof sig === 'string' ? _1.hexToBytes(sig) : sig;
            return this.key.verify(msg, signature);
        };
        this.signRecoverable = (message) => {
            const msg = typeof message === 'string' ? _1.hexToBytes(message) : message;
            const { r, s, recoveryParam } = this.key.sign(msg, {
                canonical: true,
            });
            if (recoveryParam === null)
                throw new Error('Fail to sign the message');
            const fmtR = r.toString(16).padStart(64, '0');
            const fmtS = s.toString(16).padStart(64, '0');
            return `0x${fmtR}${fmtS}0${recoveryParam}`;
        };
        if (sk === undefined)
            throw new exceptions_1.ArgumentRequired('Private key');
        if (typeof sk === 'string' && !sk.startsWith('0x')) {
            throw new exceptions_1.HexStringShouldStartWith0x(sk);
        }
        this.key = ec.keyFromPrivate(typeof sk === 'string' ? sk.replace(/^0x/, '') : sk);
        this.compressed = compressed;
    }
    get privateKey() {
        return `0x${this.key.getPrivate('hex')}`;
    }
    get publicKey() {
        return `0x${this.key.getPublic(this.compressed, 'hex')}`;
    }
}
exports.default = ECPair;
//# sourceMappingURL=ecpair.js.map