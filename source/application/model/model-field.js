import Cell from './model-cell';
import constants from '../constants';

class Field {
  constructor() {
    this.xSizeOfField = constants.MIN_SIZE_OF_FIELD;
    this.ySizeOfField = constants.MIN_SIZE_OF_FIELD;
    this.numberOfGeneraton = constants.INITIAL_NUMBER_OF_GENERATION;
    this.gameOver = false;
    this.fieldHistory = [];
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

  createRandomField() {
    this.numberOfGeneraton = constants.INITIAL_NUMBER_OF_GENERATION;
    this.gameOver = false;
    this.fieldHistory = [];

    this.field = Array(this.ySizeOfField).fill(null);
    this.field.forEach((row, i) => {
      this.field[i] = Array(this.xSizeOfField).fill(null);
      this.field[i].forEach((cell, j) => {
        this.field[i][j] = new Cell();
        this.field[i][j].setLifeStatus(Math.round(Math.random()));
      });
    });
  }

  clearField() {
    this.numberOfGeneraton = constants.INITIAL_NUMBER_OF_GENERATION;
    this.gameOver = false;
    this.fieldHistory = [];

    this.field.forEach((row, i) => {
      this.field[i].forEach((cell, j) => {
        this.field[i][j].setLifeStatus(0);
      });
    });
  }

  cropFieldOnXaxis(xSize) {
    this.xSizeOfField = xSize;

    this.field.forEach((row) => {
      row.splice(xSize);
    });
  }

  cropFieldOnYaxis(ySize) {
    this.ySizeOfField = ySize;

    this.field.splice(ySize);
  }

  enlargeFieldOnXaxis(xSize) {
    const oldXSize = this.xSizeOfField;
    this.xSizeOfField = xSize;
    this.fieldHistory = [];

    this.field.forEach((row, i) => {
      for (let j = oldXSize; j < this.xSizeOfField; j += 1) {
        this.field[i].push(new Cell());
      }
    });
  }

  enlargeFieldOnYaxis(ySize) {
    this.ySizeOfField = ySize;
    this.fieldHistory = [];

    for (let i = this.field.length; i < this.ySizeOfField; i += 1) {
      this.field.push(Array(this.xSizeOfField).fill(null));
      this.field[i].forEach((cell, j) => {
        this.field[i][j] = new Cell();
      });
    }
  }

  toggleCellLifeStatus(i, j) {
    this.field[i][j].toggleLifeStatus();
  }
}

export default Field;
