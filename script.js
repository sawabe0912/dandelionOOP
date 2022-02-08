const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fluffArray = [];
let toX;
let toY;
let stem;
let leafLeftBottom;
let leafLeftTop;
let leafRightBottom;
let leafRightTop;
let colorOffluff;
let circleOfDandelion;
let circleOfRainDrop;
let radiusOfDandelion = 15;
let dandelionCOfX = 200;
let dandelionCOfY = 200;
let distanceX;
let distanceY;
let powerX;
let powerY;
let sqrtD;

var mouseX = 0;
var mouseY = 0;
var radiusOfSun = 50;
var leafLeftTopX = 150;
var leafTopY = 400;
var leafRightTopX = 250;
var canvasPos = getPos(canvas);

canvas.addEventListener("mousemove", setMOfPos, false);
window.addEventListener("resize", function () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

function update() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.beginPath();
	context.arc(mouseX, mouseY, radiusOfSun, 0, 2 * Math.PI, true);
	context.fillStyle = "orange";
	context.fill();

	distanceX = Math.abs(dandelionCOfX - mouseX);
	distanceY = Math.abs(dandelionCOfY - mouseY);
	powerX = distanceX * distanceX;
	powerY = distanceY * distanceY;
	sqrtD = Math.sqrt(powerX + powerY);

	console.log("sqrt is ", sqrtD);
	console.log("This is radis", radiusOfDandelion + radiusOfSun);

	createLines();

	createC();
	if (sqrtD <= radiusOfDandelion + radiusOfSun) {
		console.log("YEs!!");

		for (let i = 0; i < fluffArray.length; i++) {
			fluffArray[i].color = "yellow";
		}
	}
	requestAnimationFrame(update);
}

update();

function Line(x, y, toX, toY, width, color) {
	this.x = x;
	this.y = y;
	this.toX = toX;
	this.toY = toY;
	this.color = color;
	this.width = width;

	this.draw = function (context) {
		context.beginPath();
		context.lineWidth = width;
		context.moveTo(x, y);
		context.lineTo(toX, toY);
		context.width = width;
		context.strokeStyle = this.color;
		context.stroke();
	};
}

function createLines() {
	stem = new Line(200, 200, 200, 500, 13, "#7FFF00");
	leafLeftBottom = new Line(200, 500, leafLeftTopX, leafTopY, 10, "7FFF00");
	leafLeftTop = new Line(200, 450, leafLeftTopX, leafTopY, 10, "7FFF00");

	leafRightBottom = new Line(200, 500, leafRightTopX, leafTopY, 10, "7FFF00");
	leafRightTop = new Line(200, 450, leafRightTopX, leafTopY, 10, "7FFF00");
	stem.draw(context);
	leafLeftBottom.draw(context);
	leafLeftTop.draw(context);
	leafRightBottom.draw(context);
	leafRightTop.draw(context);

	for (let i = 0; i < 200; i++) {
		toX = Math.random() * 250 + 70;
		toY = Math.random() * 250 + 70;

		fluffArray.push(new Line(200, 200, toX, toY, 1, "white"));

		fluffArray[i].draw(context);
	}
}

function Circle(x, y, radius, color) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;

	this.draw2 = function (context) {
		context.beginPath();
		context.arc(x, y, radius, 0, 2 * Math.PI, true);
		context.fillStyle = color;
		context.fill();
	};
}

function createC() {
	circleOfDandelion = new Circle(
		dandelionCOfX,
		dandelionCOfY,
		radiusOfDandelion,
		"SpringGreen"
	);
	circleOfDandelion.draw2(context);

	circleOfRainDrop = new Circle(170, 410, 5, "Deepskyblue");
	circleOfRainDrop.draw2(context);
}

function getPos(e) {
	var xPos = 0;
	var yPos = 0;
	while (e) {
		xPos += e.offsetLeft - e.scrollLeft + e.clientLeft;
		yPos += e.offsetTop - e.scrollTop + e.clientTop;
		e = e.offsetParent;
	}
	return {
		x: xPos,
		y: yPos
	};
}

function setMOfPos(e) {
	mouseX = e.clientX - canvasPos.x;
	mouseY = e.clientY - canvasPos.y;
	context.clearRect(0, 0, canvas.width, canvas.height);
}
