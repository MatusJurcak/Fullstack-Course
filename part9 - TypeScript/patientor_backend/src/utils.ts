import { NewPatient, Gender, NewEntry, NewHospitalEntry, NewOccupationalHealthCareEntry, NewHealthCheckEntry, NewBaseEntry, Diagnose, Discharge, SickLeave } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const isDate = (dateOfBirth: string): boolean => {
  return Boolean(Date.parse(dateOfBirth));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatient => {

  const newEntry: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: []
  };

  return newEntry;
};

interface BaseEntryFields { date: unknown, specialist: unknown, diagnosisCodes?: unknown, description: unknown }
interface HospitalEntryFields extends BaseEntryFields { discharge: unknown }
interface OccupationalHealthcareFields extends BaseEntryFields { employerName: unknown, sickLeave?: unknown }
interface HealthCheckFields extends BaseEntryFields { healthCheckRating: unknown }

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnose['code']> | undefined => {
  if (!diagnosisCodes) {
    return undefined;
  }

  if (!Array(diagnosisCodes)) {
    throw new Error('Incorrect diagnosisCodes');
  }

  if ((diagnosisCodes as Array<unknown>).find(a => !isString(a))) {
    throw new Error('Incorrect diagnosisCodes');
  }

  return diagnosisCodes as Array<Diagnose['code']>;
};

const parseBaseEntry = ({ date, specialist, diagnosisCodes, description }: BaseEntryFields): NewBaseEntry => {
  return {
    date: parseDate(date),
    specialist: parseName(specialist),
    description: parseName(description),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)
  }
}

const parseDischarge = (discharge: any): Discharge | undefined => {
  if (!discharge) {
    return undefined
  }
  if (!discharge.date || !discharge.criteria || !isDate(discharge.date) || !isString(discharge.criteria)) {
    throw new Error('Incorrect discharge');
  }
  return discharge as Discharge; 
}

const isNumber = (value: unknown): value is number => {
  return typeof value === 'number';
}

const parseHealthCheckRating = (value: unknown): number => {
  if(!value || !isNumber(value)){
    throw new Error('Incorrect or missing healthcheck rating');
  }

  return value;
}

const parseSickLeave = (value: any): SickLeave | undefined => {
  if(!value){
    return undefined;
  }
  if(!value.startDate || !value.endDate || !isDate(value.startDate) || !isDate(value.endDate)){
    throw new Error('Incorrect or missing sickleave')
  }
  
  return value as SickLeave
}

const toHospitalEntry = ({ date, specialist, diagnosisCodes, description, discharge }: HospitalEntryFields): NewHospitalEntry => {
  return {
    ...parseBaseEntry({ date, specialist, diagnosisCodes, description }),
    type: 'Hospital',
    discharge: parseDischarge(discharge)
  }
}

const toHealthCheckEntry = ({ date, specialist, diagnosisCodes, description, healthCheckRating }: HealthCheckFields): NewHealthCheckEntry => {
  return {
    ...parseBaseEntry({ date, specialist, diagnosisCodes, description }),
    type: 'HealthCheck',
    healthCheckRating: parseHealthCheckRating(healthCheckRating)
  }
}

const toOccupationalHealthcareEntry = ({ date, specialist, diagnosisCodes, description, employerName, sickLeave }: OccupationalHealthcareFields): NewOccupationalHealthCareEntry => {
  return {
    ...parseBaseEntry({ date, specialist, diagnosisCodes, description }),
    type: 'OccupationalHealthcare',
    employerName: parseName(employerName),
    sickLeave: parseSickLeave(sickLeave)
  }
}

export const toNewEntry = (body: any): NewEntry => {
  const typeOfEntry = body.type as string;
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
}