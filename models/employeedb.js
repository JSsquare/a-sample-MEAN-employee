var chalk = require('chalk');
var mongoose = require( 'mongoose' );

var dbURI = 'mongodb://admin:admin123@ds157390.mlab.com:57390/samplemean';

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


var employeeSchema = new mongoose.Schema({
  name: {type: String},
  email: {type: String},
  dob: {type: Date},
  department: {type: String},
  gender: {type: String},
  age: {type: Number}

});

// Build the Employee model
module.exports = mongoose.model( 'Employee', employeeSchema );

