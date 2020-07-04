import React from "react";

interface OccupationalHealthcareEntryProps {
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

const OccupationalHealthcareEntry: React.FC<OccupationalHealthcareEntryProps> = ({ employerName, sickLeave }) => {
  return (
    <div>
      <p>Employer: {employerName}</p>
      {sickLeave 
        ? <p>sickleave: {sickLeave.startDate} - {sickLeave.endDate}</p> 
        : null}
    </div>
  );
};

export default OccupationalHealthcareEntry;