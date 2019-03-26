import constants from '../constants';

class FieldChanger {
  constructor() {
    this.runOnceFlag = true;
  }

  makeStep(field) {
    const recountedField = this._calculateField(field);

    if (this.runOnceFlag) {
      this.constructor._addOnceFieldToHistory(field);
      this.runOnceFlag = false;
    }
    field.fieldHistory.push(recountedField);

    this.constructor._updateField(field, recountedField);

    field.setNumberOfGeneration(field.getNumberOfGeneration() + 1);
    this._stopGame(field);
  }

  static _updateField(field, recountedField) {
    field.field.forEach((row, i) => {
      row.forEach((cell, j) => {
        cell.setLifeStatus(recountedField[i][j]);
      });
    });
  }

  _calculateField(field) {
    const recountedField = field.field.map((row, i) => field.field[i].map((cell, j) => {
      const aliveNeighbors = this.constructor._countAliveNeighbors(i, j, field);
      const cellLifeStatus = cell.getLifeStatus();
      const deadCell = constants.DEAD_CELL;
      const aliveCell = constants.ALIVE_CELL;
      const minAliveNighbors = constants.MIN_SUM_OF_ALIVE_NEIGHBOURS;
      const maxAliveNighbors = constants.MAX_SUM_OF_ALIVE_NEIGHBOURS;
      let recountedCellLifeStatus = deadCell;

      if (cellLifeStatus === deadCell && aliveNeighbors === minAliveNighbors) {
        recountedCellLifeStatus = aliveCell;
      } else if (cellLifeStatus === aliveCell && (aliveNeighbors === minAliveNighbors
        || aliveNeighbors === maxAliveNighbors)) {
        recountedCellLifeStatus = aliveCell;
      }
      return recountedCellLifeStatus;
    }));
    return recountedField;
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

  static _countAliveNeighbors(i, j, field) {
    const cellColumn = j === 0 ? j : j - 1;
    const upperNeighborsRow = field.field[i - 1] ? field.field[i - 1].slice(cellColumn, j + 2) : [];
    const middleNeighborsRow = field.field[i].slice(cellColumn, j + 2);
    const lowerNeighborsRow = field.field[i + 1] ? field.field[i + 1].slice(cellColumn, j + 2) : [];
    const arrayOfNeighbors = upperNeighborsRow.concat(middleNeighborsRow, lowerNeighborsRow);

    return arrayOfNeighbors.reduce((accumulator, neighbor) => accumulator
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
    field.field.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell.getLifeStatus()
            === field.fieldHistory[numberOfHistoryGeneration][i][j]) {
          result += 1;
        }
      });
    });
    if (result === (field.getXSizeOfField() * field.getYSizeOfField())) {
      return true;
    }
    return false;
  }
}

export default FieldChanger;
