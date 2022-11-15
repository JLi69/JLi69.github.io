class Car
{
	constructor(posX, posY, rotationVal, colorVal)
	{
		this.x = posX;
		this.y = posY;

		this.rotation = rotationVal;

		this.color = colorVal;

		this.speed = 0;
		this.acceleration = 0;

		this.rotationSpeed = 0;

		this.currentCheckPoint = 0;
		this.laps = 0;
		
		this.spinning = 0;
		
		this.health = 100;
	}

	ChangeCheckPoint()
	{
		if(Math.floor(this.x / 60) + Math.floor(this.y / 60) * 20 === checkpoints[this.currentCheckPoint] ||
		   Math.floor(this.x / 60) + Math.floor(this.y / 60) * 20 === checkpoints[this.currentCheckPoint] - 20 ||
		   Math.floor(this.x / 60) + Math.floor(this.y / 60) * 20 === checkpoints[this.currentCheckPoint] - 40 ||
		   Math.floor(this.x / 60) + Math.floor(this.y / 60) * 20 === checkpoints[this.currentCheckPoint] + 20)
			this.currentCheckPoint++;
		if(this.currentCheckPoint === checkpoints.length)
			this.laps++;
		this.currentCheckPoint %= checkpoints.length;
	}
	
	Move()
	{
		if(this.health <= 0)
			this.health = 0;
	
		if(this.spinning > 0)
		{
			this.rotation += Math.pow(1.005, this.spinning);
			this.spinning--;
			
			if(this.spinning === 1 && this.health <= 0)
				this.health = 100;
			
			return;
		}
	
		//Check if the car is out of health
		if(this.health === 0)
		{
			this.health = 0;
			this.spinning = 1800;
		}
	
		this.x += Math.cos(this.rotation * Math.PI / 180) * this.speed;
		this.y -= Math.sin(this.rotation * Math.PI / 180) * this.speed;
		this.rotation += this.rotationSpeed;

		if(this.x < 0)
		{
			this.x = 0;
			this.speed = 0;
		}
		else if(this.x > 1200)
		{
			this.x = 1200;
			this.speed = 0;
		}
		else if(this.y < 0)
		{
			this.y = 0;
			this.speed = 0;
		}
		else if(this.y > 600)
		{
			this.y = 600;
			this.speed = 0;
		}
		
		if(this.speed < 3)
			this.speed += this.acceleration;
		
		if(this.speed < 0)
			this.speed = 0;

		//Friction
		//Grass
		if(track[Math.floor(this.x / 60) + Math.floor(this.y / 60) * 20] === ".")
		{
			if(this.speed > 0.5)
				this.speed = 0.5;
				
			this.speed -= (0.001 * Math.sign(this.speed));
		}
		//Mud
		else if(track[Math.floor(this.x / 60) + Math.floor(this.y / 60) * 20] === "*")
		{
			if(this.speed > 0.8)
				this.speed = 0.8;
			this.speed -= (0.0005 * Math.sign(this.speed));
		}
		//Road
		else if(track[Math.floor(this.x / 60) + Math.floor(this.y / 60) * 20] !== ".")
			this.speed -= (0.03 * Math.sign(this.speed));

		this.ChangeCheckPoint();
	}
	
	Draw(ctx)
	{
		//Rotate the car
		ctx.translate(this.x, this.y);
		ctx.rotate(-this.rotation * Math.PI / 180);
		ctx.translate(-this.x, -this.y);
	
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x - 20, this.y - 15, 40, 30);

		ctx.beginPath();
		ctx.moveTo(this.x + 20, this.y + 15);
		ctx.lineTo(this.x + 40, this.y);
		ctx.lineTo(this.x + 20, this.y - 15);
		ctx.fill();
		
		//Draw the wheels
		ctx.fillStyle = "#000000";
		
		ctx.fillRect(this.x - 20, this.y - 20, 15, 5);
		ctx.fillRect(this.x + 5, this.y - 20, 15, 5);
		ctx.fillRect(this.x - 20, this.y + 15, 15, 5);
		ctx.fillRect(this.x + 5, this.y + 15, 15, 5);
		
		//Rotate the car
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rotation * Math.PI / 180);
		ctx.translate(-this.x, -this.y);

		//Draw the place where the car should go
		ctx.fillStyle = this.color + "88";
		var index = checkpoints[this.currentCheckPoint]; 
		ctx.fillRect((index % 20) * 60, ((index - index % 20) / 20) * 60 - 60, 60, 120);
		
		//Draw the health bar
		ctx.fillStyle = "#000000";
		ctx.fillRect(this.x - 17.5, this.y - 2.5, 35, 5);
		ctx.fillStyle = "#00FF00";
		ctx.fillRect(this.x - 17.5, this.y - 1.5, this.health / 100 * 35, 3);
	}
	
	Collide(banana)
	{
		var dist = Math.sqrt((this.x - banana.x) * (this.x - banana.x) + (this.y - banana.y) * (this.y - banana.y));
		if(dist < 50)
		{
			this.speed = 0;
			this.spinning = 360;
		}
	}

	CollideProtein(protein)
	{
		var dist = Math.sqrt((this.x - protein.x) * (this.x - protein.x) + (this.y - protein.y) * (this.y - protein.y));
		if(dist < 50)
		{
			this.speed = 6;
		}
	}
};
