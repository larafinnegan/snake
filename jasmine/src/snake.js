var board = {
	
	area: [],
	
	createArea: function() {
		for (i = 0; i < 40; i++) {
			this.area.push([]);
			for (j = 0; j < 40; j++) {
				this.area[i].push(null);
			}
		}
		this.area[20][20] = "X";
	},

	render: function() {
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
	
	create: function() {
		var i = Math.floor(Math.random() * 40);
		var j = Math.floor(Math.random() * 40);
		
		while (board.area[i][j]) {
			i = Math.floor(Math.random() * 40);
			j = Math.floor(Math.random() * 40);
		}
	$('#' + i + "-" + j).addClass('food');
	this.location = [i, j];
	},
	
	remove: function() {
		$(".food").removeClass('food');
	}
};

var snake = {
	
	body: [[20, 20]],
	direction: "r",
	
	changeDirection: function(event) {
		switch(event.which) {
			case 37: return this.direction = "l";
			case 38: return this.direction = "u";
			case 39: return this.direction = "r";
			case 40: return this.direction = "d";
			default: return this.direction;
		}
	},

	move: function() {
		var x = this.body[0][0];
		var y = this.body[0][1];
		switch(this.direction) {
			case "r": return this.body.unshift([x, y - 1]);
			case "l": return this.body.unshift([x, y + 1]);
			case "u": return this.body.unshift([x - 1, y]);
			case "d": return this.body.unshift([x + 1, y]);
		}
	},
	
	updateHead: function() {
		var x = this.body[0][0];
		var y = this.body[0][1];
		board.area[x][y] = "X";
		$("#" + x + "-" + y).addClass("snake");
	},
	
	updateTail: function() {
		var z = this.body.length - 1;
		board.area[this.body[z][0]][this.body[z][1]] = null;
		$("#" + this.body[z][0] + "-" + this.body[z][1]).removeClass("snake");
		this.body.pop();
	},
	
	eat: function() {
		return this.body[0].join("") === food.location.join("");
	},
	
	die: function() {
		if (this.body[0][0] < 0 || this.body[0][0] > 39) return true;
		if (this.body[0][1] < 0 || this.body[0][1] > 39) return true;
	}
};


$(document).ready(function() {
	board.createArea();
	$("#board").append(board.render());
	$("#20-20").addClass('snake');
	food.create();
	setInterval(function() { 
		game.play(); 
	}, 1000);
});

var game = {

	intervalId: 0,

	startTimer = function() {
		
	
	play: function() {
		document.addEventListener('keydown', function(event) {
			snake.changeDirection(event);
		})
		snake.move();
		console.log(snake.eat());
		if (snake.eat()) {
			food.remove();
			food.create();
		}
		else {
			snake.updateTail();
		}
		snake.updateHead();
	}
};

