'use strict';

import ModelSquare from './ModelSquare';

export default class ModelField {

    constructor() {
        this.x = 3;
        this.y = 3;
        this.field;
        this.numberOfGeneraton = 1;
        this.gameOver = 0;
    }

    get X() {
        return this.x;
    }

    set X(value) {
        if (value >= 1) {
            this.x = value + 2;
        }
        else {
            this.x = 3;
        }
    }

    get Y() {
        return this.y;
    }

    set Y(value) {
        if (value >= 1) {
            this.y = value + 2;
        }
        else {
            this.y = 3;
        }
    }

    get NumberOfGeneration() {
        return this.numberOfGeneraton;
    }

    set NumberOfGeneration(value) {
        if (value >= 1) {
            this.numberOfGeneraton = value;
        }
        else {
            this.numberOfGeneraton = 1;
        }
    }

    get GameOver() {
        return this.gameOver;
    }

    set GameOver(value) {
        if (value == 0 || value == 1 || value == 2 || value == 3) {
            this.gameOver = value;
        }
        else {
            this.gameOver = 0;
        }
    }

    CreateRandomField() {
        this.field = new Array(this.x);
        this.numberOfGeneraton = 1;
        this.gameOver = 0;

        for (var i = 0; i < this.x; i++) {
            this.field[i] = new Array(this.y);
            for (var j = 0; j < this.y; j++) {
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
        this.numberOfGeneraton = 1;
        this.gameOver = 0;

        for (var i = 0; i < this.x; i++) {
            this.field[i] = new Array(this.y);
            for (var j = 0; j < this.y; j++) {
                this.field[i][j] = new ModelSquare();
                this.field[i][j].Value = 0;
                this.field[i][j].ValueOnLastGeneration = 0;
                this.field[i][j].ValueOnPenultimateGeneration = 0;
            }
        }
    }

    CropFieldOnX(X) {
        if (this.field != undefined) {
            this.x = X + 2;

            for (var i = this.field.length; this.field.length > X + 2; i--) {
                this.field.pop();
            }

            for (var j = 0; j < this.field[X + 1].length; j++) {
                this.field[X + 1][j].Value = 0;
            }
        }
    }

    CropFieldOnY(Y) {
        if (this.field != undefined) {
            this.y = Y + 2;

            for (var i = 0; i < this.field.length; i++) {
                for (var j = this.field[i].length; this.field[i].length > Y + 2; j--) {
                    this.field[i].pop();
                }
                this.field[i][Y + 1].Value = 0;
            }
        }
    }

    EnlargeFieldOnX(X) {
        if (this.field != undefined) {
            this.x = X + 2;

            for (var i = this.field.length; i < X + 2; i++) {
                this.field[i] = new Array(this.y);
                for (var j = 0; j < this.y; j++) {
                    this.field[i][j] = new ModelSquare();
                }
            }
        }
    }

    EnlargeFieldOnY(Y) {
        if (this.field != undefined) {
            var OldY = this.y;
            this.y = Y + 2;

            for (var i = 0; i < this.X; i++) {
                for (var j = OldY; j < this.y; j++) {
                    this.field[i][j] = new ModelSquare();
                }
            }
        }
    }

    ReadSquareValueByCoordinate(X, Y) {
        return this.field[X][Y].Value;
    }

    ReadSquareValueByCoordinateOnLastGen(X, Y) {
        return this.field[X][Y].ValueOnLastGeneration;
    }

    ReadSquareValueByCoordinateOnPenultGen(X, Y) {
        return this.field[X][Y].ValueOnPenultimateGeneration;
    }

    ChangeSquareValueByCoordinate(X, Y) {
        if (X == 0 || X == this.x - 1 || Y == 0 || Y == this.y - 1) {
            this.field[X][Y].Value = 0;
        }
        else {
            this.field[X][Y].ChangeValue();
        }
    }

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