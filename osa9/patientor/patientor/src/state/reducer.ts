import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: Entry;
    id: string;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: action.payload
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case 'ADD_ENTRY':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.id]: {
            ...state.patients[action.id],
            entries: [
              ...state.patients[action.id].entries,
              action.payload
            ]
          }
        }
      };
    default:
      return state;
  }
};


export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const setPatient = (patient: Patient): Action => {
  return {
    type: "SET_PATIENT",
    payload: patient
  };
};

export const setDiagnosisList = (diagnoses: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnoses
  };
};

export const addEntry = (newEntry: Entry, id: string): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: newEntry,
    id
  };
};
