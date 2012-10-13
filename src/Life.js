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
Board.prototype.gameBoard = undefined;

Board.prototype.getGameBoard = function() {
  return this.gameBoard = $("#game-board");
};

Board.prototype.windowWidth = function() {
  return window.innerWidth -10;
};

Board.prototype.windowHeight = function() {
  return window.innerHeight -10;
};

Board.prototype.cellSize = function() {
  return 24;
};

Board.prototype.cellsPerRow = function() {
	return Math.floor( this.windowWidth()/this.cellSize() );
};

Board.prototype.numberOfRows = function() {
	return Math.floor( this.windowHeight()/this.cellSize() );
};

Board.prototype.color = function() {
  return '#'+('00000'+(Math.random()*16777216<<0).toString(16)).substr(-6);
};

Board.prototype.drawRow = function() {
	var maxCells = this.cellsPerRow();
  for(var i = 0; i<maxCells; i++){
    this.gameBoard.append("<div id='" + (i+1) +  "-1' class='cell-alive' style='background-color:" + this.color() + ";'></div>");
  }
};

Board.prototype.drawBoard = function() {
  var maxCells = this.numberOfRows();
  for(var i = 0; i<maxCells; i++){
    this.drawRow();
  }
};

