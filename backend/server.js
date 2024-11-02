const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const formRoutes = require('./routes/formRoutes');
const finalRoute = require('./routes/newRoute');
dotenv.config();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/add-field', formRoutes);
app.use('/api/all-fields', formRoutes);
app.use('/api/delete-field', formRoutes);
app.use('/api/fields', formRoutes);
app.use('/api/finalFields', finalRoute);
app.use('/api/final-submission', finalRoute)

mongoose.connect(process.env.MONGO_URI).then(()=>console.log('MongoDB connected!')).catch((err)=>console.log(`Error:${err}`));

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));