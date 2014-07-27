function World() {
  this.currentCells = [];
}

World.prototype.setCells =  function(x, y) {
  for(var i = 1; i <= x; i++){
    for(var j = 1; j <= x; j++) {
      cell = new Cell();
      cell.id(i,j);
      this.currentCells.push(cell);
    }
  }
};