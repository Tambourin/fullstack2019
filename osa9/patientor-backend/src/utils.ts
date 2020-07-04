/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, NewEntry, HealthCheckRating, Diagnose } from "./types";

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNumber = (value: any): value is number => {
    return typeof value === 'number';
};

const isDate = (text: any): boolean => {
    return Boolean(Date.parse(text));
};

const isGender = (text: any): text is Gender => {
    return Object.values(Gender).includes(text);
};

const isHealthCheckRating = (text: any): text is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(text);
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('Name not a String');
    }
    return name;
};

const parseOccupation = (occupation: any): string => {
    if(!occupation || !isString(occupation)) {
        throw new Error('Occupation not a string');
    }
    return occupation;
};

const parseSsn = (ssn: any): string => {
    if(!ssn || !isString(ssn)) {
        throw new Error('Ssn not a string');
    }
    return ssn;
};

const parseDate = (date: string): string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error('date not valid');
    }
    return date;
};

const parseGender = (gender: any): Gender => {
    if(!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('gender is not valid');
    }
    return gender;
};

export const toNewPatient = (object: any): NewPatient => {
    const newPatient: NewPatient = {
        name: parseName(object.name),
        ssn: parseSsn(object.ssn),
        occupation: parseOccupation(object.occupation),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        entries: []
    };
    return newPatient;
};

const parseDescription = (description: any): string => {
    if (!description || !isString(description)) {
        throw new Error('description not a String');
    }
    return description;
};

const parseSpecialist = (specialist: any): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('specialist not a String');
    }
    return specialist;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
    if(!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('healthCheckRating not valid');
    }
    return healthCheckRating;
};

const parseCriteria = (criteria: any): string => {
    if (!criteria || !isString(criteria)) {
        throw new Error('specialist not a String');
    }
    return criteria;
}

const parseEmployerName = (employerName: string): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error('employerName not a String');
    }
    return employerName;
};

const parsediagnosisCodes = (diagnosisCodes: any): Array<string> => {
    if (!Array.isArray(diagnosisCodes)) {
        throw new Error('diagnosisCodes not an array');
    }
    diagnosisCodes.forEach((code: any) => {
        if (!isString(code)) {
            throw new Error('diagnosis code not a String');
        }
    });
    return diagnosisCodes;
};

export const toNewEntry = (object: any): NewEntry  => {
    const baseEntry = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        ...(object.diagnosisCodes && {diagnosisCodes: parsediagnosisCodes(object.diagnosisCodes)})
    };
      
    switch (object.type) {
    case "HealthCheck":
        return {
            ...baseEntry,
            type: "HealthCheck",
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
        };
    case "Hospital":
        return {
            ...baseEntry,
            type: "Hospital",
            discharge: {
                date: object.discharge.date && parseDate(object.discharge.date),
                criteria: object.discharge.criteria && parseCriteria(object.discharge.criteria)
            }
        };
    case "OccupationalHealthcare":
        return {
            ...baseEntry,
            type: "OccupationalHealthcare",
            employerName: parseEmployerName(object.employerName),
            ...(object.sickLeave && object.sickLeave.startDate.length > 0 && {sickLeave: {
                startDate: parseDate(object.sickLeave.startDate),
                endDate: parseDate(object.sickLeave.endDate)
            }})
        };    
    default:
        throw new Error("Unhandled object: " + object);    
    }
};