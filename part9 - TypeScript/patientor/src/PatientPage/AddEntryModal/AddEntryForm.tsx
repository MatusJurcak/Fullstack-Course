import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection, TypeSelectField, NumberField } from "../../components/FormField";
import { EntryFormValues, TypeOption } from "../../types";
import { useStateValue } from "../../state";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type PatientFormValues = Omit<EntryFormValues, "id">;

interface Props {
    onSubmit: (values: PatientFormValues) => void;
    onCancel: () => void;
}

const typeOptions: TypeOption[] = [
    { value: "HealthCheck", label: "HealthCheck" },
    { value: "Hospital", label: "Hospital" },
    { value: "OccupationalHealthcare", label: "OccupationalHealthcare" }
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();
    const today = new Date();

    const style = { padding: 5, borderStyle: 'solid', borderWidth: 'thin', borderRadius: 10, marginBottom: 10, borderColor: '#DCDCDC' };

    const isDate = (date: string): boolean => {
        if (date.length === 0) {
            return true;
        }
        return Boolean(Date.parse(date));
    };

    return (
        <Formik
            initialValues={{
                type: 'HealthCheck',
                description: '',
                date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
                diagnosisCodes: [],
                specialist: '',
                sickLeave: {
                    startDate: '',
                    endDate: ''
                },
                healthCheckRating: 0,
                discharge: {
                    date: '',
                    criteria: ''
                },
                employerName: ''
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (values.date && !isDate(values.date)) {
                    errors.date = "Wrong date";
                }
                if (!values.description) {
                    errors.description = requiredError;
                }
                if(!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.type) {
                    errors.type = requiredError;
                }
                if (values.type === "HealthCheck") {
                    if (!values.healthCheckRating) {
                        errors.healthCheckRating = requiredError;
                    }
                    if (![1, 2, 3, 4].includes(values.healthCheckRating as number)) {
                        errors.healthCheckRating = "value must be 1-4";
                    }

                }
                if (values.type === "OccupationalHealthcare") {
                    if (values.sickLeave && (!isDate(values.sickLeave.endDate) || !isDate(values.sickLeave.startDate))) {
                        errors.sickLeave = "Wrong date";
                    }
                    if (!values.employerName) {
                        errors.employerName = requiredError;
                    }
                }
                if (values.type === "Hospital") {
                    if (values.discharge && !isDate(values.discharge.date)) {
                        errors.discharge = "Wrong date";
                    }
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched, values, }) => {
                return (
                    <Form className="form ui">
                        <TypeSelectField
                            label="Type"
                            name="type"
                            options={typeOptions}
                        />
                        <Field
                            label="date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        {values.type === "HealthCheck" &&
                            <>
                                <Field
                                    label="rating"
                                    name="healthCheckRating"
                                    min={0}
                                    max={5}
                                    component={NumberField}
                                />
                            </>
                        }
                        {values.type === "OccupationalHealthcare" &&
                            <>
                                <Field
                                    label="employer name"
                                    placeholder="employer name"
                                    name="employerName"
                                    component={TextField}
                                />
                                <div style={style}>
                                    <h4>sick leave</h4>
                                    <Field
                                        label="starts"
                                        placeholder="start date (YYYY-MM-DD)"
                                        name="sickLeave.startDate"
                                        component={TextField}
                                    />
                                    <Field
                                        label="ends"
                                        placeholder="end date (YYYY-MM-DD)"
                                        name="sickLeave.endDate"
                                        component={TextField}
                                    />
                                </div>
                            </>
                        }
                        {values.type === "Hospital" &&
                            <>
                                <div style={style}>
                                    <h4>discharge</h4>
                                    <Field
                                        label="criteria"
                                        placeholder="Criteria"
                                        name="discharge.criteria"
                                        component={TextField}
                                    />
                                    <Field
                                        label="date"
                                        placeholder="YYYY-MM-DD"
                                        name="discharge.date"
                                        component={TextField}
                                    />
                                </div>
                            </>
                        }
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;
