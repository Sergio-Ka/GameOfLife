class ModelSquare {
  constructor() {
    this.value = 0;
    this.valueOnLG = 0;
    this.valueOnPG = 0;
  }

  getValue() {
    return this.value;
  }

  setValue(val) {
    this.value = val;
  }

  getValueOnLastGeneration() {
    return this.valueOnLG;
  }

  setValueOnLastGeneration(val) {
    this.valueOnLG = val;
  }

  getValueOnPenultimateGeneration() {
    return this.valueOnPG;
  }

  setValueOnPenultimateGeneration(val) {
    this.valueOnPG = val;
  }

  changeValue() {
    if (this.value === 0) {
      this.value = 1;
    } else {
      this.value = 0;
    }
  }
}

export {
  ModelSquare,
};
