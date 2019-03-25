import constants from '../constants';

class Cell {
  constructor() {
    this.lifeStatus = constants.DEAD_CELL;
  }

  getLifeStatus() {
    return this.lifeStatus;
  }

  setLifeStatus(value) {
    if (value === constants.ALIVE_CELL || value === constants.DEAD_CELL) {
      this.lifeStatus = value;
    }
  }

  toggleLifeStatus() {
    this.lifeStatus = (this.lifeStatus === constants.DEAD_CELL)
      ? constants.ALIVE_CELL : constants.DEAD_CELL;
  }
}

export default Cell;
