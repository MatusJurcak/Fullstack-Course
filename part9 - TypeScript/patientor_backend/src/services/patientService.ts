import patientsData from '../../data/patients';
import { Patient, NonSensitivePatientEntry, NewPatient, NewEntry } from '../types';
import { v1 as uuid } from 'uuid'


const getEntries = (): Patient[] => {
    return patientsData;
};

const getPatient = (id: string): Patient | undefined => {
    return patientsData.find(p => p.id === id);
}

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (entry: NewPatient): NonSensitivePatientEntry => {
    const newPatient = {
        id: uuid(),
        ...entry
    };
    patientsData.push(newPatient);
    return newPatient
};

const addEntry = (id: string, entry: NewEntry) => {
    const patient = patientsData.find(p => p.id === id);
    if(patient) {
        const newEntry = {
            ...entry,
            id: uuid()
        };

        patient.entries = patient.entries.concat(newEntry);
    }
    return patient;
}

export default {
    getEntries,
    getPatient  ,
    getNonSensitiveEntries,
    addPatient,
    addEntry
};
