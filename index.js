require("colors");

// 动画配置信息
var animateInfo = {};

function doubel(value){
	return (value < 10 ? "0" : "") + value;
}
function time(){
	var now = new Date();
	now = "[" + [doubel(now.getHours()), doubel(now.getMinutes()), doubel(now.getSeconds())].join(":") + "]";
	return now.gray.dim;
}

module.exports = {
	log: function(info){
		this.stopAnimate();

		console.log(info);
	},
	error: function(info){
		this.stopAnimate();

		if(typeof info === "string"){
			info.split("\n").forEach(function(info){
				console.log(time(), info.red);
			});
		}else{
			console.log(time(), "Error:>>>".red);
			console.log(info);
		}
	},
	success: function(info){
		this.stopAnimate();

		info.split("\n").forEach(function(info){
			console.log(time(), info.green);
		});
	},
	warn: function(info){
		this.stopAnimate();

		info.split("\n").forEach(function(info){
			console.log(time(), info.yellow);
		});
	},
	info: function(info){
		this.stopAnimate();

		info.split("\n").forEach(function(info){
			console.log(time(), info.blue);
		});
	},
	title: function(info){
		this.stopAnimate();

		info = "==========" + info + "==========";
		console.log(info.bold);
	},
	animate: function(items, config){
		if(!items || items === "default"){
			items = ["   ", ".  ", ".. ", "..."];
		}

		this.stopAnimate();

		animateInfo.config = config || {};
		if(animateInfo.config.content){
			process.stdout.write(animateInfo.config.content);
		}

		var count = items.length;
		var index = 0;

		animateInfo.currentFrame = "";
		this.intervalHandler = setInterval(function(){
			var clearString = animateInfo.currentFrame ? new Array(animateInfo.currentFrame.length + 1).join("\b") : "";

			animateInfo.currentFrame = items[(index ++) % count];

			process.stdout.write(clearString + animateInfo.currentFrame);
		}.bind(this), animateInfo.config.fps || 300);
	},
	stopAnimate: function(){
		if(this.intervalHandler){
			clearInterval(this.intervalHandler);
			this.intervalHandler = null;

			if(animateInfo.currentFrame){
				process.stdout.write("\r");
				if(animateInfo.config.content){
					console.log(animateInfo.config.content + new Array(animateInfo.currentFrame.length + 1).join(" "));
				}
				animateInfo.currentFrame = "";
			}
		}
	}
};