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
    this._resetField();

    this.fieldMatrix = Array(this.ySizeOfField).fill(null);
    this.fieldMatrix.forEach((row, i) => {
      this.fieldMatrix[i] = Array(this.xSizeOfField).fill(null);
      this.fieldMatrix[i].forEach((cell, j) => {
        this.fieldMatrix[i][j] = new Cell();
        this.fieldMatrix[i][j].setLifeStatus(Math.round(Math.random()));
      });
    });
  }

  clearField() {
    this._resetField();

    this.fieldMatrix.forEach((row, i) => {
      this.fieldMatrix[i].forEach((cell, j) => {
        this.fieldMatrix[i][j].setLifeStatus(constants.DEAD_CELL);
      });
    });
  }

  cropFieldOnXaxis(xSize) {
    this.xSizeOfField = xSize;

    this.fieldMatrix.forEach((row) => {
      row.splice(xSize);
    });
  }

  cropFieldOnYaxis(ySize) {
    this.ySizeOfField = ySize;

    this.fieldMatrix.splice(ySize);
  }

  enlargeFieldOnXaxis(xSize) {
    const oldXSize = this.xSizeOfField;
    this.xSizeOfField = xSize;
    this.fieldHistory = [];

    this.fieldMatrix.forEach((row, i) => {
      for (let j = oldXSize; j < this.xSizeOfField; j += 1) {
        this.fieldMatrix[i].push(new Cell());
      }
    });
  }

  enlargeFieldOnYaxis(ySize) {
    this.ySizeOfField = ySize;
    this.fieldHistory = [];

    for (let i = this.fieldMatrix.length; i < this.ySizeOfField; i += 1) {
      this.fieldMatrix.push(Array(this.xSizeOfField).fill(null));
      this.fieldMatrix[i].forEach((cell, j) => {
        this.fieldMatrix[i][j] = new Cell();
      });
    }
  }

  toggleCellLifeStatus(i, j) {
    this.fieldMatrix[i][j].toggleLifeStatus();
  }

  _resetField() {
    this.numberOfGeneraton = constants.INITIAL_NUMBER_OF_GENERATION;
    this.gameOver = false;
    this.fieldHistory = [];
  }
}

export default Field;
