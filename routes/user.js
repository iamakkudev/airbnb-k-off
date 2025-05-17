const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { saveRedirectUrl } = require("../middleware.js")


const userController = require("../controller/user.js")

router.route('/signup')
    .get(userController.rendersignupform)
    .post(wrapAsync(userController.signup))

router.route('/login')
    .get( userController.renderlogginform)
    .post( saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login", failureFlash: true}), wrapAsync(userController.login))
 
router.get('/logout', userController.logout)

module.exports = router;
