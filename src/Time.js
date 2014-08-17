// function currentStatus(cellArray) {
//   return _.map(cellArray, function(cell) {
//     return cell.isAlive();
//   });
// }
// function getIDs(cellArray) {
//   return _.map(cellArray, function(cell){
//     return cell.id().toString();
//   });
// }

// var board =  new Board();
// board.init();

// var cellsX = 20; //board.vals.cellsPerRow;
// var cellsY = 20; //board.vals.rowsPerBoard;

// console.log(cellsX, cellsY);
// var x = 2;

// var world = new World();
// world.width = cellsX;
// world.height = cellsY;
// world.seed(world.width, world.height);
// while(x >= 0){
//   var currentCells = world.currentCells;
//   console.log("currentCells: ", currentCells);
//   console.log("currentCells: ", currentStatus(currentCells));
//   var computableCells =  world.getComputableCells(cellsX, cellsY, world.currentCells);
//   var computableCellsStatuses = currentStatus(computableCells);
//   var computableCellIDs = getIDs(computableCells);
//   console.log("computableCells: ", computableCells);
//   console.log("computableCellsStatuses: ", computableCellsStatuses);
//   console.log("computableCellIDs: ", computableCellIDs);
//   console.log("computableCellsLength: ", computableCells.length);
//   var judgedCells = world.judgeCells(computableCells);
//   var judgedCellsStatuses = currentStatus(judgedCells);
//   console.log("judgedCells: ", judgedCells);
//   console.log("judgedCellsLength: ", judgedCells.length);
//   console.log("judgedCellsStatuses: ", judgedCellsStatuses);
//   var nextGen = world.removeDeadCellsFrom(judgedCells);
//   console.log("nextGenLength: ", nextGen.length);
//   console.log("nextGenCells: ", currentStatus(nextGen));
//   console.log(x);
//   world.currentCells = nextGen;
//   x--;
// }
