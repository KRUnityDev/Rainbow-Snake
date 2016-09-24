var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var popup = document.getElementById("popup");
popup.style.visibility = 'hidden';

var Key = {
  _pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },
  
  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },
  
  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};

window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

class Apple
{
	constructor(x,y,size)
	{
		this.posX = x;
		this.posY = y;
		this.size = size;
	}
	Draw()
	{
			ctx.strokeStyle = "#000000";
			ctx.strokeRect(this.posX*10,this.posY*10,this.size,this.size+1);
			ctx.fillStyle="#FF0000";
			ctx.fillRect(this.posX*10,this.posY*10,this.size,this.size);
	}
	ChangePosition(x,y)
	{
		this.posX = x;
		this.posY = y;
	}

}

class Cell
{
	constructor(lifeValue,x,y,size)
	{
		this.life = lifeValue;
		this.posX = x;
		this.posY = y;
		this.size = size;
	}
	Step()
	{
		this.life--;
		if(this.life<0) this.life=0;
	}
	SetLife(value)
	{
		this.life += value;
		this.color = (this.randomColor()+this.randomColor()+this.randomColor());
	}
	Draw()
	{
		if(this.life>0)
		{
			ctx.strokeStyle = "#000000";
			ctx.strokeRect(this.posX,this.posY,this.size,this.size+1);
			ctx.fillStyle = "#" + this.color;
			ctx.fillStyle = 
			ctx.fillRect(this.posX,this.posY,this.size,this.size);
			
    		
		}
		else
		{
			ctx.strokeStyle = "#888888";
			ctx.strokeRect(this.posX,this.posY,this.size,this.size+1);
			ctx.fillStyle="#CCCCCC";
			ctx.fillRect(this.posX,this.posY,this.size,this.size);

		}
		
	}
	randomColor()
	{ 
		return Math.floor(Math.random() * 16).toString(16).toUpperCase().repeat(2);
	}
}
class Snake
{
	constructor(x,y)
	{
		this.actualXDirection = x;
		this.actualYDirection = y;
		this.lenght = 2;
	}
	changeDirection(x,y)
	{
		this.actualXDirection = x;
		this.actualYDirection = y
	}
	
}

var snake = new Snake(1,0);

class Game
{
	constructor(mapX,mapY,snake,apple)
	{
		this.cellArray = new Array(mapX);
		for(var i=0;i<mapX;i++)
			this.cellArray[i] = new Array(mapY);
		for(var y=0;y<mapY;y++)
		{
			for(var x=0;x<mapX;x++)
			{
				this.cellArray[x][y] = new Cell(0,x*10,y*10,8);
			}
		}

		this.actualSnakeXPosition = 5;
		this.actualSnakeYPosition = 5;
		this.mapX = mapX;
		this.mapY = mapY;
		this.snake = snake;
		this.apple = apple;
			
	}
	Loop()
	{
		if (Key.isDown(Key.UP) && this.snake.actualYDirection != 1) this.snake.changeDirection(0,-1);
 		if (Key.isDown(Key.LEFT) && this.snake.actualXDirection != 1) this.snake.changeDirection(-1,0);
  		if (Key.isDown(Key.DOWN) && this.snake.actualYDirection != -1) this.snake.changeDirection(0,1);
  		if (Key.isDown(Key.RIGHT) && this.snake.actualXDirection != -1) this.snake.changeDirection(1,0);

  		this.actualSnakeXPosition += this.snake.actualXDirection;
		this.actualSnakeYPosition += this.snake.actualYDirection;
		if(this.actualSnakeXPosition>=this.mapX) this.actualSnakeXPosition = 0;
		if(this.actualSnakeYPosition>=this.mapY) this.actualSnakeYPosition = 0;
		if(this.actualSnakeXPosition<0) this.actualSnakeXPosition = this.mapX-1;
		if(this.actualSnakeYPosition<0) this.actualSnakeYPosition = this.mapX-1;

		if(this.apple.posX == this.actualSnakeXPosition && this.apple.posY == this.actualSnakeYPosition)
		{
			
			this.snake.lenght += 5;
			apple.ChangePosition(Math.floor((Math.random() * this.mapX) + 1),Math.floor((Math.random() * this.mapY) + 1));
		}

		this.cellArray[this.actualSnakeXPosition][this.actualSnakeYPosition].SetLife(this.snake.lenght);
		if(this.cellArray[this.actualSnakeXPosition][this.actualSnakeYPosition].life>this.snake.lenght) EndGame();

		for(var y=0;y<this.mapY;y++)
		{
			for(var x=0;x<this.mapX;x++)
			{
				this.cellArray[x][y].Step();
				this.cellArray[x][y].Draw();
			}
		}

		this.apple.Draw();

	}
}

function EndGame()
{
	clearInterval(intervalID);
	popup.style.visibility = 'visible';
}
function ResetGame()
{
	window.location.reload(false); 
}
function CloseGame()
{
	open(window.location.href + "sad.html","_self");
}

var apple = new Apple(10,10,8);
var game = new Game(100,100,snake,apple);


var intervalID = setInterval(function(){ game.Loop(); },100);