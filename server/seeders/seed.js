const db = require('../config/connection'); 
const { User } = require('../models');  
const userSeeds = require('./userSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {}