var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Logger Settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {colorize: true});
logger.level = 'debug';

// Initializing ShuckleBot

var bot = new Discord.Client({
	token: auth.token,
	autorun:true
});

bot.on('ready', function (evt) {
	logger.info('Connected');
	logger.info('Logged in as:');
	logger.info(bot.username + '-(' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
	/*  ShuckleBot needs to know if it needs to execute a command
		If messages start with '!', then Shuckle will pay attention to the message
	*/
	if (message.substring(0, 1) == '!') {
		var args = message.substring(1).split(' ');
		var cmd = args[0];

		args = args.splice(1);
		switch(cmd) {
			// Example case: !ping
			case 'ping':
				bot.sendMessage({
					to: channelID,
					message: 'Pong!'
				});
		}
	}
});
