import React from "react";
import { HospitalEntry } from "../types";
import { LocalHospital } from "@mui/icons-material";
import { Container } from '@mui/material';
import { ContStyle } from "./styles";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Hospital: React.FC<{ entry: HospitalEntry, diagnoses: any }> =
  ({ entry, diagnoses }) => {

    const getDiagnosisInfo = (code: string): string => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return diagnoses[code].name;
    };

    if (entry.diagnosisCodes) {
      return (
        <div>
          <Container style={ContStyle}>
            <div>
              <p style={{ textAlign: 'center' }}>
                {entry.date} <LocalHospital />
              </p>
              <p>
                <i>{entry.description}</i>
              </p>
              <p>
                {entry.specialist} made the following diagnose
              </p>
              <p>
                {entry.diagnosisCodes.map(code =>
                  <li key={code}>
                    {getDiagnosisInfo(code)}
                  </li>)}
              </p>
              <p>
                patient went home from hospital on {entry.discharge.date}
              </p>
              <p>
                because {entry.discharge.criteria}
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
              {entry.date} <LocalHospital />
            </p>
            <p>
              <i>{entry.description}</i>
            </p>
            <p>
              patient went home from hospital on {entry.discharge.date}
            </p>
            <p>
              because {entry.discharge.criteria}
            </p>
            <p>
              was taken care by {entry.specialist}
            </p>
          </div>
        </Container>
      </div>
    );

  };


export default Hospital;