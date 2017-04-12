var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');

exports.allEmployees = function(req,res){
            Employee.find({}, function(err,employees){
                 
              });
}

exports.addEmployee = function(req,res){
             
             console.log(req.body);
}


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

   newStory.save(function(err,savedStory){
       if(err){
         console.log("Error : While saving the story");
         return res.status(500).send();
       }else{
         res.redirect("/stories");
       }
   });
}
