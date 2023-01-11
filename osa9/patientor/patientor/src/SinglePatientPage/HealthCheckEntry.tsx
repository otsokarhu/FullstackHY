import React from "react";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import { Favorite, MedicalServices } from "@mui/icons-material";
import { Container } from '@mui/material';
import { green, orange, red, yellow, grey } from '@mui/material/colors';
import { ContStyle } from "./styles";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HealthCheck: React.FC<{ entry: HealthCheckEntry, diagnoses: any }> =
  ({ entry, diagnoses }) => {
    const heartColor = (rating: HealthCheckRating) => {
      switch (rating) {
        case HealthCheckRating.Healthy:
          return green[500];
        case HealthCheckRating.LowRisk:
          return yellow[200];
        case HealthCheckRating.HighRisk:
          return orange[500];
        case HealthCheckRating.CriticalRisk:
          return grey[700];
        default:
          return red[500];
      }
    };
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
                {entry.date} <MedicalServices />
              </p>
              <p>
                <i>{entry.description}</i>
              </p>
              <p>
                <Favorite sx={{ color: heartColor(entry.healthCheckRating) }} />
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
              {entry.date} <MedicalServices />
            </p>
            <p>
              <i>{entry.description}</i>
            </p>
            <p>
              <Favorite sx={{ color: heartColor(entry.healthCheckRating) }} />
            </p>
            <p>
              Patient was taken care by {entry.specialist}
            </p>

          </div>
        </Container>
      </div>
    );


  };

export default HealthCheck;