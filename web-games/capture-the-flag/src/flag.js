class Flag
{
	constructor(x, y, color)
	{
		this.x = x;
		this.y = y;
		this.color = color;
		this.captured = false;
	}
	
	Draw(ctx)
	{
		if(!this.captured)
		{
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x - 20, this.y - 20, 5, 40);
			ctx.fillRect(this.x - 20, this.y - 20, 35, 20);
		}
	}

	CheckCaptured(enemy)
	{
		if(Math.sqrt((this.x - enemy.x) * (this.x - enemy.x) + (this.y - enemy.y) * (this.y - enemy.y)) < 57)
			this.captured = true;
	}

	CheckWin(player, enemyFlag)
	{
		if(Math.sqrt((this.x - player.x) * (this.x - player.x) + (this.y - player.y) * (this.y - player.y)) < 57 &&
			enemyFlag.captured && !this.captured)
		{
			player.score++;
			enemyFlag.captured = false;
		}
	}
};
