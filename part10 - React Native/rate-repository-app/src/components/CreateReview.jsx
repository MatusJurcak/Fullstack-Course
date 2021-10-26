import React from 'react';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router';
import { useMutation } from '@apollo/client';
import Theme from '../theme';
import { CREATE_REVIEW } from '../graphql/mutations';


const styles = StyleSheet.create({
    basic: {
        backgroundColor: "white",
        padding: 20,
        flexDirection: "column",
        justifyContent: 'space-between'
    },
    button: {
        padding: 15,
        backgroundColor: Theme.colors.primary,
        borderRadius: 5,
        marginTop: 15
    },
    forms: {
        marginBottom: 15
    }
});

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: ''
};

const validationSchema = yup.object().shape({
    ownerName: yup.string().required('Repository owner name is required'),
    repositoryName: yup.string().required('Repository name is required'),
    rating: yup
        .number()
        .min(0, 'Rating must be greater or equal to 0')
        .max(100, 'Rating must be less or equal to 100')
        .required('Rating is required'),
    text: yup.string()
});


const CreateReviewForm = ({ onSubmit }) => {

    return (
        <View style={styles.basic}>
            <View style={styles.forms}>
                <FormikTextInput name="ownerName" placeholder="Repository owner name" />
            </View>
            <View style={styles.forms}>
                <FormikTextInput name="repositoryName" placeholder="Repository name" />
            </View>
            <View style={styles.forms}>
                <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
            </View>
            <View style={styles.forms} >
                <FormikTextInput name="text" placeholder="Review" />
            </View>
            <Pressable style={styles.button} onPress={onSubmit}>
                <Text style={{ color: "white", textAlign: 'center' }}>Create a review</Text>
            </Pressable>
        </View >
    );
};


const CreateReview = () => {
    const history = useHistory();
    const [mutate] = useMutation(CREATE_REVIEW, {
        onError(error) {
            throw new Error(error);
        }
    });

    const onSubmit = async values => {

        const review = {
            ...values,
            rating: parseInt(values.rating),
        };

        try {
            const { data } = await mutate({ variables: { review } });
            if (data && data.createReview) {
                history.push(`/repositories/${data.createReview.repositoryId}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
        </Formik>
    );
};


export default CreateReview;