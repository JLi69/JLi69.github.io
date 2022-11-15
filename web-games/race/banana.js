class Banana
{
	constructor(track)
	{
		this.x = 30;
		this.y = 30;
		
		var roadTiles = [];
		for(var i = 0; i < track.length; i++)
		{
			if(track[i] === "#")
				roadTiles.push(i);
		}
		var rand = roadTiles[Math.floor(Math.random() * roadTiles.length)];
		
		this.x = rand % 20 * 60 + 30;
		this.y = (rand - rand % 20) / 20 * 60 + 30;
	}
	
	Draw(ctx)
	{
		ctx.drawImage(bananaImg, 
			this.x - 30, this.y - 30, 60, 60);
	}
	
	Collide(car)
	{
		var dist = Math.sqrt((this.x - car.x) * (this.x - car.x) + (this.y - car.y) * (this.y - car.y));
		if(dist < 50)
		{
			var roadTiles = [];
			for(var i = 0; i < track.length; i++)
			{
				if(track[i] === "#")
					roadTiles.push(i);
			}
			var rand = roadTiles[Math.floor(Math.random() * roadTiles.length)];
			
			this.x = rand % 20 * 60 + 30;
			this.y = (rand - rand % 20) / 20 * 60 + 30;
		}
	}
};