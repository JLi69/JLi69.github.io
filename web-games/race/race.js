//Cars
var car1 = new Car(210, 510, 0, "#FF0000"), car2 = new Car(210, 450, 0, "#0044FF");
var banana = new Banana(track), protein = new Protein(track);

function Draw()
{
	ctx.fillStyle = "#00FF00";
	ctx.fillRect(0, 0, 1200, 600);
	
	for(var i = 0; i < track.length; i++)
	{
		//Road
		if(track[i] === "#")
		{
			ctx.fillStyle = "#666666";
			ctx.fillRect(i % 20 * 60, (i - i % 20) / 20 * 60, 60, 60);
		}
		//Mud
		else if(track[i] === "*")
		{
			ctx.fillStyle = "#873E23";
			ctx.fillRect(i % 20 * 60, (i - i % 20) / 20 * 60, 60, 60);
		}
		//Start/finish line
		else if(track[i] === "X")
		{
			//Checkerboard pattern
			for(var x = 0; x < 6; x++)
				for(var y = 0; y < 6; y++)
				{
					if(x % 2 === y % 2)
						ctx.fillStyle = "#000000";
					else
						ctx.fillStyle = "#FFFFFF";
					ctx.fillRect(i % 20 * 60 + 10 * x, (i - i % 20) / 20 * 60 + 10 * y, 10, 10);
				}
		}
	}
	
	//Draw the banana
	banana.Draw(ctx);
	//Draw the protein powder
	protein.Draw(ctx);
	
	//Draw the cars
	car1.Draw(ctx);
	car2.Draw(ctx);
	
	car1.Move();
	car2.Move();
	
	//Handle car collision
	var dist = Math.sqrt((car1.x - car2.x) * (car1.x - car2.x) + (car1.y - car2.y) * (car1.y - car2.y));
	if(dist < 50 && car1.health > 0 && car2.health > 0 && car1.spinning <= 0 && car2.spinning <= 0)
	{
		var temp = car2.speed;
		
		car2.speed = car1.speed;
		car1.speed = temp;
		
		//Flip the rotation of the cars
		
		//Calculate the absolute difference in the rotation of the cars in degrees
		var diff = Math.abs((car1.rotation % 360 + 360) % 360 - (car2.rotation % 360 + 360) % 360);
		
		console.log(diff);

		if(diff > 90 && diff < 270)
		{
			//Bounce the cars away from each other
			car1.x -= (25 - dist / 2) * Math.cos(car1.rotation * Math.PI / 180);
			car1.y += (25 - dist / 2) * Math.sin(car1.rotation * Math.PI / 180);
			
			car2.x -= (25 - dist / 2) * Math.cos(car2.rotation * Math.PI / 180);
			car2.y += (25 - dist / 2) * Math.sin(car2.rotation * Math.PI / 180);
			
			car1.rotation += 180;
			car2.rotation += 180;
			
			//Take damage
			car1.health -= car1.speed * 8;
			car2.health -= car2.speed * 8;
		}
		else
		{		
			//Bounce the cars away from each other
			car1.x += (25 - dist / 2) * Math.cos(car1.rotation * Math.PI / 180);
			car1.y -= (25 - dist / 2) * Math.sin(car1.rotation * Math.PI / 180);
			
			car2.x += (25 - dist / 2) * Math.cos(car2.rotation * Math.PI / 180);
			car2.y -= (25 - dist / 2) * Math.sin(car2.rotation * Math.PI / 180);	
		}
	}
	
	//Change the lap counter
	document.getElementById("lap-counter").innerHTML = "RED: " + car1.laps + " laps | BLUE: " + car2.laps + " laps";
	
	//Handle collisions between banana and car
	car1.Collide(banana);
	car2.Collide(banana);
	banana.Collide(car1);
	banana.Collide(car2);

	//Handle collisions between protein powder and cars
	car1.CollideProtein(protein);
	car2.CollideProtein(protein);
	protein.Collide(car1);
	protein.Collide(car2);
}

setInterval(Draw, 5);
