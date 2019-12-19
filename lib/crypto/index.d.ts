import blake2b from './blake2b';
declare const _default: {
    blake2b: typeof blake2b;
    blake160: import("./blake160").Blake160;
    bech32: {
        decode: (encoded: string) => {
            prefix: string;
            words: number[];
        };
        encode: (prefix: string, words: Uint8Array) => string;
        toWords: (bytes: Uint8Array) => Uint8Array;
        fromWords: (words: Uint8Array) => Uint8Array;
    };
};
export default _default;
