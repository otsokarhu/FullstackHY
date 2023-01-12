/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from "react";
import axios from "axios";

import { NotInterested, Transgender as TransgenderIcon, Female as FemaleIcon, Male as MaleIcon } from "@mui/icons-material";
import { Patient, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { setPatient, useStateValue, setDiagnosisList } from "../state";
import EntryDetails from "./DiagnosisEntry";
import { Container, Button } from "@material-ui/core";
import { NoEntries } from "./styles";
import { green } from "@material-ui/core/colors";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const SinglePatientPage = () => {
  const [{ patient, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const addNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );

      if (id) {
        dispatch(setPatient(updatedPatient));
      }

      closeModal();
    } catch (e) {
      console.error(e.response.data);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setError(e.response.data.error);
    }
  };

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
        <div>
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={addNewEntry}
            error={error}
            onClose={closeModal}
          />
          <Button variant="contained" color="primary" onClick={() => openModal()}>
            Add new entry
          </Button>
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
      <div>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={addNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button variant="contained" color="primary" onClick={() => openModal()}>
          Add new entry
        </Button>
      </div>
    </div>
  );


};





export default SinglePatientPage;