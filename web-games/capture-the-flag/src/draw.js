const canvas = document.getElementById("game"),
	  ctx = canvas.getContext("2d");

var redFlag, blueFlag;
var red, blue;

var paused = false;

function ReadMap()
{
	var newMap = "";
	for(var i = 0; i < randMap.length; i++)
	{
		if(randMap[i] === 'R')
			redFlag = new Flag(i % 25 * 40 + 20, (i - i % 25) / 25 * 40 + 20, "#FF0000");
		else if(randMap[i] === 'B')
			blueFlag = new Flag(i % 25 * 40 + 20, (i - i % 25) / 25 * 40 + 20, "#0000FF");
		else if(randMap[i] === '1')
			red = new Player(i % 25 * 40 + 20, (i - i % 25) / 25 * 40 + 20, "#FF0000");
		else if(randMap[i] === '2')
			blue = new Player(i % 25 * 40 + 20, (i - i % 25) / 25 * 40 + 20, "#0000FF");
		
		if(randMap[i] === 'R' || randMap[i] === 'B' || randMap[i] === '1' || randMap[i] === '2')
			newMap += '.';
		else
			newMap += randMap[i];
		
		blockHealth.push(100);
	}
	return newMap;
}
randMap = ReadMap();

function UpdateScore()
{
	//Update the score counter
	document.getElementById("score-counter").innerHTML = "red: " + red.score + " | blue: " + blue.score;

	if(red.score > blue.score)
		document.getElementById("score-counter").style.color = "#FF0000";
	else if(blue.score > red.score)
		document.getElementById("score-counter").style.color = "#0000FF";
	else
		document.getElementById("score-counter").style.color = "#000000";
		
	//Update the death counter
	document.getElementById("death-counter").innerHTML = "red kills: " + blue.deaths + " | blue kills: " + red.deaths;
}

function Draw()
{
	//Draw the background
	ctx.fillStyle = "#AAAAAA";
	ctx.fillRect(0, 0, 1000, 560);
	
	//Red half
	/*ctx.fillStyle = "#FF000044";
	ctx.fillRect(0, 0, 500, 560);
	//Blue half
	ctx.fillStyle = "#0000FF44";
	ctx.fillRect(500, 0, 500, 560);*/
	
	//Draw the map
	for(var i = 0; i < randMap.length; i++)
	{
		if(randMap[i] === '#')
			ctx.fillStyle = "#666666";
		else if(randMap[i] === 'X')
			ctx.fillStyle = "rgb(" + (9 * 16 + 9) * (blockHealth[i] + 150) / 250 + "," +
									 (6 * 16 + 6) * (blockHealth[i] + 150) / 250 + "," + 
									 (3 * 16 + 3) * (blockHealth[i] + 150) / 250 + ")";
		else if(randMap[i] === '!')
			ctx.fillStyle = "#FF0000";
		else
			continue;
		ctx.fillRect(i % 25 * 40, (i - i % 25) / 25 * 40, 40, 40);
	}
	
	//Draw the flags
	redFlag.Draw(ctx);
	blueFlag.Draw(ctx);
	
	//Draw the players
	red.Draw(ctx);
	blue.Draw(ctx);
	
	//Pause the game
	if(paused)
		return;
	
	//Update the players
	red.Update();
	blue.Update();
	//Heal the players
	red.Heal(redFlag);
	blue.Heal(blueFlag);
	
	//Collide the players
	/*if(Math.sqrt((red.x - blue.x) * (red.x - blue.x) + (red.y - blue.y) * (red.y - blue.y)) < 36)
	{
		red.speed = 0;
		blue.speed = 0;
	}*/
	
	//Check if any player died
	if(red.health <= 0)
	{
		red.health = 100;
		red.x = red.spawnX;
		red.y = red.spawnY;
		blueFlag.captured = false;
		red.deaths++;
	}
	if(blue.health <= 0)
	{
		blue.health = 100;
		blue.x = blue.spawnX;
		blue.y = blue.spawnY;
		redFlag.captured = false;
		blue.deaths++;
	}

	//Capture the flag!
	redFlag.CheckCaptured(blue);
	blueFlag.CheckCaptured(red);

	redFlag.CheckWin(red, blueFlag);
	blueFlag.CheckWin(blue, redFlag);
	
	//Update the bullets
	UpdateAllBullets(blue, red);
	//Draw the flags
	for(var i = 0; i < bullets.length; i++)
	{
		bullets[i].Draw(ctx);
	}
	
	//Check if someone won
	if(blue.score === 5)
	{
		paused = true;
		document.getElementById("blue-win").style.visibility = "visible";
	}
	else if(red.score === 5)
	{
		paused = true;
		document.getElementById("red-win").style.visibility = "visible";
	}
	
	//Draw the explosions
	DrawExplosions(ctx);
}
setInterval(Draw, 5);
setInterval(UpdateScore, 50);
