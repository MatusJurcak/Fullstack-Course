"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getEntries = () => {
    return patients_1.default;
};
const getPatient = (id) => {
    return patients_1.default.find(p => p.id === id);
};
const getNonSensitiveEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addPatient = (entry) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patients_1.default.push(newPatient);
    return newPatient;
};
const addEntry = (id, entry) => {
    const patient = patients_1.default.find(p => p.id === id);
    if (patient) {
        const newEntry = Object.assign(Object.assign({}, entry), { id: (0, uuid_1.v1)() });
        patient.entries = patient.entries.concat(newEntry);
    }
    return patient;
};
exports.default = {
    getEntries,
    getPatient,
    getNonSensitiveEntries,
    addPatient,
    addEntry
};
