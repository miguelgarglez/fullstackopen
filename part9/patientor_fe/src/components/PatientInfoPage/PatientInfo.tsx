import { Patient, Entry, EntryFormValues } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import EntryTile from './PatientEntries';
import { Button } from '@mui/material';
import AddEntryModal from '../AddEntryModal';
import axios from 'axios';

const PatientInfo = ({
  patientId,
}: {
  patientId: string | undefined | null;
}) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    if (patientId) {
      patientService.getPatient(patientId).then((patient) => {
        setPatient(patient);
      });
    }
  }, [patientId]);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const entry = await patientService.addEntry(patientId!, values);
      patient?.entries.push(entry);
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  if (!patient) {
    return <h3>No patient info loaded</h3>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>{' '}
      {patient.gender === 'male' ? (
        <MaleIcon />
      ) : patient.gender === 'female' ? (
        <FemaleIcon />
      ) : (
        <TransgenderIcon />
      )}
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
      <EntryList entries={patient.entries} />
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
    </div>
  );
};

/*const EntryTile = ({ entry }: { entry: Entry }) => {
  const diagnoses = useSelector((state: RootState) => state.diagnoses);

  const getDiagnosisName = (code: string) => {
    const diagnosis = diagnoses.codes.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : 'unknown diagnosis code';
  };

  return (
    <div>
      <h4>{entry.date}</h4>
      <p>{entry.description}</p>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code: string) => (
            <li key={code}>
              {code} - {getDiagnosisName(code)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};*/

const EntryList = ({ entries }: { entries: Entry[] }) => {
  if (entries.length === 0) {
    return (
      <>
        <h2>entries</h2>
        <p>No entries yet</p>
      </>
    );
  }

  return (
    <div>
      <h2>entries</h2>
      {entries.map((entry) => (
        <EntryTile key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default PatientInfo;
