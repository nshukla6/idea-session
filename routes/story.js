var mongoose = require('mongoose');
var Story = mongoose.model('Story');


exports.stories=function(req,res){
             Story.find({}, function(err,stories){
                  res.render('home',{stories:stories,session:req.session});
              });
};



exports.addStory=function(req,res){
   var title=req.body.title;
   var content=req.body.content;
   var summary=req.body.summary;
   var imageLink=req.body.imageLink;
   var author =req.session.username;
   console.log("Author is :"+author);

   var newStory=new Story();
   newStory.author=author;
   newStory.title=title;
   newStory.content=content;
   newStory.summary=summary;
   newStory.imageLink=imageLink;

   var lowercaseTitle=newStory.title.toLowerCase();
   var slug=lowercaseTitle.replace(/[^a-zA-Z0-9 ]/g, "");
   var addingHyphen=slug.replace(/\s+/g, '-');

   newStory.slug=addingHyphen;
if(author!==undefined){
   newStory.save(function(err,savedStory){
       if(err){
         console.log("Error : While saving the story"+err);
         return res.status(500).send();
       }else{
         res.redirect("/stories");
       }
   });
}else{
	console.log("session time Out :"+author);
	    res.render('logout',{loggedOutUser:author});
	
}
};

exports.getStory=function(req,res){
	   var url=req.params.story;
	   Story.findOne({slug:url}, function(err,story){
		   if(err){
			   console.log("error retrieving story");
		   }
	           res.render('story',{story:story,session:req.session});
	        });
	}



exports.saveComment=function(req,res){
	console.log("inside story.js");
	   var story_slug=req.params.slug;
	   var comment=req.body.comment;
	   var posted_date=new Date();
	   var user=req.session.username;
	   console.log("user in session "+user);

	   Story.findOne({slug:story_slug}, function(err,story){
		   console.log("getting data");

	               story.comments.push({body:comment,commented_by:req.session.username,date:posted_date});

	              if(user!==undefined){
	               story.save(function(err,savedStory){
	                   if(err){
	                     console.log("Error : While saving comments");
	                     return res.status(500).send();
	                   }
	                   else{
	                	   console.log("story")
	                     res.render('story',{story:story,session:req.session});
	                   }
	                   
	               });
	              }
	              else{
	            	  console.log("session time Out :"+user);
	          	    res.render('logout',{loggedOutUser:user});
	          	
	              }

	        });
	 }

