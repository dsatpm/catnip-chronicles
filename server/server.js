// import Express, database, cors
require('dotenv').config({ path: '../.env'});
const express = require('express');
const { app, connectDB } = require('./config/connection');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');

// connect to MongoDB
connectDB();

// set up Express app
const port = process.env.PORT || 5000;
app.use(cors({origin: true, credentials: true }));
app.use(express.json());

// set up routes
app.use('/auth', authRoutes);
app.use('/', homeRoutes);

// start server
app.listen(port, async () => {
	console.log(`Server is running on port: ${port}`);
});
