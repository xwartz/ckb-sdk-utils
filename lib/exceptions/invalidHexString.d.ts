export declare class InvalidHexString extends Error {
    constructor(hex: string);
}
export declare class HexStringShouldStartWith0x extends Error {
    constructor(hex: string);
}
declare const _default: {
    InvalidHexString: typeof InvalidHexString;
    HexStringShouldStartWith0x: typeof HexStringShouldStartWith0x;
};
export default _default;
