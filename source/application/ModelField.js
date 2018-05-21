'use strict';

export default class ModelField {

    // инициализация полей класса при создании

    constructor() {
        this.x = 3;
        this.y = 3;
        this.field;
    }

    // геттеры и сеттеры для полей класса

    get X() {
        return this.x;
    }

    set X(value) {
        this.x = value + 2;
    }

    get Y() {
        return this.y;
    }

    set Y(value) {
        this.y = value + 2;
    }

    // методы создания рандомно заполненного поля и отчистки поля

    CreateRandomField() {
        this.field = new Array(this.x);

        for (var i = 0; i < this.x; i++) {
            this.field[i] = new Array(this.y);
            for (var j = 0; j < this.x; j++) {
                this.field[i][j] = new ModelSquare();
                if (i == 0 || i == this.x - 1 || j == 0 || j == this.y - 1) {
                    this.field[i][j].Value = 0;
                }
                else {
                    this.field[i][j].Value = Math.round(Math.random());
                }
            }
        }
    }

    ClearField() {
        this.field = new Array(this.x);

        for (var i = 0; i < this.x; i++) {
            this.field[i] = new Array(this.y);
            for (var j = 0; j < this.y; j++) {
                this.field[i][j] = new ModelSquare();
                this.field[i][j].Value = 0;
            }
        }
    }

    // методы чтения данных из ячеек на текущем, последнем и предпоследнем поколении

    ReadSquareValueByCoordinate(X, Y) {
        return this.field[X][Y].Value;
    }

    ReadSquareValueByCoordinateOnLastGen(X, Y) {
        return this.field[X][Y].ValueOnLastGeneration;
    }

    ReadSquareValueByCoordinateOnPenultGen(X, Y) {
        return this.field[X][Y].ValueOnPenultimateGeneration;
    }

    // метод изменения состояния ячейки по передаваемым координатам на текущем поколении

    ChangeSquareValueByCoordinate(X,  Y) {
        if (X == 0 || X == this.x - 1 || Y == 0 || Y == this.y - 1) {
            this.field[X][Y].Value = 0;
        }
        else {
            this.field[X][Y].ChangeValue();
        }
    }

    // методы записи данных в ячейки на текущем, последнем и предпоследнем поколении

    SetSquareValueByCoordinate(X, Y, value) {
        this.field[X][Y].Value = value;
    }

    SetSquareValueOnLGByCoordinate(X, Y, value) {
        this.field[X][Y].ValueOnLastGeneration = value;
    }

    SetSquareValueOnPGByCoordinate(X, Y, value) {
        this.field[X][Y].ValueOnPenultimateGeneration = value;
    }
}