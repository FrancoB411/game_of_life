describe("Game", function(){

  beforeEach(function() {
    this.testGameCell = new Cell();
    this.testGame = new Game();
  });

  it("is a Game object", function() {
    expect(this.testGame instanceof Game).toEqual(true);
  });

  it("kills cells with less than two live neighbors", function() {
    this.testGameCell.live();
    expect(this.testGameCell.isAlive()).toEqual(true);
    this.testGame.killCellWithLessThanTwoNeighbors(this.testGameCell, 1);
    expect(this.testGameCell.isAlive()).toEqual(false);
  });

  it("kills cells with more than three live neighbors", function() {
    this.testGameCell.live();
    expect(this.testGameCell.isAlive()).toEqual(true);
    this.testGame.killCellWithMoreThanThreeNeighbors(this.testGameCell, 4);
    expect(this.testGameCell.isAlive()).toEqual(false);
  });

  it("births cells with exactly three live neighbors", function() {
    expect(this.testGameCell.isAlive()).toEqual(false);
    this.testGame.birthCellWithThreeNeighbors(this.testGameCell, 3);
    expect(this.testGameCell.isAlive()).toEqual(true);
  });

});


  // it("randomly assigns alive to cells", function() {
  //   var life = cell.aliveOrDead();
  //   var output;
  //   if ( cell.aliveOrDead() == "class='cell-alive'"|| "class='cell-dead'") {
  //     output =  true;
  //   }
  //   // I know this is janky. Will work on a stats driven test later.
  //   expect(output).toEqual(true);
  // });

  // it("sets a random color to a cell", function() {
  //   var color = cell.color();
  //   var hexColor = /#[0-9 | a-f]{6}/i;
  //   var result = color.match(hexColor).toString().length;
  //   expect(result).toEqual(7);
  // });
