import constants from '../constants';

class FieldChanger {
  constructor() {
    this.runOnceFlag = true;
  }

  makeStep(field) {
    const recountedField = this._calculateField(field);

    if (this.runOnceFlag) {
      this._addOnceFieldToHistory(field);
      this.runOnceFlag = false;
    }
    field.fieldHistory.push(recountedField);

    this._updateField(field, recountedField);

    field.setNumberOfGeneration(field.getNumberOfGeneration() + 1);
    this._stopGame(field);
  }

  _updateField(field, recountedField) {
    field.fieldMatrix.forEach((row, i) => {
      row.forEach((cell, j) => {
        cell.setLifeStatus(recountedField[i][j]);
      });
    });
  }

  _calculateField(field) {
    const recountedField = field.fieldMatrix.map((row, i) => row.map((cell, j) => {
      const aliveNeighbors = this._countAliveNeighbors(i, j, field);
      const cellLifeStatus = cell.getLifeStatus();
      let recountedCellLifeStatus = constants.DEAD_CELL;
      const conditionForRevive = cellLifeStatus === constants.DEAD_CELL
        && aliveNeighbors === constants.MIN_SUM_OF_ALIVE_NEIGHBOURS;
      const conditionForDie = cellLifeStatus === constants.ALIVE_CELL
        && (aliveNeighbors === constants.MIN_SUM_OF_ALIVE_NEIGHBOURS
        || aliveNeighbors === constants.MAX_SUM_OF_ALIVE_NEIGHBOURS);

      if (conditionForRevive) {
        recountedCellLifeStatus = constants.ALIVE_CELL;
      } else if (conditionForDie) {
        recountedCellLifeStatus = constants.ALIVE_CELL;
      }
      return recountedCellLifeStatus;
    }));
    return recountedField;
  }

  _addOnceFieldToHistory(field) {
    const transformedField = Array(field.getYSizeOfField()).fill(null);
    field.fieldMatrix.forEach((row, i) => {
      transformedField[i] = Array(field.getXSizeOfField()).fill(constants.DEAD_CELL);
      row.forEach((cell, j) => {
        transformedField[i][j] = cell.getLifeStatus();
      });
    });
    field.fieldHistory.push(transformedField);
  }

  _countAliveNeighbors(i, j, field) {
    const cellColumn = j === 0 ? j : j - 1;
    const upperNeighborsRow = field.fieldMatrix[i - 1]
      ? field.fieldMatrix[i - 1].slice(cellColumn, j + 2) : [];
    const middleNeighborsRow = field.fieldMatrix[i].slice(cellColumn, j + 2);
    const lowerNeighborsRow = field.fieldMatrix[i + 1]
      ? field.fieldMatrix[i + 1].slice(cellColumn, j + 2) : [];
    const arrayOfNeighbors = upperNeighborsRow.concat(middleNeighborsRow, lowerNeighborsRow);

    return arrayOfNeighbors.reduce((accumulator, neighbor) => accumulator
            + neighbor.getLifeStatus(), 0);
  }

  _stopGame(field) {
    field.fieldHistory.forEach((historyField, i) => {
      if (i !== field.fieldHistory.length - 1
          && this._compareFields(field, i) === true) {
        field.setGameOver(true);
      }
    });
  }

  _compareFields(field, numberOfHistoryGeneration) {
    let result = 0;
    field.fieldMatrix.forEach((row, i) => {
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
