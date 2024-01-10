const { model, modelNames } = require('mongoos');

const cleanDB = async (modelName, collectionName) => {
    try {
        if (modelNames().includes(modelName)) {
            await model(modelName).deleteMany({});
            console.log(`Successfully cleaned ${collectionName} collection`)
        } else {
            console.log(`Model ${modelName} not found`);
        }
    } catch (err) {
        console.error(`Error cleaning ${collectionName} collection: ${err.message}`);
    }
};

module.exports = cleanDB;