if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}

const express = require('express');
const mongoose = require('mongoose');
const Path = require('path');
const app = express();
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.js');



const listingRouter = require('./routes/listing.js');
const reviewRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');
const MongoStore = require('connect-mongo');


app.set('view engine', 'ejs');
app.set('views', Path.join(__dirname, 'views'))
app.use(express.static(Path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));    
app.use(express.json());
app.use(cookieParser());

const dbUrl = process.env.ATLASDB_URL

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600,
})

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
}
}

app.use(session(sessionOptions))
app.use(flash());

app.use(passport.initialize());//to initialize passport
app.use(passport.session());//to use session with passport
passport.use(new LocalStrategy(User.authenticate()));//to use local strategy with passport and
//passport.authenticate() is a middleware function that authenticates the user using the local strategy
passport.serializeUser(User.serializeUser());
//serializeUser() is a function that takes a user object and stores it in the session
passport.deserializeUser(User.deserializeUser());
//deserializeUser() is a function that takes the user id from the session and retrieves the user object from the database

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.deletemsg = req.flash('delete');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user
    next();
})



// const MONGO_URL = 'mongodb://127.0.0.1:27017/wonderlust';

main()
.then(() => console.log('MongoDB connected')) 
.catch(err => console.log(err));
async function main() {
 
    await mongoose.connect(dbUrl)
}

app.use('/listings', listingRouter);
app.use('/listings/:id/reviews', reviewRouter);
app.use('/', userRouter);
 

// app.get('/', (req, res) => {
//     res.send('hii this is a root');
//     });


app.all('/*path', (req, res,next) => {
    next(new ExpressError( 404,'Page not found'));
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong' } = err;
    res.status(statusCode).render('error.ejs', {message });
})


app.listen(8080, () => {
  console.log('Server started on port 8080');
});