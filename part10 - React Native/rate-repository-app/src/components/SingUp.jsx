import React from 'react';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router';
import Theme from '../theme';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

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
    field: {
        marginBottom: 15
    },
});

const initialValues = {
    username: '',
    password: '',
    confirmation: '',
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(1, 'Username must be at least 1 character long')
        .max(30, 'Username must be at most 30 characters long')
        .required('Username is required'),
    password: yup
        .string()
        .min(5, 'Password must be at least 5 character long')
        .max(50, 'Password must be at most 50 characters long')
        .required('Password is required'),
    confirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Password confirmation must be the same as password',)
        .required('Password confirmation is required')
});


const SignUpForm = ({ onSubmit }) => {

    return (
        <View style={styles.basic}>
            <View style={styles.field}>
                <FormikTextInput name="username" placeholder="Username" />
            </View>
            <View style={styles.field}>
                <FormikTextInput name="password" placeholder="Password" secureTextEntry />
            </View>
            <View style={styles.field}>
                <FormikTextInput name="confirmation" placeholder="Password confirmation" secureTextEntry />
            </View>
            <Pressable style={styles.button} onPress={onSubmit}>
                <Text style={{ color: "white", textAlign: 'center' }}>Sign up</Text>
            </Pressable>
        </View >
    );
};

const SignUp = () => {
    const [signIn] = useSignIn();
    const history = useHistory();
    const [mutate] = useMutation(CREATE_USER, {
        onError(error) {
            throw new Error(error);
        }
    });

    const onSubmit = async (values) => {
        const { username, password } = values;

        const user = {
            password,
            username
        };

        try {
            const { data } = await mutate({ variables: { user } });
            if (data && data.createUser) {
                await signIn({ username, password });
                history.push('/');
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
        </Formik>
    );
};


export default SignUp;