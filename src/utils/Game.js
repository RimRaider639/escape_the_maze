export default class Maze {
  constructor(mazeString) {
    this.string = mazeString;
    this.matrix = this.toArray();
  }
  toArray() {
    return this.string.split('\n').map(row => row.split('').map(Number));
  }
}
