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
		var width = board.window_width();
    var height = board.window_height();
		expect(width).toEqual(window.innerWidth -10);
		expect(height).toEqual(window.innerHeight -10);
  });

	it("should have a cell size", function() {
		var cell_size = board.cell_size();
		expect(cell_size).toEqual(24);
	});

	it("should be able to calculate the number of cells to draw per row", function() {
		var cells_per_row = board.cells_per_row();
		var cells_that_fit_in_row = Math.floor(board.window_width()/board.cell_size() );
		expect(cells_per_row).toEqual(cells_that_fit_in_row);
	});

	it("should be able to calculate the number of rows", function() {
		var number_of_rows = board.number_of_rows();
		var rows_that_fit_in_window = Math.floor(board.window_height()/board.cell_size() );
		expect(number_of_rows).toEqual(rows_that_fit_in_window);
	});
	
	it("should be able to create a board object", function() {
		expect(typeof(board)).toEqual("object");
	});

	// pending
	it("should populate a row with the correct number of cells", function() {
		num_cells = board.draw_row();

	// 	//
	// 	var first_cell = $("#1-1");
	// 	expect(first_cell.attr("id")).toEqual("1-1");
	// 	//expect(last_cell_idl).toEqual("object");
	});
	
});


