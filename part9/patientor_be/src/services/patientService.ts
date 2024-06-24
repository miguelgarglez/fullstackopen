import patientData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatientEntry, Entry, EntryWithoutId } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData;

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({ id, name, dateOfBirth, gender, occupation, entries }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addEntry = (entry: EntryWithoutId, patientId: string): Entry => {
  const NewEntry = {
    id: uuid(),
    ...entry
  };
  const patient = getPatient(patientId);

  patient!.entries.push(NewEntry);
  return NewEntry;

}

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  getPatient,
  addEntry
};