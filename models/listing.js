const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
    },
    image: { 
        type: String,
        default: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/dd/58/ce/dd58ce5f-a003-1664-458f-f62060d0e591/AppIcon-0-0-1x_U007epad-0-1-0-0-0-85-220.png/1200x600wa.png",
        set: (v)=> v === ""? "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/dd/58/ce/dd58ce5f-a003-1664-458f-f62060d0e591/AppIcon-0-0-1x_U007epad-0-1-0-0-0-85-220.png/1200x600wa.png" 
        : v
    },
    country: {
        type: String,
        required: true 
    }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;