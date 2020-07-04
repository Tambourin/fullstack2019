import React from 'react';
import { TypeSelection } from '../AddPatientModal/FormField';
import { NewEntry, EntryType } from '../types';
import HealthCheckForm from './HealthCheckForm';
import HospitalForm from './HospitalForm';
import OccupationalHealthcareForm from './OccupationalHealthcareForm';

const prepareInitialValues = (type: EntryType): NewEntry => {
  const baseEntry = {
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
  };
  switch (type) {
    case "HealthCheck":
      return (
        {
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating: 0
        }
      );
    case "Hospital":
      return (
        {
          ...baseEntry,
          type: "Hospital",
          discharge: {
            date: "",
            criteria: ""
          }
        }
      );
    case "OccupationalHealthcare":
      return (
        {
          ...baseEntry,
          type: "OccupationalHealthcare",
          employerName: "",
          sickLeave: {
            startDate: "",
            endDate: ""
          }
        }
      );  
  }  
};

interface Props {
  onSubmit: (values: NewEntry) => void;
  onClose: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onClose }) => {
  
  const [selectedType, setSelectedType] = React.useState<EntryType>("Hospital");

  const selectForm = () => {
    switch (selectedType) {
      case "HealthCheck":
        return <HealthCheckForm 
          onClose={onClose}
          onSubmit={onSubmit}
          initialValues={prepareInitialValues(selectedType)}
        />;
      case "Hospital":
        return <HospitalForm 
          onClose={onClose}
          onSubmit={onSubmit}
          initialValues={prepareInitialValues(selectedType)}
        />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareForm 
          onClose={onClose}
          onSubmit={onSubmit}
          initialValues={prepareInitialValues(selectedType)}
        />;    
    }
  };

  return (
    <div>
      <TypeSelection 
        entryTypes={[ "HealthCheck", "Hospital", "OccupationalHealthcare" ]}
        setSelectedType={setSelectedType}
        selectedType={selectedType}
      />
      {selectForm()}
    </div>
  );
};

export default AddEntryForm;