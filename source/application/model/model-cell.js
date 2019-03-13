import constants from '../constants';

class Cell {
  constructor() {
    this.lifeStatus = constants.DEAD_CELL;
    this.lifeStatusOnLastGeneration = constants.DEAD_CELL;
    this.lifeStatusOnPenultimateGeneration = constants.DEAD_CELL;
  }

  getLifeStatus() {
    return this.lifeStatus;
  }

  setLifeStatus(value) {
    this.lifeStatus = value;
  }

  getLifeStatusOnLastGeneration() {
    return this.lifeStatusOnLastGeneration;
  }

  setLifeStatusOnLastGeneration(value) {
    this.lifeStatusOnLastGeneration = value;
  }

  getLifeStatusOnPenultimateGeneration() {
    return this.lifeStatusOnPenultimateGeneration;
  }

  setLifeStatusOnPenultimateGeneration(value) {
    this.lifeStatusOnPenultimateGeneration = value;
  }

  toggleLifeStatus() {
    this.lifeStatus = (this.lifeStatus === constants.DEAD_CELL)
      ? constants.ALIVE_CELL : constants.DEAD_CELL;
  }
}

export default Cell;
