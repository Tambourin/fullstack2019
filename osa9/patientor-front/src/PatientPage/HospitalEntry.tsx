import React from "react";

interface HospitalEntryProps {
  discharge: {
    date: string;
    criteria: string;
  };
}

const HospitalEntry: React.FC<HospitalEntryProps> = ({ discharge }) => {
  return <p>{discharge.date} {discharge.criteria}</p>;
};

export default HospitalEntry;