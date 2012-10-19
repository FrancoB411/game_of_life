describe("Board", function() {

  beforeEach(function() {
    board = new Board();
  });

	it("creates a board object", function() {
		expect(typeof(board)).toEqual("object");
	});

	it("has a cell size value", function() {
		var cellSize = board.vals.cellSize;
		expect(cellSize).toEqual(24);
	});

	it("has a default margin", function() {
		var defMargin = 15;
		board.vals.defaultMargin = defMargin;
		expect(defMargin).toEqual(board.vals.defaultMargin);
	});

	it("calculates vertical margins", function() {
		board.setVerticalMargin();
		var additionalMargin = Math.floor((window.innerHeight % board.vals.cellSize)/2);
		var vMargin = board.vals.defaultMargin + additionalMargin;
		expect(vMargin).toEqual(board.vals.verticalMargin);
	});

	it("calculates horizontal margins", function() {
		board.setHorizontalMargin();
		var additionalMargin = Math.floor((window.innerWidth % board.vals.cellSize)/2);
		var hMargin = board.vals.defaultMargin + additionalMargin;
		expect(hMargin).toEqual(board.vals.horizontalMargin);
	});

	it("calculates board Height", function() {
		board.setBoardHeight();
		var boardHeight = (window.innerHeight - (board.vals.verticalMargin * 2));
		expect(boardHeight).toEqual(board.vals.boardHeight);
	});

	it("calculates board Width", function() {
		board.setBoardWidth();
		var boardWidth = (window.innerWidth - (board.vals.horizontalMargin * 2));
		expect(boardWidth).toEqual(board.vals.boardWidth);
	});

	it("draws a board with the appropriate height and width", function() {
		var testBoard = document.createElement("div");
		board.vals.gameBoard = $(testBoard);
		board.drawBoard();

		expect(board.vals.gameBoard.height()).toEqual(board.vals.boardHeight);
		expect(board.vals.gameBoard.width()).toEqual(board.vals.boardWidth);
	});

	it("calculates the correct number of cells per row", function() {
		board.getCellsPerRow();
		var cellsPerRow = board.vals.cellsPerRow;
		var cells_that_fit_in_row = Math.floor(board.vals.boardWidth/board.vals.cellSize);
		expect(cellsPerRow).toEqual(cells_that_fit_in_row);
	});

	it("should be able to calculate the number of rows", function() {
		board.getNumberOfRows();
		var numberOfRows = board.vals.numberOfRows;
		var rows_that_fit_in_board = Math.floor(board.vals.boardHeight/board.vals.cellSize);
		expect(numberOfRows).toEqual(rows_that_fit_in_board);
	});

	it("should populate a row with the correct number of cells", function() {
		board.drawBoard();
		board.getCellsPerRow();
		var correctRowLength = board.vals.cellsPerRow;
		var oneCellTooLong = board.vals.cellsPerRow + 1;
		var testBoard = document.createElement("div");
		// testBoard.setAttribute("id", "test-board");
		board.vals.gameBoard = $(testBoard);
		board.drawRow(1);
		var lastCell = board.vals.gameBoard.children("#" + correctRowLength + "-1");
		var tooLong = board.vals.gameBoard.children("#" + oneCellTooLong + "-1");
		expect(lastCell[0]).toBeDefined();
		expect(tooLong[0]).not.toBeDefined();
	});

	it("should populate a board with the correct number of rows", function() {
		var correctRowCount = board.setNumberOfRows();
		var oneRowTooLong = board.setNumberOfRows() + 1;
		var testBoard = document.createElement("div");
		board.gameBoard = $(testBoard);
		board.drawBoard();
		var lastRow = board.gameBoard.children("#1-" + correctRowCount);
		var tooLong = board.gameBoard.children("#1-" + oneRowTooLong);
		expect(lastRow[0]).toBeDefined();
		expect(tooLong[0]).not.toBeDefined();
	});
	
});

