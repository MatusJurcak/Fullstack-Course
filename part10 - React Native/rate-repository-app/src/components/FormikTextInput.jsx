import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';
import TextInput from './TextInput';
import Text from './Text';
import Theme from '../theme';

const styles = StyleSheet.create({
    errorText: {
        marginTop: 5,
        color: "#d73a4a"
    },
    secure: {
        padding: 15,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: Theme.colors.textSecondary,
        borderRadius: 5,
    },
    error: {
        padding: 15,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: "#d73a4a",
        borderRadius: 5,
    }
});

const FormikTextInput = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;
    
    return (
        <>
            <TextInput
                style={!showError ? styles.secure : styles.error}
                onChangeText={value => helpers.setValue(value)}
                onBlur={() => helpers.setTouched(true)}
                value={field.value}
                error={showError}
                {...props}
            />
            {showError && <Text style={styles.errorText}>{meta.error}</Text>}
        </>
    );
};

export default FormikTextInput;
