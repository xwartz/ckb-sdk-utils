/// <reference types="node" />
import { ec as EC } from 'elliptic';
export interface Options {
    compressed?: boolean;
}
declare class ECPair {
    protected key: EC.KeyPair;
    compressed: boolean;
    constructor(sk: Uint8Array | string, { compressed }?: Options);
    get privateKey(): string;
    get publicKey(): string;
    getPrivateKey: (enc?: "hex") => string;
    getPublicKey: (enc: "hex" | "array") => string | number[];
    sign: (message: string | Uint8Array) => string;
    verify: (message: string | Buffer, sig: string | Buffer) => boolean;
    signRecoverable: (message: string | Uint8Array) => string;
}
export default ECPair;
