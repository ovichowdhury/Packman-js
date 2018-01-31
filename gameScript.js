// game logic
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var x = 345;
var y = 245;
var radius = 20;
var dx = radius/2;
var dy = radius/2;

var oX = 50;
var oY = 245;
var oDx = 3;
var oDy = 3;

var point = 0;

document.addEventListener("keydown",moveBall,false);

function drawBall(){
	ctx.beginPath();
	ctx.fillStyle = 'yellow';
	ctx.arc(x,y,radius,0,Math.PI*2,false);
	ctx.fill();
	ctx.closePath();
}

function drawOponentBall(){
	ctx.beginPath();
	ctx.fillStyle = 'red';
	ctx.arc(oX,oY,radius,0,Math.PI*2,false);
	ctx.fill();
	ctx.closePath();
}

function moveOponentBall(){
	if(x > oX)
		oX = oX + oDx;
	if(x < oX)
		oX = oX - oDx;
	if(y > oY)
		oY = oY + oDy;
	if(y < oY)
		oY = oY - oDy;
}

function moveBall(e){
	switch(e.keyCode){
		case 37:
			//left arrow
			if(movingConditionLeft())
				x = x - dx;
			break;
		case 38:
			//up arrow
			if(movingConditionUp())
				y = y - dy;
			break;
		case 39:
			//right arrow
			if(movingConditionRight())
				x = x + dx;
			break;
		case 40:
			//down arrow
			if(movingConditionDown())
				y = y + dy;
			break;
	}
	draw();
}

function movingConditionLeft(){
	if(x-dx > radius/2)
		return true;
	else
		return false;
}

function movingConditionRight(){
	if(x+dx < canvas.width-radius/2)
		return true;
	else
		return false;
}

function movingConditionUp(){
	if(y-dy > radius/2)
		return true;
	else
		return false;
}

function movingConditionDown(){
	if(y+dy < (canvas.height - radius/2))
		return true;
	else
		return false;
}

function draw(){
	if(isIntersect()){
		alert("Game over");
		setDefaultCoordinates();
		point = 0;
	}
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBall();
	drawOponentBall();
	moveOponentBall();

}

function setGravity(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	if(movingConditionDown()){
		y = y + 2;
		draw();
	}
	else{
		draw();
	}
}

function isIntersect(){
	var disX = x - oX;
	var disY = y - oY;
	var distance = Math.sqrt(disX * disX + disY * disY); // +1 is not in equation this is added for perfection
	if(distance < 2*radius-1) // r1 + r2 = 2*radius // because two circle have same radius
		return true;
	else
		return false;
}

function setDefaultCoordinates(){
	x = 345;
	y = 245;
	oX = 50;
	oY = 245;
}

function incrementPoint(){
	point++;
	document.getElementById("point").innerHTML = point;
}


draw();
setInterval(setGravity,50);
setInterval(incrementPoint,1000);
