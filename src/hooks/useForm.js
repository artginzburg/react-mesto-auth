import { useState } from 'react';

export default function useForm(initialData) {
  const [data, setData] = useState(initialData);

  function handleChange(name, value) {
    setData((prevData) => ({ ...prevData, [name]: value }));
  }

  return {
    register(name) {
      return {
        value: data[name],
        onChange: (e) => {
          const { value } = e.currentTarget;
          handleChange(name, value);
        },
      };
    },
    reset() {
      setData(initialData);
    },
    getData() {
      return data;
    },
  };
}
