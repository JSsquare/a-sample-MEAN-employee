var express=require('express');
var app = express();
var db = require('./models/employeedb.js');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');

var employee = require('./server/employee.js');

// Creating our Express router
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', function(request,response){
  response.sendFile(__dirname+'/index.html');
});

app.get('/employee', function(req, res){
	    db.find({}, function(err,employees){	    	
        	res.json(employees);
        });
});

app.get('/edit_employee/:id', function(req, res){
	    db.find({'_id': req.params.id}, function(err,employees){	
	    	console.log(employees);    	
        	res.json(employees);
        });
});

app.post('/employee', function(req, res){	
	var d  = new Date();
	var age = (d.getFullYear() - Number(req.body.dob.split('-')[0]));
	req.body.age = age;
	delete req.body._id;
	var newEmployee = new Employee(req.body);
	newEmployee.save(function(err,savedStory){
       if(err){
         console.log("Error : While saving "+err);
         return res.status(500).send();
       }else{
         res.redirect("/");
       }
   });
});

app.delete('/employee/:id', function(req, res){
	 Employee.findOneAndRemove({'_id': req.params.id}, function(err, data){
	   if(err){
         console.log("Error : While saving ");
         return res.status(500).send();
       }else{
         res.json(data);
       }

	 });
});


app.put('/employee/:id', function(req, res){
	var d  = new Date();
	var age = (d.getFullYear() - Number(req.body.dob.split('-')[0]));
	req.body.age = age;
    
	Employee.findOneAndUpdate({'_id': req.params.id}, {$set: req.body}, function(err, data){
	   if(err){
         console.log("Error : While saving ");
         return res.status(500).send();
       }else{
         res.json(data);
       }

	 });
});

app.use(express.static(__dirname + '/public'));


var port = process.env.PORT || 8080;

var server=app.listen(port,function(req,res){
    console.log("Catch the action at http://localhost:"+port);
});