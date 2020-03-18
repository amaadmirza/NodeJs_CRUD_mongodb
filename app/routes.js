const User = require('./models/user');
module.exports = (app) => {
	app.get('/', (req,res)=> {
		res.send('Hello World');
	});

	app.get('/:username/:password', (req, res)=>{
		let newUser = new User();
		newUser.local.username =  req.param.username;
	    newUser.local.password =	req.param.password;
	    console.log(newUser.local.username+ " "+ newUser.local.password);
	    newUser.save((err)=> {
	    	if (err) {
	    		throw err;
	    	}
	    });
	    res.send('Successfully create new user....');
	});
}