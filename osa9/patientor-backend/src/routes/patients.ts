import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';
import { NewPatient, Patient, NewEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
    const patient: Patient | undefined = patientService.getOne(req.params.id);
    if (patient) {
        res.send(patient);       
    } else {
        res.status(404).send({ error: 'not found'});
    }
    
});

router.post('/', (req, res) => {
    try {
        const newPatient: NewPatient = toNewPatient(req.body);
        const patient = patientService.addPatient(newPatient);
        console.log('new patient');
        
        res.send(patient);    
    } catch (e) {
        res.status(400).send(e.message);
    }   
});

router.post('/:id/entries/', (req, res) => {
    try {
        console.log('new entry');
        const newEntry: NewEntry = toNewEntry(req.body);
        console.log(newEntry);
        
        const entry = patientService.addEntry(req.params.id, newEntry);
        if (entry) {
            return res.send(entry);
        } else {
            return res.status(404).send({ error: "Error adding new entry, false id" });
        }        
    } catch (e) {
        return res.status(400).send({ error: e.message });
    }
});

export default router;