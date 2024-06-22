import { Patient, Entry } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import EntryTile from './PatientEntries';

const PatientInfo = ({
  patientId,
}: {
  patientId: string | undefined | null;
}) => {
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (patientId) {
      patientService.getPatient(patientId).then((patient) => {
        setPatient(patient);
      });
    }
  }, [patientId]);

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
      <EntryList entries={patient.entries} />
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
