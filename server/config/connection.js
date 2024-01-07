const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = async () => {
	const uri = process.env.MONGODB_URI;
	console.log('MONGODB_URI:', uri);

	if (!uri) {
		console.error(
			'MongoDB connection URI is not defined in the environment variables.'
		);
		process.exit(1);
	}

	const client = new MongoClient(uri);

	try {
		await client.connect();
		await client.db('admin').command({ ping: 1 });
		console.log(
			'Pinged your deployment. You successfully connected to MongoDB!'
		);
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	} finally {
		await client.close();
	}
};

module.exports = { app, connectDB };
