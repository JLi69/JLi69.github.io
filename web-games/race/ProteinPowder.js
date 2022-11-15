class Protein
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
		ctx.drawImage(proteinImg, this.x - 25, this.y - 25, 50, 50);
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
