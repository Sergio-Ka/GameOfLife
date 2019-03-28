import Cell from './model-cell';
import constants from '../constants';

class Field {
  constructor() {
    this.xSizeOfField = constants.DEFAULT_SIZE_OF_FIELD;
    this.ySizeOfField = constants.DEFAULT_SIZE_OF_FIELD;
    this.numberOfGeneraton = constants.INITIAL_NUMBER_OF_GENERATION;
    this.gameOver = false;
    this.fieldHistory = [];
    this.createField();
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

  createField() {
    this._resetField();

    this.fieldMatrix = Array(this.ySizeOfField).fill(null)
      .map(() => Array(this.xSizeOfField).fill(null)
        .map(() => new Cell()));
  }

  fillFieldRandom() {
    this.fieldMatrix = this.fieldMatrix.map(row => row
      .map((cell) => {
        cell.setLifeStatus(Math.round(Math.random()));
        return cell;
      }));
  }

  clearField() {
    this._resetField();

    this.fieldMatrix = this.fieldMatrix.map(row => row
      .map((cell) => {
        cell.setLifeStatus(constants.DEAD_CELL);
        return cell;
      }));
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
    const cellsToAdd = xSize - oldXSize;

    this.fieldMatrix = this.fieldMatrix.map((row) => {
      const newCells = Array(cellsToAdd).fill(null).map(() => new Cell());
      return [...row, ...newCells];
    });
  }

  enlargeFieldOnYaxis(ySize) {
    const rowsToAdd = ySize - this.ySizeOfField;
    this.ySizeOfField = ySize;
    this.fieldHistory = [];

    const newRows = Array(rowsToAdd).fill(null)
      .map(() => Array(this.xSizeOfField).fill(null)
        .map(() => new Cell()));

    this.fieldMatrix = [...this.fieldMatrix, ...newRows];
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
