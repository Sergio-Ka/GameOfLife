import { ModelSquare } from './ModelSquare';

class ModelField {
  constructor() {
    this.x = 3;
    this.y = 3;
    this.numberOfGeneraton = 1;
    this.gameOver = 0;
  }

  getX() {
    return this.x;
  }

  setX(value) {
    if (value >= 1) {
      this.x = value + 2;
    } else {
      this.x = 3;
    }
  }

  getY() {
    return this.y;
  }

  setY(value) {
    if (value >= 1) {
      this.y = value + 2;
    } else {
      this.y = 3;
    }
  }

  getNumberOfGeneration() {
    return this.numberOfGeneraton;
  }

  setNumberOfGeneration(value) {
    if (value >= 1) {
      this.numberOfGeneraton = value;
    } else {
      this.numberOfGeneraton = 1;
    }
  }

  getGameOver() {
    return this.gameOver;
  }

  setGameOver(value) {
    if (value === 1 || value === 2 || value === 3) {
      this.gameOver = value;
    } else {
      this.gameOver = 0;
    }
  }

  createRandomField() {
    this.field = [this.x];
    this.numberOfGeneraton = 1;
    this.gameOver = 0;

    for (let i = 0; i < this.x; i += 1) {
      this.field[i] = [this.y];
      for (let j = 0; j < this.y; j += 1) {
        this.field[i][j] = new ModelSquare();
        if (i === 0 || i === this.x - 1 || j === 0 || j === this.y - 1) {
          this.field[i][j].setValue(0);
        } else {
          this.field[i][j].setValue(Math.round(Math.random()));
        }
      }
    }
  }

  clearField() {
    this.field = [this.x];
    this.numberOfGeneraton = 1;
    this.gameOver = 0;

    for (let i = 0; i < this.x; i += 1) {
      this.field[i] = [this.y];
      for (let j = 0; j < this.y; j += 1) {
        this.field[i][j] = new ModelSquare();
        this.field[i][j].setValue(0);
        this.field[i][j].setValueOnLastGeneration(0);
        this.field[i][j].setValueOnPenultimateGeneration(0);
      }
    }
  }

  cropFieldOnX(x) {
    if (this.field !== undefined) {
      this.x = x + 2;

      for (let i = this.field.length; this.field.length > x + 2; i -= 1) {
        this.field.pop();
      }

      for (let j = 0; j < this.field[x + 1].length; j += 1) {
        this.field[x + 1][j].setValue(0);
      }
    }
  }

  cropFieldOnY(y) {
    if (this.field !== undefined) {
      this.y = y + 2;

      for (let i = 0; i < this.field.length; i += 1) {
        for (let j = this.field[i].length; this.field[i].length > y + 2; j -= 1) {
          this.field[i].pop();
        }
        this.field[i][y + 1].setValue(0);
      }
    }
  }

  enlargeFieldOnX(x) {
    if (this.field !== undefined) {
      this.x = x + 2;

      for (let i = this.field.length; i < x + 2; i += 1) {
        this.field[i] = [this.y];
        for (let j = 0; j < this.y; j += 1) {
          this.field[i][j] = new ModelSquare();
        }
      }
    }
  }

  enlargeFieldOnY(y) {
    if (this.field !== undefined) {
      const oldY = this.y;
      this.y = y + 2;

      for (let i = 0; i < this.x; i += 1) {
        for (let j = oldY; j < this.y; j += 1) {
          this.field[i][j] = new ModelSquare();
        }
      }
    }
  }

  readSquareValueByCoordinate(x, y) {
    return this.field[x][y].getValue();
  }

  readSquareValueByCoordinateOnLastGen(x, y) {
    return this.field[x][y].getValueOnLastGeneration();
  }

  readSquareValueByCoordinateOnPenultGen(x, y) {
    return this.field[x][y].getValueOnPenultimateGeneration();
  }

  changeSquareValueByCoordinate(x, y) {
    if (x === 0 || x === this.x - 1 || y === 0 || y === this.y - 1) {
      this.field[x][y].setValue(0);
    } else {
      this.field[x][y].changeValue();
    }
  }

  setSquareValueByCoordinate(x, y, value) {
    this.field[x][y].setValue(value);
  }

  setSquareValueOnLGByCoordinate(x, y, value) {
    this.field[x][y].setValueOnLastGeneration(value);
  }

  setSquareValueOnPGByCoordinate(x, y, value) {
    this.field[x][y].setValueOnPenultimateGeneration(value);
  }
}

export {
  ModelField,
};
