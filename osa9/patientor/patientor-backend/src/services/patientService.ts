import patientData from '../data/patients.json';
import { v1 as uuid } from 'uuid';
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const new_id = uuid();

import { NonSensitivePatient, Patient, NewPatient } from '../types';

const patients: Array<NonSensitivePatient> = patientData;

const getNSPatient = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
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

export default {
  getNSPatient,
  addPatient
};