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
  describe("cells", function() {
    it("the current generation of cells", function() {
      expect(this.cells instanceof Array).toBe(true);
    });
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

  describe("areCoordinatesAdjacent(cellId, cellId)", function() {
    it("returns true if all coordinates are <= 1", function(){
      var id1 = [1,2,3,4,5,6,7];
      var id2 = [0,1,2,3,4,5,6];
      expect(this.world.areCoordinatesAdjacent(id1, id2)).toBe(true);
    });
    it("returns false if any coordinate distance is > 1", function(){
      var id1 = [2,2,3,4,5,6,7];
      var id2 = [0,1,2,3,4,5,6];
      expect(this.world.areCoordinatesAdjacent(id1, id2)).toBe(false);
    });
  });

  describe("getNeighbors(cell, cells)", function() {
    beforeEach(function() {
      this.world.setHeight(3);
      this.world.setWidth(3);
      this.world.setCells();
      this.cells = this.world.currentCells;
      this.selfCell = this.cells[0];
      
      //neighbors
      this.neighbor12 = this.cells[1];
      this.neighbor21 = this.cells[3];
      this.neighbor22 = this.cells[4];

      //non-neighbors
      this.cell13 = this.cells[2];
      this.cell23 = this.cells[5];
      
      this.neighbors = this.world.getNeighbors(this.selfCell, this.cells);
    });

    it("returns an array of cells that are neighbors", function() {
      var neighborIds = _.map(this.neighbors, function(cell) { return cell.id(); });
      expect(this.neighbors.length).toBe(3);
    });
    it("each cell is an immediate neighbor", function() {
      var cellId = this.selfCell.id();

      for(var i = 0; i < this.neighbors.length; i++){
        var neighborId = this.neighbors[i].id();
        var areAdjacent = this.world.areCoordinatesAdjacent(cellId, neighborId);
        expect(areAdjacent).toBe(true);
      }
    });
  });

  describe("GetComputableCells(width, height, listOfLiveCells)", function(){
    beforeEach(function() {
      this.world.setHeight(5);
      this.world.setWidth(5);

      this.cell = new Cell();
      this.cell.id(3,3);
      this.world.currentCells.push(cell);
      this.cells[0].live();

      this.cell2 = new Cell();
      this.cell2.id(5,5);
      this.world.currentCells.push(cell);
      this.cells[1].live();
      
      this.cells = this.world.currentCells;
      this.width =  this.world.width;
      this.height =  this.world.height;
      this.computableCells = this.world.getComputableCells(this.width, this.height, this.cells);
    });

    it("returns an array of all computable cells in the world", function() {
      expect(this.computableCells instanceof Array).toBe(true);
      expect(this.computableCells.length).toEqual(10);
      // expect every cell id in computable cells to be unique
      // expect all cell ID's max x and y coords to be less than width & height
    });
    it("includes the original cells in the Array", function() {
      var hasOriginalCell1 = _.any(this.computableCells, function(cell){
                              return _.isEqual(this.cell.id(), cell.id());
                            });
      var hasOriginalCell2 = _.any(this.computableCells, function(cell){
                        return _.isEqual(this.cell.id(), cell.id());
                      });
      expect(hasOriginalCell1).toBe(true);
      expect(hasOriginalCell2).toBe(true);
    });
    it("returns no duplicate cells", function() {
      var noDuplicateCells = (_.uniq(this.computableCells).length === this.computableCells.length);
      expect(noDuplicateCells).toBe(true);
    });
    it("does not return cells out of the world's range", function() {
      var hasOutOfRangeCells =  _.any(this.computableCells, function(cell) {
                                  return this.cell.id()[0] > this.width ||
                                         this.cell.id()[1] > this.height;
                                });
      expect(hasOutOfRangeCells).toBe(false);
    });
  });

  describe("listNeighborIDsFor(id, width, height)", function() {
    it("returns a list of neighbor ids for a given id", function() {
      var id = [3,3];
      var expected = [[2,2],[2,3], [2,4], [3,2], [3,4], [4,2], [4,3], [4,4]];
      var neighborIDs = this.world.listNeighborIDsFor(id, 5, 5);

      function equalIDs(exp) {
        return _.isEqual(exp, neighborID);
      }

      for(var i = neighborIDs.length - 1; i >= 0; i--) {
        var neighborID = neighborIDs[i];
        var match = _.filter(expected, equalIDs);
        expect(match.length).toEqual(1);
        expect(match[0]).toEqual(neighborID);
      }
      expect(neighborIDs instanceof Array).toBe(true);
      expect(neighborIDs.length).toEqual(8);
    });
  });

  describe("copyCellList(cellList)", function() {
    beforeEach(function() {
      this.world.setHeight(5);
      this.world.setWidth(5);
      this.world.setCells();
      this.cells = this.world.currentCells;
    });

    it("returns a new cell list with copies of all cells in cellList", function() {
      var newList = this.world.copyCellList(this.cells);
      var self = this;
      newList.forEach(function(newCell){
        var newCellID = newCell.id();
        var oldCellID = self.cells[newList.indexOf(newCell)].id();
        expect(_.isEqual(newCellID, oldCellID)).toBe(true);
        expect(newCellID === oldCellID).toBe(false);
      });
    });
  });

  describe("cullOutOfRangeCells(cells, width, height)", function() {
    beforeEach(function() {
      this.world.setHeight(5);
      this.world.setWidth(5);
      this.world.setCells();
      this.cells = this.world.currentCells;
    });

    it("removes cells out of range of the world's width and height", function() {
      expect(this.cells.length).toEqual(25);
      var culledCells = this.world.cullOutOfRangeCells(this.cells, 4, 4);
      expect(culledCells.length).toEqual(16);
    });
  });

  describe("idOutOfRange(id, width, height)", function() {
    beforeEach(function() {
      this.width = 4;
      this.height = 4;
      this.inRangeID = [4,4];
      this.outOfRangeId = [4,5];
      this.iDWithZero = [0,4];
      this.iDWithNegative = [1,-1];
    });

    it("returns true if an ID is out of world boundaries", function() {
      expect(this.world.idOutOfRange( this.outOfRangeId,
                                      this.width,
                                      this.height)).toBe(true);
    });
    it("returns true if an ID has <= 0 coordinate", function() {
      expect(this.world.idOutOfRange( this.iDWithZero,
                                      this.width,
                                      this.height)).toBe(true);
      expect(this.world.idOutOfRange( this.iDWithNegative,
                                      this.width,
                                      this.height)).toBe(true);
    });

    it("returns false if ID is within world boundaries", function() {
       expect(this.world.idOutOfRange(  this.inRangeID,
                                        this.width,
                                        this.height)).toBe(false);
    });
  });

  describe("getComputableIDsFrom(cellList)", function() {
    beforeEach(function() {
      this.world.setHeight(2);
      this.world.setWidth(2);
      this.world.setCells();
      this.cells = this.world.currentCells;
    });

    it("takes a list of cells and returns all computable IDs", function() {
      var computableIDs = this.world.getComputableIDsFrom(this.cells);
      expect(computableIDs.length).toBe(32);
      expect(_.first(computableIDs)).toEqual([0,0]);
      expect(_.last(computableIDs)).toEqual([3,3]);
    });
  });

});

// TODO SetCells should give unique ids
// TODO setCells ids should all be within width and height
// TODO setCells should not create new cell if cell exists

// collect living neighbors
// add dead neighbors

  // describe("world.tick()", function() {
  //   beforeEach(function(){
  //     this.world.seed(x,y);
  //   });

  //   it("gets all live cells and their neighbors", function() {
  //     var AllComputableCells = this.world.getNeighborhoodsFor(this.cells); 
  //   });
  // });


