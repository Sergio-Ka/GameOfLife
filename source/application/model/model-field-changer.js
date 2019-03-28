import constants from '../constants';

class FieldChanger {
  makeStep(field) {
    this._addFieldToHistory(field);
    const recountedField = this._calculateField(field.fieldMatrix);
    this._updateField(field, recountedField);
    field.setNumberOfGeneration(field.getNumberOfGeneration() + 1);
    const shouldGameOver = field.fieldHistory
      .some(historyField => this._areFieldsEqual(historyField, recountedField));
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
      const cellWillRevive = cellLifeStatus === constants.DEAD_CELL
        && aliveNeighbors === constants.MIN_SUM_OF_ALIVE_NEIGHBOURS;
      const cellWillDie = cellLifeStatus === constants.ALIVE_CELL
        && (aliveNeighbors === constants.MIN_SUM_OF_ALIVE_NEIGHBOURS
        || aliveNeighbors === constants.MAX_SUM_OF_ALIVE_NEIGHBOURS);

      if (cellWillRevive || cellWillDie) {
        return constants.ALIVE_CELL;
      }
      return constants.DEAD_CELL;
    }));
    return recountedField;
  }

  _addFieldToHistory(field) {
    const transformedField = field.fieldMatrix.map(row => row.map(cell => cell.getLifeStatus()));
    field.fieldHistory.push(transformedField);
  }

  _countAliveNeighbors(i, j, fieldMatrix) {
    const cellColumn = j === 0 ? j : j - 1;
    const upperNeighborsRow = fieldMatrix[i - 1]
      ? fieldMatrix[i - 1].slice(cellColumn, j + 2)
      : [];
    const middleNeighborsRow = fieldMatrix[i].slice(cellColumn, j + 2);
    const lowerNeighborsRow = fieldMatrix[i + 1]
      ? fieldMatrix[i + 1].slice(cellColumn, j + 2)
      : [];
    const arrayOfNeighbors = upperNeighborsRow.concat(middleNeighborsRow, lowerNeighborsRow);

    return arrayOfNeighbors.reduce((accumulator, neighbor) => accumulator
            + neighbor.getLifeStatus(), 0);
  }

  _areFieldsEqual(historyField, recountedField) {
    const result = recountedField.every((row, i) => row
      .every((cell, j) => cell === historyField[i][j]));

    return result;
  }
}

export default FieldChanger;
