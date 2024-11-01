const express= require('express');
const Form = require('../models/form');
const router = express.Router();

router.post('/',async(request,response)=>{
  const { label, type, required, NoOfOptions } = request.body;
  try{
    const formData = { label, type, required };
    if (type === 'dropdown') {
      formData.NoOfOptions = NoOfOptions;
    }
    const form = new Form(formData);
    const savedForm = await form.save();
    return response.status(201).json({ message: 'Resource created successfully',id:savedForm._id});
  }catch(err){
    return response.status(500).json({ message: err.message });
  }
})

router.post('/:fieldId', async(request, response)=>{
  const { fieldId } = request.params;
  const { options } = request.body;
   try{
     const form = await Form.findById(fieldId);
     options.forEach(option => {
       form.options.push({ value: option.value });
     });
     await form.save();
     return response.status(201).json({ message: 'Options added successfully' });
   }catch(err){
     return response.status(500).json({ message: err.message });
   }
})

router.get('/',async(request,response)=>{
  try {
    const fields = await Form.find();
    return response.status(201).json({ message: 'Data fetched successfully!', fields });
  } catch (err) {
    return response.status(500).json({ message: err });
  }
})

router.delete('/:id',async(request,response)=>{
  try{
   await Form.findByIdAndDelete(request.params.id);
   return response.status(200).json({message:'Field deleted successfully!'});
  }catch(err){
    return response.status(500).json({message: 'Error deleting field!'})
  }
})

module.exports = router;