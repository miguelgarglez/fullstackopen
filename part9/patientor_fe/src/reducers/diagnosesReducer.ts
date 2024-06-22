import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Diagnosis } from '../types';
import diagnosesService from '../services/diagnoses';
import { AppDispatch } from '../store';

export interface DiagnosisCodesState {
  codes: Diagnosis[];
}

const initialState: DiagnosisCodesState = {
  codes: [],
};

const diagnosisCodesSlice = createSlice({
  name: 'diagnosisCodes',
  initialState,
  reducers: {
    setDiagnosis(state, action: PayloadAction<Diagnosis[]>) {
      state.codes = action.payload;
    },
  },
});

export const { setDiagnosis } = diagnosisCodesSlice.actions;

export const initializeDiagnoses = () => {
  return async (dispatch: AppDispatch) => {
    const diagnoses = await diagnosesService.getAll();
    dispatch(setDiagnosis(diagnoses));
  };
};

export default diagnosisCodesSlice.reducer;