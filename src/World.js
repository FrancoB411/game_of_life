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
  var shareNeighborhood = this.allCoordsAreNeighborly(id1, id2);
  return  areNotEqual && shareNeighborhood;
};

World.prototype.allCoordsAreNeighborly = function(id1, id2) {
  for(var i = 0; i < id1.length; i++) {
    if(Math.abs(id1[i] - id2[i]) < 2){
      continue;
    }
    else {
      return false;
    }
  }
  return true;
};

World.prototype.getNeighbors = function(cell, listOfCells) {

};



