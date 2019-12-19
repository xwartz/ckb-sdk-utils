/// <reference types="@nervosnetwork/ckb-types" />
export declare enum AddressPrefix {
    Mainnet = "ckb",
    Testnet = "ckt"
}
export declare enum AddressType {
    BinHash = "0x00",
    HashIdx = "0x01",
    DataCodeHash = "0x02",
    TypeCodeHash = "0x04"
}
export declare type CodeHashIndex = '0x00' | string;
export interface AddressOptions {
    prefix: AddressPrefix;
    type: AddressType;
    codeHashOrCodeHashIndex: CodeHashIndex | CKBComponents.Hash256;
}
export declare const defaultAddressOptions: {
    prefix: AddressPrefix;
    type: AddressType;
    codeHashOrCodeHashIndex: string;
};
export declare const toAddressPayload: (args: string | Uint8Array, type?: AddressType, codeHashOrCodeHashIndex?: string) => Uint8Array;
export declare const bech32Address: (arg: string | Uint8Array, { prefix, type, codeHashOrCodeHashIndex, }?: AddressOptions) => string;
export declare const fullPayloadToAddress: ({ arg, prefix, type, codeHash, }: {
    arg: string;
    prefix: AddressPrefix;
    type: AddressType.DataCodeHash | AddressType.TypeCodeHash;
    codeHash: string;
}) => string;
export declare const pubkeyToAddress: (pubkey: string | Uint8Array, { prefix, type, codeHashOrCodeHashIndex, }?: AddressOptions) => string;
export declare interface ParseAddress {
    (address: string): Uint8Array;
    (address: string, encode: 'binary'): Uint8Array;
    (address: string, encode: 'hex'): string;
    (address: string, encode: 'binary' | 'hex'): Uint8Array | string;
}
export declare const parseAddress: ParseAddress;
