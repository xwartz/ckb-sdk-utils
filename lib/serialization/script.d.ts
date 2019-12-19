/// <reference types="@nervosnetwork/ckb-types" />
export declare const serializeCodeHash: (codeHash: string) => string;
export declare const serializeHashType: (hashType: CKBComponents.ScriptHashType) => "0x00" | "0x01";
export declare const serializeArgs: (args: string) => string;
export declare const serializeScript: (script: CKBComponents.Script) => string;
