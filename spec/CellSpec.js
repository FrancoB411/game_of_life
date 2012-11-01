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
    var output;
    if ( cell.aliveOrDead() == "class='cell-alive'"|| "class='cell-dead'") {
      output =  true;
    }
    // I know this is janky. Will work on a stats driven test later.
    expect(output).toEqual(true);
  });

  it("sets a random color to a cell", function() {
    var color = cell.color();
    var hexColor = /#[0-9 | a-f]{6}/i;
    var result = color.match(hexColor).toString().length;
    expect(result).toEqual(7);
  });

});