const Listing = require('../models/listing.js');
const NodeGeocoder = require('node-geocoder');
const geocoder = NodeGeocoder({
    provider: 'google',
    apiKey: process.env.MAP_API_KEY,
    });

module.exports.index=async(req, res) => {
   let { sort, category } = req.query;

      // Build a filter object
      let filter = {};
      if (category) {
        filter.category = category;
      }
      let listing = await Listing.find(filter);
    if (sort === 'price_asc') {
      listing.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
      listing.sort((a, b) => b.price - a.price);
    }

    res.render('./listings/index.ejs', { listing });
};

module.exports.renderNewForm =  (req, res) => {
    
    res.render('./listings/new.ejs')
}

module.exports.createListing = async (req, res) => {
  try {
    const response = await geocoder.geocode(req.body.location);

    if (!response || !response.length) {
      req.flash("error", "Location not found");
      return res.redirect("/listings/new");
    }

    const geoJSONPoint = {
      type: "Point",
      coordinates: [response[0].longitude, response[0].latitude],
    };

    const { path: url, filename } = req.file;

    const listing = new Listing(req.body);
    listing.owner = req.user._id;
    listing.image = { url, filename };
    listing.geometry = geoJSONPoint;
    await listing.save();
    req.flash("success", "Successfully created a new listing");
    res.redirect("/listings");
  } catch (err) {
    console.error("Create listing error:", err);
    req.flash("error", "Something went wrong");
    res.redirect("/listings");
  }
};
module.exports.showListing = async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path: 'reviews',populate: { path: 'owner' } // For each review, populate its owner
    }).populate("owner");
    if(!listing) {
        req.flash('error', 'Listing not found');
        return res.redirect('/listings')
    }
    res.render('./listings/show.ejs', { listing});
}

module.exports.renderEditForm = async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash('error', 'Listing not found');
        return res.redirect('/listings')
    }
    let orgImgUrl = listing.image.url;
    orgImgUrl = orgImgUrl.replace("/upload", "/upload/h_150,w_250")
    res.render('./listings/edit.ejs', { listing, orgImgUrl});
}

module.exports.updateListing = async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, {...req.body}, { new: true });
    if(typeof req.file !== "undefined"){
        const { path: url, filename } = req.file;
        listing.image = {url, filename} 
        await listing.save()
    }
    console.log(req.file)
    req.flash('success', 'Successfully updated the listing');  
    res.redirect(`/listings/${id}`)   
}

module.exports.destroyListing = async(req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: {}} });
    await Listing.findByIdAndDelete(id);
    req.flash('delete', 'Listing deleted successfully');
    res.redirect('/listings')
}