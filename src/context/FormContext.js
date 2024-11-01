import React, { useState, createContext,useEffect } from 'react';
import axios from 'axios';

export const FormContext = createContext();

export const FormProvider = ({children})=>{
  const [formFields, setFormFields] = useState([]);

  useEffect(()=>{
    getAllFields();
  },[])

  const getAllFields = async () => {
    try {
      const response = await axios.get('/api/all-fields');
      setFormFields(response.data.fields);
    } catch (err) {
      console.log(err);
    }
  }

  return(
    <FormContext.Provider value={{ formFields, getAllFields, setFormFields }}>
      {children}
    </FormContext.Provider>
  )

}