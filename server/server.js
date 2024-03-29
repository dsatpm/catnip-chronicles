// import Express, database, cors
const path = require('path');
require('dotenv').config();
const express = require('express');
const DB = require('./config/connection');
const cors = require('cors');
const routes = require('./routes');
const app = express();

// set up Express app
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

DB.once('open',()=>{
	app.listen(PORT, async () => {
		console.log(`Server is running on port: ${PORT}`);
	});	
})
// start server

