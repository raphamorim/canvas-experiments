// RequestAnimFrame: a browser API for getting smooth animations
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
		  window.webkitRequestAnimationFrame ||
		  window.mozRequestAnimationFrame    ||
		  window.oRequestAnimationFrame      ||
		  window.msRequestAnimationFrame     ||
		  function( callback ){
			window.setTimeout(callback, 1000 / 60);
		  };
})();

//Flocking Behaviour
var canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d");

var w = window.innerWidth,
		h = window.innerHeight;

canvas.width = w;
canvas.height = h;

var particles = [],
		count = 1000,
		bounce = -.4,
		acc = 0.2;

function Particle() {
	this.x = Math.random() * w;
	this.y = Math.random() * (h/1.5);

	this.vy = Math.random() * 2;
	this.vx = -1 + Math.random() * 2;

	this.color = "rgba(255, 215, 0, 0.8)";
	this.radius = 0.75;
	this.hits = 0;

	this.draw = function() {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
		ctx.closePath();
		ctx.fill();
	};
}

//Fill the insects into flock
for(var i = 0; i < count; i++) {
	particles.push(new Particle());
}

function paintCanvas() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, w, h);
}

function draw() {
	paintCanvas();

	//Draw particles
	for(var j = 0; j < particles.length; j++) {
		var p = particles[j];
		p.draw();

		p.y += p.vy;
		p.x += p.vx;

		//Acceleration in acrion
		p.vy += acc;

		//Detect collision with floor
		if(p.y > h) {
			p.y = h - p.radius;
			p.vy *= bounce;
			p.hits++;
		}

		//Detect collision with walls
		if(p.x > w) {
			p.x = w - p.radius;
			p.vx *= bounce;
		}

		else if(p.x < 0) {
			p.x = 0 + p.radius;
			p.vx *= bounce;
		}

		//Regenerate particles
		if(p.hits > 4) {
			//console.log("hits = " + p.hits);
			particles[j] = new Particle()
		}
	}
}

// Start the main animation loop using requestAnimFrame
function animloop() {
	draw();
	requestAnimFrame(animloop);
}

animloop();
