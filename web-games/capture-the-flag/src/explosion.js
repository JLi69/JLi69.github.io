class Explosion
{
	constructor(x, y, size)
	{
		this.x = x;
		this.y = y;
		this.size = 0;
		this.maxSize = size;
		
		this.expansion = 3;
	}
	
	Draw(ctx)
	{
		this.size += this.expansion;
		if(this.size >= this.maxSize)
			this.expansion *= -1;
			
		if(this.size <= 0)
			return;
			
		ctx.fillStyle = "#FF8800";
		ctx.beginPath();
		ctx.ellipse(this.x, this.y, this.size, this.size, 0, 0, Math.PI * 2);
		ctx.fill();
	}
};

var explosions = [];

function DrawExplosions(ctx)
{
	for(var i = 0; i < explosions.length; i++)
	{
		explosions[i].Draw(ctx);
		if(explosions[i].size < 0)
		{
			var temp = explosions[explosions.length - 1];
			explosions[explosions.length - 1] = explosions[i];
			explosions[i] = temp;
			explosions.pop();
		}
	}
}