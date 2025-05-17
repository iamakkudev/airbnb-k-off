const Review = require('../models/review.js');
const Listing = require('../models/listing.js');

module.exports.createReview =  async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    let review = new Review(req.body);
    review.owner = req.user._id;
    listing.reviews.push(review);
    await review.save();
    await listing.save();
    req.flash('success', 'Successfully created a new Review');
    res.redirect(`/listings/${id}`)
}

module.exports.destroyReview = async(req, res) => {
    let { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    req.flash('delete', 'Review deleted successfully');
    res.redirect(`/listings/${id}`)
}