require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

console.log('MONGODB_URI:', process.env.MONGODB_URI);

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  console.log('MONGODB_URI:', uri);

  // Check if the URI is defined
  if (!uri) {
    console.error('MongoDB connection URI is not defined in the environment variables.');
    process.exit(1);
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

module.exports = connectDB;
