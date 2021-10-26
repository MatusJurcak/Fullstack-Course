import express from 'express';
import patientService from '../services/patientService'
import { toNewEntry, toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
    const { id } = req.params
    res.send(patientService.getPatient(id));
})

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        
        const addedEntry = patientService.addPatient(newPatient);
        res.json(addedEntry);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        const { id } = req.params;
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientService.addEntry(id, newEntry);
        res.send(addedEntry);
    } catch (error: any) {
        res.status(400).send(error.message)
    }
})

export default router;