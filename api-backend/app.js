var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var cors = require('cors');
var config = require('./config/config');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');

var User   = require('./models/user'); // get our mongoose model

//Routes
var product = require('./routes/product');
var user = require('./routes/user');
var user_info = require('./routes/user-info');

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
app.use('/api/product', product);
app.use('/api/user', user);
app.use('/api/user/delivery',user_info);



app.get('/', (req, res)=>{
  res.send('Invalid Endpoint');
});

app.listen(port, ()=>{
  console.log('Server started on port '+port);
});

//Connect to Mongodb
mongoose.connect(config.database,{useMongoClient:true});

// secret variable
app.set('superSecret', config.secret); 

//On connection
mongoose.connection.on('connected', ()=>{
  console.log('Connected to database '+config.database);
});

// use morgan to log requests to the console
app.use(morgan('dev'));

//On error
mongoose.connection.on('error', (err)=>{
  if(err){
    console.log('Error to connect database: '+err);
  }
});