var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var _ = require("underscore");
 
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())

var users = [
	{
		id:1,
		username:"rolaandoes",
		firstname:"Rolando",
		lastname:"Rodriguez",
		age:21
	}, 
	{
		id:2,
		username:"deeznuts",
		firstname:"Jonny",
		lastname:"Lost",
		age:45
	}
];

// app.get("/users/:id", function(req, res){
// 	res.json(req.params.id);
// });
//req.params is grabbing the info from the url
app.get("/users", function(req, res){
	res.json(users);
});
app.post("/users", function(req, res){
	var newUser = req.body;
		users.push(newUser);
		res.json(newUser);
});
//req.body is from the body-parser module library
app.put("/users/:id" , function(req, res){
	var editUser = parseInt(req.params.id);
	//this above variable is grabbing the users input and making the "parseInt"
	//in to an interger, so the users input is a string and that function converts it
	// in to a string.
	var findUser = _.findWhere(users, {id: editUser})
	findUser.username = req.body.username || findUser.username;
	findUser.firstname = req.body.firstname || findUser.firstname;
	findUser.lastname = req.body.lastname || findUser.lastname;
	findUser.age = req.body.age || findUser.age;
	res.json(findUser.id + " has been updated to " + findUser.firstname
		);
});
app.delete("/users/:id", function(req, res){
	console.log('start');
	var targetid = parseInt(req.params.id);
	console.log('this is targetid', targetid);
	var delUser = _.findWhere(users, {id: targetid});
	console.log('this is delUser', delUser);
	var index = users.indexOf(delUser);
	console.log(index);
	users.splice(index, 1);
	res.json(delUser.id + " has been deleted.");
});



app.listen(3000);