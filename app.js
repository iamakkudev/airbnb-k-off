const express = require('express');
const mongoose = require('mongoose');
const Path = require('path');
const app = express();
const ejs = require('ejs');
const methodOverride = require('method-override');
const Listing = require('./models/listing.js');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/ExpressError.js');
const {listingSchema} = require('./schema.js')

app.set('view engine', 'ejs');
app.set('views', Path.join(__dirname, 'views'))
app.use(express.static(Path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);

app.use(express.urlencoded({ extended: true }));    
app.use(express.json());

const MONGO_URL = 'mongodb://127.0.0.1:27017/wonderlust';
main()
.then(() => console.log('MongoDB connected')) 
.catch(err => console.log(err));
async function main() {
 
    await mongoose.connect(MONGO_URL)
}

//validate middleware
const validateListing = (req, res, next) => {  
    const {error} = listingSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(400, msg)
    } else {
        next();
    }
}

app.get('/', (req, res) => {
    res.send('hii this is a root');
    });
//all listings
app.get('/listings',wrapAsync( async(req, res) => {
    const listing = await Listing.find({})
    res.render('./listings/index.ejs', { listing});
}))

//create route
app.get('/listings/new', (req, res) => {
    res.render('./listings/new.ejs')
})

app.post('/listings',validateListing,wrapAsync( async(req, res) => {
    const listing = new Listing(req.body);
    await listing.save();
    res.redirect('/listings')
}))
//edit route
app.get('/listings/:id/edit',wrapAsync( async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('./listings/edit.ejs', { listing});
}))
app.put('/listings/:id',validateListing,wrapAsync( async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, {...req.body}, { new: true });   
    res.redirect(`/listings/${id}`)   
}))
//delete route
app.delete('/listings/:id',wrapAsync( async(req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings')
}))

//show route
app.get('/listings/:id',wrapAsync( async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('./listings/show.ejs', { listing});
}))


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