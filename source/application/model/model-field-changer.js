import constants from '../constants';

class FieldChanger {
  constructor() {
    this.runOnceFlag = true;
  }

  calculateField(field) {
    this.recountedField = Array(field.getYSizeOfField()).fill(null);

    field.field.forEach((row, i) => {
      this.recountedField[i] = Array(field.getXSizeOfField()).fill(constants.DEAD_CELL);
      row.forEach((cell, j) => {
        this._countAliveNeighbors(i, j, field);

        if (field.readCellLifeStatus(i, j) === constants.DEAD_CELL
          && this.aliveNeighbors === constants.MIN_SUM_OF_ALIVE_NEIGHBOURS) {
          this.recountedField[i][j] = constants.ALIVE_CELL;
        } else if (field.readCellLifeStatus(i, j) === constants.ALIVE_CELL
            && (this.aliveNeighbors === constants.MIN_SUM_OF_ALIVE_NEIGHBOURS
              || this.aliveNeighbors === constants.MAX_SUM_OF_ALIVE_NEIGHBOURS)) {
          this.recountedField[i][j] = constants.ALIVE_CELL;
        } else if (field.readCellLifeStatus(i, j) === constants.ALIVE_CELL
            && (this.aliveNeighbors < constants.MIN_SUM_OF_ALIVE_NEIGHBOURS
              || this.aliveNeighbors > constants.MAX_SUM_OF_ALIVE_NEIGHBOURS)) {
          this.recountedField[i][j] = constants.DEAD_CELL;
        }
      });
    });

    if (this.runOnceFlag) {
      this.constructor._addOnceFieldToHistory(field);
      this.runOnceFlag = false;
    }
    field.fieldHistory.push(this.recountedField);

    field.field.forEach((row, i) => {
      row.forEach((cell, j) => {
        field.setCellLifeStatus(i, j, this.recountedField[i][j]);
      });
    });

    field.setNumberOfGeneration(field.getNumberOfGeneration() + 1);
    this._stopGame(field);
  }

  static _addOnceFieldToHistory(field) {
    const transformedField = Array(field.getYSizeOfField()).fill(null);
    field.field.forEach((row, i) => {
      transformedField[i] = Array(field.getXSizeOfField()).fill(constants.DEAD_CELL);
      row.forEach((cell, j) => {
        transformedField[i][j] = cell.getLifeStatus();
      });
    });
    field.fieldHistory.push(transformedField);
  }

  _countAliveNeighbors(i, j, field) {
    this.aliveNeighbors = constants.MIN_AMOUNT_OF_ALIVE_NEIGHBOURS;
    let upperRowSumOfNeighborsStatuses = [];
    let middleRowSumOfNeighborsStatuses = [];
    let lowerRowSumOfNeighborsStatuses = [];
    let arrayOfNeighbors = [];

    if (i !== 0) {
      if (j === 0) {
        upperRowSumOfNeighborsStatuses = field.field[i - 1].slice(j, j + 2);
      } else if (j === field.getXSizeOfField() - 1) {
        upperRowSumOfNeighborsStatuses = field.field[i - 1].slice(j - 1, j + 1);
      } else {
        upperRowSumOfNeighborsStatuses = field.field[i - 1].slice(j - 1, j + 2);
      }
      arrayOfNeighbors.push(upperRowSumOfNeighborsStatuses);
    }

    if (j === 0) {
      middleRowSumOfNeighborsStatuses = field.field[i].slice(j, j + 2);
    } else if (j === field.getXSizeOfField() - 1) {
      middleRowSumOfNeighborsStatuses = field.field[i].slice(j - 1, j + 1);
    } else {
      middleRowSumOfNeighborsStatuses = field.field[i].slice(j - 1, j + 2);
    }
    arrayOfNeighbors.push(middleRowSumOfNeighborsStatuses);

    if (i !== field.getYSizeOfField() - 1) {
      if (j === 0) {
        lowerRowSumOfNeighborsStatuses = field.field[i + 1].slice(j, j + 2);
      } else if (j === field.getXSizeOfField() - 1) {
        lowerRowSumOfNeighborsStatuses = field.field[i + 1].slice(j - 1, j + 1);
      } else {
        lowerRowSumOfNeighborsStatuses = field.field[i + 1].slice(j - 1, j + 2);
      }
      arrayOfNeighbors.push(lowerRowSumOfNeighborsStatuses);
    }
    arrayOfNeighbors = arrayOfNeighbors.flat();

    this.aliveNeighbors = arrayOfNeighbors.reduce((accumulator, neighbor) => accumulator
      + neighbor.getLifeStatus(), 0);
  }

  _stopGame(field) {
    field.fieldHistory.forEach((historyField, i) => {
      if (i !== field.fieldHistory.length - 1
          && this.constructor._compareFields(field, i) === true) {
        field.setGameOver(true);
      }
    });
  }

  static _compareFields(field, numberOfHistoryGeneration) {
    let result = 0;
    let resultOfCompare = false;
    field.field.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (field.readCellLifeStatus(i, j)
            === field.fieldHistory[numberOfHistoryGeneration][i][j]) {
          result += 1;
        }
      });
    });
    if (result === (field.getXSizeOfField() * field.getYSizeOfField())) {
      resultOfCompare = true;
    }
    return resultOfCompare;
  }
}

export default FieldChanger;
