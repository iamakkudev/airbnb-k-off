const mongoose = require('mongoose');
let {data} = require('./data.js');
const Listing = require('../models/listing.js');

// const MONGO_URL = 'mongodb://127.0.0.1:27017/wonderlust';

const dbUrl = process.env.ATLASDB_URL

main()
.then(() => console.log('MongoDB connected')) 
.catch(err => console.log(err));
async function main() {
 
    await mongoose.connect(dbUrl)
}

const initDb = async () => {

        await Listing.deleteMany();
        console.log('Deleted all listings');
        data = data.map((obj)=>({...obj, owner: '6822db4185f305a8f9ce6824'}))
        await Listing.insertMany(data)
        .then(() => console.log('Inserted initial data'))
        .catch(err => console.log('Error inserting data: ' + err));
}

initDb()