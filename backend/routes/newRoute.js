const express = require('express');
const router = express.Router();

const finalForm = require('../models/finalForm');

router.post('/submit',async(request,response)=>{
  try {
    const { formValues } = request.body;
    const finalFormSubmission = new finalForm({ data: formValues });

    await finalFormSubmission.save();
    response.status(200).json({ message: 'Form submitted and saved successfully!' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message:error.message });
  }
})



module.exports = router;