import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Patient, NewEntry, Entry } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, addPatientAction, addEntryAction } from '../state';
import { Icon, Button } from 'semantic-ui-react';
import EntryItem from './EntryItem';
import AddEntryModal from '../AddEntryModal/index';

const PatientPage: React.FC = () => {
  const [ state, dispatch ] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntryAction(id, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const { data: patientData } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        console.log(patientData);
        dispatch(addPatientAction(patientData));
      } catch (e) {
        console.error(e);
      }
    };
        
    if (state.patients[id] === undefined || state.patients[id].ssn === undefined) {
      fetchPatientData();          
    }    
  }, [id, dispatch, state.patients]);

  

  if (!state.patients[id]) {
    return (<p>No patient data</p>);
  }
  const patient: Patient = state.patients[id];  
  
  const mapEntries = () => {
    if (patient.entries && patient.entries.length > 0) {
      return (
        <div>
          <h3>Entries:</h3>
          {patient.entries.map(entry => <EntryItem key={entry.id} entry={entry} />)}
        </div>
      );
    }
  };
  console.log(error);
  
  return (
    <div>
      <h2>{patient.name}</h2>
      {patient.gender === "female" ? <Icon name="female" /> : <Icon name="male" /> }
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      {mapEntries()}
      <AddEntryModal modalOpen={modalOpen} onClose={closeModal} onSubmit={submitNewEntry} error={error} />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientPage;