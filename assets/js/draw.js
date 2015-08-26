// Settings
var times = 0,
	mouse = {
		x: 90,
		y: 40
	},
	canvas_width = 960,
	canvas_height = 600,
	canvas,
	ctx,
	draw,
	colors = ['#526E8C', '#1B91E3', '#29B191', '#E5473C'];

var getRandColor = function() {
	return Math.floor(Math.random() * colors.length);
};

var getRand = function() {
	return Math.floor(Math.random() * 100);
};

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

function start() {
	canvas.onmousemove = function(e) {
		var mousePos = getMousePos(canvas, e);
		mouse.x = mousePos.x;
		mouse.y = mousePos.y;

		ctx.beginPath();
		ctx.arc(mouse.x, mouse.y, 30, 0, 2 * Math.PI);
		ctx.strokeStyle = colors[getRandColor()];
		ctx.stroke();

		e.preventDefault();
	};

	canvas.onmouseout = function(e) {
		e.preventDefault();
	};

	canvas.onmouseup = function(e) {
		e.preventDefault();
	};

	canvas.oncontextmenu = function(e) {
		e.preventDefault();
	};
}

function events(ctx) {
	var clean = document.querySelector('.clean');

	clean.addEventListener('click', function(e) {
		ctx.clearRect(0, 0, canvas_width, canvas_height);
	});
}

window.onload = function() {
	canvas = document.getElementById("draw"),
		ctx = canvas.getContext("2d");

	canvas.width = canvas_width;
	canvas.height = canvas_height;

	events(ctx);

	start();
}