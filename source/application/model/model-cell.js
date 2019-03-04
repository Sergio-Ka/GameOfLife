class Cell {
  constructor() {
    this.lifeStatus = 0;
    this.lifeStatusOnLastGeneration = 0;
    this.lifeStatusOnPenultimateGeneration = 0;
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
    this.lifeStatus = (this.lifeStatus === 0) ? 1 : 0;
  }
}

export default Cell;
