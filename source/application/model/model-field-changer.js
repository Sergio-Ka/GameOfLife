import constants from '../constants';

class FieldChanger {
  makeStep(field) {
    this._addFieldToHistory(field);
    const recountedField = this._calculateField(field.fieldMatrix);
    this._updateField(field, recountedField);
    field.setNumberOfGeneration(field.getNumberOfGeneration() + 1);
    const shouldGameOver = field.fieldHistory
      .some(historyField => this._compareField(historyField, recountedField));
    if (shouldGameOver) {
      field.setGameOver(true);
    }
  }

  _updateField(field, recountedField) {
    field.fieldMatrix.forEach((row, i) => {
      row.forEach((cell, j) => {
        cell.setLifeStatus(recountedField[i][j]);
      });
    });
  }

  _calculateField(fieldMatrix) {
    const recountedField = fieldMatrix.map((row, i) => row.map((cell, j) => {
      const aliveNeighbors = this._countAliveNeighbors(i, j, fieldMatrix);
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

  _addFieldToHistory(field) {
    const transformedField = Array(field.getYSizeOfField()).fill(null);
    field.fieldMatrix.forEach((row, i) => {
      transformedField[i] = Array(field.getXSizeOfField()).fill(constants.DEAD_CELL);
      row.forEach((cell, j) => {
        transformedField[i][j] = cell.getLifeStatus();
      });
    });
    field.fieldHistory.push(transformedField);
  }

  _countAliveNeighbors(i, j, fieldMatrix) {
    const cellColumn = j === 0 ? j : j - 1;
    const upperNeighborsRow = fieldMatrix[i - 1]
      ? fieldMatrix[i - 1].slice(cellColumn, j + 2) : [];
    const middleNeighborsRow = fieldMatrix[i].slice(cellColumn, j + 2);
    const lowerNeighborsRow = fieldMatrix[i + 1]
      ? fieldMatrix[i + 1].slice(cellColumn, j + 2) : [];
    const arrayOfNeighbors = upperNeighborsRow.concat(middleNeighborsRow, lowerNeighborsRow);

    return arrayOfNeighbors.reduce((accumulator, neighbor) => accumulator
            + neighbor.getLifeStatus(), 0);
  }

  _compareField(historyField, recountedField) {
    let result = 0;
    recountedField.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (recountedField[i][j]
            === historyField[i][j]) {
          result += 1;
        }
      });
    });
    if (result === (recountedField[0].length * recountedField.length)) {
      return true;
    }
    return false;
  }
}

export default FieldChanger;
