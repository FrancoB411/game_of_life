describe("Board", function() {
  //draw a row of cells
	// 52.times do |i|
	//    draw a cell   
	//end
  //make a board div 
  //fill board div 

  beforeEach(function() {
    board = new Board();
  });

  it("should be able to measure the window size", function() {
		var width = board.windowWidth();
    var height = board.windowHeight();
		expect(width).toEqual(window.innerWidth -10);
		expect(height).toEqual(window.innerHeight -10);
  });

	it("should have a cell size", function() {
		var cellSize = board.cellSize();
		expect(cellSize).toEqual(24);
	});

	it("should be able to calculate the number of cells to draw per row", function() {
		var cellsPerRow = board.cellsPerRow();
		var cells_that_fit_in_row = Math.floor(board.windowWidth()/board.cellSize() );
		expect(cellsPerRow).toEqual(cells_that_fit_in_row);
	});

	it("should be able to calculate the number of rows", function() {
		var numberOfRows = board.numberOfRows();
		var rows_that_fit_in_window = Math.floor(board.windowHeight()/board.cellSize() );
		expect(numberOfRows).toEqual(rows_that_fit_in_window);
	});
	
	it("should be able to create a board object", function() {
		expect(typeof(board)).toEqual("object");
	});

	// pending
	it("should populate a row with the correct number of cells", function() {
		var myDiv = document.createElement("div");
		board.gameBoard = $("div");
		board.drawRow();
		var cells = $(".cell-alive");
		alert(board.cellsPerRow());
		alert(cells.size());


	// 	//
	// 	var first_cell = $("#1-1");
	// 	expect(first_cell.attr("id")).toEqual("1-1");
	// 	//expect(last_cell_idl).toEqual("object");
	});
	
});

