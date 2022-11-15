function HandleKeyDown(e)
{
	//Car 1
	if(e.key === "ArrowRight")
		car1.rotationSpeed = -0.75;
	if(e.key === "ArrowLeft")
		car1.rotationSpeed = 0.75;
	if(e.key === "ArrowUp")
		car1.acceleration = 0.04;
	if(e.key === "ArrowDown")
		car1.rotation += 180;

	//Car 2
	if(e.key === "d")
		car2.rotationSpeed = -0.75;
	if(e.key === "a")
		car2.rotationSpeed = 0.75;
	if(e.key === "w")
		car2.acceleration = 0.04;
	if(e.key === "s")
		car2.rotation += 180;
}

function HandleKeyUp(e)
{
	//Car 1
	if(e.key === "ArrowRight")
		car1.rotationSpeed = 0;
	if(e.key === "ArrowLeft")
		car1.rotationSpeed = 0;
	if(e.key === "ArrowUp")
		car1.acceleration = 0;

	//Car 2
	if(e.key === "d")
		car2.rotationSpeed = 0;
	if(e.key === "a")
		car2.rotationSpeed = 0;
	if(e.key === "w")
		car2.acceleration = 0;
}

document.addEventListener("keydown", HandleKeyDown, true);
document.addEventListener("keyup", HandleKeyUp, true);
