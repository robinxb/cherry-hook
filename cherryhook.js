#! /usr/bin/env node

var quere = require('queue-async');
var express = require('express');
var bodyParser = require('body-parser');
var task = require('queue-async')();
var path = require('path');
var cp = require('child_process');
var app = express();
app.use(bodyParser.json());

var config, listener;

var _reload_config = function(){
	if (typeof config !== 'undefined'){
		var pwd = path.resolve() + 'config.js';
		delete require.cache[pwd];
	}
	config = require('./config.json');
	listener = {};
	for (var itemid  in config.items){
		var item = config.items[itemid];
		for (var resid in item){
			var res = item[resid];
			var name = res.name,
				branch = res.branch,
				actions = res.actions;
			if (typeof listener[name] === 'undefined'){
				listener[name] = {};
			}
			for (var actionType in res.actions){
				var action = res.actions[actionType];
				var arrTask = config.scripts[res.actions[actionType]];
				if (typeof arrTask === 'undefined'){
					console.log('WARNING: task [' + res.actions[actionType] + '] in ' +
							name + 'not found');
					continue;
				}
				if (typeof listener[name][actionType] === 'undefined'){
					listener[name][actionType] = {};
				} 
				if (typeof listener[name][actionType][branch] === 'undefined'){
					listener[name][actionType][branch] = [];
				} 
				for (var i in arrTask){
					listener[name][actionType][branch].push(arrTask[i]);
				}
			}
		}
	}
};

_reload_config();

var port = config.port;
app.listen(port);
console.log('Listening on port ' + port);

var _runCMDcb = function(error, stdout, stderr){
	if (error){
		console.log(error.toString());
		return false;
	}else{
		console.log(stdout);
		return true;
	}
};

app.post('*', function(req, res){
		res.send(202);
		task.defer(function(req, res){
				var eType = req.headers["x-github-event"];
				var body = req.body;
				var branch = body.ref.split('/')[2];
				var name = body.repository.name;
				var actions = (listener[name] && listener[name][eType] && listener[name][eType][branch]);
				if (typeof actions === 'undefined'){
					console.log('INFO: ' + name + ':' + branch + ' got a ' + eType + ' trigger but no action fount.');
					return;
				}
				for (var i in actions){
						console.log('INFO: ' + name + ':' + branch + ' triggered script ' + actions[i]);
						var dirname = path.dirname(path.resolve(actions[i]));
						cp.execFile(actions[i],[dirname],{}, _runCMDcb);
				}
			}, req, res).await();
		});
