class ModelCell {
  constructor() {
    this.alive = 0;
    this.aliveOnLastGeneration = 0;
    this.aliveOnPenultimateGeneration = 0;
  }

  getStatus() {
    return this.alive;
  }

  setStatus(value) {
    this.alive = value;
  }

  getStatusOnLastGeneration() {
    return this.aliveOnLastGeneration;
  }

  setStatusOnLastGeneration(value) {
    this.aliveOnLastGeneration = value;
  }

  getStatusOnPenultimateGeneration() {
    return this.aliveOnPenultimateGeneration;
  }

  setStatusOnPenultimateGeneration(value) {
    this.aliveOnPenultimateGeneration = value;
  }

  toggleStatus() {
    this.alive = (this.alive === 0) ? 1 : 0;
  }
}

export default ModelCell;
