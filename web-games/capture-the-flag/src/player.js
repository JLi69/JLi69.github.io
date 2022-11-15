class Player
{
	constructor(x, y, color)
	{
		this.x = x;
		this.y = y;
		this.color = color;
		
		this.rotation = 90;
		this.rotationSpeed = 0;
		this.speed = 0;
		
		this.spawnX = x;
		this.spawnY = y;

		this.score = 0;

		this.health = 100;
		
		this.cooldown = 0;
		this.shooting = false;
		
		//Death counter - added at the request of Jayden
		this.deaths = 0;
	}

	Heal(flag)
	{
		//Cannot heal if flag is captured
		if(!flag.captured && this.health <= 100)
		{
			this.health += 0.02;
		}
		if(this.health > 100)
			this.health = 100;
	}
	
	Draw(ctx)
	{
		//Draw all the squares the player is in
		/*ctx.fillStyle = "#00FF0066";
		for(var i = 0; i < randMap.length; i++)
		{
			var tempx = i % 25 * 40, tempy = (i - i % 25) / 25 * 40;

			//Check if it is colliding with the player
			if(this.x > tempx - 17 && this.x < tempx + 57 && this.y > tempy - 17 && this.y < tempy + 57)
				ctx.fillRect(tempx, tempy, 40, 40);
		}*/
	
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.ellipse(this.x, this.y, 17, 17, 0, 0, Math.PI * 2);
		ctx.fill();
		
		ctx.fillStyle = "#FFFF00";
		ctx.beginPath();
		ctx.ellipse(this.x + 17 * Math.cos(this.rotation * Math.PI / 180),
					this.y - 17 * Math.sin(this.rotation * Math.PI / 180), 3, 3, 0, 0, Math.PI * 2);
		ctx.fill();

		//Draw the health bar
		ctx.fillStyle = "#000000";
		ctx.fillRect(this.x - 20, this.y + 20, 40, 5);
		var red = (100 - this.health) / 100 * 512, green = (this.health) / 100 * 512; 
		ctx.fillStyle = "rgb(" + red + "," + green + ",0)"; //RED = low health, GREEN = high health
		ctx.fillRect(this.x - 20, this.y + 20, 40 * this.health / 100, 5);
	}
	
	Update()
	{
		this.x += this.speed * Math.cos(this.rotation * Math.PI / 180);
		this.y -= this.speed * Math.sin(this.rotation * Math.PI / 180);
	
		var canMoveX = true, canMoveY = true;
		var collided = [];

		//Check if the player is colliding with any walls
		for(var i = 0; i < randMap.length; i++)
		{
			var tempx = i % 25 * 40, tempy = (i - i % 25) / 25 * 40;

			//Check if it is colliding with the player
			if(this.x > tempx - 17 && this.x < tempx + 57 && this.y > tempy - 17 && this.y < tempy + 57 && randMap[i] !== '.')
			{
				if(this.y <= tempy - 15 && Math.sin(this.rotation * Math.PI / 180) < 0 ||
					this.y >= tempy + 55 && Math.sin(this.rotation * Math.PI / 180) > 0)
				{
					canMoveY = false;
					collided.push([i % 25, (i - i % 25) / 25]);
					continue;
				}
			}

			if(this.x > tempx - 17 && this.x < tempx + 57 && this.y > tempy - 17 && this.y < tempy + 57 && randMap[tempx / 40 + tempy / 40 * 25] !== '.')
			{
				if(this.x <= tempx - 15 && Math.cos(this.rotation * Math.PI / 180) > 0 || 
					this.x >= tempx + 55 && Math.cos(this.rotation * Math.PI / 180) < 0)	
				{
					canMoveX = false;
					collided.push([i % 25, (i - i % 25) / 25]);
				}
			}
		}

		if((!canMoveX && !canMoveY) && (collided.length < 3))
		{
			if(Math.abs(collided[0][0] - collided[1][0]) === 0 &&
				Math.abs(collided[0][1] - collided[1][1]) === 1)
				canMoveY = true;
		}

		if(!canMoveX)
		{
			this.x -= this.speed * Math.cos(this.rotation * Math.PI / 180);
		}
		if(!canMoveY)
		{
			this.y += this.speed * Math.sin(this.rotation * Math.PI / 180);
		}

		this.rotation += this.rotationSpeed;
		
		this.cooldown--;
		
		//SHOOT!
		if(this.shooting)
		{
			var tempBullet = new Bullet(this.x + 24 * Math.cos(this.rotation * Math.PI / 180),
										this.y - 24 * Math.sin(this.rotation * Math.PI / 180),
										this.rotation);
			if(this.cooldown <= 0)
			{
				bullets.push(tempBullet);
				/*if(this.color === "#0000FF")
					this.cooldown = 1;
				else
					this.cooldown = 30;*/
				this.cooldown = 30;
			}
		}
	}
};
