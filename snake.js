// Init function to start the game
function init(){

	// canvas element
	canvas = document.getElementById('mycanvas');
	W = H = canvas.width = canvas.height = 1000;
	pen = canvas.getContext('2d');
	cs = 67;
	game_over = false;
	score = 5;

	// Image object for snake face
	snake_face = new Image();
	snake_face.src = "snake.png";

	//Image Object for food
	food_img = new Image();
	food_img.src = "apple.png";

	//Image object for trophy 
	trophy = new Image();
	trophy.src = "trophy.png";

	food = getRandomFood();

	//Snake object
	snake = {
		init_len:5,
		color:"blue",
		cells:[],
		direction:"right",

		// create snake
		createSnake:function(){
			for(var i=this.init_len;i>0;i--){
				this.cells.push({x:i,y:0});
			}
		},
		// draw snake
		drawSnake:function(){
			var a=0,b=1,c=0,d=1;
			if(this.direction=="right")
			{
				b=2;
			}
			else if(this.direction=="left"){
				b = 2;
				a = (cs-3)/2 ;
			}
			else if(this.direction=="down")
			{	
				d=2;
			}
			else{
				c = (cs-3)/2;
				d = 2;
			}

			for(var i=1;i<this.cells.length;i++){
				pen.fillStyle = this.color;
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
			}
			pen.fillRect(this.cells[0].x*cs+a,this.cells[0].y*cs+c, (cs-3)/b, (cs-3)/d);
			pen.drawImage(snake_face,this.cells[0].x*cs,this.cells[0].y*cs,cs-3,cs-3);
		},

		updateSnake:function(){
			//check if the snake has eaten food, increase the length of the snake and generate new food object
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;

			if(headX==food.x && headY==food.y){
				food = getRandomFood();
				score += 5;
				
				if(score == 50)
					time -= 50;
				if(score%100 == 0)
					time -= 50;
					
			}
			else
				this.cells.pop();

			var nextX,nextY;

			if(this.direction=="right"){
				nextX = headX + 1;
				nextY = headY;
			}
			else if(this.direction=="left"){
				nextX = headX - 1;
				nextY = headY;
			}
			else if(this.direction=="down"){
				nextX = headX;
				nextY = headY + 1;
			}
			else{
				nextX = headX;
				nextY = headY - 1;
			}

			this.cells.unshift({x: nextX,y:nextY});

			/*Prevents snake from going out of area*/
			var last_x = Math.round(W/cs);
			var last_y = Math.round(H/cs);

			if(this.cells[0].y<0 || this.cells[0].x < 0 || this.cells[0].x >= last_x || this.cells[0].y >= last_y){
				game_over = true;
			}
		}
	};

	snake.createSnake();
	//Add a Event Listener on the Document Object
	function keyPressed(e){
		//Conditional Statments
		if(e.key=="ArrowRight"){
			snake.direction = "right";
		}
		else if(e.key=="ArrowLeft"){
			snake.direction = "left";
		}
		else if(e.key=="ArrowDown"){
			snake.direction = "down";
		}
		else{
			snake.direction = "up";
		}
	}
	document.addEventListener('keydown',keyPressed) ;
}

// Draw on Canvas
function draw(){
	//erase the old frame
	pen.clearRect(0,0,W,H);
	snake.drawSnake();

	pen.fillStyle = food.color;
	pen.drawImage(food_img,food.x*cs-3,food.y*cs-2,cs,cs);

	pen.drawImage(trophy,0,0,cs,cs);
	pen.fillStyle = "blue";
	pen.font = "20px Roboto"
	pen.fillText(score,28,31);
}

// Update Snake
function update(){
	snake.updateSnake(); 
}

// Generate Food
function getRandomFood(){

	var foodX = Math.round(Math.random()*(W-cs)/cs);
	var foodY = Math.round(Math.random()*(H-cs)/cs);

	var food = {
		x:foodX,
		y:foodY,
		color:"red",
	}
	return food;
}

function gameloop(){
	if(game_over==true){
		clearInterval(f);
		alert("Game Over");
		return;
	}
	draw();
	update();
}

init();
var time = 200;
var f = setInterval(gameloop,time);
