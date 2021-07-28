import { useState } from 'react';

const initialStates = {
  errors: {},
  isValid: false,
};

export default function useValidatedForm(initialData) {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState(initialStates.errors);
  const [isValid, setIsValid] = useState(initialStates.isValid);

  function handleChange(name, value) {
    setData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleError(name, validationMessage) {
    setErrors((prevData) => ({ ...prevData, [name]: validationMessage }));
  }

  return {
    register(name) {
      return {
        value: data[name],
        onChange: (e) => {
          const input = e.currentTarget;
          const { value, validationMessage } = input;
          handleChange(name, value);
          handleError(name, validationMessage);
          setIsValid(input.closest('form').checkValidity());
        },
        validationMessage: errors[name],
        name,
      };
    },
    reset() {
      setData(initialData);
      setErrors(initialStates.errors);
      setIsValid(initialStates.isValid);
    },
    getData() {
      return data;
    },
    isValid,
  };
}
