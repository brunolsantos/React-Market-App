var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var config = require('./config/database');

//Routes
var product = require('./routes/product');

var app = express();

const port = 3000;

//Adding middleware
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Setting up routes
app.use('/product', product);



app.get('/', (req, res)=>{
  res.send('Invalid Endpoint');
});

app.listen(port, ()=>{
  console.log('Server started on port '+port);
});

//Connect to Mongodb
mongoose.connect(config.database,{useMongoClient:true});

//On connection
mongoose.connection.on('connected', ()=>{
  console.log('Connected to database '+config.database);
});

//On error
mongoose.connection.on('error', (err)=>{
  if(err){
    console.log('Error to connect database: '+err);
  }
});