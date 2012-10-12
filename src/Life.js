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

Board.prototype.current_board = $('#game-board');

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

Board.prototype.color = function() {
  return '#'+('00000'+(Math.random()*16777216<<0).toString(16)).substr(-6);
};

Board.prototype.draw_row = function() {
	var max_cells = this.cells_per_row();
	this.current_board = $('#game-board');
  for(var i = 0; i<max_cells; i++){
	  this.current_board.append("<div id='" + (i+1) +  "-1' class='cell-alive' style='background-color:" + this.color() + ";'></div>");
  }
  // return max_cells;
};

Board.prototype.draw_board = function() {
  var max_cells = this.number_of_rows();
  for(var i = 0; i<max_cells; i++){
    this.draw_row();
  }
};

//   this.isPlaying = true;
// };
// 
// Board.prototype.makeFavorite = function() {
//   this.currentlyPlayingSong.persistFavoriteStatus(true);
// };
