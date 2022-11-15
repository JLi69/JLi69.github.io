class Bullet
{
	constructor(x, y, rotation)
	{
		this.x = x;
		this.y = y;
		this.rotation = rotation;
		
		this.speed = 1.5;
	}
	
	//Draw the bullet
	Draw(ctx)
	{
		ctx.fillStyle = "#FFFF00";
		ctx.beginPath();
		ctx.ellipse(this.x, this.y, 3, 3, 0, 0, Math.PI * 2);
		ctx.fill();
	}
	
	//Update the bullet
	Update()
	{
		//Move the bullet
		this.x += this.speed * Math.cos(this.rotation * Math.PI / 180);
		this.y -= this.speed * Math.sin(this.rotation * Math.PI / 180);
	}
};

//List of bullets
var bullets = [];

function UpdateAllBullets(p1, p2)
{
	for(var i = 0; i < bullets.length; i++)
	{
		var canDelete = false;
		var tempx = bullets[i].x / 40, tempy = bullets[i].y / 40;
		if(randMap[Math.floor(tempx) + Math.floor(tempy) * 25] !== '.')
		{
			if(randMap[Math.floor(tempx) + Math.floor(tempy) * 25] === 'X')
				blockHealth[Math.floor(tempx) + Math.floor(tempy) * 25] -= 20;
			//Explosives!
			else if(randMap[Math.floor(tempx) + Math.floor(tempy) * 25] === '!')
				blockHealth[Math.floor(tempx) + Math.floor(tempy) * 25] -= 100;
		
			var newMap = "";
			for(var j = 0; j < randMap.length; j++)
			{
				if(blockHealth[j] <= 0 && randMap[j] === 'X')
					newMap += '.';
				else if(blockHealth[j] <= 0 && randMap[j] === '!')
				{
					newMap += '.';
					//Explosion!
					var tempxExplosive = j % 25 * 40 + 20, tempyExplosive = Math.floor(j / 25) * 40 + 20;
					
					if(Math.sqrt((tempxExplosive - p1.x) * (tempxExplosive - p1.x) 
						+ (tempyExplosive - p1.y) * (tempyExplosive - p1.y)) < 100)
					{
						p1.health -= 70;
					}
					if(Math.sqrt((tempxExplosive - p2.x) * (tempxExplosive - p2.x) +
						(tempyExplosive - p2.y) * (tempyExplosive - p2.y)) < 100)
					{
						p2.health -= 70;
					}
					
					//Create an explosion
					explosions.push(new Explosion(tempxExplosive, tempyExplosive, 100));
				}
				else
					newMap += randMap[j];
			}
			randMap = newMap;
			canDelete = true;
		}
		
		if(Math.sqrt((bullets[i].x - p1.x) * (bullets[i].x - p1.x) + (bullets[i].y - p1.y) * (bullets[i].y - p1.y)) < 15)
		{
			p1.health -= 15;
			canDelete = true;
		}
		if(Math.sqrt((bullets[i].x - p2.x) * (bullets[i].x - p2.x) + (bullets[i].y - p2.y) * (bullets[i].y - p2.y)) < 15)
		{
			p2.health -= 15;
			canDelete = true;
		}
			
		bullets[i].Update();
			
		if(canDelete)
		{
			//Swap with front
			var temp = bullets[i];
			bullets[i] = bullets[bullets.length - 1];
			bullets[bullets.length - 1] = temp;
			bullets.pop();
		}
	}
}