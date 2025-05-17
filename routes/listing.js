const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js")
const listingControlletr = require("../controller/listing.js")
const multer = require('multer')
const {storage} = require("../cloudconfig.js")
const upload = multer({storage})


//all listings//create route
router.route('/')
    .get(wrapAsync( listingControlletr.index))
    .post(isLoggedIn,upload.single('image'),validateListing,wrapAsync( listingControlletr.createListing))

//render new ejs
router.get('/new',isLoggedIn,listingControlletr.renderNewForm)


//show route// update route//delete route
router.route('/:id')
    .get(wrapAsync( listingControlletr.showListing))
    .put( isLoggedIn,isOwner,upload.single('image'),validateListing,wrapAsync( listingControlletr.updateListing))
    .delete( isLoggedIn,isOwner,wrapAsync( listingControlletr.destroyListing))


//edit route
router.get('/:id/edit',isLoggedIn,isOwner ,wrapAsync( listingControlletr.renderEditForm))




module.exports = router;
