function SimpleClock(id,options) {
	this.settings = {
		colorHourHand: 'black',
		colorMinuteHand: 'black',
		colorSecondHand: 'red',
		colorNumber: 'black',
		colorNumber90Deg: 'red',
		colorDash: 'black',
		colorText: 'black',
		text: 'Quartz',
		width: 600,
		height: 600
	};
	for (var attrName in options) {
		this.settings[attrName] = options[attrName];
	}
	var container = document.getElementById(id),
		canvasBg = document.createElement('canvas'),
		canvas = document.createElement('canvas');

	this.ctx = canvas.getContext('2d');
	this.ctxBg = canvasBg.getContext('2d');

	if (!container) {
		throw '#'+id+' not found';
	}

	canvas.style.cssText = canvasBg.style.cssText = 'display: block;position: absolute;left: 0;top: 0;right: 0;bottom: 0;margin:auto';

	container.appendChild(canvasBg);
	container.appendChild(canvas);

	this.init();
	this.start();
}
SimpleClock.prototype = {
	init: function() {
		this.ctxBg.canvas.width = this.ctx.canvas.width = this.settings.width;
		this.ctxBg.canvas.height = this.ctx.canvas.height = this.settings.height;

		this.size = this.settings.height < this.settings.width ? this.settings.height : this.settings.width;
		this.scale = this.size / 600;

		this.ctx.translate(this.settings.width >> 1, this.settings.height >> 1);
		this.ctx.scale(this.scale, this.scale);

		this.ctxBg.translate(this.settings.width >> 1, this.settings.height >> 1);
		this.ctxBg.scale(this.scale, this.scale);

		this.ctxBg.lineCap = this.ctx.lineCap = 'round';
		this.ctxBg.textAlign = 'center';
		this.ctxBg.textBaseline = 'middle';

		this.ctx.shadowColor = 'black';
		this.ctx.shadowBlur = this.size / 100;
		this.ctx.shadowOffsetX = (-this.size * 2) / 300;
		this.ctx.shadowOffsetY = (this.size * 2) / 300;

		this.drawBackground();
	},

	drawClock: function() {
		//1 clean canvas
		this.ctx.clearRect((-this.settings.width / this.scale) >> 1, (-this.settings.height  / this.scale) >> 1, this.settings.width  / this.scale, this.settings.height  / this.scale);

		//2 update
		var now = new Date(),
			hour = now.getHours(),
			minute = now.getMinutes(),
			second = now.getSeconds(),
			millisecond = now.getMilliseconds(),
			hAngle = (hour + minute / 60) * 30,
			mAngle = (minute + second / 60) * 6,
			sAngle = (second + millisecond / 1000) * 6;

		//3 rendering

		this.drawHnad(hAngle, 0, 200, 24, this.settings.colorHourHand); //Hour Hnad
		this.drawHnad(mAngle, 0, 272, 12, this.settings.colorMinuteHand); //Minute Hnad
		this.drawSecondHand(sAngle, -48, 285, 5, this.settings.colorSecondHand); //Second Hnad

		requestAnimationFrame(this.drawClock.bind(this));
	},

	start: function start() {
		requestAnimationFrame(this.drawClock.bind(this));
	},
	
	drawSecondHand: function(angle, start, end, lineWidth, color) {
		//draw tail
		this.drawHnad(angle, start, -100, lineWidth + 2, color);
		this.drawHnad(angle, start, end, lineWidth, color);
		//draw Circle
		this.ctx.fillStyle = color;
		this.ctx.beginPath();
		this.ctx.arc(0, 0, 20, 0, 2 * Math.PI);
		this.ctx.fill();
	},

	drawHnad: function(angle, start, end, lineWidth, color) {
		this.ctx.strokeStyle = color;
		this.ctx.lineWidth = lineWidth;
		this.ctx.rotate(((angle - 90) * Math.PI) / 180);
		this.ctx.beginPath();
		this.ctx.moveTo(start, 0);
		this.ctx.lineTo(end, 0);
		this.ctx.stroke();
		this.ctx.rotate((-(angle - 90) * Math.PI) / 180);
	},

	drawBackground: function() {
		this.ctxBg.strokeStyle = this.settings.colorDash;
		this.ctxBg.font = '45px arial';

		for (var i = 0, p; i < 360; i += 6) {
			var angle = ((i - 60) * Math.PI) / 180;
			var cos = Math.cos(angle);
			var sin = Math.sin(angle);
			if (i % 30 == 0) {
				this.ctxBg.lineWidth = 12;
				p = { x: cos * 256, y: sin * 256 };

				if ((i + 30) % 90 == 0) {
					this.ctxBg.fillStyle = this.settings.colorNumber90Deg;
				} else {
					this.ctxBg.fillStyle = this.settings.colorNumber;
				}

				this.ctxBg.fillText(i / 30 + 1, cos * 219, sin * 219);
			} else {
				this.ctxBg.lineWidth = 6;
				p = { x: cos * 273, y: sin * 273 };
			}

			this.ctxBg.beginPath();
			this.ctxBg.moveTo(p.x, p.y);
			this.ctxBg.lineTo(cos * 288, sin * 288);
			this.ctxBg.stroke();
		}

		this.ctxBg.fillStyle = this.settings.colorText;
		this.ctxBg.font = '20px arial';
		this.ctxBg.fillText(this.settings.text, 0, -140);
	},

	setSize: function(width, height) {
		this.settings.width = width;
		this.settings.height = height;
		this.init();
	}
};
