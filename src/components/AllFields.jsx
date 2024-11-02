import React,{useState,useEffect,useContext} from 'react';
import { Box, TextField, Button, FormControlLabel, Checkbox, Tooltip, Alert, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import axios from 'axios';
import { Delete, DragIndicator } from '@mui/icons-material';
import { FormContext } from '../context/FormContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const AllFields = () => {
  const { formFields, setFormFields, getAllFields,formValues, setFormValues } = useContext(FormContext);
  const [alert,setAlert] = useState({show:false,type:'',message:''});
  const [error,setError]= useState({})

  useEffect(() => {
    const initialValues = formFields.reduce((acc, field) => {
      acc[`${field.label}_${field._id}`] = field.type === 'checkbox' ? field.required : '';
      return acc;
    }, {});
    setFormValues(initialValues);
  }, [formFields]);

  //Drag and drop
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedFields = reorder(
      formFields,
      result.source.index,
      result.destination.index
    );
    setFormFields(reorderedFields);
  };

  useEffect(()=>{
    let timer;
    if(alert.show){
    timer =  setTimeout(()=>{
        setAlert({ show: false, type: '', message: '' });
      },3000)
    }
    return () => clearTimeout(timer);
  },[alert])

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
       const response =await axios.post('/api/final-submission/submit',{ formValues });
      setAlert({show:true,type:'success',message:response.data.message});
      const resetValues = formFields.reduce((acc, field) => {
      acc[`${field.label}_${field._id}`] = field.type === 'checkbox' ? false : '';
      return acc;
    }, {});
    setFormValues(resetValues);
    }catch(err){
        console.log(err);
        setAlert({show:true,type:'error',message:err.response.data.message});
    }
  }

  const deleteField = async(id)=>{
    try{
      const response =await axios.delete(`/api/delete-field/${id}`);
      setAlert({ show: true, type: 'success', message: response.data.message })
      await getAllFields();
    }catch(err){
      setAlert({ show: true, type: 'error', message: err.response.data.message })
    }
  }

  const validateFields = (fieldType,name,value)=>{
    let regex, errorMessage;
    switch(fieldType){
      case 'text':
        regex = /^[A-Za-z\s]+$/;
        errorMessage = 'Only alphabetic characters are allowed!';
        break; 
      case 'number':
        regex =  /^\d{1,10}$/;
        errorMessage = 'Enter between 1 and 10 digits.';
        break;
      case 'email':
        regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        errorMessage = 'Invalid email format!';
      break;
    default:
      regex = null;
      errorMessage = '';
    }
   if (value&&regex && !regex.test(value)) {
      setError((prev) => ({ ...prev, [name]: errorMessage }));
    } else {
      setError((prev) => ({ ...prev, [name]: '' }));
    }
  }

  const textTypeInput = (e)=>{
    const {name,value,type: fieldType} = e.target;
    console.log(e);
    const field = formFields.find(field => field.label === name.split('_')[0]);
    const isRequired = field?.required;
    validateFields(fieldType,name, value)

    if (field.type === 'dropdown' && isRequired && (value === '' || value === null)) {
        setError((prev) => ({ ...prev, [name]: 'This field is required!' }));
    } else {
        setError((prev) => ({ ...prev, [name]: '' })); 
    }

    setFormValues((prev)=>({...prev,[name]:value}));
  }

  const setCheckboxValue = (e)=>{
    const { name, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: checked
    }));
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="fields">
      {
        (provided)=>(
          <form onSubmit={handleSubmit} ref={provided.innerRef} {...provided.droppableProps} className="z-20">
            {
              alert.show && <Alert severity={alert.type} className='mb-2 mt-1'>{alert.message}</Alert>
            }
            {
              formFields.map((field,index) => (
                <Draggable key={field._id} draggableId={field._id} index={index}>
                {
                  (provided)=>(
                    <Box 
                      key={field._id} 
                      className='flex flex-col'
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Box className='flex'>
                        <Box className='w-3/4'>
                          {field.type === 'text' &&
                            <TextField
                              size='small'
                              type='text'
                              name={`${field.label}_${field._id}`}
                              label={field.label}
                              required={field.required}
                              value={formValues[`${field.label}_${field._id}`] || ''}
                              onChange={textTypeInput}
                              sx={{ mb: 1 }}
                              fullWidth
                              error={!!error[`${field.label}_${field._id}`]}
                              helperText={error[`${field.label}_${field._id}`]}
                            />
                          }
                          {field.type === 'email' &&
                            <TextField
                              size='small'
                              type='email'
                              name={`${field.label}_${field._id}`}
                              label={field.label}
                              required={field.required}
                              value={formValues[`${field.label}_${field._id}`] || ''}
                              onChange={textTypeInput}
                              sx={{ mb: 1 }}
                              fullWidth
                              error={!!error[`${field.label}_${field._id}`]}
                              helperText={error[`${field.label}_${field._id}`]}
                            />
                          }
                          {field.type === 'number' &&
                            <TextField
                              size='small'
                              type='number'
                              name={`${field.label}_${field._id}`}
                              label={field.label}
                              required={field.required}
                              value={formValues[`${field.label}_${field._id}`] || ''}
                              onChange={textTypeInput}
                              sx={{ mb: 1 }}
                              fullWidth
                              error={!!error[`${field.label}_${field._id}`]}
                              helperText={error[`${field.label}_${field._id}`]}
                            />
                          }
                          {field.type === 'checkbox' &&
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={!!formValues[`${field.label}_${field._id}`]}
                                  color="primary"
                                  value={formValues[`${field.label}_${field._id}`] || ""} 
                                  onChange={setCheckboxValue}
                                  name={`${field.label}_${field._id}`}
                                />
                              }
                              label={field.label}
                              fullWidth
                            />
                          }
                          {
                            field.type === 'dropdown' &&
                            <FormControl
                              size='small'
                              sx={{ mb: 1 }}
                              fullWidth
                            >
                                <InputLabel id={`dropdown-label-${field._id}`}>{field.label}</InputLabel>
                              <Select
                                  label={field.label}
                                  labelId={`dropdown-label-${field._id}`}
                                  name={`${field.label}_${field._id}`}
                                  onChange={textTypeInput}
                                  value={formValues[`${field.label}_${field._id}`] || ""}
                                   error={!!error[`${field.label}_${field._id}`]} // Set error state
                              >
                              <MenuItem value=''>None</MenuItem>
                                {
                                  field.options.map((option,index) => (
                                    <MenuItem key={index} value={option.value}>{option.value}</MenuItem>
                                  ))
                                }
                              </Select>
                            </FormControl>
                          }
                        </Box>
                        <Box className='grow p-2 ml-2 border border-zinc-200 flex items-center gap-2 mb-1'>
                          <Tooltip title='Delete'><Delete color='primary' onClick={() => deleteField(field._id)} /></Tooltip>
                          <Tooltip title='Drag and Reorder field'><DragIndicator color='primary' /></Tooltip>
                        </Box>
                      </Box>
                    </Box>
                  )
                }
                </Draggable>
              ))
            }
            {provided.placeholder}
            <Button variant='contained' type='submit' fullWidth>Submit</Button>
          </form>
        )
      }
      </Droppable>
    </DragDropContext>
  )
}

export default AllFields