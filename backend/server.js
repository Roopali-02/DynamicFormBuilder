const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const formRoutes = require('./routes/formRoutes');
dotenv.config();

const app = express();

app.use(express.json())
app.use(cors());

app.use('/api/add-field', formRoutes);
app.use('/api/all-fields', formRoutes);
app.use('/api/delete-field', formRoutes);
app.use('/api/fields', formRoutes);

mongoose.connect(process.env.MONGO_URI).then(()=>console.log('MongoDB connected!')).catch((err)=>console.log(`Error:${err}`));

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));