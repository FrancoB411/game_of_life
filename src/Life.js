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
Board.prototype.vals = {
  gameBoard: $("#game-board"),
  cellSize: 24,
  defaultMargin: 15,
  verticalMargin: undefined,
  horizontalMargin: undefined,
  boardHeight: undefined,
  boardWidth: undefined
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
// // Board.prototype.cellsPerRow = function() {
// // 	return Math.floor( this.windowWidth()/this.cellSize );
// // };

// Board.prototype.numberOfRows = function() {
// 	return Math.floor( this.windowHeight()/this.cellSize() );
// };

// Board.prototype.color = function() {
//   return '#'+('00000'+(Math.random()*16777216<<0).toString(16)).substr(-6);
// };

// Board.prototype.drawRow = function(num) {
// 	var maxCells = this.cellsPerRow();
//   for(var i = 0; i<maxCells; i++){
//     this.gameBoard.append("<div id='" + (i+1) +  "-" + num + "' class='cell-alive' style='background-color:" + this.color() + ";'></div>");
//   }
// };

// Board.prototype.drawBoard = function() {
//   var maxCells = this.numberOfRows();
//   for(var i = 0; i < maxCells; i++){
//     this.drawRow(i+1);
//   };
// };

