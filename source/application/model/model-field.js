import Cell from './model-cell';
import constants from '../constants';

class Field {
  constructor() {
    this.xSizeOfField = constants.MIN_SIZE_OF_FIELD;
    this.ySizeOfField = constants.MIN_SIZE_OF_FIELD;
    this.numberOfGeneraton = constants.INITIAL_NUMBER_OF_GENERATION;
    this.gameOver = false;
    this.gameStatus = constants.GAME_IS_RUNNING;
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
      this.ySizeOfField = constants.MIN_SIZE_OF_FIELD;
    }
  }

  getNumberOfGeneration() {
    return this.numberOfGeneraton;
  }

  setNumberOfGeneration(value) {
    if (value >= constants.INITIAL_NUMBER_OF_GENERATION) {
      this.numberOfGeneraton = value;
    } else {
      this.numberOfGeneraton = constants.INITIAL_NUMBER_OF_GENERATION;
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

  getGameStatus() {
    return this.gameStatus;
  }

  setGameStatus(value) {
    switch (value) {
      case constants.GAME_IS_RUNNING:
      case constants.GAME_STOPPED_BY_DEAD_UNIVERSE:
      case constants.GAME_STOPPED_BY_STABLE_COMBINATION_ON_2_LATEST_GENERATIONS:
      case constants.GAME_STOPPED_BY_STABLE_COMBINATION_ON_LAST_AND_PENULTIMATE_GENERATION:
        this.gameStatus = value;
        break;
      default: this.gameStatus = constants.GAME_IS_RUNNING;
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
    this.numberOfGeneraton = constants.INITIAL_NUMBER_OF_GENERATION;
    this.gameOver = false;
    this.gameStatus = constants.GAME_IS_RUNNING;

    this.field = Array(this.ySizeOfField).fill(null);
    this.field.forEach((row, i) => {
      this.field[i] = Array(this.xSizeOfField).fill(null);
      this.field[i].forEach((column, j) => {
        this.field[i][j] = new Cell();
        this.field[i][j].setLifeStatus(Math.round(Math.random()));
      });
    });

    this._sumAllCells();
  }

  clearField() {
    this.numberOfGeneraton = constants.INITIAL_NUMBER_OF_GENERATION;
    this.gameOver = false;
    this.gameStatus = constants.GAME_IS_RUNNING;

    this.field.forEach((row, i) => {
      this.field[i].forEach((column, j) => {
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

      this.field.forEach((row) => {
        row.splice(xSize);
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
      const oldXSize = this.xSizeOfField;
      this.xSizeOfField = xSize;

      this.field.forEach((row, i) => {
        for (let j = oldXSize; j < this.xSizeOfField; j += 1) {
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
        this.field[i].forEach((column, j) => {
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
    this.field.forEach((row) => {
      row.forEach((column) => {
        this.sumOfAllCells += column.getLifeStatus();
      });
    });
  }
}

export default Field;
