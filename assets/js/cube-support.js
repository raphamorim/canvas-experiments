window.onload = start;

var angle = 0;
var vertices = [
    new Point3D(-1, 1, -1),
    new Point3D(1, 1, -1),
    new Point3D(1, -1, -1),
    new Point3D(-1, -1, -1),
    new Point3D(-1, 1, 1),
    new Point3D(1, 1, 1),
    new Point3D(1, -1, 1),
    new Point3D(-1, -1, 1)
];
// Define the vertices that compose each of the 6 faces. These numbers are
// indices to the vertex list defined above.
var faces = [
    [0, 1, 2, 3],
    [1, 5, 6, 2],
    [5, 4, 7, 6],
    [4, 0, 3, 7],
    [0, 4, 5, 1],
    [3, 2, 6, 7]
];
var colors = [
    [255, 0, 0],
    [0, 255, 0],
    [0, 0, 255],
    [255, 255, 0],
    [0, 255, 255],
    [255, 0, 255]
];

function Point3D(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.rotateX = function(angle) {
        var rad, cosa, sina, y, z
        rad = angle * Math.PI / 180
        cosa = Math.cos(rad)
        sina = Math.sin(rad)
        y = this.y * cosa - this.z * sina
        z = this.y * sina + this.z * cosa
        return new Point3D(this.x, y, z)
    }

    this.rotateY = function(angle) {
        var rad, cosa, sina, x, z
        rad = angle * Math.PI / 180
        cosa = Math.cos(rad)
        sina = Math.sin(rad)
        z = this.z * cosa - this.x * sina
        x = this.z * sina + this.x * cosa
        return new Point3D(x, this.y, z)
    }

    this.rotateZ = function(angle) {
        var rad, cosa, sina, x, y
        rad = angle * Math.PI / 180
        cosa = Math.cos(rad)
        sina = Math.sin(rad)
        x = this.x * cosa - this.y * sina
        y = this.x * sina + this.y * cosa
        return new Point3D(x, y, this.z)
    }

    this.project = function(viewWidth, viewHeight, fov, viewDistance) {
        var factor, x, y
        factor = fov / (viewDistance + this.z)
        x = this.x * factor + viewWidth / 2
        y = this.y * factor + viewHeight / 2
        return new Point3D(x, y, this.z)
    }
}

function arrayToRGB(arr) {
    if (arr.length == 3)
        return 'rgb(' + arr[0] + ',' + arr[1] + ',' + arr[2] + ')';

    return 'rgb(0,0,0)';
}

function start() {
    canvas = document.getElementById('cube');
    if (canvas && canvas.getContext) {
        ctx = canvas.getContext('2d');
        setInterval(loop, 33);
    }
}

function loop() {
    var t = new Array();

    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, 400, 250);

    for (var i = 0; i < vertices.length; i++) {
        var v = vertices[i];
        var r = v.rotateX(angle).rotateY(angle);
        var p = r.project(400, 250, 200, 4);
        t.push(p)
    }

    var avg_z = new Array();

    for (var i = 0; i < faces.length; i++) {
        var f = faces[i];
        avg_z[i] = {
            "index": i,
            "z": (t[f[0]].z + t[f[1]].z + t[f[2]].z + t[f[3]].z) / 4.0
        };
    }

    avg_z.sort(function(a, b) {
        return b.z - a.z;
    });

    for (var i = 0; i < faces.length; i++) {
        var f = faces[avg_z[i].index]

        ctx.fillStyle = arrayToRGB(colors[avg_z[i].index]);
        ctx.beginPath()
        ctx.moveTo(t[f[0]].x, t[f[0]].y)
        ctx.lineTo(t[f[1]].x, t[f[1]].y)
        ctx.lineTo(t[f[2]].x, t[f[2]].y)
        ctx.lineTo(t[f[3]].x, t[f[3]].y)
        ctx.closePath()
        ctx.fill()
    }
    angle += 2
}