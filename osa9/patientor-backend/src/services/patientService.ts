import patientData from '../../data/patients';
import { v4 as uuid } from 'uuid';
import { Patient, NewPatient, PublicPatient, NewEntry, Entry } from '../types';

const patients: PublicPatient[] = patientData.map(p => ({ ...p}));
const patientsFull: Patient[] = patientData.map(p => ({ ...p}));

const getEntries = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ 
        id, name, dateOfBirth, gender, occupation }));
};

const getOne = (id: string): Patient | undefined => {    
    return patientsFull.find(patient => patient.id === id);
};

const addPatient = (newPatient: NewPatient): Patient => {
    const patient: Patient = { id: uuid(), ...newPatient }; 
    patients.push(patient);
    return patient;
};

const addEntry = (patientId: string, newEntry: NewEntry): Entry | undefined => {
    const patient: Patient | undefined = getOne(patientId);
    const entry: Entry = { id: uuid(), ...newEntry };
    if(patient) {
        patient.entries.push(entry);
        return entry;
    } else {
        return undefined;
    }
};

export default { getEntries, addEntry, addPatient, getOne };