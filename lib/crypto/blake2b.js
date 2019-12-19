"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nanoassert_1 = __importDefault(require("nanoassert"));
function ADD64AA(v, a, b) {
    const o0 = v[a] + v[b];
    let o1 = v[a + 1] + v[b + 1];
    if (o0 >= 0x100000000) {
        o1++;
    }
    v[a] = o0;
    v[a + 1] = o1;
}
function ADD64AC(v, a, b0, b1) {
    let o0 = v[a] + b0;
    if (b0 < 0) {
        o0 += 0x100000000;
    }
    let o1 = v[a + 1] + b1;
    if (o0 >= 0x100000000) {
        o1++;
    }
    v[a] = o0;
    v[a + 1] = o1;
}
function B2B_GET32(arr, i) {
    return arr[i] ^ (arr[i + 1] << 8) ^ (arr[i + 2] << 16) ^ (arr[i + 3] << 24);
}
function B2B_G(a, b, c, d, ix, iy) {
    const x0 = m[ix];
    const x1 = m[ix + 1];
    const y0 = m[iy];
    const y1 = m[iy + 1];
    ADD64AA(v, a, b);
    ADD64AC(v, a, x0, x1);
    let xor0 = v[d] ^ v[a];
    let xor1 = v[d + 1] ^ v[a + 1];
    v[d] = xor1;
    v[d + 1] = xor0;
    ADD64AA(v, c, d);
    xor0 = v[b] ^ v[c];
    xor1 = v[b + 1] ^ v[c + 1];
    v[b] = (xor0 >>> 24) ^ (xor1 << 8);
    v[b + 1] = (xor1 >>> 24) ^ (xor0 << 8);
    ADD64AA(v, a, b);
    ADD64AC(v, a, y0, y1);
    xor0 = v[d] ^ v[a];
    xor1 = v[d + 1] ^ v[a + 1];
    v[d] = (xor0 >>> 16) ^ (xor1 << 16);
    v[d + 1] = (xor1 >>> 16) ^ (xor0 << 16);
    ADD64AA(v, c, d);
    xor0 = v[b] ^ v[c];
    xor1 = v[b + 1] ^ v[c + 1];
    v[b] = (xor1 >>> 31) ^ (xor0 << 1);
    v[b + 1] = (xor0 >>> 31) ^ (xor1 << 1);
}
const BLAKE2B_IV32 = new Uint32Array([
    0xf3bcc908,
    0x6a09e667,
    0x84caa73b,
    0xbb67ae85,
    0xfe94f82b,
    0x3c6ef372,
    0x5f1d36f1,
    0xa54ff53a,
    0xade682d1,
    0x510e527f,
    0x2b3e6c1f,
    0x9b05688c,
    0xfb41bd6b,
    0x1f83d9ab,
    0x137e2179,
    0x5be0cd19,
]);
const SIGMA8 = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    14,
    10,
    4,
    8,
    9,
    15,
    13,
    6,
    1,
    12,
    0,
    2,
    11,
    7,
    5,
    3,
    11,
    8,
    12,
    0,
    5,
    2,
    15,
    13,
    10,
    14,
    3,
    6,
    7,
    1,
    9,
    4,
    7,
    9,
    3,
    1,
    13,
    12,
    11,
    14,
    2,
    6,
    5,
    10,
    4,
    0,
    15,
    8,
    9,
    0,
    5,
    7,
    2,
    4,
    10,
    15,
    14,
    1,
    11,
    12,
    6,
    8,
    3,
    13,
    2,
    12,
    6,
    10,
    0,
    11,
    8,
    3,
    4,
    13,
    7,
    5,
    15,
    14,
    1,
    9,
    12,
    5,
    1,
    15,
    14,
    13,
    4,
    10,
    0,
    7,
    6,
    3,
    9,
    2,
    8,
    11,
    13,
    11,
    7,
    14,
    12,
    1,
    3,
    9,
    5,
    0,
    15,
    4,
    8,
    6,
    2,
    10,
    6,
    15,
    14,
    9,
    11,
    3,
    0,
    8,
    12,
    2,
    13,
    7,
    1,
    4,
    10,
    5,
    10,
    2,
    8,
    4,
    7,
    6,
    1,
    5,
    15,
    11,
    9,
    14,
    3,
    12,
    13,
    0,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    14,
    10,
    4,
    8,
    9,
    15,
    13,
    6,
    1,
    12,
    0,
    2,
    11,
    7,
    5,
    3,
];
const SIGMA82 = new Uint8Array(SIGMA8.map(function (x) {
    return x * 2;
}));
let v = new Uint32Array(32);
let m = new Uint32Array(32);
function blake2bCompress(ctx, last) {
    let i = 0;
    for (i = 0; i < 16; i++) {
        v[i] = ctx.h[i];
        v[i + 16] = BLAKE2B_IV32[i];
    }
    v[24] ^= ctx.t;
    v[25] ^= ctx.t / 0x100000000;
    if (last) {
        v[28] = ~v[28];
        v[29] = ~v[29];
    }
    for (i = 0; i < 32; i++) {
        m[i] = B2B_GET32(ctx.b, 4 * i);
    }
    for (i = 0; i < 12; i++) {
        B2B_G(0, 8, 16, 24, SIGMA82[i * 16 + 0], SIGMA82[i * 16 + 1]);
        B2B_G(2, 10, 18, 26, SIGMA82[i * 16 + 2], SIGMA82[i * 16 + 3]);
        B2B_G(4, 12, 20, 28, SIGMA82[i * 16 + 4], SIGMA82[i * 16 + 5]);
        B2B_G(6, 14, 22, 30, SIGMA82[i * 16 + 6], SIGMA82[i * 16 + 7]);
        B2B_G(0, 10, 20, 30, SIGMA82[i * 16 + 8], SIGMA82[i * 16 + 9]);
        B2B_G(2, 12, 22, 24, SIGMA82[i * 16 + 10], SIGMA82[i * 16 + 11]);
        B2B_G(4, 14, 16, 26, SIGMA82[i * 16 + 12], SIGMA82[i * 16 + 13]);
        B2B_G(6, 8, 18, 28, SIGMA82[i * 16 + 14], SIGMA82[i * 16 + 15]);
    }
    for (i = 0; i < 16; i++) {
        ctx.h[i] = ctx.h[i] ^ v[i] ^ v[i + 16];
    }
}
const parameter_block = new Uint8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
]);
function Blake2b(outlen, key, salt, personal) {
    parameter_block.fill(0);
    this.b = new Uint8Array(128);
    this.h = new Uint32Array(16);
    this.t = 0;
    this.c = 0;
    this.outlen = outlen;
    parameter_block[0] = outlen;
    if (key)
        parameter_block[1] = key.length;
    parameter_block[2] = 1;
    parameter_block[3] = 1;
    if (salt)
        parameter_block.set(salt, 32);
    if (personal)
        parameter_block.set(personal, 48);
    for (let i = 0; i < 16; i++) {
        this.h[i] = BLAKE2B_IV32[i] ^ B2B_GET32(parameter_block, i * 4);
    }
    if (key) {
        blake2bUpdate(this, key);
        this.c = 128;
    }
}
Blake2b.prototype.update = function (input) {
    nanoassert_1.default(input instanceof Uint8Array, 'input must be Uint8Array or Buffer');
    blake2bUpdate(this, input);
    return this;
};
Blake2b.prototype.digest = function (out) {
    const buf = !out || out === 'binary' || out === 'hex' ? new Uint8Array(this.outlen) : out;
    nanoassert_1.default(buf instanceof Uint8Array, 'out must be "binary", "hex", Uint8Array, or Buffer');
    nanoassert_1.default(buf.length >= this.outlen, 'out must have at least outlen bytes of space');
    blake2bFinal(this, buf);
    if (out === 'hex')
        return hexSlice(buf);
    return buf;
};
Blake2b.prototype.final = Blake2b.prototype.digest;
function blake2bUpdate(ctx, input) {
    for (let i = 0; i < input.length; i++) {
        if (ctx.c === 128) {
            ctx.t += ctx.c;
            blake2bCompress(ctx, false);
            ctx.c = 0;
        }
        ctx.b[ctx.c++] = input[i];
    }
}
function blake2bFinal(ctx, out) {
    ctx.t += ctx.c;
    while (ctx.c < 128) {
        ctx.b[ctx.c++] = 0;
    }
    blake2bCompress(ctx, true);
    for (let i = 0; i < ctx.outlen; i++) {
        out[i] = ctx.h[i >> 2] >> (8 * (i & 3));
    }
    return out;
}
function hexSlice(buf) {
    let str = '';
    for (let i = 0; i < buf.length; i++)
        str += toHex(buf[i]);
    return str;
}
function toHex(n) {
    if (n < 16)
        return `0${n.toString(16)}`;
    return n.toString(16);
}
const Proto = Blake2b;
function blake2b(outlen, key, salt, personal, noAssert) {
    if (noAssert !== true) {
        nanoassert_1.default(outlen >= BYTES_MIN, `outlen must be at least ${BYTES_MIN}, was given ${outlen}`);
        nanoassert_1.default(outlen <= BYTES_MAX, `outlen must be at most ${BYTES_MAX}, was given ${outlen}`);
        if (key != null) {
            nanoassert_1.default(key instanceof Uint8Array, 'key must be Uint8Array or Buffer');
            nanoassert_1.default(key.length >= KEYBYTES_MIN, `key must be at least ${KEYBYTES_MIN}, was given ${key.length}`);
            nanoassert_1.default(key.length <= KEYBYTES_MAX, `key must be at most ${KEYBYTES_MAX}, was given ${key.length}`);
        }
        if (salt != null) {
            nanoassert_1.default(salt instanceof Uint8Array, 'salt must be Uint8Array or Buffer');
            nanoassert_1.default(salt.length === SALTBYTES, `salt must be exactly ${SALTBYTES}, was given ${salt.length}`);
        }
        if (personal != null) {
            nanoassert_1.default(personal instanceof Uint8Array, 'personal must be Uint8Array or Buffer');
            nanoassert_1.default(personal.length === PERSONALBYTES, `personal must be exactly ${PERSONALBYTES}, was given ${personal.length}`);
        }
    }
    return new Proto(outlen, key, salt, personal);
}
let BYTES_MIN = 16;
let BYTES_MAX = 64;
let KEYBYTES_MIN = 16;
let KEYBYTES_MAX = 64;
let SALTBYTES = 16;
let PERSONALBYTES = 16;
exports.default = blake2b;
//# sourceMappingURL=blake2b.js.map