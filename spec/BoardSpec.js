// The Board object:
  // informs the world object about the board's dimensions
  // updates the world object on the next tick about the board's dimensions
  // takes an array of live cells and draws them to the screen


describe("Board", function() {

  beforeEach(function() {
    cell = new Cell();
    board = new Board();
    board.init();
  });

  it("creates a board object", function() {
    expect(typeof(board)).toEqual("object");
  });

  it("sets the game-board to a jquery object with id game-board", function(){
    board.vals.gameBoard = $(makeTestBoard());
    expect("test-board").toEqual(board.vals.gameBoard.attr("id"));
  });

  it("has a cell size value", function() {
    var cellSize = board.vals.cellSize;
    expect(cellSize).toEqual(24);
  });

  it("has a default margin", function() {
    expect(15).toEqual(board.vals.marginDefault);
  });

  it("sets canvasHeight", function() {
    var windowHeight = (window.innerHeight);
    var canHeight = windowHeight - (board.vals.marginDefault * 2);
    expect(canHeight).toEqual(board.vals.canvasHeight);
  });

  it("set canvasWidth", function() {
    var windowWidth = (window.innerWidth);
    var canWidth = Math.floor(windowWidth - (board.vals.marginDefault * 2));
    expect(canWidth).toEqual(board.vals.canvasWidth);
  });

  it("calculates horizontal margins", function() {
    var marginAdditional = Math.floor((board.vals.canvasWidth % board.vals.cellSize)/2);
    var hMargin = board.vals.marginDefault + marginAdditional;
    expect(hMargin).toEqual(board.vals.marginHorizontal);
  });

  it("calculates vertical margins", function() {
    var marginAdditional = Math.floor((board.vals.canvasHeight % board.vals.cellSize)/2);
    var vMargin = board.vals.marginDefault + marginAdditional;
    expect(vMargin).toEqual(board.vals.marginVertical);
  });

  it("calculates board Height", function() {
    var boardHeight = (window.innerHeight - (board.vals.marginVertical * 2));
    expect(boardHeight).toEqual(board.vals.boardHeight);
  });

  it("calculates board Width", function() {
    var boardWidth = (window.innerWidth - (board.vals.marginHorizontal * 2));
    expect(boardWidth).toEqual(board.vals.boardWidth);
  });

  it("draws a board with the appropriate height and width", function() {
    board.vals.gameBoard = $(makeTestBoard());
    var bHeight = window.innerHeight - board.vals.marginVertical * 2;
    var bWidth = window.innerWidth - board.vals.marginHorizontal * 2;
    expect(bHeight).toEqual(board.vals.boardHeight);
    expect(bWidth).toEqual(board.vals.boardWidth);
  });

  it("calculates the correct number of cells per row", function() {
    var cellsPerRow = board.vals.cellsPerRow;
    var cells_that_fit_in_row = Math.floor(board.vals.boardWidth/board.vals.cellSize);
    expect(cellsPerRow).toEqual(cells_that_fit_in_row);
  });

  it("calculates the number of rows", function() {
    var numberOfRows = board.vals.rowsPerBoard;
    var rows_that_fit_in_board = Math.floor(board.vals.boardHeight/board.vals.cellSize);
    expect(numberOfRows).toEqual(rows_that_fit_in_board);
  });

  it("populates a row with the correct number of cells", function() {
    var correctRowLength = board.vals.cellsPerRow;
    var oneCellTooLong = board.vals.cellsPerRow + 1;
    board.vals.gameBoard = $(makeTestBoard());
    board.drawOneRow(1);
    var lastCell = board.vals.gameBoard.children("#" + correctRowLength + "-1");
    var tooLong = board.vals.gameBoard.children("#" + oneCellTooLong + "-1");
    expect(lastCell[0]).toBeDefined();
    expect(tooLong[0]).not.toBeDefined();
  });

  it("populate a board with the correct number of rows", function() {
    var correctRowCount = board.vals.rowsPerBoard;
    var oneRowTooLong = board.vals.rowsPerBoard + 1;
    board.vals.gameBoard = $(makeTestBoard());
    board.drawAllRows();
    var lastRow = board.vals.gameBoard.children("#1-" + correctRowCount);
    var tooLong = board.vals.gameBoard.children("#1-" + oneRowTooLong);
    expect(lastRow[0]).toBeDefined();
    expect(tooLong[0]).not.toBeDefined();
  });

  describe("updateCell(id, LivingStatus)", function() {
      beforeEach(function(){
        var cell = buildCell(2,1, true);
        board.vals.gameBoard = $(makeTestBoard());
        board.drawAllRows();
      });
      it("draws dead cell when passed false", function() {
        board.updateCell([2,1], false);
        $cellDiv = board.vals.gameBoard.children("#2-1");
        expect($cellDiv.attr("class")).toEqual('cell-dead');
      });
      it("draws living cell when passed true", function() {
        board.updateCell([2,1], true);
        $cellDiv = board.vals.gameBoard.children("#2-1");
        expect($cellDiv.attr("class")).toEqual('cell-alive');
      });
  });




});

function makeTestBoard(context) {
  var testBoard = document.createElement("div");
  testBoard.setAttribute("id", "test-board");
  return testBoard;
}
