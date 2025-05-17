const Listing = require('./models/listing.js');
const Review = require('./models/review.js');
const {listingSchema,reviewSchema } = require('./schema.js')
const ExpressError = require('./utils/ExpressError.js');

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        //redirectUrl
        req.session.redirectUrl = req.originalUrl
        req.flash("error","You Need To Logged In")
        return res.redirect("/login")
    }
    next()
}

module.exports.saveRedirectUrl = (req,res, next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl =req.session.redirectUrl;
    }
    next()
}


module.exports.isOwner = async (req,res,next) =>{
    let { id } = req.params;
    const listing = await Listing.findById(id)
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You don't have access to this listing")
        return res.redirect(`/listings/${id}`)
    }
    next()
}

module.exports.isReviewOwner = async (req,res,next) =>{
    let {id,reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You don't have access to this Review")
        return res.redirect(`/listings/${id}`)
    }
    next()
}


//validate middleware
module.exports.validateListing = (req, res, next) => {  
    const {error} = listingSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(400, msg)
    } else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {  
    const {error} = reviewSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(400, msg)
    } else {
        next();
    }
}