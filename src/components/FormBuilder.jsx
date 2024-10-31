import React,{useState} from 'react';
import {Box,Typography,Container,TextField,FormControl,InputLabel,Select,MenuItem,Button} from '@mui/material';

const FormBuilder = () => {
	const [formFields,setFormFields]= useState([]);
	const [formValues, setFormValues] = useState({});
	const [newField,setNewField] = useState({
		id:'',
		type:'',
		label:'',
		validation:{required:false}
	});

	const handleInputChange = (e)=>{
		 const {name,value} = e.target;
		 setNewField((prev)=>({...prev,[name]:value}))
	}

	const addField=(e)=>{
		e.preventDefault();
		if(newField.label&&newField.type){
			const newFieldObj = {...newField, id: Date.now()};
			setFormFields((prevFields)=>[...prevFields,newFieldObj]);
			setFormValues((prevValues) => ({ ...prevValues, [newFieldObj.id]: '' }));
			setNewField({ id: '', type: '', label: '', validation: { required: false } });
		}
	}

	console.log(formValues);
	return (
		<Box className='w-full min-h-screen'>
			<Container maxWidth='xs' className='mt-12 pageBg'>
				 <Typography variant='h4'>Dynamic Form Builder</Typography>
				 <form onSubmit={addField} className='p-4'>
					<TextField
						size='small'
						label="Label"
						name='label'
						value={newField.label}
						onChange={handleInputChange}
						sx={{my:1}}
						fullWidth
						required
					/>
					<FormControl
						size='small'
						sx={{ mb:2}}
						fullWidth
						required
					>
						<InputLabel id="type-label">Type</InputLabel>
						<Select
							labelId="type-label"
							name='type'
							label="Type"
							onChange={handleInputChange}
							value={newField.type}
						>
							<MenuItem value=''>Select Field Type</MenuItem>
							<MenuItem value='text'>Text</MenuItem>
							<MenuItem value='email'>Email</MenuItem>
							<MenuItem value='number'>Number</MenuItem>
							<MenuItem value='dropdown'>Dropdown</MenuItem>
							<MenuItem value='checkbox'>Checkbox</MenuItem>
						</Select>
					</FormControl>
					<Button type='submit' variant='contained' sx={{textTransform:'none',background:'#000'}} fullWidth>Add Field</Button>
				 </form>
					<Typography variant='h6' className='mt-4'>Added Fields:</Typography>
				{formFields.map((field) => (
		<Box key={field.id} sx={{ my: 2 }}>
			<Typography variant='body1'>{field.label} ({field.type})</Typography>
		</Box>
		))}
			</Container>
		</Box>
	)
}

export default FormBuilder