describe("Cell", function() {

  beforeEach(function() {
    this.testCell = new Cell();
  });

  it("is a Cell object", function() {
    expect(this.testCell instanceof Cell).toEqual(true);
  });

  it("defaults to dead", function() {
    expect(this.testCell.isAlive()).toEqual(false);
  });

  it("can be brought to life", function() {
    this.testCell.live();
    expect(this.testCell.isAlive()).toEqual(true);
  });

  it("can be killed", function() {
    this.testCell.live();
    this.testCell.die();
    expect(this.testCell.isAlive()).toEqual(false);
  });

  describe("cell.id()", function() {
    it("gets cell id when no passed params", function() {
      expect(this.testCell.id()).toEqual([]);
    });

    it("sets cell id when passed params", function() {
      this.testCell.id(1,1);
      expect(this.testCell.id()).toEqual([1,1]);
    });
  });

});