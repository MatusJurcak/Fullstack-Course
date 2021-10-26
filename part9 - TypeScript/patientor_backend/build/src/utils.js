"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatient = void 0;
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
const isDate = (dateOfBirth) => {
    return Boolean(Date.parse(dateOfBirth));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};
const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }) => {
    const newEntry = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: []
    };
    return newEntry;
};
exports.toNewPatient = toNewPatient;
const parseDiagnosisCodes = (diagnosisCodes) => {
    if (!diagnosisCodes) {
        return undefined;
    }
    if (!Array(diagnosisCodes)) {
        throw new Error('Incorrect diagnosisCodes');
    }
    if (diagnosisCodes.find(a => !isString(a))) {
        throw new Error('Incorrect diagnosisCodes');
    }
    return diagnosisCodes;
};
const parseBaseEntry = ({ date, specialist, diagnosisCodes, description }) => {
    return {
        date: parseDate(date),
        specialist: parseName(specialist),
        description: parseName(description),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)
    };
};
const parseDischarge = (discharge) => {
    if (!discharge) {
        return undefined;
    }
    if (!discharge.date || !discharge.criteria || !isDate(discharge.date) || !isString(discharge.criteria)) {
        throw new Error('Incorrect discharge');
    }
    return discharge;
};
const isNumber = (value) => {
    return typeof value === 'number';
};
const parseHealthCheckRating = (value) => {
    if (!value || !isNumber(value)) {
        throw new Error('Incorrect or missing healthcheck rating');
    }
    return value;
};
const parseSickLeave = (value) => {
    if (!value) {
        return undefined;
    }
    if (!value.startDate || !value.endDate || !isDate(value.startDate) || !isDate(value.endDate)) {
        throw new Error('Incorrect or missing sickleave');
    }
    return value;
};
const toHospitalEntry = ({ date, specialist, diagnosisCodes, description, discharge }) => {
    return Object.assign(Object.assign({}, parseBaseEntry({ date, specialist, diagnosisCodes, description })), { type: 'Hospital', discharge: parseDischarge(discharge) });
};
const toHealthCheckEntry = ({ date, specialist, diagnosisCodes, description, healthCheckRating }) => {
    return Object.assign(Object.assign({}, parseBaseEntry({ date, specialist, diagnosisCodes, description })), { type: 'HealthCheck', healthCheckRating: parseHealthCheckRating(healthCheckRating) });
};
const toOccupationalHealthcareEntry = ({ date, specialist, diagnosisCodes, description, employerName, sickLeave }) => {
    return Object.assign(Object.assign({}, parseBaseEntry({ date, specialist, diagnosisCodes, description })), { type: 'OccupationalHealthcare', employerName: parseName(employerName), sickLeave: parseSickLeave(sickLeave) });
};
const toNewEntry = (body) => {
    const typeOfEntry = body.type;
    if (typeOfEntry === 'Hospital') {
        return toHospitalEntry(body);
    }
    else if (typeOfEntry === 'HealthCheck') {
        return toHealthCheckEntry(body);
    }
    else if (typeOfEntry === 'OccupationalHealthcare') {
        return toOccupationalHealthcareEntry(body);
    }
    throw new Error('wrong entry type');
};
exports.toNewEntry = toNewEntry;
