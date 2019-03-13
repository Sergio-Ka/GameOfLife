import constants from '../constants';

class FieldChanger {
  constructor() {
    this.amountOfNeighborsStatuses = constants.DEFAULT_SUM_OF_ALIVE_NEIGHBOURS; // 0
    this.sameCellsOfFirstAndLastGeneration = constants.DEFAULT_SUM_OF_SAME_CELLS; // 0
    this.sameCellsOfFirstAndPenultimateGeneration = constants.DEFAULT_SUM_OF_SAME_CELLS; // 0
  }

  calculateField(field) {
    this._stopGame(field);
    this.recountedField = Array(field.getYSizeOfField()).fill(null);

    field.field.forEach((item, i) => {
      this.recountedField[i] = Array(field.getXSizeOfField()).fill(constants.DEAD_CELL); // 0
      item.forEach((element, j) => {
        if (i !== 0 && i !== field.getYSizeOfField() - 1 && j !== 0
            && j !== field.getXSizeOfField() - 1) {
          this.amountOfNeighborsStatuses = constants.DEFAULT_SUM_OF_ALIVE_NEIGHBOURS; // 0
          const upperRowSumOfNeighborsStatuses = field.field[i - 1].slice(j - 1, j + 2);
          const middleRowSumOfNeighborsStatuses = field.field[i].slice(j - 1, j + 2);
          const lowerRowSumOfNeighborsStatuses = field.field[i + 1].slice(j - 1, j + 2);
          const arrayOfNeighbors = [];
          arrayOfNeighbors.push(upperRowSumOfNeighborsStatuses);
          arrayOfNeighbors.push(middleRowSumOfNeighborsStatuses);
          arrayOfNeighbors.push(lowerRowSumOfNeighborsStatuses);
          arrayOfNeighbors.forEach((neighborRow) => {
            neighborRow.forEach((neighbor) => {
              this.amountOfNeighborsStatuses += Number(neighbor.getLifeStatus());
            });
          });

          if (field.readCellLifeStatus(i, j) === constants.DEAD_CELL // 0
            && this.amountOfNeighborsStatuses === constants.MIN_SUM_OF_ALIVE_NEIGHBOURS) { // 3
            this.recountedField[i][j] = constants.ALIVE_CELL; // 1
          } else if (field.readCellLifeStatus(i, j) === constants.ALIVE_CELL // 1
              && (this.amountOfNeighborsStatuses === constants.MIN_SUM_OF_ALIVE_NEIGHBOURS // 3
                || this.amountOfNeighborsStatuses === constants.MAX_SUM_OF_ALIVE_NEIGHBOURS)) { // 4
            this.recountedField[i][j] = constants.ALIVE_CELL; // 1
          } else if (field.readCellLifeStatus(i, j) === constants.ALIVE_CELL // 1
              && (this.amountOfNeighborsStatuses < constants.MIN_SUM_OF_ALIVE_NEIGHBOURS // 3
                || this.amountOfNeighborsStatuses > constants.MAX_SUM_OF_ALIVE_NEIGHBOURS)) { // 4
            this.recountedField[i][j] = constants.DEAD_CELL; // 0
          }
        }
      });
    });

    field.field.forEach((item, i) => {
      item.forEach((element, j) => {
        field.setCellLifeStatusOnPenultimateGeneration(i, j,
          field.readCellLifeStatusOnLastGeneration(i, j));
        field.setCellLifeStatusOnLastGeneration(i, j, field.readCellLifeStatus(i, j));
        const previosCellLifeStatus = field.readCellLifeStatus(i, j);
        field.setCellLifeStatus(i, j, this.recountedField[i][j]);

        if (previosCellLifeStatus === constants.ALIVE_CELL
          && field.readCellLifeStatus(i, j) === constants.DEAD_CELL) {
          field.setSumOfAllCells(field.getSumOfAllCells() - 1);
        }
        if (previosCellLifeStatus === constants.DEAD_CELL
          && field.readCellLifeStatus(i, j) === constants.ALIVE_CELL) {
          field.setSumOfAllCells(field.getSumOfAllCells() + 1);
        }
      });
    });

    field.setNumberOfGeneration(field.getNumberOfGeneration() + 1);
  }

  _stopGame(field) {
    this.sameCellsOfFirstAndLastGeneration = constants.DEFAULT_SUM_OF_SAME_CELLS; // 0
    this.sameCellsOfFirstAndPenultimateGeneration = constants.DEFAULT_SUM_OF_SAME_CELLS; // 0

    field.field.forEach((item, i) => {
      item.forEach((element, j) => {
        if (field.readCellLifeStatusOnLastGeneration(i, j)
        === field.readCellLifeStatus(i, j)) {
          this.sameCellsOfFirstAndLastGeneration += 1;
        }
        if (field.readCellLifeStatusOnPenultimateGeneration(i, j)
        === field.readCellLifeStatus(i, j)) {
          this.sameCellsOfFirstAndPenultimateGeneration += 1;
        }
      });
    });

    if (field.getSumOfAllCells() === constants.DEFAULT_SUM_OF_SAME_CELLS) { // 0
      field.setEndGameStatus(constants.GAME_STOPPED_BY_DEAD_UNIVERSE); // 1
      field.setGameOver(true);
    } else if (this.sameCellsOfFirstAndPenultimateGeneration === field.getXSizeOfField()
                * field.getYSizeOfField()) {
      field.setEndGameStatus(
        constants.GAME_STOPPED_BY_STABLE_COMBINATION_ON_LAST_AND_PENULTIMATE_GENERATION,
      ); // 3
      field.setGameOver(true);
    } else if (this.sameCellsOfFirstAndLastGeneration === field.getXSizeOfField()
                * field.getYSizeOfField()) {
      field.setEndGameStatus(
        constants.GAME_STOPPED_BY_STABLE_COMBINATION_ON_2_LATEST_GENERATIONS,
      ); // 2
      field.setGameOver(true);
    } else {
      field.setEndGameStatus(constants.GAME_IS_RUNNING); // 0
      field.setGameOver(false);
    }
  }
}

export default FieldChanger;
