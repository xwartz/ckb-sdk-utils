export declare class InvalidAddressPayload extends Error {
    constructor(payload: string);
}
export declare class InvalidAddress extends Error {
    constructor(addr: string);
}
declare const _default: {
    InvalidAddressPayload: typeof InvalidAddressPayload;
    InvalidAddress: typeof InvalidAddress;
};
export default _default;
