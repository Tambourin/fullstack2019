import React from "react";
import { Entry } from "../types";
import { Icon } from "semantic-ui-react";

interface EntryTypeIconProps {
  entry: Entry;
}

const EntryTypeIcon: React.FC<EntryTypeIconProps> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <Icon name="stethoscope" />;
    case "Hospital":
      return <Icon name="hospital" />;
    case "OccupationalHealthcare":
      return <Icon name="factory" />;
  }
};

export default EntryTypeIcon;