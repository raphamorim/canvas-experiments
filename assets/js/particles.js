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

var getRand = function(type) {
    if (type === 'size')
	return (Math.floor(Math.random() * 8) * 10)

    if (type === 'color')
	return Math.floor(Math.random() * colors.length)

    if (type === 'pos')
	return [(Math.floor(Math.random() * 200) * 10), (Math.floor(Math.random() * 80) * 10)]

    return false
};

var drawParticle = function(x, y, size, color, opacity) {
     ctx.beginPath();
     ctx.globalAlpha = opacity;
     ctx.arc(x, y, size, 0, 2 * Math.PI);
     ctx.fillStyle = color;
     ctx.fill();
     ctx.strokeStyle = color;
     ctx.stroke();
}

function clean() {
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    particles.forEach(function(p) {
        /*
         * p[0] = x,
         * p[1] = y,
         * p[2] = color
         * p[3] = globalAlpha,
         * p[4] = size
         * */
        p[3] = p[3] - 0.06;
        drawParticle(p[0], p[1], p[4], p[2], p[3])

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

    var color = colors[getRand('color')],
        pos = getRand('pos'),
        size = getRand('size'),
        opacity = 1;

    drawParticle(pos[0], pos[1], size, color, opacity)
    times++;

    particles.push([pos[0], pos[1], color, opacity, size]);

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
