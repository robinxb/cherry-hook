#! /usr/bin/env node

var quere = require('queue-async');
var express = require('express');
var bodyParser = require('body-parser');
var task = require('queue-async')(1);
var config = require('./config.json');

var app = express();

app.use(bodyParser.json());

var port = 8888;
app.listen(port);
console.log('Listening on port ' + port);

app.post('*', function(req, res){
		res.send(202);
		task.defer(function(req, res){
				var eType = req.headers["x-github-event"];
				var body = req.body;
			}, req, res)
		})
