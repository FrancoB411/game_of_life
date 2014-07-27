function Game() {}

Game.prototype.killCellWithLessThanTwoNeighbors = function(cell, neighborCount) {
  if(neighborCount < 2){ cell.die(); }
};

Game.prototype.killCellWithMoreThanThreeNeighbors = function(cell, neighborCount) {
  if(neighborCount > 3){ cell.die(); }
};

Game.prototype.birthCellWithThreeNeighbors = function(cell, neighborCount) {
  if(neighborCount === 3){ cell.live(); }
};
