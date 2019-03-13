import Cell from './model-cell';
import constants from '../constants';

class Field {
  constructor() {
    this.xSizeOfField = constants.MIN_SIZE_OF_FIELD_WITH_BORDER; // 3
    this.ySizeOfField = constants.MIN_SIZE_OF_FIELD_WITH_BORDER; // 3
    this.numberOfGeneraton = constants.DEFAULT_NUMBER_OF_GENERATION; // 1
    this.gameOver = false;
    this.endGameStatus = constants.GAME_IS_RUNNING; // 0
    this.sumOfAllCells = constants.DEFAULT_SUM_OF_ALL_CELLS; // 0
  }

  getXSizeOfField() {
    return this.xSizeOfField;
  }

  setXSizeOfField(value) {
    if (Number(value) >= constants.MIN_SIZE_OF_FIELD) {
      this.xSizeOfField = Number(value) + constants.DOUBLE_WIDTH_OF_FIELD_BORDER; // 2
    } else {
      this.xSizeOfField = constants.MIN_SIZE_OF_FIELD_WITH_BORDER; // 3
    }
  }

  getYSizeOfField() {
    return this.ySizeOfField;
  }

  setYSizeOfField(value) {
    if (Number(value) >= constants.MIN_SIZE_OF_FIELD) {
      this.ySizeOfField = Number(value) + constants.DOUBLE_WIDTH_OF_FIELD_BORDER; // 2
    } else {
      this.y = constants.MIN_SIZE_OF_FIELD_WITH_BORDER; // 3
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
      case constants.GAME_IS_RUNNING: // 0
      case constants.GAME_STOPPED_BY_DEAD_UNIVERSE: // 1
      case constants.GAME_STOPPED_BY_STABLE_COMBINATION_ON_2_LATEST_GENERATIONS: // 2
      case constants.GAME_STOPPED_BY_STABLE_COMBINATION_ON_LAST_AND_PENULTIMATE_GENERATION: // 3
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
    this.numberOfGeneraton = constants.DEFAULT_NUMBER_OF_GENERATION; // 1
    this.gameOver = false;
    this.endGameStatus = constants.GAME_IS_RUNNING; // 0

    this.field = Array(this.ySizeOfField).fill(null);
    this.field.forEach((item, i) => {
      this.field[i] = Array(this.xSizeOfField).fill(null);
      this.field[i].forEach((itemInside, j) => {
        this.field[i][j] = new Cell();
        if (i !== 0 && i !== this.ySizeOfField - 1 && j !== 0 && j !== this.xSizeOfField - 1) {
          this.field[i][j].setLifeStatus(Math.round(Math.random()));
        }
      });
    });

    this._sumAllCells();
  }

  clearField() {
    this.numberOfGeneraton = constants.DEFAULT_NUMBER_OF_GENERATION; // 1
    this.gameOver = false;
    this.endGameStatus = constants.GAME_IS_RUNNING; // 0

    this.field = Array(this.ySizeOfField).fill(null);
    this.field.forEach((item, i) => {
      this.field[i] = Array(this.xSizeOfField).fill(null);
      this.field[i].forEach((itemInside, j) => {
        this.field[i][j] = new Cell();
      });
    });

    this.sumOfAllCells = constants.DEFAULT_SUM_OF_ALL_CELLS; // 0
  }

  cropFieldOnXaxis(xSize) {
    if (this.field) {
      const numericXSize = Number(xSize);
      this.xSizeOfField = numericXSize + constants.DOUBLE_WIDTH_OF_FIELD_BORDER; // 2

      this.field.forEach((item, i) => {
        item.splice(numericXSize + 2);
        this.field[i][numericXSize + 1].setLifeStatus(constants.DEAD_CELL); // 0
      });

      this._sumAllCells();
    }
  }

  cropFieldOnYaxis(ySize) {
    if (this.field) {
      const numericYSize = Number(ySize);
      this.ySizeOfField = numericYSize + constants.DOUBLE_WIDTH_OF_FIELD_BORDER; // 2

      this.field.splice(numericYSize + 2);

      this.field[numericYSize + 1].forEach((item) => {
        item.setLifeStatus(constants.DEAD_CELL); // 0
      });

      this._sumAllCells();
    }
  }

  enlargeFieldOnXaxis(xSize) {
    if (this.field) {
      const numericXSize = Number(xSize);
      const oldY = this.xSizeOfField;
      this.xSizeOfField = numericXSize + constants.DOUBLE_WIDTH_OF_FIELD_BORDER; // 2

      this.field.forEach((item, i) => {
        for (let j = oldY; j < this.xSizeOfField; j += 1) {
          this.field[i].push(new Cell());
        }
      });
    }
  }

  enlargeFieldOnYaxis(ySize) {
    if (this.field) {
      const numericYSize = Number(ySize);
      this.ySizeOfField = numericYSize + constants.DOUBLE_WIDTH_OF_FIELD_BORDER; // 2

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
    const yCoordinate = Number(i);
    const xCoordinate = Number(j);
    if (yCoordinate === 0 || yCoordinate === this.ySizeOfField - 1
      || xCoordinate === 0 || xCoordinate === this.xSizeOfField - 1) {
      this.field[yCoordinate][xCoordinate].setLifeStatus(constants.DEAD_CELL); // 0
    } else {
      this.field[yCoordinate][xCoordinate].toggleLifeStatus();
      if (this.field[yCoordinate][xCoordinate].getLifeStatus() === constants.ALIVE_CELL) { // 1
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
    this.sumOfAllCells = constants.DEFAULT_SUM_OF_ALL_CELLS; // 0
    this.field.forEach((item) => {
      item.forEach((element) => {
        this.sumOfAllCells += Number(element.getLifeStatus());
      });
    });
  }
}

export default Field;
