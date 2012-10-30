describe("Cell", function() {

  beforeEach(function() {
    cell = new Cell();
    //board.init();
  });

	it("creates a cell object", function() {
  	expect(typeof(cell)).toEqual("object");
  });


    it("randomly assigns alive to cells", function() {
    var life = cell.aliveOrDead();
    // I know this is janky. Will work on a better test later.
    expect(life).toEqual("class='cell-alive'"|| "class='cell-dead'");
  });

});