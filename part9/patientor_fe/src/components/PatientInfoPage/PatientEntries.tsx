import {
  Entry,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../../types';

const EntryTile = ({ entry }: { entry: Entry }) => {
  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntryTile entry={entry} />;
    case 'Hospital':
      return <HospitalEntryTile entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryTile entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const HealthCheckEntryTile = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <div>
      <h3>
        {entry.date} <span style={{ color: 'blue' }}>Health Check</span>
      </h3>
      <p>{entry.description}</p>
      <p>Specialist: {entry.specialist}</p>
      <p>Rating: {HealthCheckRating[entry.healthCheckRating]}</p>
    </div>
  );
};

const HospitalEntryTile = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div>
      <h3>
        {entry.date} <span style={{ color: 'red' }}>Hospital</span>
      </h3>
      <p>{entry.description}</p>
      <p>Specialist: {entry.specialist}</p>
      <p>
        Discharge: {entry.discharge.date} {entry.discharge.criteria}
      </p>
    </div>
  );
};

const OccupationalHealthcareEntryTile = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div>
      <h3>
        {entry.date}{' '}
        <span style={{ color: 'green' }}>Occupational Healthcare</span>
      </h3>
      <p>{entry.description}</p>
      <p>Specialist: {entry.specialist}</p>
      <p>Employer: {entry.employerName}</p>
      {entry.sickLeave && (
        <p>
          Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
        </p>
      )}
    </div>
  );
};

export default EntryTile;
