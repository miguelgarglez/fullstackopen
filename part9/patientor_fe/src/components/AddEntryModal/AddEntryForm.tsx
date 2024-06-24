import { ReactNode, SyntheticEvent, useState } from 'react';
import { Diagnosis, EntryFormValues, HealthCheckRating } from '../../types';
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Chip,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [type, setType] = useState<
    'Hospital' | 'OccupationalHealthcare' | 'HealthCheck'
  >('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );
  const [discharge, setDischarge] = useState({ date: '', criteria: '' });
  const [employerName, setEmployerName] = useState('');
  const [sickLeave, setSickLeave] = useState({ startDate: '', endDate: '' });

  const diagnoses: Diagnosis[] = useSelector(
    (state: RootState) => state.diagnoses.codes
  );

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type,
      description,
      date,
      specialist,
      diagnosisCodes,
      healthCheckRating,
      discharge,
      employerName,
      sickLeave,
    });
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const type = event.target.value as
      | 'Hospital'
      | 'OccupationalHealthcare'
      | 'HealthCheck';
    setType(type);
  };

  const handleDiagnosisCodesChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const onHealthCheckRatingChange = (
    event: SelectChangeEvent<HealthCheckRating>
  ) => {
    event.preventDefault();
    if (typeof event.target.value === 'number') {
      const value = event.target.value;
      const healthCheckRating = Object.values(HealthCheckRating).find(
        (h) => h === value
      );
      if (healthCheckRating?.toString()) {
        setHealthCheckRating(healthCheckRating as HealthCheckRating);
      }
    }
  };

  const handleDischargeDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setDischarge({ ...discharge, date: event.target.value });
  };

  const handleDischargeCriteriaChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setDischarge({ ...discharge, criteria: event.target.value });
  };

  const handleChangeEmployerName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setEmployerName(event.target.value);
  };

  const handleSickLeaveStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setSickLeave({ ...sickLeave, startDate: event.target.value });
  };

  const handleSickLeaveEndDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setSickLeave({ ...sickLeave, endDate: event.target.value });
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputLabel>Type</InputLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="HealthCheck"
              name="radio-buttons-group"
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="HealthCheck"
                control={<Radio />}
                label="Health Check"
              />
              <FormControlLabel
                value="Hospital"
                control={<Radio />}
                label="Hospital"
              />
              <FormControlLabel
                value="OccupationalHealthcare"
                control={<Radio />}
                label="Occupational Healthcare"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              placeholder="Description"
              required
              onChange={({ target }) => setDescription(target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <InputLabel>Date</InputLabel>
            <TextField
              fullWidth
              type="date"
              placeholder="Date"
              required
              onChange={({ target }) => setDate(target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Specialist"
              fullWidth
              placeholder="Specialist"
              required
              onChange={({ target }) => setSpecialist(target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Diagnosis Codes</InputLabel>
            <Select
              fullWidth
              multiple
              value={diagnosisCodes}
              onChange={handleDiagnosisCodesChange}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              <MenuItem disabled value="">
                <em>Diagnosis Codes</em>
              </MenuItem>
              {diagnoses.map((diagnosis: Diagnosis) => (
                <MenuItem key={diagnosis.code} value={diagnosis.code}>
                  {diagnosis.code} - {diagnosis.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          {type === 'HealthCheck' && (
            <HealthCheckRatingFields
              onChange={onHealthCheckRatingChange}
              healthCheckRating={healthCheckRating}
            />
          )}
          {type === 'Hospital' && (
            <HospitalEntryFields
              onChangeDate={handleDischargeDateChange}
              onChangeCriteria={handleDischargeCriteriaChange}
            />
          )}
          {type === 'OccupationalHealthcare' && (
            <OccupationalHealthcareEntryFields
              onEmployerChange={handleChangeEmployerName}
              onStartDateChange={handleSickLeaveStartDateChange}
              onEndDateChange={handleSickLeaveEndDateChange}
            />
          )}
          <Grid item xs={6}>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: 'left' }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              style={{
                float: 'right',
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const HealthCheckRatingFields = ({
  onChange,
  healthCheckRating,
}: {
  onChange: (
    event: SelectChangeEvent<HealthCheckRating>,
    child: ReactNode
  ) => void;
  healthCheckRating: HealthCheckRating;
}) => {
  return (
    <Grid item xs={12}>
      <InputLabel>Health Check Rating</InputLabel>
      <Select
        label="Health Check Rating"
        fullWidth
        value={healthCheckRating}
        onChange={onChange}
      >
        <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
        <MenuItem value={HealthCheckRating.LowRisk}>Low Risk</MenuItem>
        <MenuItem value={HealthCheckRating.HighRisk}>High Risk</MenuItem>
        <MenuItem value={HealthCheckRating.CriticalRisk}>
          Critical Risk
        </MenuItem>
      </Select>
    </Grid>
  );
};

const HospitalEntryFields = ({
  onChangeDate,
  onChangeCriteria,
}: {
  onChangeDate: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCriteria: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <Grid item xs={12}>
        <InputLabel>Discharge Date</InputLabel>
        <TextField fullWidth type="date" required onChange={onChangeDate} />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Discharge Criteria"
          fullWidth
          placeholder="Discharge Criteria"
          required
          onChange={onChangeCriteria}
        />
      </Grid>
    </>
  );
};

const OccupationalHealthcareEntryFields = ({
  onEmployerChange,
  onStartDateChange,
  onEndDateChange,
}: {
  onEmployerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStartDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEndDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <Grid item xs={12}>
        <TextField
          label="Employer Name"
          fullWidth
          placeholder="Employer Name"
          required
          onChange={onEmployerChange}
        />
      </Grid>
      <Grid item xs={12}>
        <InputLabel>Sick Leave Start Date</InputLabel>
        <TextField fullWidth type="date" onChange={onStartDateChange} />
      </Grid>
      <Grid item xs={12}>
        <InputLabel>Sick Leave End Date</InputLabel>
        <TextField fullWidth type="date" onChange={onEndDateChange} />
      </Grid>
    </>
  );
};

export default AddEntryForm;
