import React from "react";
import axios from "axios";

import { Transgender as TransgenderIcon, Female as FemaleIcon, Male as MaleIcon } from "@mui/icons-material";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { setPatient, useStateValue } from "../state";

const SinglePatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    if (patient === undefined || patient.id !== id) {
      const fetchPatient = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(setPatient(patientFromApi));
        } catch (e) {
          console.error(e);
        }
      };
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

  return (
    <div className="App">
      <h2><b>{patient?.name}</b> {patientGender} </h2>
      <div>ssn: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
    </div>
  );


};





export default SinglePatientPage;