  // var Board = {
  //     width :  window.innerWidth -10,
  //     height : window.innerHeight -10,
  //     cell_width : 24,
  //     cells_across : function() { return Math.floor(this.width/this.cell_width) },
  //     cells_high : function() { return Math.floor(this.height/this.cell_width) },
  //     get_size : function() { return [this.width, this.height] },
  //   };

// alert("hey, javascript is working");

function Board() {
}

Board.prototype.window_width = function() {
  return window.innerWidth -10;
};

Board.prototype.window_height = function() {
  return window.innerHeight -10;
};

Board.prototype.cell_size = function() {
  return 24;
};

Board.prototype.cells_per_row = function() {
	return Math.floor( this.window_width()/this.cell_size() );
};

Board.prototype.number_of_rows = function() {
	return Math.floor( this.window_height()/this.cell_size());
};

// Board.prototype.draw_row = function() {
// 	var max_cells = this.cells_per_row();
// 	var current_board = $('#game-board');
// 	for(var i = 0; i<max_cells; i++){
// 		current_board.append("<div id='" + (i+1) +  "-1' class='cell-alive'></div>");
// 	}
// };

//   this.isPlaying = true;
// };
// 
// Board.prototype.makeFavorite = function() {
//   this.currentlyPlayingSong.persistFavoriteStatus(true);
// };