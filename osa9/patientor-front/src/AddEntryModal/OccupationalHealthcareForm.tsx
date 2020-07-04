import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { NewEntry } from '../types';
import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import FormButtons from './FormButtons';
import formValidator from '../utils/formValidator';

interface Props {
  initialValues: NewEntry;
  onSubmit: (values: NewEntry) => void;
  onClose: () => void;
}

const OccupationalHealthcareForm: React.FC<Props> = ({ initialValues, onSubmit, onClose }) => {
  const [state] = useStateValue();
  
  return (
  <Formik 
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={formValidator}
      >
      {
      ({ dirty, isValid, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui" >
            <Field
              label='description'
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label='specialist'
              placeholder="Testi Ukko"
              name="specialist"
              component={TextField}
            />            
            <Field
              label='diagnosisCodes'
              placeholder="0"
              name="diagnosisCodes"
              diagnoses={Object.values(state.diagnoses)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              component={DiagnosisSelection}
            />   
            <Field
              label='employerName'
              placeholder="Työntanja"
              name="employerName"
              component={TextField}
            />
            <Field
              label='sickLeave startDate'
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label='sickLeave endDate'
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
            <ErrorMessage name="sickLeave" />
            
            <FormButtons onClose={onClose} dirty={dirty} isValid={isValid} />   
          </Form>
        );
      }
      }
    </Formik>
  );
};

export default OccupationalHealthcareForm;