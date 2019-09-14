const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); //MUST DO THIS FOR EXPRESS 4 UPDATE

const app = express();
app.listen(1337, () => console.log("suhhh dude 1337"));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/static"));

app.use(bodyParser.urlencoded({extended: false}));

const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/messengerDB', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}); //!!localhost/... is name of DataBase

const ApiSchema = new Schema({ //!!Schema in Mongoose is a structure for each Document
    name: {type: String, required: [true, "Comment Must Have a Name"]},
}, {timestamps: true }); //.....................adds "createdAt" and "updatedAt" properties to QuoteDocument(s)

// create an object to that contains methods for mongoose to interface with MongoDB
const ApiModel = mongoose.model('ApiDocument', ApiSchema); //!!Model in Mongoose is a structure for each Collection

app.get('/', (req, res) => {
    // PostModel.remove({}, ()=> console.log('empty')); //remove all Data from Collection
    ApiModel.find()
        .then(data => res.json(data))
});

app.get('/new/:name/', (req, res) => {
    const person = new ApiModel();
    person.name = req.params.name;
    person.save()
        .then(res.redirect('/'));
});

app.get('/remove/:name', (req, res) => {
    ApiModel.deleteOne({name: req.params.name})
        .then(res.redirect('/'));
});

app.get('/:name', (req, res) => {
    ApiModel.find({name: req.params.name})
        .then(data => res.json(data))
});