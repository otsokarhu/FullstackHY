import React from "react";
import { Entry } from "../types";
import HealthCheck from "./HealthCheckEntry";
import Occupational from "./Occupational";
import Hospital from "./Hospital";


const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EntryDetails: React.FC<{ entry: Entry, diagnoses: any }> = ({ entry, diagnoses }) => {
  switch (entry.type) {
    case "HealthCheck":
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return <HealthCheck entry={entry} diagnoses={diagnoses} />;
    case "Hospital":
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return <Hospital entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return <Occupational entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;