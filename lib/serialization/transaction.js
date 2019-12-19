"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const script_1 = require("./script");
const __1 = require("..");
const _1 = require(".");
exports.serializeVersion = (version) => __1.toHexInLittleEndian(version);
exports.serializeOutPoint = (outPoint) => {
    if (!outPoint)
        return '';
    const struct = new Map([['txHash', outPoint.txHash], ['index', __1.toHexInLittleEndian(outPoint.index)]]);
    return _1.serializeStruct(struct);
};
exports.serializeDepType = (type) => {
    if (type === 'code')
        return '0x00';
    if (type === 'depGroup')
        return '0x01';
    throw new TypeError("Dep type must be either of 'code' or 'depGroup'");
};
exports.serializeCellDep = (dep) => {
    const serializedOutPoint = exports.serializeOutPoint(dep.outPoint);
    const serializedDepType = exports.serializeDepType(dep.depType);
    const struct = new Map([['outPoint', serializedOutPoint], ['depType', serializedDepType]]);
    return _1.serializeStruct(struct);
};
exports.serializeCellDeps = (cellDeps) => {
    const serializedCellDepList = cellDeps.map(dep => exports.serializeCellDep(dep));
    return _1.serializeFixVec(serializedCellDepList);
};
exports.serializeHeaderDeps = (deps) => {
    const serializedHeaderDepList = deps.map(dep => _1.serializeArray(dep));
    return _1.serializeFixVec(serializedHeaderDepList);
};
exports.serializeInput = (input) => {
    const serializedOutPoint = exports.serializeOutPoint(input.previousOutput);
    const serializedSince = __1.toHexInLittleEndian(input.since, 8);
    const struct = new Map([['since', serializedSince], ['previousOutput', serializedOutPoint]]);
    return _1.serializeStruct(struct);
};
exports.serializeInputs = (inputs) => {
    const serializedInputList = inputs.map(input => exports.serializeInput(input));
    return _1.serializeFixVec(serializedInputList);
};
exports.serializeOutput = (output) => {
    const serializedCapacity = __1.toHexInLittleEndian(output.capacity, 8);
    const serializedLockScript = script_1.serializeScript(output.lock);
    const serialiedTypeScript = output.type ? script_1.serializeScript(output.type) : '';
    const table = new Map([
        ['capacity', serializedCapacity],
        ['lock', serializedLockScript],
        ['type', serialiedTypeScript],
    ]);
    return _1.serializeTable(table);
};
exports.serializeOutputs = (outputs) => {
    const serializedOutputList = outputs.map(output => exports.serializeOutput(output));
    return _1.serializeDynVec(serializedOutputList);
};
exports.serializeOutputsData = (outputsData) => {
    const serializedOutputsDatumList = outputsData.map(datum => _1.serializeFixVec(datum));
    return _1.serializeDynVec(serializedOutputsDatumList);
};
exports.serializeWitnessArgs = (witnessArgs) => {
    const [serializedLock, serializedInputType, serializedOutputType] = [
        witnessArgs.lock,
        witnessArgs.inputType,
        witnessArgs.outputType,
    ].map(args => {
        if (_1.serializeOption(args) === '0x') {
            return '0x';
        }
        return _1.serializeFixVec(args);
    });
    const table = new Map([
        ['lock', serializedLock],
        ['inputType', serializedInputType],
        ['outputType', serializedOutputType],
    ]);
    return _1.serializeTable(table);
};
exports.serializeWitnesses = (witnesses) => {
    const serializedWitnessList = witnesses.map(witness => _1.serializeFixVec(witness));
    return _1.serializeDynVec(serializedWitnessList);
};
exports.serializeRawTransaction = (rawTransaction) => {
    const serializedVersion = exports.serializeVersion(rawTransaction.version);
    const serializedCellDeps = exports.serializeCellDeps(rawTransaction.cellDeps);
    const serializedHeaderDeps = exports.serializeHeaderDeps(rawTransaction.headerDeps);
    const serializedInputs = exports.serializeInputs(rawTransaction.inputs);
    const serializedOutputs = exports.serializeOutputs(rawTransaction.outputs);
    const serializedOutputsData = exports.serializeOutputsData(rawTransaction.outputsData);
    const table = new Map([
        ['version', serializedVersion],
        ['cellDeps', serializedCellDeps],
        ['headerDeps', serializedHeaderDeps],
        ['inputs', serializedInputs],
        ['outputs', serializedOutputs],
        ['outputsData', serializedOutputsData],
    ]);
    return _1.serializeTable(table);
};
exports.serializeTransaction = (rawTransaction) => {
    const serializedRawTransaction = exports.serializeRawTransaction(rawTransaction);
    const serializedWitnesses = exports.serializeWitnesses(rawTransaction.witnesses || []);
    const table = new Map([['raw', serializedRawTransaction], ['witnesses', serializedWitnesses]]);
    return _1.serializeTable(table);
};
//# sourceMappingURL=transaction.js.map