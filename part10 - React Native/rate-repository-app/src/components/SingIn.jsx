import React from 'react';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router';
import Theme from '../theme';

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
};

const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
});


const SignInForm = ({ onSubmit }) => {

    return (
        <View style={styles.basic}>
            <View style={styles.field}>
                <FormikTextInput name="username" placeholder="Username" testID="username" />
            </View>
            <View style={styles.field}>
                <FormikTextInput name="password" placeholder="Password" secureTextEntry testID="password" />
            </View>
            <Pressable testID="button" style={styles.button} onPress={onSubmit}>
                <Text style={{ color: "white", textAlign: 'center' }}>Sign in</Text>
            </Pressable>
        </View >
    );
};

export const SignInContainer = ({ onSubmit }) => {
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

const SignIn = () => {
    const [signIn] = useSignIn();
    const history = useHistory();

    const onSubmit = async values => {
        const { username, password } = values;
        try {
            await signIn({ username, password });
            history.push('/');
        } catch (e) {
            console.log(e);
        }
    };

    return <SignInContainer onSubmit={onSubmit} />;
};


export default SignIn;