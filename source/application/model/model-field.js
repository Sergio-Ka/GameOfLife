import Cell from './model-cell';
import constants from '../constants';

class Field {
  constructor() {
    this.xSizeOfField = constants.MIN_SIZE_OF_FIELD;
    this.ySizeOfField = constants.MIN_SIZE_OF_FIELD;
    this.numberOfGeneraton = constants.DEFAULT_NUMBER_OF_GENERATION;
    this.gameOver = false;
    this.endGameStatus = constants.GAME_IS_RUNNING;
    this.sumOfAllCells = constants.DEFAULT_SUM_OF_ALL_CELLS;
  }

  getXSizeOfField() {
    return this.xSizeOfField;
  }

  setXSizeOfField(value) {
    if (value >= constants.MIN_SIZE_OF_FIELD) {
      this.xSizeOfField = value;
    } else {
      this.xSizeOfField = constants.MIN_SIZE_OF_FIELD;
    }
  }

  getYSizeOfField() {
    return this.ySizeOfField;
  }

  setYSizeOfField(value) {
    if (value >= constants.MIN_SIZE_OF_FIELD) {
      this.ySizeOfField = value;
    } else {
      this.y = constants.MIN_SIZE_OF_FIELD;
    }
  }

  getNumberOfGeneration() {
    return this.numberOfGeneraton;
  }

  setNumberOfGeneration(value) {
    if (value >= constants.DEFAULT_NUMBER_OF_GENERATION) {
      this.numberOfGeneraton = value;
    } else {
      this.numberOfGeneraton = constants.DEFAULT_NUMBER_OF_GENERATION;
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
    switch (value) {
      case constants.GAME_IS_RUNNING:
      case constants.GAME_STOPPED_BY_DEAD_UNIVERSE:
      case constants.GAME_STOPPED_BY_STABLE_COMBINATION_ON_2_LATEST_GENERATIONS:
      case constants.GAME_STOPPED_BY_STABLE_COMBINATION_ON_LAST_AND_PENULTIMATE_GENERATION:
        this.endGameStatus = value;
        break;
      default: this.endGameStatus = constants.GAME_IS_RUNNING;
        break;
    }
  }

  getSumOfAllCells() {
    return this.sumOfAllCells;
  }

  setSumOfAllCells(value) {
    if (value >= constants.DEFAULT_SUM_OF_ALL_CELLS) {
      this.sumOfAllCells = value;
    } else {
      this.sumOfAllCells = constants.DEFAULT_SUM_OF_ALL_CELLS;
    }
  }

  createRandomField() {
    this.numberOfGeneraton = constants.DEFAULT_NUMBER_OF_GENERATION;
    this.gameOver = false;
    this.endGameStatus = constants.GAME_IS_RUNNING;

    this.field = Array(this.ySizeOfField).fill(null);
    this.field.forEach((item, i) => {
      this.field[i] = Array(this.xSizeOfField).fill(null);
      this.field[i].forEach((itemInside, j) => {
        this.field[i][j] = new Cell();
        this.field[i][j].setLifeStatus(Math.round(Math.random()));
      });
    });

    this._sumAllCells();
  }

  clearField() {
    this.numberOfGeneraton = constants.DEFAULT_NUMBER_OF_GENERATION;
    this.gameOver = false;
    this.endGameStatus = constants.GAME_IS_RUNNING;

    this.field.forEach((item, i) => {
      this.field[i].forEach((itemInside, j) => {
        this.field[i][j].setLifeStatus(0);
        this.field[i][j].setLifeStatusOnLastGeneration(0);
        this.field[i][j].setLifeStatusOnPenultimateGeneration(0);
      });
    });

    this.sumOfAllCells = constants.DEFAULT_SUM_OF_ALL_CELLS;
  }

  cropFieldOnXaxis(xSize) {
    if (this.field) {
      this.xSizeOfField = xSize;

      this.field.forEach((item) => {
        item.splice(xSize);
      });
      this._sumAllCells();
    }
  }

  cropFieldOnYaxis(ySize) {
    if (this.field) {
      this.ySizeOfField = ySize;

      this.field.splice(ySize);
      this._sumAllCells();
    }
  }

  enlargeFieldOnXaxis(xSize) {
    if (this.field) {
      const oldY = this.xSizeOfField;
      this.xSizeOfField = xSize;

      this.field.forEach((item, i) => {
        for (let j = oldY; j < this.xSizeOfField; j += 1) {
          this.field[i].push(new Cell());
        }
      });
    }
  }

  enlargeFieldOnYaxis(ySize) {
    if (this.field) {
      this.ySizeOfField = ySize;

      for (let i = this.field.length; i < this.ySizeOfField; i += 1) {
        this.field.push(Array(this.xSizeOfField).fill(null));
        this.field[i].forEach((item, j) => {
          this.field[i][j] = new Cell();
        });
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
    this.field[i][j].toggleLifeStatus();
    if (this.field[i][j].getLifeStatus() === constants.ALIVE_CELL) {
      this.sumOfAllCells += 1;
    } else {
      this.sumOfAllCells -= 1;
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
    this.sumOfAllCells = constants.DEFAULT_SUM_OF_ALL_CELLS;
    this.field.forEach((item) => {
      item.forEach((element) => {
        this.sumOfAllCells += element.getLifeStatus();
      });
    });
  }
}

export default Field;
