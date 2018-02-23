const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

//config
const config = require('./config/config.js');

mongoose.connect(config.database);
// confirm connection
mongoose.connection.on('connected', () => {
	console.log('connected to database');
})
//handle db connection Error
mongoose.connection.on('error', () => {
	console.log('Error connecting to database');
})

const server = express();
server.use(cors());
server.use(express.static(path.join(__dirname, '/public')));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
	extended: false
}));

server.use(passport.initialize());
server.use(passport.session());
require('./config/passport-setup.js')(passport);


const users = require('./routes/userRoutes.js');
server.use('/users', users);

server.get('/', (req, res) => {
	res.send('Invalid end point');
})

server.get('*',(req,res)=>{
	res.sendFile(path.join(__dirname,'public/index.html'))
})

// const port = 2018;
const port = process.env.PORT || 8080;
server.listen(port, () => {
	console.log('Open brower and go to localhost:' + port);
})

server.use(function (err, req, res, next) {
	console.error(err.stack)
	res.status(500).send(err)
  })