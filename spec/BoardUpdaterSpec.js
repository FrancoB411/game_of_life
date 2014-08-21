describe("updateBoard(currentCells)", function() {
  beforeEach(function() {
    boardUpdater = new BoardUpdater();
    this.liveCells = boardUpdater.getLiveCellsFromBoard();
    this.currentCells = [
                          buildCell(1, 1, true),
                          buildCell(2, 1, true),
                          buildCell(3, 1, true)
                        ];
    this.liveCellsNotInCurrentCells = boardUpdater.getLiveCellsNotInCurrentCells(this.currentCells);
  });
  describe("getLiveCellsFromBoard()", function(){
    it("returns a list from the gameBoard", function(){
      expect(this.liveCells instanceof $).toBe(true);
    });
    it("of all live Cells", function(){
      var liveCellsCount = this.liveCells.filter(".cell-alive").length;
      expect(liveCellsCount).toEqual(3);
    });
  });
  describe("getLiveCellsNotInCurrentCells(currentCells))", function(){
    it("returns liveCellsList cells not in currentCells", function(){
      var cellNotInCurrentCellsId = this.liveCellsNotInCurrentCells.attr("id");
      expect(this.liveCellsNotInCurrentCells.length).toEqual(1);
      expect(cellNotInCurrentCellsId).toEqual("2-2");
    });
  });
  describe("killCellsIn(jqueryCellList)", function(){
    it("kills cells in the list passed in", function(){
      boardUpdater.killCellsIn(this.liveCellsNotInCurrentCells);
      var killedCellClass = this.liveCellsNotInCurrentCells.attr("class");
      expect(killedCellId).toEqual("cell-dead");
    });
  });
  describe("birthCellsFrom(currentCells)", function(){
    it("makes currentCells on the game board alive", function(){
      var liveCell1 = this.liveCells.filter("#2-1");
      expect(liveCell1.attr("class")).toEqual("cell-dead");
      boardUpdater.birthCellsFrom(currentCells);
      expect(liveCell1.attr("class")).toEqual("cell-alive");
    });
  });
});



