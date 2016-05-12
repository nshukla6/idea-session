var chalk = require('chalk');
var mongoose = require( 'mongoose' );



var dbURI = 'mongodb://nitin:nitin@ds021182.mlab.com:21182/idea';

mongoose.connect(dbURI);


mongoose.connection.on('connected', function () {
  console.log(chalk.yellow('Mongoose connected to ' + dbURI));
});

mongoose.connection.on('error',function (err) {
  console.log(chalk.red('Mongoose connection error: ' + err));
});

mongoose.connection.on('disconnected', function () {
  console.log(chalk.red('Mongoose disconnected'));
});


var userSchema = new mongoose.Schema({
	  username: {type: String, unique:true},
	  email: {type: String, unique:true},
	  password: String
	});

mongoose.model( 'User', userSchema );


//Stories Schema

var storiesSchema = new mongoose.Schema({
	
  author:String,
  title: {type: String,unique:true},
  created_at:{type:Date,default:Date.now},
  summary:String,
  content: {type: String},
  imageLink:String,
  comments:[{body:String,commented_by:String,date:Date}],
  slug:String
});

// Build the User model

mongoose.model( 'Story', storiesSchema,'stories');
