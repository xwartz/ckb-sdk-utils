/// <reference types="@nervosnetwork/ckb-types" />
import JSBI from 'jsbi';
import { AddressOptions } from './address';
import { serializeScript } from './serialization/script';
import { serializeRawTransaction, serializeTransaction, serializeWitnessArgs } from './serialization/transaction';
export * from './address';
export * from './serialization';
export { serializeScript, serializeRawTransaction, serializeTransaction, serializeWitnessArgs };
export declare const blake2b: typeof import("./crypto/blake2b").default, bech32: {
    decode: (encoded: string) => {
        prefix: string;
        words: number[];
    };
    encode: (prefix: string, words: Uint8Array) => string;
    toWords: (bytes: Uint8Array) => Uint8Array;
    fromWords: (words: Uint8Array) => Uint8Array;
}, blake160: import("./crypto/blake160").Blake160;
export declare const PERSONAL: any;
export { JSBI };
export declare const hexToBytes: (rawhex: string | number) => Uint8Array;
export declare const bytesToHex: (bytes: Uint8Array) => string;
export declare const bytesToUtf8: (bytes: Uint8Array) => any;
export declare const hexToUtf8: (hex: string) => any;
export declare const utf8ToBytes: (str: string) => any;
export declare const utf8ToHex: (str: string) => string;
export declare const scriptToHash: (script: CKBComponents.Script) => string;
export declare const rawTransactionToHash: (rawTransaction: Pick<CKBComponents.RawTransaction, "version" | "cellDeps" | "headerDeps" | "inputs" | "outputs" | "outputsData">) => string;
export declare const toHexInLittleEndian: (int: string | bigint, paddingBytes?: number) => string;
export declare const privateKeyToPublicKey: (privateKey: string) => string;
export declare const privateKeyToAddress: (privateKey: string, options: AddressOptions) => string;
export declare const calculateTransactionFee: (transactionSize: string | bigint, feeRate: string | bigint) => string;
export declare const calculateSerializedTxSizeInBlock: (transaction: Pick<CKBComponents.Transaction, "version" | "cellDeps" | "headerDeps" | "inputs" | "outputs" | "outputsData" | "witnesses">) => number;
export declare const parseEpoch: (epoch: string) => {
    length: string;
    index: string;
    number: string;
};
