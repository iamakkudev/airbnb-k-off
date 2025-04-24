const express = require('express');
const mongoose = require('mongoose');
const Path = require('path');
const app = express();
const ejs = require('ejs');
const methodOverride = require('method-override');
const Listing = require('./models/listing.js');
const ejsMate = require('ejs-mate');

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

app.get('/', (req, res) => {
    res.send('hii this is a root');
    });
//all listings
app.get('/listings', async(req, res) => {
    const listing = await Listing.find({})
    res.render('./listings/index.ejs', { listing});
})


app.get('/listings/new', (req, res) => {
    res.render('./listings/new.ejs')
})

app.post('/listings', async(req, res) => {
    const listing = new Listing(req.body);
    await listing.save();
    res.redirect('/listings')
})
app.get('/listings/:id/edit', async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('./listings/edit.ejs', { listing});
})
app.put('/listings/:id', async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, {...req.body}, { new: true });   
    res.redirect(`/listings/${id}`)   
})
app.delete('/listings/:id', async(req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings')
})
app.get('/listings/:id', async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('./listings/show.ejs', { listing});
})


app.listen(8080, () => {
  console.log('Server started on port 8080');
});