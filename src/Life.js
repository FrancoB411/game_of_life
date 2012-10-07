  var Board = {
      width :  window.innerWidth -10,
      height : window.innerHeight -10,
      cell_width : 24,
      cells_across : function() { return Math.floor(this.width/this.cell_width) },
      cells_high : function() { return Math.floor(this.height/this.cell_width) },
      get_size : function() { return [this.width, this.height] },
    };