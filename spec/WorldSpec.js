function buildCell(x, y, bool) {
  var cell =  new Cell();
  cell.alive = bool;
  cell.id(x, y);
  return cell;
}

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
      this.cell.live();
      this.world.currentCells.push(this.cell);

      this.cell2 = new Cell();
      this.cell2.id(5,5);
      this.cell2.live();
      this.world.currentCells.push(this.cell2);

      this.cells = this.world.currentCells;
      this.width =  this.world.width;
      this.height =  this.world.height;
      this.computableCells = this.world.getComputableCells(this.width, this.height, this.cells);
    });

    it("returns an array of all computable cells in the world", function() {
      expect(this.computableCells instanceof Array).toBe(true);
      expect(this.computableCells.length).toEqual(12);
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
      _.first(this.cells).live();
      _.last(this.cells).live();
      this.newList = this.world.copyCellList(this.cells);
    });

    it("returns a new cell list with copies of all cells in cellList", function() {
      var self = this;
      this.newList.forEach(function(newCell){
        var newCellID = newCell.id();
        var oldCellID = self.cells[self.newList.indexOf(newCell)].id();
        expect(_.isEqual(newCellID, oldCellID)).toBe(true);
        expect(newCellID === oldCellID).toBe(false);
      });
    });
    it("keeps living cells living", function() {
      expect(_.first(this.newList).isAlive()).toBe(true);
    });
    it("keeps dead cells dead", function() {
      expect(this.newList[1].isAlive()).toBe(false);
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

  describe("getComputableIDsAround(width, height, cellList)", function() {
    beforeEach(function() {
      this.world.setHeight(5);
      this.world.setWidth(5);

      this.cell = new Cell();
      this.cell.id(3,3);
      this.cell.live();
      this.world.currentCells.push(this.cell);
      this.cells = this.world.currentCells;

      this.cell2 = new Cell();
      this.cell2.id(5,5);
      this.cell2.live();
      this.world.currentCells.push(this.cell2);

      this.cells = this.world.currentCells;
      this.width =  this.world.width;
      this.height =  this.world.height;
      this.computableIDs = this.world.getComputableIDsAround(this.width, this.height, this.cells);
    });

    it("returns a list of all computable IDs", function() {
      expect(this.computableIDs.length).toBe(10);
      expect(_.first(this.computableIDs)).toEqual([2,2]);
      expect(_.last(this.computableIDs)).toEqual([4,5]);
    });

    it("that are unique IDs", function() {
      var uniques = this.world.deleteDuplicateIDs(_.cloneDeep(this.computableIDs));
      expect(this.computableIDs).toEqual(uniques);
    });

    it("within range of the world", function() {

    });
  });

  describe("isSameID(id1, id2)", function() {
    beforeEach(function(){
      this.world = new World();
      this.matchingID1 = [1,1];
      this.matchingID2 = [1,1];
      this.nonMatchingID1 = [1,2];
      this.nonMatchingID2 = [2,1];
    });

    it("returns true if the ids match", function(){
      var result = this.world.isSameID(this.matchingID1, this.matchingID2);
      expect(result).toBe(true);
    });
    it("returns false is the ids don't match", function(){
      var result1 = this.world.isSameID(this.nonMatchingID1, this.matchingID1);
      var result2 = this.world.isSameID(this.nonMatchingID2, this.matchingID1);

      expect(result1).toBe(false);
      expect(result2).toBe(false);
    });
  });

  describe("removeIDsThatMatchIDsInCellList(existingCells, listOfIDs)", function() {
    beforeEach(function() {
      this.world = new World();
      this.world.setWidth(x);
      this.world.setHeight(y);
      this.world.setCells();
      this.cells = this.world.currentCells;
      this.ids = [[2,2],[4,4]];
    });

    it("removes any IDs that match the cellIDs in filter array", function() {
      var filteredIDs = this.world.removeIDsThatMatchIDsInCellList(this.ids, this.cells);
      expect(filteredIDs).toEqual([[4,4]]);
    });
  });

  describe("idIsInCellList(cellList, id)", function() {
    beforeEach(function() {
      this.world = new World();
      this.world.setWidth(x);
      this.world.setHeight(y);
      this.world.setCells();
      this.cellList = this.world.currentCells;
      this.idInCellList = [2,2];
      this.idNotInCellList = [4,4];
    });
    it("returns true if ID is in cellList", function(){
      expect(this.world.idIsInCellList(this.cellList, this.idInCellList)).toBe(true);
    });
    it("returns false if ID is NOT in cellList", function(){
      expect(this.world.idIsInCellList(this.cellList, this.idNotInCellList)).toBe(false);
    });
  });

  describe("makeNewCellWithID(id)", function(){
    it("returns a new Cell with the given ID", function() {
      var id = [1,1];
      var cell =  this.world.makeNewCellWithID(id);
      expect(cell instanceof Cell).toBe(true);
      expect(cell.id()).toEqual(id);
    });
  });

  describe("isIDInIDList(iDlist, id)", function(){
    beforeEach(function(){
      this.world = new World();
      this.idList = [[1,1], [2,2], [3,3]];
      this.idInIDList = [2,2];
      this.idNotInIDList = [4,4];
    });
    it("returns true if an ID is in and ID list", function() {
      expect(this.world.isIDInIDList(this.idList, this.idInIDList)).toBe(true);
    });
    it("returns false if an ID is NOT in and ID list", function() {
      expect(this.world.isIDInIDList(this.idList, this.idNotInIDList)).toBe(false);
    });
  });

  describe("deleteDuplicateIDs(idList)", function() {
    beforeEach(function(){
      this.world = new World();
      this.idList = [[1,1], [1,1], [3,3]];
      this.uniqueIDList = [[1,1], [3,3]];
    });
    it("delete duplicate ID's from an ID list", function() {
      var uniqueIDs = this.world.deleteDuplicateIDs(this.idList);
      expect(uniqueIDs).toEqual(this.uniqueIDList);
    });
    it("does not modify the original ID list", function() {
      var uniqueIDs = this.world.deleteDuplicateIDs(this.idList);
      expect(this.idList).toEqual([[1,1], [1,1], [3,3]]);
    });
  });

  describe("removeOutOfRangeIDs(width, height, idList)", function() {
    beforeEach(function(){
      this.idList = [[1,1], [1,1], [3,2], [2,3], [2,2]];
    });
    it("removes IDs that are out of range", function() {
      var expectedInRangeIDs = [[1,1], [1,1], [2,2]];
      var actualinRangeIDs = this.world.removeOutOfRangeIDs(2, 2, this.idList);
      expect(actualinRangeIDs).toEqual(expectedInRangeIDs);
    });
  });


  describe("countLivingNeighbors(cellList, cell)", function() {
    beforeEach(function(){
      this.world =  new World();
      this.world.width = 3;
      this.world.height = 3;
      this.world.setCells();
      this.cellWithNoNeighbors = _.find(this.world.currentCells, function(cell){
        return _.isEqual(cell.id(), [1,1]);
      });
      this.cellWithNoNeighbors.live();
      this.cellWithTwoNeighbors = _.find(this.world.currentCells, function(cell){
        return _.isEqual(cell.id(), [3,3]);
      });
      this.cellWithTwoNeighbors.live();
      this.cellWithThreeNeighbors = _.find(this.world.currentCells, function(cell){
        return _.isEqual(cell.id(), [3,2]);
      });
      this.cellWithThreeNeighbors.live();
      this.cellWithOneNeighbor = _.find(this.world.currentCells, function(cell){
        return _.isEqual(cell.id(), [3,1]);
      });
      this.cellWithOneNeighbor.live();
      this.neighbor23 = _.find(this.world.currentCells, function(cell){
        return _.isEqual(cell.id(), [2,3]);
      });
      this.neighbor23.live();
    });
    it("returns an integer that is equal to the number of neighbors", function(){
      var neighborCount0 = this.world.countLivingNeighbors(this.world.currentCells, this.cellWithNoNeighbors);
      var neighborCount1 = this.world.countLivingNeighbors(this.world.currentCells, this.cellWithOneNeighbor);
      var neighborCount2 = this.world.countLivingNeighbors(this.world.currentCells, this.cellWithTwoNeighbors);
      var neighborCount3 = this.world.countLivingNeighbors(this.world.currentCells, this.cellWithThreeNeighbors);
      expect(neighborCount0).toBe(0);
      expect(neighborCount1).toBe(1);
      expect(neighborCount2).toBe(2);
      expect(neighborCount3).toBe(3);
    });
  });

describe("removeDeadCellsFrom(cellList)", function(){
  beforeEach(function(){
    this.world = new World();
    this.liveCell = buildCell(7, 7, true);
    this.deadCell = buildCell(7, 6, false);
    this.deadCell = buildCell(6, 6, false);
    this.list = [this.liveCell, this.deadCell];
    this.listCopy = this.world.copyCellList(this.list);
    this.removed = this.world.removeDeadCellsFrom(this.list);
  });
  it("removes dead cells from a cell list", function() {
    expect(this.removed).toEqual([this.liveCell]);
  });
  it("does not modify the original list", function() {
    expect(this.list).toEqual(this.listCopy);
  });
});

  describe("judgeCells(computableCells)", function() {
    beforeEach(function(){

      this.world =  new World();
      this.cellWithTooFewNeighbors      = buildCell(7,7, true);
      this.cellWithTooManyNeighbors     = buildCell(3,3, true);
      this.neighborOne                  = buildCell(2,2, true);
      this.neighborTwo                  = buildCell(3,2, true);
      this.neighborThree                = buildCell(4,2, true);
      this.neighborFour                 = buildCell(2,3, true);

      this.cellWithTwoNeighbors         = buildCell(2,1, true);
      this.cellWithThreeNeighbors       = buildCell(4,1, true);
      this.thirdNeighbor                = buildCell(5,2, true);
      this.deadCellWithThreeNeighbors   = buildCell(1,2, false);

      this.cells = [  this.cellWithTooFewNeighbors,
                      this.cellWithTooManyNeighbors,
                      this.neighborOne,
                      this.neighborTwo,
                      this.neighborThree,
                      this.neighborFour,
                      this.cellWithTwoNeighbors,
                      this.cellWithThreeNeighbors,
                      this.thirdNeighbor,
                      this.deadCellWithThreeNeighbors
                    ];
      this.cellsCopy = this.world.copyCellList(this.cells);
      this.judgedCells = this.world.judgeCells(this.cells);
    });

    it("returns a list of cells", function(){
      expect(this.judgedCells instanceof Array).toBe(true);
      expect(this.judgedCells[0] instanceof Cell).toBe(true);
    });
    it("that is the same length as computableCells", function(){
      expect(this.cells.length).toEqual(this.judgedCells.length);
    });
    it("kills living cells with less than two live neighbors ", function(){
      var judgedCellWithTooFewNeighbors = _.find(this.judgedCells, function(cell) {
        return _.isEqual(cell.id(), this.cellWithTooFewNeighbors.id());
      }.bind(this));
      expect(judgedCellWithTooFewNeighbors.isAlive()).toBe(false);
    });
    it("kills living cells with more than three live neighbors ", function(){
      var judgedCellWithTooManyNeighbors = _.find(this.judgedCells, function(cell) {
        return _.isEqual(cell.id(), this.cellWithTooManyNeighbors.id());
      }.bind(this));
      expect(judgedCellWithTooManyNeighbors.isAlive()).toBe(false);
    });
    it("keeps living cells with two or three live neighbors alive ", function(){
      var judgedCellWithTwoNeighbors = _.find(this.judgedCells, function(cell) {
        return _.isEqual(cell.id(), this.cellWithTwoNeighbors.id());
      }.bind(this));
      expect(judgedCellWithTwoNeighbors.isAlive()).toBe(true);
    });
    it("brings dead cells with three live neighbors to life", function(){
      var judgedDeadCellWithThreeNeighbors = _.find(this.judgedCells, function(cell) {
        return _.isEqual(cell.id(), this.deadCellWithThreeNeighbors.id());
      }.bind(this));      
      expect(judgedDeadCellWithThreeNeighbors.isAlive()).toBe(true);
    });
    it("does not modify the original cell List", function(){
      expect(_.isEqual(this.cells, this.cellsCopy)).toBe(true);
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


});