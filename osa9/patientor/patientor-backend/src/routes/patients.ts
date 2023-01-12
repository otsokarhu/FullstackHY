/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import utils from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNSPatient());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});



router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = utils.toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});


router.post('/:id/entries', (req, res) => {
  try {
    const patient = patientService.findById(req.params.id);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = utils.toNewEntry(req.body);

    if (patient && newEntry) {
      const entryAddedPatient = patientService.addEntry(patient, newEntry);
      res.status(201).send(entryAddedPatient);
    }
  } catch (e: unknown) {
    let errorMessage = 'Something went wrong when adding entry';
    if (e instanceof Error) {
      errorMessage += 'Error' + e.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;