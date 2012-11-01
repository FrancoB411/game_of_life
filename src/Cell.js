function Cell() {
}

Cell.prototype.aliveOrDead = function() {
  return (Math.random() < 0.5) ? "class='cell-alive'" : "class='cell-dead'";
};

Cell.prototype.color = function() {
  return '#'+('00000'+(Math.random()*16777216<<0).toString(16)).substr(-6);
};
