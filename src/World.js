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

World.prototype.getComputableCells = function(width, height, currentLivingCells){
  // Copy currentLivingCells to a newlist
  var newList = this.copyCellList(currentLivingCells);
  //For each cell in currentLivingCells
  for (var i = currentLivingCells.length - 1; i >= 0; i--) {
    //get a currentLivingCell
    var currentCell = currentLivingCells[i];
    //make a list of computableIDs within range of 1 for that currentLivingCell
    var computableIDs = this.listNeighborIDsFor(currentCell.id());
    
    //for each id in the list
    for (var j = computableIDs.length - 1; j >= 0; j--) {
      var computableID = computableIDs[j];
      // if there's a cell in the newlist with that ID
      if(_.some(newList, function(newListCell){
                  var id1 = computableID;
                  var id2 = newListCell.id();
                  return _.isEqual(id1, id2);
                }))
      {
        continue; //do nothing
      } else {
        //create a new cell with that ID and push it into the newlist.
        var newCell = new Cell();
        newCell.id(computableID[0], computableID[1]);
        newList.push(newCell);
      }
    }
  }
  return newList;
};

World.prototype.listNeighborIDsFor = function(id){
  var neighborIDs =[];
  neighborIDs = neighborIDs.concat([[id[0]-1, id[1] -1],[id[0], id[1] -1],[id[0]+1, id[1] -1]]);
  neighborIDs = neighborIDs.concat([[id[0]-1, id[1]],[id[0]+1, id[1]]]);
  neighborIDs = neighborIDs.concat([[id[0]-1, id[1] +1],[id[0], id[1] +1],[id[0]+1, id[1] +1]]);
  return neighborIDs;
};

World.prototype.copyCellList = function(cellList) {
  newCellList = [];
  cellList.forEach(function(oldCell){
    var newCell = new Cell();
    newCell.uid = _.clone(oldCell.uid);
    newCellList.push(newCell);
  });
  return newCellList;
};

