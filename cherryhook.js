#! /usr/bin/env node

var quere = require('queue-async');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

var port = 8888;
app.listen(port);
console.log('Listening on port ' + port);

app.post('*', function(req, res){
		res.send(202);
		console.log('get a req');
		for (var i in req.body){
			console.log(i + ': ' + req.body[i]);
		}
		})
