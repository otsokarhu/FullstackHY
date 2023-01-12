import patientDataNS from '../data/patients';
import patientData from '../data/patients';
import { v1 as uuid } from 'uuid';
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const new_id = uuid();

import { NonSensitivePatient, Patient, NewPatient, NewEntry, Entry } from '../types';

const nsPatients: Array<NonSensitivePatient> = patientDataNS;

const patients: Array<Patient> = patientData;

const getNSPatient = (): Array<NonSensitivePatient> => {
  return nsPatients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};



const findById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    id: new_id,
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, entry: NewEntry): Entry => {
  const newEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    id: new_id,
    ...entry
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getNSPatient,
  addPatient,
  findById,
  addEntry
};