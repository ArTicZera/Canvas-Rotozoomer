var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");
			
var w = canvas.width;
var h = canvas.height;
			
var i = 1;
var angle = 0;
var scale = 1;

var a = 1;
var b = 1;

var red = 1;
var green = 1;
var blue = 1;

var speed = 1;

var pattern = "XOR";
var rotation = "ABS";
var loop = true;
var bonus = 0;
var fx = 0.0;

function Rotozoomer() 
{
	ctx.clearRect(0, 0, w, h);

	for (var x = 0; x < w; x++) 
	{
		for (var y = 0; y < h; y++) 
		{
			var zx = x - (w / 2);
			var zy = y - (h / 2);
			
			var cx = Math.cos(angle) * zx - Math.sin(angle) * zy;
			var cy = Math.sin(angle) * zx + Math.cos(angle) * zy;

			cx = updateRotation(rotation, cx);
			cy = updateRotation(rotation, cy);
			
			if (bonus === 4)
			{	
				pattern = "AND"; rotation = "EXP";
				b = 0.0001; loop = true;
			}
			
			if (bonus === 0 && loop) 
			{
				pattern = "XOR"; rotation = "ABS";
				speed = 1; b = 1; loop = false;
			}

			if (bonus === 1)
			{
				var ax = Math.sin(Math.atan(angle / 10)) * (x - y * i);
				var ay = Math.sin(Math.atan(angle / 10)) * (x * i + y);
				
				cx += ax;
				cy += ay;
				
				pattern = "AND"; rotation = "ABS"; 
				speed = 10; b = 1; loop = true;
			}
			
			if (bonus === 2)
			{
				cx *= cx;
				cy *= cy;
				
				pattern = "AND"; rotation = "ABS"; 
				speed = 1; b = 1; loop = true;
			}
			
			fx = updatePattern(pattern, cx, cy, a, b, i);
			
			if (bonus === 3)
			{
				cx = Math.abs(Math.cos(angle) * zx - Math.sin(angle) * zy);
			    cy = Math.abs(Math.sin(angle) * zx + Math.cos(angle) * zy);
				
				var fx = updatePattern(pattern, x + (x ^ y), y + (x ^ y), a, b, i);
				speed = 1; b = 1; loop = true;
			}

			ctx.fillStyle = "rgb(" + fx * red + "," + fx * green + "," + fx * blue + ")";
			ctx.fillRect(x, y, 1, 1);
		}
	}

	i += speed;
	angle += 0.01;

	requestAnimationFrame(Rotozoomer);
}

function changePattern(event)
{
	var pat = event.target.value;
	
	if (pat === "XOR") pattern = "XOR";
	if (pat === "AND") pattern = "AND";
	if (pat === "OR")  pattern = "OR";
	if (pat === "SHR") pattern = "SHR";
	if (pat === "SHL") pattern = "SHL";
	if (pat === "MOD") pattern = "MOD";
	if (pat === "ADD") pattern = "ADD";
	if (pat === "SUB") pattern = "SUB";
	if (pat === "MUL") pattern = "MUL";
	if (pat === "DIV") pattern = "DIV";
	
	angle = 0; i = 0;
}

function changeRotation(event)
{
	var rot = event.target.value;
	
	if (rot === "ROTO")  rotation = "ROTO";
	if (rot === "ABS")   rotation = "ABS";
	if (rot === "SIN")   rotation = "SIN";
	if (rot === "TAN")   rotation = "TAN";
	if (rot === "ASIN")  rotation = "ASIN";
	if (rot === "ATAN")  rotation = "ATAN";
	if (rot === "ATANH") rotation = "ATANH";
	if (rot === "EXP")   rotation = "EXP";
	if (rot === "SQRT")  rotation = "SQRT";
	
	angle = 0; i = 0;
}

function updateRotation(rotation, xs)
{
	var ys;
	
	switch(rotation)
	{
		case "ROTO": 
			ys = xs;
			break;
		case "ABS":
			ys = Math.abs(xs);
			break;
		case "SIN":
			ys = Math.sin(xs);
			break;
		case "TAN":
			ys = Math.tan(xs);
			break;
		case "ASIN":
			ys = Math.asin(xs);
			break;
		case "ATAN":
			ys = Math.atan(xs);
			break;
		case "ATANH":
			ys = Math.atanh(xs);
			break;
		case "EXP":
			ys = Math.exp(xs);
			break;
		default:
			ys = Math.sqrt(xs);
	}

	return ys;
}

function updatePattern(pattern, cx, cy, a, b, i)
{
	var fx;
	
	switch(pattern)
	{
		case "XOR": 
			fx = ((cx + i) ^ (cy + i) / a) * b;
			break;
		case "AND":
			fx = ((cx + i) & (cy + i) / a) * b;
			break;
		case "OR":
			fx = ((cx + i) | (cy + i) / a) * b;
			break;
		case "SHR":
			fx = ((cx + i) >> (cy + i) / a) * b;
			break;
		case "SHL":
			fx = ((cx + i) << (cy + i) / a) * b;
			break;
		case "MOD":
			fx = ((cx + i) % (cy + i) / a) * b;
			break;
		case "ADD":
			fx = ((cx + i) + (cy + i) / a) * b;
			break;
		case "SUB":
			fx = ((cx + i) - (cy + i) / a) * b;
			break;
		case "MUL":
			fx = ((cx + i) * (cy + i) / a) * b;
			break;
		default:
			fx = ((cx + i) / (cy + i) / a) * b;
	}

	return fx;
}

function changeBonus(event)
{
	var bon = event.target.value;
	
	if (bon === "---") bonus = 0;
	if (bon === "Sierpinski") bonus = 1;
	if (bon === "Secret 1") bonus = 2;
	if (bon === "Secret 2") bonus = 3;
	if (bon === "Secret 3") bonus = 4;
	
	angle = 0; i = 0;
}

function reset()
{
	angle = 0; i = 0;
}

function resetall()
{
	a = 1; b = 1; i = 1;
	angle = 0; speed = 1;
	red = 1; green = 1; blue = 1;
	pattern = "XOR"; rotation = "ABS";
}

function updateA() 
{
    var inputA = document.getElementById("Zoom");
    var currentA = document.getElementById("currentA");
	
    a = parseFloat(inputA.value);
    currentA.textContent = a;
}

function updateB() 
{
    var inputB = document.getElementById("Saturation");
    var currentB = document.getElementById("currentB");
	
    b = parseFloat(inputB.value);
    currentB.textContent = b;
}

function updateSpeed() 
{
    var inputSpeed = document.getElementById("Speed");
    var currentSpeed = document.getElementById("currentSpeed");
	
    speed = parseFloat(inputSpeed.value);
    currentSpeed.textContent = speed;
}

function updateRed() 
{
    var inputRed = document.getElementById("Red");
    var currentRed = document.getElementById("currentRed");
	
    red = parseFloat(inputRed.value);
    currentRed.textContent = red;
}

function updateGreen() 
{
    var inputGreen = document.getElementById("Green");
    var currentGreen = document.getElementById("currentGreen");
	
    green = parseFloat(inputGreen.value);
    currentGreen.textContent = green;
}

function updateBlue() 
{
    var inputBlue = document.getElementById("Blue");
    var currentBlue = document.getElementById("currentBlue");
	
    blue = parseFloat(inputBlue.value);
    currentBlue.textContent = blue;
}

Rotozoomer();
