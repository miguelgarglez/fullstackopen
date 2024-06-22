import diagnoseData from '../../data/diagnoses';
import { Diagnose } from '../types';

const diagnoses: Diagnose[] = diagnoseData;

const getEntries = (): Diagnose[] => {
  return diagnoses;
};

const addEntry = (newDiagnose: Diagnose) => {
  diagnoses.push(newDiagnose);
  return newDiagnose;
};

export default {
  getEntries,
  addEntry,
};