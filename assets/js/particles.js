// Settings
var speed = 35,
	canvas_width = window.innerWidth,
	canvas_height = window.innerHeight;

window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

var canvas,
	ctx,
	times = 0,
	limit = 100,
	draw,
	particles = [],
	colors = ['#f0fd36', '#f49ff1', '#f53eac', '#76fbfa'];

var getRandColor = function() {
	return Math.floor(Math.random() * colors.length);
};

var getRand = function() {
	return (Math.floor(Math.random() * 8) * 10);
};

var getRandPos = function() {
	return [(Math.floor(Math.random() * 200) * 10), (Math.floor(Math.random() * 80) * 10)];
};

function clean() {
	ctx.clearRect(0, 0, canvas_width, canvas_height);

	particles.forEach(function(p) {
		// p[0] = x, p[1] = y, p[2] = color
		// p[3] = globalAlpha, p[4] = size

		p[3] = p[3] - 0.06;

		ctx.beginPath();
		ctx.globalAlpha = p[3];
		ctx.arc(p[0], p[1], p[4], 0, 2 * Math.PI);
		ctx.fillStyle = p[2];
		ctx.fill();
		ctx.strokeStyle = p[2];
		ctx.stroke();

		if (p[p.length - 1] && p[3] <= 0.0) {
			ctx.clearRect(0, 0, canvas_width, canvas_height);
			clearInterval(draw);
			times = 0;
			particles = []
			draw = setInterval(update, speed);
		}
	});
}

function update(args) {
	var randColor = colors[getRandColor()],
		randPos = getRandPos(),
		randSize = getRand();

	ctx.beginPath();
	ctx.globalAlpha = 1;
	ctx.arc(randPos[0], randPos[1], randSize, 0, 2 * Math.PI);
	ctx.fillStyle = randColor;
	ctx.fill();
	ctx.strokeStyle = randColor;
	ctx.stroke();

	times++;

	particles.push([randPos[0], randPos[1], randColor, 1, randSize]);

	if (times >= limit) {
		clearInterval(draw);
		draw = setInterval(clean, speed);
	}
}

window.onload = function() {
	var body = document.querySelector('body');
	body.style.background = '#2C2C44';

	canvas = document.getElementById('particles'),
		ctx = canvas.getContext('2d');

	body.style.margin = '0px';
	canvas.style.margin = '0px';
	canvas.style.padding = '0px';

	canvas.width = canvas_width;
	canvas.height = canvas_height;

	draw = setInterval(update, speed);
}
