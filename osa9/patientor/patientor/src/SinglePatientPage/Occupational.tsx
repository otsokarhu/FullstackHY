import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { HomeRepairService } from "@mui/icons-material";
import { Container } from '@mui/material';
import { ContStyle } from "./styles";




// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Occupational: React.FC<{ entry: OccupationalHealthcareEntry, diagnoses: any }>
  = ({ entry, diagnoses }) => {
    const getDiagnosisInfo = (code: string): string => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return diagnoses[code].name;
    };
    if (!entry.sickLeave) {
      return (
        <div>
          <Container style={ContStyle}>
            <div>
              <p style={{ textAlign: 'center' }}>
                {entry.date} <HomeRepairService /> {entry.employerName}
              </p>
              <p>
                <i>{entry.description}</i>
              </p>
              <p>
                {entry.specialist} made the following diagnose
              </p>
              <p>
                {entry.diagnosisCodes &&
                  entry.diagnosisCodes.map(code =>
                    <li key={code}>
                      {getDiagnosisInfo(code)}
                    </li>
                  )}
              </p>
            </div>
          </Container>
        </div>
      );
    }
    return (
      <div>
        <Container style={ContStyle}>
          <div>
            <p style={{ textAlign: 'center' }}>
              {entry.date} <HomeRepairService /> {entry.employerName}
            </p>
            <p>
              <i>{entry.description}</i>
            </p>
            <p>
              got sickleave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
            </p>
            <p>
              {entry.specialist} made the following diagnose
            </p>
            <p>
              {entry.diagnosisCodes &&
                entry.diagnosisCodes.map(code =>
                  <li key={code}>
                    {getDiagnosisInfo(code)}
                  </li>
                )}
            </p>
          </div>
        </Container>
      </div>
    );
  };


export default Occupational;


