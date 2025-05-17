const mongoose = require('mongoose');
const review = require('./review');
const { string } = require('joi');
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
        url: String,
        filename: String  
    },
    country: {
        type: String,
        required: true 
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    owner:
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
            coordinates: {
            type: [Number],
            required: true
        }
    },
    category:{
        type: String,
        enum: [
            "Lakefront", "Beachfront", "Camping", "National Parks", "Farms",
            "Countryside", "Arctic", "Desert", "Luxury", "Historical",
            "Cabins", "Boats", "City", "Eco", "Pet Friendly", "Remote Work"
            ]
    }
});
//delete the reviews when the listing is deleted
listingSchema.post('findOneAndDelete', async function (listing) {
    if (listing) {
        await review.deleteMany({
            _id: {
                $in: listing.reviews
            }
        });
    }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;