import patientData from '../data/patients.json';

import { NonSensitivePatient } from '../types';

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

export default {
  getNSPatient
};