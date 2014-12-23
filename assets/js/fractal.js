// Settings
var times = 0,
	canvas_width = 1200,
	canvas_height = 800;

window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
};

var canvas,
	ctx,
	draw,
	colors = ['#526E8C', '#1B91E3', '#29B191', '#E5473C'];

var getRandColor = function(){
	return Math.floor(Math.random() * colors.length);
};

var getRand = function(){
	return Math.floor(Math.random() * 100);
};

function update(args) {
	ctx.beginPath();
    ctx.arc(95 + times,50 + times,40 + getRand(),0,2*Math.PI);
    ctx.strokeStyle = colors[getRandColor()];
	ctx.stroke();

	times++;

	if (times >= 500) {
		clearInterval(draw);
		times = 0;
	}
}

function start() {
	canvas.onmousemove = function (e) {
  		e.preventDefault();
    };

    canvas.onmouseout = function (e) {
    	e.preventDefault();
    };

    canvas.onmouseup = function (e) {
    	e.preventDefault();
    };

	canvas.oncontextmenu = function (e) {
        e.preventDefault();
    };
}

window.onload = function () {
	canvas = document.getElementById("fractal"),
	ctx = canvas.getContext("2d");

	canvas.width = canvas_width;
	canvas.height = canvas_height;

	ctx.beginPath();
	ctx.arc(95,50,40,0,2*Math.PI);
	ctx.strokeStyle = colors[getRandColor()];
	ctx.stroke();

	start();

	draw = setInterval(update, 40);
}
