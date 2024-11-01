import React,{useState,useEffect,useContext} from 'react';
import { Box, TextField, Button, FormControlLabel, Checkbox, Tooltip, Alert, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import axios from 'axios';
import { Delete, DragIndicator } from '@mui/icons-material';
import { FormContext } from '../context/FormContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const AllFields = () => {
  const { formFields, setFormFields, getAllFields } = useContext(FormContext);
  const [alert,showAlert] = useState({show:false,type:'',message:''});
  const [formValues,setFormValues] = useState({});


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
        showAlert({ show: false, type: '', message: '' });
      },3000)
    }
    return () => clearTimeout(timer);
  },[alert])

  const handleSubmit = (e)=>{
    e.preventDefault();
  }

  const deleteField = async(id)=>{
    try{
      const response =await axios.delete(`/api/delete-field/${id}`);
      showAlert({ show: true, type: 'success', message: response.data.message })
      await getAllFields();
    }catch(err){
      showAlert({ show: true, type: 'error', message: err.response.data.message })
    }
  }

  const textTypeInput = (e)=>{
      const {name,value} = e.target;
      setFormValues((prev)=>({...prev,[name]:value}));
  }

  console.log(formValues);

  const handleInputChange = (e)=>{
    console.log(e);
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
          <form onSubmit={handleSubmit} ref={provided.innerRef} {...provided.droppableProps}>
            {
              alert.show && <Alert severity={alert.type} className='my-1'>{alert.message}</Alert>
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
                              onChange={textTypeInput}
                              sx={{ mb: 1 }}
                              fullWidth
                            />
                          }
                          {field.type === 'email' &&
                            <TextField
                              size='small'
                              type='email'
                              name={`${field.label}_${field._id}`}
                              label={field.label}
                              required={field.required}
                              onChange={textTypeInput}
                              sx={{ mb: 1 }}
                              fullWidth
                            />
                          }
                          {field.type === 'number' &&
                            <TextField
                              size='small'
                              type='number'
                              name={`${field.label}_${field._id}`}
                              label={field.label}
                              required={field.required}
                              onChange={textTypeInput}
                              sx={{ mb: 1 }}
                              fullWidth
                            />
                          }
                          {field.type === 'checkbox' &&
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={!!formValues[`${field.label}_${field._id}`]}
                                  color="primary"
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
                              >
                                {
                                  field.options.map((option) => (
                                    <MenuItem value={option.value}>{option.value}</MenuItem>
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
            <Button variant='contained' type='submit' fullWidth>Submit</Button>
          </form>
        )
      }
      </Droppable>
    </DragDropContext>
  )
}

export default AllFields