
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { session: req.session});
};

exports.login = function(req, res){
	  res.render('login');
	};
	
exports.register = function(req, res){
		  res.render('register');
		};
		
exports.newStory=function(req,res){
	          if(req.session.loggedIn !== true){
	            console.log("Logged In :"+req.session.loggedIn);
	            res.redirect('/login');
	          }else{
	              res.render('new-story',{session:req.session});
	          }

	    }

exports.techStack=function(req,res){
    res.render('techStack',{session:req.session});
}