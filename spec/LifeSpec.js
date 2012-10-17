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

	it("draws the correct number of cells per row", function() {
		var cellsPerRow = board.cellsPerRow();
		var cells_that_fit_in_row = Math.floor(board.windowWidth()/board.cellSize() );
		expect(cellsPerRow).toEqual(cells_that_fit_in_row);
	});

	it("should be able to calculate the number of rows", function() {
		var numberOfRows = board.numberOfRows();
		var rows_that_fit_in_window = Math.floor(board.windowHeight()/board.cellSize() );
		expect(numberOfRows).toEqual(rows_that_fit_in_window);
	});
	


	it("should populate a row with the correct number of cells", function() {
		var correctRowLength = board.cellsPerRow();
		var oneCellTooLong = correctRowLength + 1;
		var testBoard = document.createElement("div");
		testBoard.setAttribute("class", "test-board");
		board.gameBoard = $(testBoard);
		board.drawRow(1);
		var lastCell = board.gameBoard.children("#" + correctRowLength + "-1");
		var tooLong = board.gameBoard.children("#" + oneCellTooLong + "-1");
		expect(lastCell[0]).toBeDefined();
		expect(tooLong[0]).not.toBeDefined();
	});

	it("should populate a board with the correct number of rows", function() {
		var correctRowCount = board.numberOfRows();
		var oneRowTooLong = board.numberOfRows() + 1;
		var testBoard = document.createElement("div");
		board.gameBoard = $(testBoard);
		board.drawBoard();
		var lastRow = board.gameBoard.children("#1-" + correctRowCount);
		var tooLong = board.gameBoard.children("#1-" + oneRowTooLong);
		expect(lastRow[0]).toBeDefined();
		expect(tooLong[0]).not.toBeDefined();
	});
	
});

