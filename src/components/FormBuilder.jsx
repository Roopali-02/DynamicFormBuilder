import React,{useState,useContext,useEffect} from 'react';
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, Checkbox, FormControlLabel,Modal,useMediaQuery,Alert } from '@mui/material';
import axios from 'axios';
import AllFields from './AllFields';
import { FormContext } from '../context/FormContext';
import Preview from './Preview';
const FormBuilder = () => {
	const smallScreen = useMediaQuery('(max-width:600px)');
	const { formFields, setFormFields, getAllFields } = useContext(FormContext);
	const [alert,setAlert] = useState({show:false,type:'',message:''});
	const [open,setOpen] = useState(false);
	const [newField,setNewField] = useState({
		type:'',
		label:'',
		NoOfOptions:null,
		required:false,
		options: [] 
	});

	useEffect(()=>{
		let timer;
		if(alert.show){
			timer = setTimeout(()=>{
       setAlert({show:false,type:'',message:''})
			},3000)
		}
		return()=>clearTimeout(timer);
	},[alert])

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
				setAlert({show:true,type:'success',message:'New field created successfully!'})
				setNewField({ type: '', label: '', NoOfOptions: null, required: false, options: [] });
				getAllFields();
			}
		}catch(err){
			setAlert({show:true,type:'error',message:err.response.data.message})
		}
	}

	const handleValidationChange = (e) => {
		setNewField((prev) => ({
			...prev,
			required: e.target.checked 
		}
		));
	};

	//Model open/close 
	const triggerModalOpen = ()=>{
    setOpen(true);
	}
	const handleClose = ()=>{
		setOpen(false);
	}

	return (
		<Box className={`flex ${smallScreen?'flex-col':''} justify-center gap-x-4 p-4`}>
			<Box className={`shadow-md mt-6 builderSectionBg p-4 ${!smallScreen?'w-[380px]':''} ${smallScreen?'h-[300px]':''}`}>
				 <Typography variant='h5' className='text-center'>Dynamic Form Builder</Typography>
				 {
					alert.show&&<Alert severity={alert.type}>{alert.message}</Alert>
				 }
				 <form onSubmit={addField} className='px-4 pt-4 pb-6 shadow-lg'>
					<TextField
						size='small'
						label="Label"
						name='label'
						type='text'
						value={newField.label}
						onChange={handleInputChange}
						sx={{mb:2}}
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
									sx={{ mb: 1 }}
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
			</Box>

			<Box className={` ${!smallScreen?'w-[380px]':''} shadow-md mt-6 h-[600px] p-4 pageBg overflow-y-scroll`}>
        <Box 
				  className='mb-5 mt-2 flex justify-between items-center'>
					<Box className='text-lg font-semibold '>Dynamic fields</Box>
					<Button variant='contained' size='small' sx={{background:'#000'}} onClick={triggerModalOpen}>Preview</Button>
					</Box>
					<AllFields
						formFields={formFields}
						setFormFields={setFormFields}
					/>
			</Box>
			{
				open&&
				<Modal
					open={open}
					onClose={handleClose}
				>
				 <Preview/>
				</Modal>
			}
		</Box>
	)
}

export default FormBuilder