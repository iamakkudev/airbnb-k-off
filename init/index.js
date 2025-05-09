const mongoose = require('mongoose');
const {data} = require('./data.js');
const Listing = require('../models/listing.js');

const MONGO_URL = 'mongodb://127.0.0.1:27017/wonderlust';
main()
.then(() => console.log('MongoDB connected')) 
.catch(err => console.log(err));
async function main() {
 
    await mongoose.connect(MONGO_URL)
}

const initDb = async () => {

        await Listing.deleteMany();
        console.log('Deleted all listings');
        await Listing.insertMany(data)
        .then(() => console.log('Inserted initial data'))
        .catch(err => console.log('Error inserting data: ' + err));
}

initDb()