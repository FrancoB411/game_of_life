// alert("hey, javascript is working");

function Board() {
}
Board.prototype.vals = {
  boardHeight: undefined,
  boardWidth: undefined,
  canvasHeight: undefined,
  canvasWidth: undefined,
  cellsPerRow: undefined,
  cellSize: 24,
  gameBoard: undefined,
  marginDefault: 15,
  marginHorizontal: undefined,
  marginVertical: undefined,
  rowsPerBoard: undefined
};
Board.prototype.setGameBoard =  function() {
  this.vals.gameBoard = $("#game-board");
}
//gives us the window height minus the default margins.
Board.prototype.setCanvasHeight = function() {
  board.vals.canvasHeight = Math.floor(window.innerHeight - (board.vals.marginDefault*2));
  return board.vals.canvasHeight;
};
//gives us the window width minus the default margins.
Board.prototype.setCanvasWidth = function() {
  board.vals.canvasWidth = Math.floor(window.innerWidth - (board.vals.marginDefault*2));
  return board.vals.canvasWidth;
};
//Adjsts horizontal margins to horizontally center the board by adding additional margin to make up for pixels left over from dividing the boardwidth/cellSize
Board.prototype.setMarginHorizontal = function() {
  var marginAdditional = Math.floor((this.vals.canvasWidth % this.vals.cellSize)/2);
  this.vals.marginHorizontal = this.vals.marginDefault + marginAdditional;
  return this.vals.marginHorizontal;
};
//Adjusts vertical margins to vertically center the board by adding additional margin to make up for pixels left over from dividing the boardheight/cellSize
Board.prototype.setMarginVertical = function() {
  var marginAdditional = Math.floor((this.vals.canvasHeight % this.vals.cellSize)/2);
  this.vals.marginVertical = this.vals.marginDefault + marginAdditional;
  return this.vals.marginVertical;
};
//Calculates height of the board
Board.prototype.setBoardHeight = function() {
  this.vals.boardHeight = window.innerHeight - (this.vals.marginVertical *2);
  return this.vals.boardHeight;
};
//Calculates width of the board
Board.prototype.setBoardWidth = function() {
  this.vals.boardWidth = window.innerWidth - (this.vals.marginHorizontal * 2);
  return this.vals.boardWidth;
};

Board.prototype.drawBoard = function() {
  this.vals.gameBoard.css({
    "height"        : this.vals.boardHeight,
    "width"         : this.vals.boardWidth,
    "margin-top"    : this.vals.marginVertical,
    "margin-left"   : this.vals.marginHorizontal
  });
};

Board.prototype.setCellsPerRow = function() {
	this.vals.cellsPerRow =  Math.floor( this.vals.boardWidth/this.vals.cellSize );
  return this.vals.cellsPerRow;
};

Board.prototype.setRowsPerBoard = function() {
	this.vals.rowsPerBoard = Math.floor(this.vals.boardHeight/this.vals.cellSize );
  return this.vals.rowsPerBoard;
};

Board.prototype.drawOneRow = function(num) {
	var maxCells = this.vals.cellsPerRow;
  for(var i = 0; i<maxCells; i++){
    this.vals.gameBoard.append("<div id='" + (i+1) +  "-" + num + "'" + cell.aliveOrDead() + " style='background-color:" + cell.color() + ";'></div>");
  }
};

Board.prototype.drawAllRows = function() {
  var maxCells = this.vals.rowsPerBoard;
  for(var i = 0; i < maxCells; i++){
    this.drawOneRow(i+1);
  }
};

Board.prototype.init = function() {
    board.setGameBoard();
    board.setCanvasHeight();
    board.setCanvasWidth();
    board.setMarginHorizontal();
    board.setMarginVertical();
    board.setBoardHeight();
    board.setBoardWidth();
    board.setCellsPerRow();
    board.setRowsPerBoard();
    board.drawBoard();
    board.drawAllRows();
};

// function Cell() {
// }
// Cell.prototype.aliveOrDead() {

// }
//make cell object
//coordinate, class, color, visibility
//random-toggle as a "global" function
//