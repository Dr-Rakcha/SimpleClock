var HOUR_HAND_COLOR = 'black',
	MINUTE_HAND_COLOR = 'black',
	SECOND_HAND_COLOR = 'red',
	DASH_COLOR = 'black',
	NUMBER_COLOR = 'black',
	NUMBER_90DEG_COLOR = 'red',
	TITLE_COLOR = 'black',
	TITLE = 'Quartz',
	WIDTH = 600,
	HEIGHT = 600;

var canvas = document.createElement('canvas');
var canvasBg = document.createElement('canvas');

canvas.style.cssText = canvasBg.style.cssText = 'display: block;position: absolute;left: 0;top: 0;right: 0;bottom: 0;margin:auto';

document.body.appendChild(canvasBg);
document.body.appendChild(canvas);

var ctx = canvas.getContext('2d');
var ctxBg = canvasBg.getContext('2d');

//Degree to radian
var rd = Math.PI / 180,
	size,
	scale,
	id;

function init() {
	canvas.height = canvasBg.height = HEIGHT;
	canvas.width = canvasBg.width = WIDTH;

	size = WIDTH < HEIGHT ? WIDTH : HEIGHT;
	scale = size / 600;

	ctx.translate(WIDTH >> 1, HEIGHT >> 1);
	ctxBg.translate(WIDTH >> 1, HEIGHT >> 1);
	ctx.scale(scale, scale);
	ctxBg.scale(scale, scale);

	ctxBg.lineCap = ctx.lineCap = 'round';
	ctxBg.textAlign = 'center';
	ctxBg.textBaseline = 'middle';

	ctx.shadowColor = 'black';
	ctx.shadowBlur = size / 100;
	ctx.shadowOffsetX = (-size * 2) / 300;
	ctx.shadowOffsetY = (size * 2) / 300;

	drawBackground();
}

function drawClock() {
	//1 clean canvas
	ctx.clearRect((-WIDTH / scale) >> 1, (-HEIGHT / scale) >> 1, WIDTH / scale, HEIGHT / scale);

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
	drawHnad(hAngle, 0, 200, 24, HOUR_HAND_COLOR); //Hour Hnad
	drawHnad(mAngle, 0, 272, 12, MINUTE_HAND_COLOR); //Minute Hnad
	drawSecondHand(sAngle, -48, 285, 5, SECOND_HAND_COLOR); //Second Hnad

	requestAnimationFrame(drawClock);
}

function start() {
	if (id == undefined) {
		id = requestAnimationFrame(drawClock);
	}
}

function drawHnad(angle, start, end, lineWidth, color) {
	ctx.strokeStyle = color;
	ctx.lineWidth = lineWidth;
	ctx.rotate((angle - 90) * rd);
	ctx.beginPath();
	ctx.moveTo(start, 0);
	ctx.lineTo(end, 0);
	ctx.stroke();
	ctx.rotate(-(angle - 90) * rd);
}

function drawSecondHand(angle, start, end, lineWidth, color) {
	drawHnad(angle, start, -100, lineWidth + 2, color);
	drawHnad(angle, start, end, lineWidth, color);
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(0, 0, 20, 0, 360 * rd);
	ctx.fill();
}

function drawBackground() {
	ctxBg.strokeStyle = DASH_COLOR;

	ctxBg.font = '45px arial';
	for (var i = 0, p; i < 360; i += 6) {
		var angle = (i - 60) * rd;
		var cos = Math.cos(angle);
		var sin = Math.sin(angle);
		if (i % 30 == 0) {
			ctxBg.lineWidth = 12;
			p = { x: cos * 256, y: sin * 256 };

			if ((i + 30) % 90 == 0) {
				ctxBg.fillStyle = NUMBER_90DEG_COLOR;
			} else {
				ctxBg.fillStyle = NUMBER_COLOR;
			}

			ctxBg.fillText(i / 30 + 1, cos * 219, sin * 219);
		} else {
			ctxBg.lineWidth = 6;
			p = { x: cos * 273, y: sin * 273 };
		}

		ctxBg.beginPath();
		ctxBg.moveTo(p.x, p.y);
		ctxBg.lineTo(cos * 288, sin * 288);
		ctxBg.stroke();
	}

	ctxBg.fillStyle = TITLE_COLOR;
	ctxBg.font = '20px arial';
	ctxBg.fillText(TITLE, 0, -140);
}

function setSize(width, height) {
	WIDTH = width;
	HEIGHT = height;

	init();
}

init();
start();
