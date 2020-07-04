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
      type: "ADD_ENTRY";
      payload: {
        patientID: string;
        entryData: Entry;
      };
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
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
    case "ADD_ENTRY":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.patientID]: {
            ...state.patients[action.payload.patientID], 
            entries: [
              ...state.patients[action.payload.patientID].entries,
              action.payload.entryData
            ]
          }
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: action.payload.reduce(
          (acc, cur) => ({ ...acc, [cur.code]: cur }),
          {}
        )        
      };
    default:
      return state;
  }
};

export const setPatientListAction = (patientsData: Array<Patient>): Action => {
  return {
    type: "SET_PATIENT_LIST", 
    payload: patientsData 
  };
};

export const addPatientAction = (patientData: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patientData
  };
};

export const addEntryAction = (patientID: string, entryData: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    payload: { patientID, entryData }
  };
};

export const setDiagnosesAction = (diagnosesData: Array<Diagnosis>): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosesData
  };
};