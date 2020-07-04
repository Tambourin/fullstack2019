import React from "react";
import { Entry } from "../types";
import { useStateValue } from "../state";
import EntryDetails from "./EntryDetails";
import EntryTypeIcon from "./EntryTypeIcon";

interface EntryProps {
  entry: Entry;
}

const EntryItem: React.FC<EntryProps> = ({ entry }: EntryProps) => {
  const [ state ] = useStateValue();
  
  const mapCodes = () => {
    return (
      <div>
        <h4>Diagnosis codes: </h4>
        <ul>
          {entry.diagnosisCodes?.map(
            code => <li key={code}>{code}: {state.diagnoses[code]?.name}</li>
          )}
        </ul>
      </div>      
    );
  };

  return (
    <div style={{ borderStyle: "solid", padding: "1em", marginBottom: "1em" }}>
      <EntryTypeIcon entry={entry} />
      <p>date: {entry.date}</p>
      <p>description: {entry.description}</p>
      <EntryDetails entry={entry} />      
      {entry.diagnosisCodes ? mapCodes() : null}
    </div>
  );
};

export default EntryItem;