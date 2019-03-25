import constants from '../constants';

class FieldChanger {
  calculateField(field) {
    this._stopGame(field);
    this.recountedField = Array(field.getYSizeOfField()).fill(null);

    field.field.forEach((row, i) => {
      this.recountedField[i] = Array(field.getXSizeOfField()).fill(constants.DEAD_CELL);
      row.forEach((column, j) => {
        this._countAliveNeighbors(i, j, field);

        if (field.readCellLifeStatus(i, j) === constants.DEAD_CELL
          && this.amountOfNeighborsStatuses === constants.MIN_SUM_OF_ALIVE_NEIGHBOURS) {
          this.recountedField[i][j] = constants.ALIVE_CELL;
        } else if (field.readCellLifeStatus(i, j) === constants.ALIVE_CELL
            && (this.amountOfNeighborsStatuses === constants.MIN_SUM_OF_ALIVE_NEIGHBOURS
              || this.amountOfNeighborsStatuses === constants.MAX_SUM_OF_ALIVE_NEIGHBOURS)) {
          this.recountedField[i][j] = constants.ALIVE_CELL;
        } else if (field.readCellLifeStatus(i, j) === constants.ALIVE_CELL
            && (this.amountOfNeighborsStatuses < constants.MIN_SUM_OF_ALIVE_NEIGHBOURS
              || this.amountOfNeighborsStatuses > constants.MAX_SUM_OF_ALIVE_NEIGHBOURS)) {
          this.recountedField[i][j] = constants.DEAD_CELL;
        }
      });
    });

    field.fieldHistory.push(this.recountedField);

    field.field.forEach((row, i) => {
      row.forEach((column, j) => {
        field.setCellLifeStatus(i, j, this.recountedField[i][j]);
      });
    });

    field.setNumberOfGeneration(field.getNumberOfGeneration() + 1);
  }

  _countAliveNeighbors(i, j, field) {
    this.amountOfNeighborsStatuses = constants.MIN_AMOUNT_OF_ALIVE_NEIGHBOURS;
    let upperRowSumOfNeighborsStatuses = [];
    let middleRowSumOfNeighborsStatuses = [];
    let lowerRowSumOfNeighborsStatuses = [];
    const arrayOfNeighbors = [];

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

    arrayOfNeighbors.forEach((neighborRow) => {
      neighborRow.forEach((neighbor) => {
        this.amountOfNeighborsStatuses += neighbor.getLifeStatus();
      });
    });
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
