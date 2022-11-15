function HandleKeyDown(e)
{
	//Control blue character
	if(e.key === "ArrowUp")
		blue.speed = 1;
	if(e.key === "ArrowLeft")
		blue.rotationSpeed = 1.2;
	if(e.key === "ArrowRight")
		blue.rotationSpeed = -1.2;
	if(e.key === "ArrowDown")
		blue.shooting = true;
	
	//Control the red character
	if(e.key === "w")
		red.speed = 1;
	if(e.key === "a")
		red.rotationSpeed = 1.2;
	if(e.key === "d")
		red.rotationSpeed = -1.2;
	if(e.key === "s")
		red.shooting = true;
}

function HandleKeyUp(e)
{
	//Control blue character
	if(e.key === "ArrowUp")
		blue.speed = 0;
	if(e.key === "ArrowLeft")
		blue.rotationSpeed = 0;
	if(e.key === "ArrowRight")
		blue.rotationSpeed = 0;
	if(e.key === "ArrowDown")
		blue.shooting = false;
		
	//Control the red character
	if(e.key === "w")
		red.speed = 0;
	if(e.key === "a")
		red.rotationSpeed = 0;
	if(e.key === "d")
		red.rotationSpeed = 0;
	if(e.key === "s")
		red.shooting = false;
}

document.addEventListener("keydown", HandleKeyDown, true);
document.addEventListener("keyup", HandleKeyUp, true);