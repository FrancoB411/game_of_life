describe("World", function(){
  beforeEach(function(){
    this.world = new World();
  });

  it("is a World object", function() {
    expect(this.world instanceof World).toEqual(true);
  });

  it("has the current generation of cells", function() {
    expect(this.world.currentCells).toEqual([]);
  });

  it("can set the number of cells", function() {
    this.world.setCells(3,3);
    var cells = this.world.currentCells;
    expect(cells.length).toEqual(9);
    expect(cells[0] instanceof Cell).toEqual(true);
  });

  it("gives each cell an id", function() {
    this.world.setCells(3,3);
    var cells = this.world.currentCells;
    expect(cells.length).toEqual(9);
    cells.forEach(hasID);

    function hasID(cell){
      expect(cell.id() instanceof Array).toEqual(true);
      expect(cell.id().length).toEqual(2);
    }
  });

});