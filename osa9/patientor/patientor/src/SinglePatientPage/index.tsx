/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from "react";
import axios from "axios";

import { NotInterested, Transgender as TransgenderIcon, Female as FemaleIcon, Male as MaleIcon } from "@mui/icons-material";
import { Patient, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { setPatient, useStateValue, setDiagnosisList } from "../state";
import EntryDetails from "./DiagnosisEntry";
import { Container } from "@material-ui/core";
import { NoEntries } from "./styles";
import { green } from "@material-ui/core/colors";

const SinglePatientPage = () => {
  const [{ patient, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {

    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDiagnosesList = async () => {
      try {
        const { data: diagnosesListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosisList(diagnosesListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    if (Object.keys(diagnoses).length === 0) {
      void fetchDiagnosesList();
    }

    if (patient === undefined || patient.id !== id) {
      void fetchPatient();
    }
  }, [dispatch]);




  let patientGender;

  switch (patient?.gender) {
    case "male":
      patientGender = <MaleIcon />;
      break;
    case "female":
      patientGender = <FemaleIcon />;
      break;
    case "other":
      patientGender = <TransgenderIcon />;
      break;
    default:
      break;
  }
  if (patient?.entries.length !== 0) {
    return (
      <div className="App">
        <h2><b>{patient?.name}</b> {patientGender} </h2>
        <div>ssn: {patient?.ssn}</div>
        <div>occupation: {patient?.occupation}</div>
        <div>
          <h3>
            Entries:
            {patient?.entries.map(entry => <div key={entry.id}> <EntryDetails entry={entry} diagnoses={diagnoses} /> </div>)}
          </h3>
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      <h2><b>{patient?.name}</b> {patientGender} </h2>
      <div>ssn: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
      <div>
        <h3>
          Entries:
          <Container style={NoEntries} >
            <div>
              <h2 style={{ textAlign: "center", fontFamily: "cursive" }}>
                <NotInterested sx={{ color: green[500] }} />
                No entries yet
                <NotInterested sx={{ color: green[500] }} />
              </h2>
            </div>
          </Container>
        </h3>
      </div>
    </div>
  );


};





export default SinglePatientPage;