function World() {
  this.currentCells = [];
  this.width = 1;
  this.height = 1;
}

World.prototype.setCells =  function() {
  for(var i = 1; i <= this.width; i++){
    for(var j = 1; j <= this.height; j++) {
      cell = new Cell();
      cell.id(i,j);
      this.currentCells.push(cell);
    }
  }
};

World.prototype.randomizeCellBirths = function() {
  _.each(this.currentCells, this.randomlyBirthCell);
};

World.prototype.randomlyBirthCell = function(cell){
  return (Math.random() < 0.5) ? cell.live() : cell.die();
};

World.prototype.setHeight = function(num) {
  this.height = num;
};

World.prototype.setWidth = function(num) {
  this.width = num;
};

World.prototype.removeDeadCells = function() {
  function living(cell) { return cell.isAlive() === true; }
  this.currentCells = _.filter(this.currentCells, living);
};

World.prototype.seed = function(x,y) {
  this.setWidth(x);
  this.setHeight(y);
  this.setCells();
  this.randomizeCellBirths();
  this.removeDeadCells();
};

World.prototype.isNeighbor = function(cell1, cell2) {
  var id1 = cell1.id();
  var id2 = cell2.id();
  var areNotEqual = !_.isEqual(id1, id2);
  var shareNeighborhood = this.areCoordinatesAdjacent(id1, id2);
  return  areNotEqual && shareNeighborhood;
};

World.prototype.areCoordinatesAdjacent = function(id1, id2) {
  for(var i = 0; i < id1.length; i++) {
    if(Math.abs(id1[i] - id2[i]) <= 1){
      continue;
    }
    else {
      return false;
    }
  }
  return true;
};

// gets neighbors for a cell
// @param a cell, a list of cells
// @return a list of neighbors
World.prototype.getNeighbors = function(cell, listOfCells) {
  var neighbors = [];
  for(var i =0; i < listOfCells.length; i++){
    var listCell = listOfCells[i];
    if(this.isNeighbor(cell, listCell)){
      neighbors.push(listCell);
    }
  }
  return neighbors;
};

// calculates all computable cells in a generation.
// @param width int, height int, cellList of live cells
// @return cell list of computbale cells. 
World.prototype.getComputableCells = function(width, height, currentLivingCells){
  var newList = this.copyCellList(currentLivingCells);
  // console.log("cells Copied");
  var computableIDs = this.getComputableIDsAround(width, height, currentLivingCells);
  // console.log("ids computed");
  var newComputableIDs =
      this.removeIDsThatMatchIDsInCellList( computableIDs,
                                            currentLivingCells);
  //instantiate dead cells for any id's without cells.
  for (var j = newComputableIDs.length - 1; j >= 0; j--) {
    var id = newComputableIDs[j];
    var newCell = this.makeNewCellWithID(id);
    newList.unshift(newCell);
  }
  return newList;
};

// given a ID, lists its immediate neighbor ID's
    // Each ID is a two dimentionsal array.
    // Would be nice to make this dimension independent.
// @param and ID array
// @return Array of ID's
World.prototype.listNeighborIDsFor = function(id){
  var neighborIDs =[];
  neighborIDs = neighborIDs.concat([[id[0]-1, id[1] -1],[id[0], id[1] -1],[id[0]+1, id[1] -1]]);
  neighborIDs = neighborIDs.concat([[id[0]-1, id[1]],[id[0]+1, id[1]]]);
  neighborIDs = neighborIDs.concat([[id[0]-1, id[1] +1],[id[0], id[1] +1],[id[0]+1, id[1] +1]]);
  return neighborIDs;
};

World.prototype.copyCellList = function(cellList) {
  var newCellList = [];
  cellList.forEach(function(oldCell){
    var newCell = new Cell();
    newCell.uid = _.clone(oldCell.uid);
    newCell.alive = _.clone(oldCell.isAlive());
    newCellList.push(newCell);
  });
  return newCellList;
};

World.prototype.idOutOfRange = function(id, width, height) {
  return (id[0] > width || id[1] > height) || (id[0] <= 0 || id[1] <= 0);
};

World.prototype.cullOutOfRangeCells = function(cells, width, height) {
  var self = this;
  return _.reject(cells, function(cell){ return self.idOutOfRange(cell.id(), width, height); });
};

// gets the id of the possible computable neighbors for each cell in list
// @param Array of cells
// @return Array of IDs
World.prototype.getComputableIDsAround = function(width, height, cellList){
  var neighborhoods = this.getIDsInNeighborRangeForCellList(cellList);
  var uniqueIDsInNeighborhoods = this.deleteDuplicateIDs(neighborhoods);
  var uniqueIDsInRangeInNeighborhoods = this.removeOutOfRangeIDs(width, height, uniqueIDsInNeighborhoods);
  return uniqueIDsInRangeInNeighborhoods;
};

// TODO make tests for this
// gets the ids in neighbor rangs for a list of cells
// @param Array of cells
// @return Array of IDs
World.prototype.getIDsInNeighborRangeForCellList = function(cellList){
  return  _.reduce(cellList, function(memo, cell){
            return memo.concat(this.listNeighborIDsFor(cell.id()));
          }.bind(this),[]);
};

// returns true if the id properties match, false if they don't.
// @param two IDs
// @return boolean
World.prototype.isSameID =  function(id1, id2){
  return _.isEqual(id1, id2);
};

// removes any IDs that match the IDs in cell array
// @params iDArray, cellArray
// @return iDArray
World.prototype.removeIDsThatMatchIDsInCellList = function(iDList, cellList){
  return _.filter(iDList, function(id){
    return !this.idIsInCellList(cellList, id);
  }.bind(this));
};

// checks if a CellList contains an ID
// @params cell Array, id
// @return boolean
World.prototype.idIsInCellList = function(cellList, id) {
  return _.some(cellList, function(cell){
    var cellID = cell.id();
    return this.isSameID(cellID, id);
  }.bind(this));
};

World.prototype.makeNewCellWithID = function(id) {
  var cell  =  new Cell();
  cell.uid = id;
  return cell;
};

World.prototype.isIDInIDList =  function(idList, id) {
  return _.some(idList, function(listID){
    return this.isSameID(listID, id);
  }.bind(this));
};

World.prototype.deleteDuplicateIDs = function(IDList) {
  var tempList = _.cloneDeep(IDList);
  var uniques = [];
  while(tempList.length){
    var currentID = tempList.shift();
    if(this.isIDInIDList(tempList, currentID)){
      continue;
    }else{
      uniques.push(currentID);
    }
  }
  return uniques;
};

World.prototype.removeOutOfRangeIDs = function(width, height, idList) {
  var tempList = _.cloneDeep(idList);
  var inBounds = [];
  while(tempList.length){
    var currentID = tempList.shift();
    if(this.idOutOfRange( currentID, width, height)){
      continue;
    }else{
      inBounds.push(currentID);
    }
  }
  return inBounds;
};


World.prototype.countLivingNeighbors = function(cellList, cell){
  var liveCells = _.filter(cellList, function(listCell){ return listCell.isAlive(); });
  return this.getNeighbors(cell, liveCells).length;
};

World.prototype.removeDeadCellsFrom =  function(cellList){
  var liveCellList = this.copyCellList(cellList);
  return _.filter(liveCellList, function(cell){
    return cell.isAlive();
  });
};
// judges cells based on game rules
// @params cellArray of living/dead cells
// @return cellArray of judged living/dead cells
World.prototype.judgeCells = function(cellList) {
  var game = new Game();
  var liveCellsReference = this.removeDeadCellsFrom(cellList);
  var liveCellsNextGen = this.copyCellList(liveCellsReference);
  for (var i = liveCellsNextGen.length - 1; i >= 0; i--) {
    var nextGenCell = liveCellsNextGen[i];
    var neighborCount = this.countLivingNeighbors(liveCellsReference, nextGenCell);
    game.killCellWithLessThanTwoNeighbors(nextGenCell, neighborCount);
    game.killCellWithMoreThanThreeNeighbors(nextGenCell, neighborCount);
  }
  var deadCellsReference = _.filter(cellList, function(listCell){ return !listCell.isAlive(); });
  var deadCellsNextGen = this.copyCellList(deadCellsReference);
  for (var j = deadCellsNextGen.length - 1; j >= 0; j--) {
    var nextGenDeadCell = deadCellsNextGen[j];
    var neighborCountforDeadCell = this.countLivingNeighbors(liveCellsReference, nextGenDeadCell);
    game.birthCellWithThreeNeighbors(nextGenDeadCell, neighborCountforDeadCell);
  }
  return deadCellsNextGen.concat(liveCellsNextGen);
};