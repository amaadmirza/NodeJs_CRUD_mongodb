const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const mongoose = require('mongoose');

const configDB = require('./config/database.js'); 
mongoose
	.connect(configDB.url, {useNewUrlParser: true, useUnifiedTopology: true})	
	.then(() => console.log('DB Connected!'))
	.catch(err => {
		console.log(`DB Connection Error: ${err.message}`);
	});


app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({secret: 'myscretUA',
				saveUninitialized: true, //if serverdown and relogin auto
				resave: true //unsave save again
				}));

// app.use('/', (req,res) => {
//  res.send('Our first Express Program..');
//  console.log(req.cookies);
//  console.log("=====================")
//  console.log(req.session);
// });

require("./app/routes.js")(app);

app.listen(port, ()=> console.log('Server running on port: ', port));