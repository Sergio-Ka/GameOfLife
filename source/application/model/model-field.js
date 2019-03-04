import Cell from './model-cell';

class Field {
  constructor() {
    this.xSizeOfField = 3;
    this.ySizeOfField = 3;
    this.numberOfGeneraton = 1;
    this.gameOver = false;
    this.endGameStatus = 0;
    this.sumOfAllCells = 0;
    this.field = null;
  }

  getXSizeOfField() {
    return this.xSizeOfField;
  }

  setXSizeOfField(value) {
    if (Number(value) >= 1) {
      this.xSizeOfField = Number(value) + 2;
    } else {
      this.xSizeOfField = 3;
    }
  }

  getYSizeOfField() {
    return this.ySizeOfField;
  }

  setYSizeOfField(value) {
    if (Number(value) >= 1) {
      this.ySizeOfField = Number(value) + 2;
    } else {
      this.y = 3;
    }
  }

  getNumberOfGeneration() {
    return this.numberOfGeneraton;
  }

  setNumberOfGeneration(value) {
    if (value >= 1) {
      this.numberOfGeneraton = value;
    } else {
      this.numberOfGeneraton = 1;
    }
  }

  getGameOver() {
    return this.gameOver;
  }

  setGameOver(value) {
    if (value === true || value === false) {
      this.gameOver = value;
    } else {
      this.gameOver = false;
    }
  }

  getEndGameStatus() {
    return this.endGameStatus;
  }

  setEndGameStatus(value) {
    if (value === 0 || value === 1 || value === 2 || value === 3) {
      this.endGameStatus = value;
    } else {
      this.endGameStatus = 0;
    }
  }

  getSumOfAllCells() {
    return this.sumOfAllCells;
  }

  setSumOfAllCells(value) {
    if (value >= 0) {
      this.sumOfAllCells = value;
    } else {
      this.sumOfAllCells = 0;
    }
  }

  createRandomField() {
    this.field = Array(this.ySizeOfField).fill(null);
    this.numberOfGeneraton = 1;
    this.gameOver = false;
    this.endGameStatus = 0;

    for (let i = 0; i < this.ySizeOfField; i += 1) {
      this.field[i] = Array(this.xSizeOfField).fill(null);
      for (let j = 0; j < this.xSizeOfField; j += 1) {
        this.field[i][j] = new Cell();
        if (i === 0 || i === this.ySizeOfField - 1 || j === 0 || j === this.xSizeOfField - 1) {
          this.field[i][j].setLifeStatus(0);
        } else {
          this.field[i][j].setLifeStatus(Math.round(Math.random()));
        }
      }
    }

    this._sumAllCells();
  }

  clearField() {
    this.field = Array(this.ySizeOfField).fill(null);
    this.numberOfGeneraton = 1;
    this.gameOver = false;
    this.endGameStatus = 0;

    for (let i = 0; i < this.ySizeOfField; i += 1) {
      this.field[i] = Array(this.xSizeOfField).fill(null);
      for (let j = 0; j < this.xSizeOfField; j += 1) {
        this.field[i][j] = new Cell();
      }
    }

    this.sumOfAllCells = 0;
  }

  cropFieldOnXaxis(xSize) {
    if (this.field) {
      this.xSizeOfField = Number(xSize) + 2;

      for (let i = 0; i < this.field.length; i += 1) {
        for (let j = this.field[i].length; this.field[i].length > xSize + 2; j -= 1) {
          this.field[i].pop();
        }
        this.field[i][xSize + 1].setLifeStatus(0);
      }

      this._sumAllCells();
    }
  }

  cropFieldOnYaxis(ySize) {
    if (this.field) {
      this.ySizeOfField = Number(ySize) + 2;

      for (let i = this.field.length; this.field.length > ySize + 2; i -= 1) {
        this.field.pop();
      }

      for (let j = 0; j < this.field[ySize + 1].length; j += 1) {
        this.field[ySize + 1][j].setLifeStatus(0);
      }

      this._sumAllCells();
    }
  }

  enlargeFieldOnXaxis(xSize) {
    if (this.field) {
      const oldY = this.xSizeOfField;
      this.xSizeOfField = Number(xSize) + 2;

      for (let i = 0; i < this.ySizeOfField; i += 1) {
        for (let j = oldY; j < this.xSizeOfField; j += 1) {
          this.field[i][j] = new Cell();
        }
      }
    }
  }

  enlargeFieldOnYaxis(ySize) {
    if (this.field) {
      this.ySizeOfField = Number(ySize) + 2;

      for (let i = this.field.length; i < ySize + 2; i += 1) {
        this.field[i] = Array(this.xSizeOfField).fill(null);
        for (let j = 0; j < this.xSizeOfField; j += 1) {
          this.field[i][j] = new Cell();
        }
      }
    }
  }

  readCellLifeStatus(i, j) {
    return this.field[i][j].getLifeStatus();
  }

  readCellLifeStatusOnLastGeneration(i, j) {
    return this.field[i][j].getLifeStatusOnLastGeneration();
  }

  readCellLifeStatusOnPenultimateGeneration(i, j) {
    return this.field[i][j].getLifeStatusOnPenultimateGeneration();
  }

  toggleCellLifeStatus(i, j) {
    if (i === 0 || i === this.ySizeOfField - 1 || j === 0 || j === this.xSizeOfField - 1) {
      this.field[i][j].setLifeStatus(0);
    } else {
      this.field[i][j].toggleLifeStatus();
      if (this.field[i][j].getLifeStatus() === 1) {
        this.sumOfAllCells += 1;
      } else {
        this.sumOfAllCells -= 1;
      }
    }
  }

  setCellLifeStatus(i, j, value) {
    this.field[i][j].setLifeStatus(value);
  }

  setCellLifeStatusOnLastGeneration(i, j, value) {
    this.field[i][j].setLifeStatusOnLastGeneration(value);
  }

  setCellLifeStatusOnPenultimateGeneration(i, j, value) {
    this.field[i][j].setLifeStatusOnPenultimateGeneration(value);
  }

  _sumAllCells() {
    this.sumOfAllCells = 0;
    for (let i = 1; i < this.ySizeOfField - 1; i += 1) {
      for (let j = 1; j < this.xSizeOfField - 1; j += 1) {
        this.sumOfAllCells += Number(this.field[i][j].getLifeStatus());
      }
    }
  }
}

export default Field;
