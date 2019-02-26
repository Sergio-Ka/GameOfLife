class BasicLogicOfGame {
  constructor() {
    this.recountedField = null;
    this.amountOfNeighborsStatuses = 0;
    this.sameCellsOfFirstAndLastGeneration = 0;
    this.sameCellsOfFirstAndPenultimateGeneration = 0;
  }

  fieldCalculator(field) {
    this._stopGame(field);
    this.recountedField = Array(field.getYSizeOfField()).fill(null);

    for (let i = 0; i < field.getYSizeOfField(); i += 1) {
      this.recountedField[i] = Array(field.getXSizeOfField()).fill(0);

      for (let j = 0; j < field.getXSizeOfField(); j += 1) {
        if (i !== 0 && i !== field.getYSizeOfField() - 1 && j !== 0
            && j !== field.getXSizeOfField() - 1) {
          this.amountOfNeighborsStatuses = 0;
          for (let k = i - 1; k < i + 2; k += 1) {
            for (let l = j - 1; l < j + 2; l += 1) {
              this.amountOfNeighborsStatuses += Number(field.readCellLifeStatus(k, l));
            }
          }

          if (field.readCellLifeStatus(i, j) === 0 && this.amountOfNeighborsStatuses === 3) {
            this.recountedField[i][j] = 1;
          } else if (field.readCellLifeStatus(i, j) === 1
              && (this.amountOfNeighborsStatuses === 3 || this.amountOfNeighborsStatuses === 4)) {
            this.recountedField[i][j] = 1;
          } else if (field.readCellLifeStatus(i, j) === 1
              && (this.amountOfNeighborsStatuses < 3 || this.amountOfNeighborsStatuses > 4)) {
            this.recountedField[i][j] = 0;
          }
        }
      }
    }

    for (let i = 0; i < field.getYSizeOfField(); i += 1) {
      for (let j = 0; j < field.getXSizeOfField(); j += 1) {
        field.setCellLifeStatusOnPenultimateGeneration(i, j,
          field.readCellLifeStatusOnLastGeneration(i, j));
        field.setCellLifeStatusOnLastGeneration(i, j, field.readCellLifeStatus(i, j));
        const previosCellLifeStatus = field.readCellLifeStatus(i, j);
        field.setCellLifeStatus(i, j, this.recountedField[i][j]);

        if (previosCellLifeStatus === 1 && field.readCellLifeStatus(i, j) === 0) {
          field.setSumOfAllCells(field.getSumOfAllCells() - 1);
        }
        if (previosCellLifeStatus === 0 && field.readCellLifeStatus(i, j) === 1) {
          field.setSumOfAllCells(field.getSumOfAllCells() + 1);
        }
      }
    }

    field.setNumberOfGeneration(field.getNumberOfGeneration() + 1);
  }

  _stopGame(field) {
    this.sameCellsOfFirstAndLastGeneration = 0;
    this.sameCellsOfFirstAndPenultimateGeneration = 0;

    for (let i = 0; i < field.getYSizeOfField(); i += 1) {
      for (let j = 0; j < field.getXSizeOfField(); j += 1) {
        if (field.readCellLifeStatusOnLastGeneration(i, j)
        === field.readCellLifeStatus(i, j)) {
          this.sameCellsOfFirstAndLastGeneration += 1;
        }
        if (field.readCellLifeStatusOnPenultimateGeneration(i, j)
        === field.readCellLifeStatus(i, j)) {
          this.sameCellsOfFirstAndPenultimateGeneration += 1;
        }
      }
    }

    if (field.getSumOfAllCells() === 0) {
      field.setEndGameStatus(1);
      field.setGameOver(true);
    } else if (this.sameCellsOfFirstAndPenultimateGeneration === field.getXSizeOfField()
                * field.getYSizeOfField()) {
      field.setEndGameStatus(3);
      field.setGameOver(true);
    } else if (this.sameCellsOfFirstAndLastGeneration === field.getXSizeOfField()
                * field.getYSizeOfField()) {
      field.setEndGameStatus(2);
      field.setGameOver(true);
    } else {
      field.setEndGameStatus(0);
      field.setGameOver(false);
    }
  }
}

export default BasicLogicOfGame;
