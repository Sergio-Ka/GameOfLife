class ModelChangeField {
  constructor() {
    this.recountedField = 0;
    this.summ = 0;
    this.summAllField = 0;
    this.endOfGame1 = 0;
    this.endOfGame2 = 0;
  }

  manipulateFieldByAlgorithm(field) {
    this.recountedField = [field.getX()];

    for (let i = 0; i < field.getX(); i += 1) {
      this.recountedField[i] = [field.getY()];

      for (let j = 0; j < field.getY(); j += 1) {
        /* инициализация элементов вспомогательного массива
        нулями, чтобы всяких там сюрпризов не было */
        this.recountedField[i][j] = 0;

        // для каждой ячейки считаем количество живых соседей
        if (i !== 0 && i !== field.getX() - 1 && j !== 0 && j !== field.getY() - 1) {
          this.summ = 0;
          for (let k = i - 1; k < i + 2; k += 1) {
            for (let l = j - 1; l < j + 2; l += 1) {
              this.summ += Number(field.readSquareValueByCoordinate(k, l));
            }
          }

          /* заполняем вспомогательный массив на основе значения
          самой ячейки и количества живых соседей */
          if (field.readSquareValueByCoordinate(i, j) === 0 && this.summ === 3) {
            this.recountedField[i][j] = 1;
          } else if (field.readSquareValueByCoordinate(i, j) === 1
          && (this.summ === 3 || this.summ === 4)) {
            this.recountedField[i][j] = 1;
          } else if (field.readSquareValueByCoordinate(i, j) === 1
          && (this.summ < 3 || this.summ > 4)) {
            this.recountedField[i][j] = 0;
          }
        }
      }
    }

    /* записываем данные во все поля (на текущем, прошлом и позапрошлом шаге)
    каждого экземпляра ячейки текущего экземпляра поля в соответствии с
    пересчитанным новым полем */
    for (let i = 0; i < field.getX(); i += 1) {
      for (let j = 0; j < field.getY(); j += 1) {
        field.setSquareValueOnPGByCoordinate(i, j,
          field.readSquareValueByCoordinateOnLastGen(i, j));
        field.setSquareValueOnLGByCoordinate(i, j, field.readSquareValueByCoordinate(i, j));
        field.setSquareValueByCoordinate(i, j, this.recountedField[i][j]);
      }
    }

    field.setNumberOfGeneration(field.getNumberOfGeneration() + 1);
  }

  // метод для просмотра экземпляра поля и выдачи сигнала к остановке игры если сложились условия
  stopGame(field) {
    this.summAllField = 0;
    this.endOfGame1 = 0;
    this.endOfGame2 = 0;

    for (let i = 1; i < field.getX() - 1; i += 1) {
      for (let j = 1; j < field.getY() - 1; j += 1) {
        this.summAllField += Number(field.readSquareValueByCoordinate(i, j));
      }
    }

    for (let i = 0; i < field.getX(); i += 1) {
      for (let j = 0; j < field.getY(); j += 1) {
        if (field.readSquareValueByCoordinateOnLastGen(i, j)
        === field.readSquareValueByCoordinate(i, j)) {
          this.endOfGame1 += 1;
        }
        if (field.readSquareValueByCoordinateOnPenultGen(i, j)
        === field.readSquareValueByCoordinate(i, j)) {
          this.endOfGame2 += 1;
        }
      }
    }

    if (this.summAllField === 0) {
      field.setGameOver(1);
    } else if (this.endOfGame2 === field.x * field.y) {
      field.setGameOver(3);
    } else if (this.endOfGame1 === field.x * field.y) {
      field.setGameOver(2);
    } else {
      field.setGameOver(0);
    }
  }
}

export {
  ModelChangeField,
};
