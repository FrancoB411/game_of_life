function Cell() {
}

Cell.prototype.aliveOrDead = function() {
  return (Math.random() < 0.5) ? "class='cell-alive'" : "class='cell-dead'";
};
