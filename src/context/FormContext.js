import React, { useState, createContext,useEffect } from 'react';
import axios from 'axios';

export const FormContext = createContext();

export const FormProvider = ({children})=>{
  const [formFields, setFormFields] = useState([]);
  const [formValues, setFormValues] = useState({});

  useEffect(()=>{
    getAllFields();
  },[])

  const getAllFields = async () => {
    try {
      const response = await axios.get('/api/all-fields');
      setFormFields(response.data.fields);
    } catch (err) {
      setFormFields([])
    }
  }

  return(
    <FormContext.Provider value={{ formFields, getAllFields, setFormFields, formValues, setFormValues }}>
      {children}
    </FormContext.Provider>
  )

}