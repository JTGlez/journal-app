/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});

    // Executes every time the form input changes
    useEffect(() => {
        createValidators();
    }, [formState]);

    // If the initialForm changes, then regenerate the form with the new values provided
    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm])

    const isFormValid = useMemo(() => {

        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }

        return true;

    }, [formValidation]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    const createValidators = () => {

        const formCheckedValues = {};

        // Iterates through every field in formValidations and destructures the check function and the error message
        // Then computes in formCheckValues a boolean "isValid" by checking the result of the function with the input provided
        // Example: for email, retrieve the validator function for email and the error message, then use the function to obtain a boolean result
        // by evaluating the email within the formField.

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage = 'Field required'] = formValidations[formField];
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }

        setFormValidation(formCheckedValues);
    }

    return {
        ...formState,
        ...formValidation,
        formValidation,
        formState,
        isFormValid,
        onInputChange,
        onResetForm,
    }
}