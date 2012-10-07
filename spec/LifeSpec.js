

describe("Board", function() {
  //divide window size by cell size
  //make a board div 
  //fill board div 

  it("should be able to measure the window size", function() {
    
    var w = board.width
    expect(w).toEqual(window.innerWidth -10);
  });
});