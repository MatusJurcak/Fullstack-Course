import React from 'react';
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient } from "../state";
import { Patient, Entry, EntryFormValues } from "../types";
import EntryView from './EntryView';
import AddEntryModal from './AddEntryModal';

const PatientDetails = ({ entries }: { entries: Entry[] }) => {
    if (!entries) {
        return null;
    }

    if (entries.length === 0) {
        return <h4 style={{ marginTop: 10 }}>No entries</h4>;
    }

    return (
        <div>
            <h4 style={{ marginTop: 10 }}>Entries</h4>
            {entries.map(entry => <EntryView key={entry.id} entry={entry} />)}
        </div>
    );
};


const PatientPage = () => {
    const { id } = useParams<{ id: string }>();

    const [{ patients }, dispatch] = useStateValue();

    const patient = patients[id];

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    useEffect(() => {
        const fetchPatientList = async () => {
            try {
                const { data: patientFromApi } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch(setPatient(patientFromApi));
            } catch (e) {
                console.error(e);
            }
        };

        if (!patient || !patient.ssn) {
            void fetchPatientList();
        }
    }, [id]);

    if (!patient) {
        return null;
    }

    const submitNewEntry = async (values: EntryFormValues) => {
        if (values.discharge && values.discharge.date.length === 0) {
            values.discharge = undefined;
        }

        if (values.sickLeave && values.sickLeave.startDate.length === 0) {
            values.sickLeave = undefined;
        }
        try {
            const { data: patient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            dispatch(setPatient(patient));
            closeModal();
        } catch (e: any) {
            console.error(e.response?.data || 'Unknown Error');
            setError(e.response?.data?.error || 'Unknown error');
        }
    };


    const genderIcon = patient.gender === 'female' ?
        'venus' : (patient.gender === 'male' ? 'mars' : 'genderless');

    return (
        <div>
            <h2>
                {patient.name}
                <Icon name={genderIcon} />
            </h2>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>

            <PatientDetails entries={patient.entries} />
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add new entry</Button>
        </div>
    );
};

export default PatientPage;