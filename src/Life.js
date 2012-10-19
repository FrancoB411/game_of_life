// alert("hey, javascript is working");

function Board() {
}
Board.prototype.vals = {
  boardHeight: undefined,
  boardWidth: undefined,
  cellsPerRow: undefined,
  cellSize: 24,
  defaultMargin: 15,
  gameBoard: $("#game-board"),
  verticalMargin: undefined,
  horizontalMargin: undefined
};

Board.prototype.setVerticalMargin = function() {
  var additionalMargin = Math.floor((window.innerHeight % this.vals.cellSize)/2);
  this.vals.verticalMargin = this.vals.defaultMargin + additionalMargin;
};

Board.prototype.setHorizontalMargin = function() {
  var additionalMargin = Math.floor((window.innerWidth % this.vals.cellSize)/2);
  this.vals.horizontalMargin = this.vals.defaultMargin + additionalMargin;
};

Board.prototype.setBoardHeight = function() {
  this.setVerticalMargin();
  this.vals.boardHeight = window.innerHeight - (this.vals.verticalMargin *2);
};

Board.prototype.setBoardWidth = function() {
  this.setHorizontalMargin();
  this.vals.boardWidth = window.innerWidth - (this.vals.horizontalMargin *2);
};

Board.prototype.drawBoard = function() {
  var height, width, vMargin, hMargin;
  this.setBoardHeight();
  this.setBoardWidth();
  height = this.vals.boardHeight;
  width = this.vals.boardWidth;
  vMargin = this.vals.verticalMargin;
  hMargin = this.vals.horizontalMargin;
  this.vals.gameBoard.css({
    "height"        : height,
    "width"         : width,
    "margin-top"    : vMargin,
    "margin-right"  : hMargin,
    "margin-bottom" : vMargin,
    "margin-left"   : hMargin
  })
};

Board.prototype.getCellsPerRow = function() {
  this.drawBoard();
	this.vals.cellsPerRow =  Math.floor( this.vals.boardWidth/this.vals.cellSize );
};

Board.prototype.getNumberOfRows = function() {
  this.drawBoard();
	this.vals.numberOfRows = Math.floor(this.vals.boardHeight/this.vals.cellSize );
};

Board.prototype.color = function() {
  return '#'+('00000'+(Math.random()*16777216<<0).toString(16)).substr(-6);
};

Board.prototype.drawRow = function(num) {
	var maxCells = this.vals.cellsPerRow;
  for(var i = 0; i<maxCells; i++){
    this.vals.gameBoard.append("<div id='" + (i+1) +  "-" + num + "' class='cell-alive' style='background-color:" + this.color() + ";'></div>");
  }
};

// Board.prototype.drawBoard = function() {
//   var maxCells = this.numberOfRows();
//   for(var i = 0; i < maxCells; i++){
//     this.drawRow(i+1);
//   };
// };

