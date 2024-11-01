import React,{useState,useContext} from 'react';
import { Box, Typography, Container, TextField, FormControl, InputLabel, Select, MenuItem, Button, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import AllFields from './AllFields';
import { FormContext } from '../context/FormContext';

const FormBuilder = () => {
	const { formFields, setFormFields, getAllFields } = useContext(FormContext);
	const [newField,setNewField] = useState({
		type:'',
		label:'',
		NoOfOptions:null,
		required:false,
		options: [] 
	});

	const handleInputChange = (e)=>{
		 const {name,value} = e.target;
		 setNewField((prev)=>({...prev,[name]:value}))
	}

	const handleOptionChange = (e,index)=>{
		setNewField((prev) => {
			const options = [...prev.options];
			options[index] = { value: e.target.value};
			return {
				...prev,
				options: options,
			};
		});
	}

	const addField=async(e)=>{
		e.preventDefault();
		try{
			if (newField.label && newField.type) {
				const response = await axios.post('/api/add-field', {
					label: newField.label,
					type: newField.type,
					required: newField.required,
					NoOfOptions: newField.NoOfOptions
				});

				if (newField.type==='dropdown'){
					const fieldId = response.data.id;
					const updatedOptions = newField.options.map(option => ({
						value: option.value,
					}));
					await axios.post(`/api/fields/${fieldId}`, { options: updatedOptions });
				}

				setNewField({ type: '', label: '', NoOfOptions: null, required: false, options: [] });
				getAllFields();
			}
		}catch(err){
			console.log(err);
		}
		
	}

	const handleValidationChange = (e) => {
		setNewField((prev) => ({
			...prev,
			required: e.target.checked 
		}
		));
	};

	return (
		<Box className='w-full flex gap-2'>
			<Container maxWidth='xs' className='mt-10 pageBg p-4'>
				 <Typography variant='h4' className='text-center'>Dynamic Form Builder</Typography>
				 <form onSubmit={addField} className='p-4 shadow-lg'>
					<TextField
						size='small'
						label="Label"
						name='label'
						type='text'
						value={newField.label}
						onChange={handleInputChange}
						sx={{my:1}}
						fullWidth
						required
					/>
					<FormControl
						size='small'
						sx={{ mb:1}}
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
					{
						newField.type ==='dropdown'&&
						(
							<>
								<TextField
									size='small'
									label="No. of options"
									type='number'
									name='NoOfOptions'
									value={newField.NoOfOptions || null}
									onChange={(e) => setNewField((prev)=>({...prev,
										NoOfOptions: parseInt(e.target.value, 10) || 0,
										options: Array.from({ length: parseInt(e.target.value, 10) || 0 }, () => ({ value: '' })),
									}))}
									sx={{ my: 1 }}
									fullWidth
									required
								/>
								{
									newField.options.map((option,index)=>(
										<TextField
											size='small'
											label={`Option${index + 1}`}
											name='label'
											type='text'
											value={option.value}
											onChange={(e) => handleOptionChange(e, index)}
											sx={{ my: 1 }}
											fullWidth
											required
											key={index}
										/>
									))
								}
							</>
						)
					}
					<FormControlLabel
						control={
							<Checkbox
								checked={newField.required}
								onChange={handleValidationChange}
								color="primary"
							/>
						}
						label="Required"
					/>
					<Button type='submit' variant='contained' sx={{textTransform:'none',background:'#000'}} fullWidth>Add Field</Button>
				 </form>
			</Container>

			<Container maxWidth='xs' className='mt-10 h-[600px] overflow-y-scroll p-3 pageBg'>
        <Box className='text-lg text-center font-semibold my-2'>Dynamic fields</Box>
				<AllFields
					formFields={formFields}
					setFormFields={setFormFields}
				/>
			</Container>
		</Box>
	)
}

export default FormBuilder