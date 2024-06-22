import { useState, useEffect } from 'react';
import axios from 'axios';
import { useMatch } from 'react-router-dom';
import { Route, Link, Routes } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';

import { useDispatch } from 'react-redux';

import { apiBaseUrl } from './constants';
import { Patient } from './types';

import { initializeDiagnoses } from './reducers/diagnosesReducer';
import patientService from './services/patients';
import PatientListPage from './components/PatientListPage';
import PatientInfo from './components/PatientInfoPage/PatientInfo';
import { AppDispatch } from './store';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeDiagnoses());
  }, [dispatch]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  const match = useMatch('/patients/:id');

  const patientById = match
    ? patients.find((patient) => patient.id === match.params.id)
    : null;
  const patientId = patientById ? patientById.id : null;

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
          <Route
            path="/patients/:id"
            element={<PatientInfo patientId={patientId} />}
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
