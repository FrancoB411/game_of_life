describe("World", function(){
  var x, y;
  x = y = 3;

  beforeEach(function(){
    this.world = new World();
    this.cells = this.world.currentCells;
  });

  it("is a World object", function() {
    expect(this.world instanceof World).toEqual(true);
  });

  it("has a width", function() {
    expect(this.world.width).toBe(1);
  });

  it("has a height", function() {
    expect(this.world.height).toBe(1);
  });

  it("has the current generation of cells", function() {
    expect(this.cells instanceof Array).toBe(true);
  });

  describe("can set height and width", function() {
    it("sets height with .setHeight()", function() {
      this.world.setHeight(y);
      expect(this.world.height).toBe(y);
    });
    it("sets width with .setWidth()", function() {
      this.world.setWidth(x);
      expect(this.world.width).toBe(x);
    });
  });

  describe("setCells()", function() {

    beforeEach(function() {
      this.world.setWidth(x);
      this.world.setHeight(y);
    });

    it("adds x * y cells to currentCells", function() {
      this.world.setCells();
      expect(this.cells.length).toBe(x*y);
    });

    it("fills currentCells with cells instances", function() {
      var allCells = _.every(this.cells, function(cell){ return cell instanceof Cell; });
      expect(allCells).toBe(true);
    });

    it("gives each cell an id", function() {
      function hasID(cell){ expect(cell.id().length).toBe(2); }

      _.each(this.cells, hasID);
    });
  });

  describe("randomlyBirthCells(): THIS MIGHT BE INTERMITTANT", function() {
    beforeEach(function(){
      this.world.seed(x,y);
      this.cells = this.world.currentCells;
    });

    it("randomly births cells", function() {
      this.world.randomizeCellBirths();
      function changedToAlive(cell) { return cell.isAlive() === true; }

      var someAreAlive = _.some(this.cells, changedToAlive);
      expect(someAreAlive).toBe(true);
    });
  });

  describe("removeDeadCells()", function() {
    beforeEach(function(){
      this.world.setWidth(x);
      this.world.setHeight(y);
      this.world.setCells();
      this.world.randomizeCellBirths();
    });

    it("removes dead cells", function() {
      expect(this.world.currentCells.length).toBe(9);
      var livingCells = _.filter(this.world.currentCells, function(cell){
        return cell.isAlive() === true;
      });
      this.world.removeDeadCells();
      expect(this.world.currentCells.length).toEqual(livingCells.length);
    });
  });


  describe("seed()", function() {
    beforeEach(function(){
      spyOn(this.world, "setWidth");
      spyOn(this.world, "setHeight");
      spyOn(this.world, "setCells");
      spyOn(this.world, "randomizeCellBirths");
      spyOn(this.world, "removeDeadCells");

      this.world.seed(x,y);
    });

    it("sets width and height", function() {
      expect(this.world.setWidth).toHaveBeenCalled();
      expect(this.world.setHeight).toHaveBeenCalled();
    });

    it("fills currentCells with cells", function() {
      expect(this.world.setCells).toHaveBeenCalled();
    });

    it("randomly births currentCells", function() {
      expect(this.world.randomizeCellBirths).toHaveBeenCalled();
    });

    it("removes the dead ones", function() {
      expect(this.world.removeDeadCells).toHaveBeenCalled();
    });

  });

  describe("isNeighbor(cell1, cell2)", function(){
    beforeEach(function() {
      this.cell1 = new Cell();
      this.cell2 = new Cell();
    });

    it("returns true if cells are neighbors", function(){
      this.cell1.id(1,2);
      this.cell2.id(1,3);
      expect(this.world.isNeighbor(this.cell1, this.cell2)).toBe(true);
    });

    it("returns false if cells are the same", function() {
      this.cell1.id(1,2);
      this.cell2.id(1,2);
      expect(this.world.isNeighbor(this.cell1, this.cell2)).toBe(false);
    });

    it("returns false if cells are not neighbors", function() {
      this.cell1.id(1,1);
      this.cell2.id(1,3);
      expect(this.world.isNeighbor(this.cell1, this.cell2)).toBe(false);
    });
  });

  describe("allCoordsAreNeighborly()", function() {
    it("returns true if all coordinates in an ID are less than 2 apart", function(){
      var id1 = [1,2,3,4,5,6,7];
      var id2 = [0,1,2,3,4,5,6];
      expect(this.world.allCoordsAreNeighborly(id1, id2)).toBe(true);
    });
  });
});


  // describe("world.tick()", function() {
  //   beforeEach(function(){
  //     this.world.seed(x,y);
  //   });

  //   it("gets all live cells and their neighbors", function() {
  //     var AllComputableCells = this.world.getNeighborhoodsFor(this.cells); 
  //   });
  // });


