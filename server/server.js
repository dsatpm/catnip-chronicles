// import Express, database, cors
require('dotenv').config({ path: '../.env'});
const express = require('express');
const app = require('./config/express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');


// connect to MongoDB
connectDB();


// set up Express app
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

// start server
app.listen(port, async () => {
	console.log(`Server is running on port: ${port}`);
});
