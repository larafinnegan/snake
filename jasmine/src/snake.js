var board = {
	
	area: [],
	
	createArea() {
		for (i = 0; i < 20; i++) {
			this.area.push([]);
			for (j = 0; j < 20; j++) {
				this.area[i].push(null);
			}
		}
		this.area[10][10] = "X";
	},

	render() {
		var a = "";
		for (i in this.area) {
			for (j in this.area[i]) {
				a += ("<div id='" + i + "-" + j + "' class='square'></div>"); 
			}
		}
		return a;
	}
};

var food = {

	location: 0,
	count: 0,
	
	create() {
		var available = [];
		for (i in board.area) {
			for (j in board.area[i]) {
				if (!board.area[i][j]) {
					available.push([i, j]);
				}
			}
		}
		var i = Math.floor(Math.random() * available.length - 1);
		$(".food").removeClass('food');
		$('#' + available[i][0] + "-" + available[i][1]).addClass('food');
		this.location = available[i];
		this.count += 1;
	}
};

var snake = {
	x: 10,
	y: 10,
	body: [[10, 10]],
	direction: "r",
	
	changeDirection(event) {
		if (this.direction === "r" || this.direction === "l") {
			switch(event.which) {
				case 40: return this.direction = "d";
				case 38: return this.direction = "u";
				default: return this.direction;
			}
		}
		else {
			switch(event.which) {
				case 39: return this.direction = "r";
				case 37: return this.direction = "l";
				default: return this.direction;
			}
		}
	},

	move() {
		switch(this.direction) {
			case "r": 
				this.y -= 1;
				break;
			case "l": 
				this.y += 1;
				break;
			case "u": 
				this.x -= 1;
				break;
			case "d": 
				this.x += 1;
				break;
		}
		this.body.unshift([this.x, this.y]);
	},
	
	updateHead() {
		board.area[this.x][this.y] = "X";
		$("#" + this.x + "-" + this.y).addClass("snake");
	},
	
	updateTail() {
		var z = this.body.length - 1;
		board.area[this.body[z][0]][this.body[z][1]] = null;
		$("#" + this.body[z][0] + "-" + this.body[z][1]).removeClass("snake");
		this.body.pop();
	},
	
	eat() {
		return this.body[0].join("") === food.location.join("");
	},
	
	die() {
		if ((this.x < 0 || this.x > board.area.length - 1) ||
			(this.y < 0 || this.y > board.area.length - 1) ||
			(board.area[this.x][this.y] === "X")) return true;
	}
};


var player = {
	numGames: 0,
	currentScore: 0,
	highScore: 0,
	foodScore: 5,
	
	swapScores() {
		level.current = 1;
		this.foodScore = 5;
		this.numGames += 1;
		if (this.currentScore > this.highScore) this.highScore = this.currentScore;
		this.currentScore = 0;
	},
	
	calcCurrent() {
		this.currentScore += this.foodScore;
		document.getElementById("current-score").innerHTML = this.currentScore;
	},
	
	displayScores() {
		document.getElementById("current-score").innerHTML = this.currentScore;
		document.getElementById("high-score").innerHTML = this.highScore;
		document.getElementById("games").innerHTML = this.numGames;
		document.getElementById("game-over").innerHTML = "Game over!!";
	}
};

var level = {
	current: 1,
	speed: 500,
	
	newLevel() {
		if (food.count % 5 === 0) {
			this.current += 1;
			player.foodScore += 5;
			this.speed -= 20;
		}
	},
	
	display() {
		document.getElementById("game-over").innerHTML = "Level " + this.current;
	}
};

var game = {

	gameOver: false,
	intervalID: null,
	
	endGame() {
		game.stop();
		player.swapScores();
		player.displayScores();
	},
	
	init() {
		if (this.intervalID) game.endGame();
		board.area = [];
		board.createArea();
		document.getElementById("board").innerHTML = board.render();
		$("#10-10").addClass('snake');
		snake.x = 10;
		snake.y = 10;
		snake.body = [[10, 10]];
		snake.direction = "r";
		level.current = 1;
		level.speed = 500;
		level.display();
		food.create();
	},
	
	start() {
		this.intervalID = setInterval(this.play, level.speed);
	},
	
	stop() {
		clearInterval(this.intervalID);
		this.intervalID = null;
	},
	
	play() {
		document.addEventListener('keydown', function(event) {
			snake.changeDirection(event);
		})
		snake.move();
		if (snake.die()) { 
			game.endGame();
			return;
		}
		if (snake.eat()) {
			food.create();
			player.calcCurrent();
			level.newLevel();
			level.display();
		}
		else {
			snake.updateTail();
		}
		snake.updateHead();
		game.stop();
		game.start();
	},
	
	outerLoop() {
		$('#new').click(function() {
			game.init();
			game.start();
		})
	}
};

$(document).ready(function() {
	game.outerLoop();
});