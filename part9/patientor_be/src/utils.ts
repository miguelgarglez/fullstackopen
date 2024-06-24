import { NewPatientEntry, Gender, Entry, EntryWithoutId, HealthCheckRating, Discharge, SickLeave } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender)
  }
  return gender;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    
    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    
    return occupation;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !Array.isArray(entries)) {
    throw new Error('Incorrect or missing entries');
  }
  return entries;
}

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object)  {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries)
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] => {
  if (!diagnosisCodes || !Array.isArray(diagnosisCodes)) {
    throw new Error('Incorrect or missing diagnosis codes');
  }
  return diagnosisCodes;
}

const isHealthCheckRating = (param: number): boolean => {
  return Object.values(HealthCheckRating).includes(param);
}

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!healthCheckRating || !isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing health check rating');
  }
  return healthCheckRating as HealthCheckRating;;
}

const isDischarge = (param: unknown): param is Discharge => {
  if (!param || typeof param !== 'object') {
    return false;
  }
  const { date, criteria } = param as Discharge;
  return typeof date === 'string' && typeof criteria === 'string';
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge');
  }
  if ('date' in discharge && 'criteria' in discharge) {
    const { date, criteria } = discharge as Discharge;
    if (!date || !isString(date) || !criteria || !isString(criteria)) {
      throw new Error('Incorrect or missing discharge');
    }
    return discharge;
  }
  throw new Error('Incorrect or missing discharge');
}
  
const isSickLeave = (param: unknown): param is SickLeave => {
  if (!param || typeof param !== 'object') {
    return false;
  }
  const { startDate, endDate } = param as SickLeave;
  return typeof startDate === 'string' && typeof endDate === 'string';
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sick leave');
  }
  if ('startDate' in sickLeave && 'endDate' in sickLeave) {
    const { startDate, endDate } = sickLeave as SickLeave;
    if (!startDate || !isString(startDate) || !endDate || !isString(endDate)) {
      throw new Error('Incorrect or missing sick leave');
    }
    return sickLeave;
  }
  throw new Error('Incorrect or missing sick leave');
}

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object && 'type' in object) {
    switch (object.type) {
      case 'HealthCheck':
        if ('healthCheckRating' in object) {
          const newEntry: EntryWithoutId = {
            description: parseName(object.description),
            date: parseDate(object.date),
            specialist: parseName(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
            type: object.type,
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
          };
          return newEntry;
        }
        break;
      case 'Hospital':
        if ('discharge' in object) {
          const newEntry: EntryWithoutId = {
            description: parseName(object.description),
            date: parseDate(object.date),
            specialist: parseName(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
            type: object.type,
            discharge: parseDischarge(object.discharge)
          };
          return newEntry;
        }
        break;
      case 'OccupationalHealthcare':
        if ('employerName' in object && 'sickLeave' in object) {
          const newEntry: EntryWithoutId = {
            description: parseName(object.description),
            date: parseDate(object.date),
            specialist: parseName(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
            type: object.type,
            employerName: parseName(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave)
          };
          return newEntry;
        }
        break;
      default:
        throw new Error('Incorrect or missing type');
  }
}

  throw new Error('Incorrect data: some fields are missing');
};