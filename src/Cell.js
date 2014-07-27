function Cell() {
  this.alive = false;
  this.uid = [];
}

Cell.prototype.aliveOrDead = function() {
  return (Math.random() < 0.5) ? "class='cell-alive'" : "class='cell-dead'";
};

Cell.prototype.color = function() {
  return '#'+('00000'+(Math.random()*16777216<<0).toString(16)).substr(-6);
};

Cell.prototype.isAlive =  function() {
  return this.alive;
};

Cell.prototype.live = function() {
  this.alive = true;
};

Cell.prototype.die = function() {
  this.alive = false;
};

Cell.prototype.id =  function() {
  if(arguments.length) {
    this.uid = Array.prototype.slice.call(arguments);
  }
  return this.uid;
};

