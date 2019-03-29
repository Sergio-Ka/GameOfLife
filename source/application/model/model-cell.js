import { DEAD_CELL, ALIVE_CELL } from '../constants';

class Cell {
  constructor() {
    this.lifeStatus = DEAD_CELL;
  }

  getLifeStatus() {
    return this.lifeStatus;
  }

  setLifeStatus(value) {
    if (value === ALIVE_CELL || value === DEAD_CELL) {
      this.lifeStatus = value;
    }
  }

  toggleLifeStatus() {
    this.lifeStatus = (this.lifeStatus === DEAD_CELL)
      ? ALIVE_CELL : DEAD_CELL;
  }
}

export default Cell;
