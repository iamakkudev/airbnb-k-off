let User = require('../models/user.js');


module.exports.rendersignupform = (req, res) => {
    res.render('./users/signup.ejs');
}

module.exports.signup = async (req, res) => {
    const {  username, email, password } = req.body;
    const neUser = new User({  email ,username});
    const registeredUser = await User.register(neUser, password);
    req.login(registeredUser, (err) => {
        if(err){
            next(err)
        }
        req.flash('success', 'Welcome to Wonderlust');
        res.redirect('/listings');
    })
    
}

module.exports.renderlogginform =  (req, res) => {
    res.render('./users/login.ejs');
}

module.exports.login = async (req, res) => {
    const {  username, password } = req.body;
    req.flash('success', 'Welcome Back to Wonderlust');
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) =>{
    req.logout((err) => {
        if(err){
            next(err)
        }
        req.flash ("delete", "you are logged out")
        res.redirect("/listings")
    })
}