import React from "react";
import { Entry } from "../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";

interface EntryDetailsProps {
  entry: Entry;
}

function assertNever(x: never): never {
  throw new Error("Unhandled object: " + x);
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry }) => {  
    switch (entry.type) {
      case "HealthCheck":
        return <HealthCheckEntry healthCheckRating={entry.healthCheckRating} />;
      case "Hospital":
        return <HospitalEntry discharge={entry.discharge} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntry 
        employerName={entry.employerName} 
        sickLeave={entry.sickLeave} />;
      default:
        assertNever(entry);       
    }
  
};

export default EntryDetails;