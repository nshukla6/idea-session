
/**
 * Module dependencies.
 */
var db=require('./model/db.js');
var express = require('express')
  , routes = require('./routes/index')
  , user = require('./routes/user')
  , bodyParser=require('body-parser')
  , session=require('express-session')
  , chalk=require('chalk');
 
var story=require('./routes/story');

var app = express();


// all environments

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({secret:"qazwsxedcrfvtgbyhnujm",resave: true, saveUninitialized: true,cookie:{maxAge:30*60*1000}}));

app.use(express.static(__dirname + '/public'));



app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/register', routes.register);
app.post('/authenticate',user.login);
app.post('/newUser',user.doCreate);
app.get('/logout',user.logout);
app.get('/registrationSuccessful',user.registrationSuccessful);
app.get('/new-story',routes.newStory);
app.post('/add-story',story.addStory);
app.get('/stories',story.stories);
app.post('/stories/:slug/saveComment',story.saveComment);
app.get('/stories/:story',story.getStory);
app.get('/logout',user.logout);
app.get('/techStack',routes.techStack);

app.use(function(req, res) {
     console.log(chalk.red("Error: 404"));
     res.status(404).render('404');
});

app.use(function(error, req, res, next) {
     console.log(chalk.red('Error : 500'+error))
     res.status(500).render('500');
});



var port = process.env.PORT || 3000;

var server=app.listen(port,function(req,res){
    console.log(chalk.green("Catch the action at http://localhost:"+port));
});
