import React,{useContext} from 'react';
import {FormContext} from '../context/FormContext';
import {Box,Typography,TextField,FormControlLabel,Checkbox,InputLabel,FormControl,Select,MenuItem,Tooltip} from '@mui/material';
import { Delete ,DragIndicator} from '@mui/icons-material';


const Preview = ({}) => {
  const {formFields,formValues, setFormValues } = useContext(FormContext);
  const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY:'scroll'
};

  return (
    <Box  sx={style} className='previewModalBg'>
     <Typography variant="h5" className="text-center">Preview</Typography>
     <Box className='my-2'>
       {
          formFields.map((field,index) => (
            <Box 
              key={field._id} 
              className='flex flex-col'
            >
              <Box className='flex'>
                <Box className='w-full'>
                  {field.type === 'text' &&
                    <TextField
                      size='small'
                      type='text'
                      name={`${field.label}_${field._id}`}
                      label={field.label}
                      required={field.required}
                      value={formValues[`${field.label}_${field._id}`] || ""}
                      sx={{ mb: 1 }}
                      fullWidth
                      slotProps={{
                         input: {readOnly: true},
                      }}
                    />
                  }
                  {field.type === 'email' &&
                    <TextField
                      size='small'
                      type='email'
                      name={`${field.label}_${field._id}`}
                      label={field.label}
                      required={field.required}
                      value={formValues[`${field.label}_${field._id}`] || ""}
                      sx={{ mb: 1 }}
                      fullWidth
                      slotProps={{
                         input: {readOnly: true},
                      }}
                    />
                  }
                  {field.type === 'number' &&
                    <TextField
                      size='small'
                      type='number'
                      name={`${field.label}_${field._id}`}
                      label={field.label}
                      required={field.required}
                      value={formValues[`${field.label}_${field._id}`] || ""}
                      sx={{ mb: 1 }}
                      fullWidth
                      slotProps={{
                         input: {readOnly: true},
                      }}
                    />
                  }
                  {field.type === 'checkbox' &&
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!!formValues[`${field.label}_${field._id}`]}
                          color="primary"
                          name={`${field.label}_${field._id}`}
                        />
                      }
                      label={field.label}
                      fullWidth
                      disabled
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
                        value={formValues[`${field.label}_${field._id}`] || ""}
                        disabled
                        className='disabledSelect'
                      >
                        {
                          field.options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>{option.value}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  }
                </Box>
              </Box>
            </Box>
          ))
            }
     </Box>
    </Box>
  )
}

export default Preview