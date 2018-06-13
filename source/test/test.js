'use strict';
/*import ModelSquare from './source/application/ModelSquare';*/

class ModelSquare {

    constructor() {
        this.value = 0;
        this.valueOnLG = 0;
        this.valueOnPG = 0;
    }

    get Value() {
        return this.value;
    }

    set Value(val) {
        this.value = val;
    }

    get ValueOnLastGeneration() {
        return this.valueOnLG;
    }

    set ValueOnLastGeneration(val) {
        this.valueOnLG = val;
    }

    get ValueOnPenultimateGeneration() {
        return this.valueOnPG;
    }

    set ValueOnPenultimateGeneration(val) {
        this.valueOnPG = val;
    }

    ChangeValue() {
        if (this.value == 0) {
            this.value = 1;
        }
        else {
            this.value = 0;
        }
    }
}

class ModelField {

    constructor() {
        this.x = 3;
        this.y = 3;
        this.field;
    }

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

    CreateRandomField() {
        this.field = new Array(this.x);

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

        for (var i = 0; i < this.x; i++) {
            this.field[i] = new Array(this.y);
            for (var j = 0; j < this.y; j++) {
                this.field[i][j] = new ModelSquare();
                this.field[i][j].Value = 0;
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

var Cell = new ModelSquare();
var Field = new ModelField();

describe("Тест JS кода игры Жизнь Конвея", function () {

    // проверяем класс ячейки
    describe("Проверка класса ModelSquare", function () {
        describe("проверка инициализации полей состояния ячейки", function () {
            it("состояние в текущем поколении = 0", function () {
                assert.equal(Cell.Value, 0);
            });
            it("состояние в прошлом поколении = 0", function () {
                assert.equal(Cell.ValueOnLastGeneration, 0);
            });
            it("состояние в позапрошлом поколении = 0", function () {
                assert.equal(Cell.ValueOnPenultimateGeneration, 0);
            });
        });

        describe("проверка метода изменения состояния ячейки в текущем поколении", function () {
            it("при вызове метода меняет состояние ячейки в текущем поколении на противоположное (с 0 на 1)", function () {
                Cell.ChangeValue();
                assert.equal(Cell.Value, 1);
            });
            it("при вызове метода меняет состояние ячейки в текущем поколении на противоположное (с 1 на 0)", function () {
                Cell.ChangeValue();
                assert.equal(Cell.Value, 0);
            });
        });
    });

    // проверяем класс поля
    describe("Проверка класса ModelField", function () {
        describe("проверка инициализации полей размера поля при создании", function () {
            it("начальный размер поля X = 3", function () {
                assert.equal(Field.X, 3);
            });
            it("начальный размер поля Y = 3", function () {
                assert.equal(Field.Y, 3);
            });
            it("при установке размера X = 3 полю размер равен x + 2 = 5", function () {
                Field.X = 3;
                assert.equal(Field.X, 5);
            });
            it("при установке размера Y = 3 полю размер равен y + 2 = 5", function () {
                Field.Y = 3;
                assert.equal(Field.Y, 5);
            });
        });

        describe("проверка метода создания рандомно заполненного поля", function () {
            it("при создании экземпляра класса поля (массив объектов класса ячейка) не существует", function () {
                assert.isUndefined(Field.field);
            });
            it("при вызове метода создается поле размером 5*5 ячеек", function () {
                Field.CreateRandomField();
                assert.lengthOf(Field.field, 5);
                for (var i = 0; i < Field.field.length; i++) {
                    assert.lengthOf(Field.field[i], 5);
                }
            });
            it("каждая ячейка поля является объектом", function () {
                for (var i = 0; i < Field.field.length; i++) {
                    for (var j = 0; j < Field.field[0].length; j++) {
                        assert.isObject(Field.field[i][j]);
                    }
                }
            });
            it("значение каждой ячейки поля принадлежит множеству {0,1}", function () {
                for (var i = 0; i < Field.field.length; i++) {
                    for (var j = 0; j < Field.field[0].length; j++) {
                        assert(Field.field[i][j].Value === 0 || Field.field[i][j].Value === 1);
                    }
                }
            });
            it("значение каждой ячейки по краям поля = 0", function () {
                for (var i = 0; i < Field.field.length; i++) {
                    for (var j = 0; j < Field.field[0].length; j++) {
                        if (i == 0 || i == Field.field.length - 1 || j == 0 || j == Field.field[0].length - 1) {
                            assert.equal(Field.field[i][j].Value, 0);
                        }
                    }
                }
            });
        });

        describe("проверка метода очистки поля", function () {
            it("значение каждой ячейки поля после вызова метода = 0", function () {
                Field.ClearField();
                for (var i = 0; i < Field.field.length; i++) {
                    for (var j = 0; j < Field.field[0].length; j++) {
                        assert.equal(Field.field[i][j].Value, 0);
                    }
                }
            });
        });

        describe("проверка методов обрезки поля по высоте и ширине", function () {
            it("При установке размера полю X = 2 размер поля становится x + 2 = 4", function () {
                Field.CropFieldOnX(2);
                assert.lengthOf(Field.field, 4);
            });
            it("При установке размера полю Y = 2 размер поля становится y + 2 = 4", function () {
                Field.CropFieldOnY(2);
                for (var i = 0; i < Field.field.length; i++) {
                    assert.lengthOf(Field.field[i], 4);
                }
            });
            it("оставшиеся ячейки поля является по прежнему объектом", function () {
                for (var i = 0; i < Field.field.length; i++) {
                    for (var j = 0; j < Field.field[0].length; j++) {
                        assert.isObject(Field.field[i][j]);
                    }
                }
            });
            it("значение оставшихся ячеек поля по прежнему принадлежит множеству {0,1}", function () {
                for (var i = 0; i < Field.field.length; i++) {
                    for (var j = 0; j < Field.field[0].length; j++) {
                        assert(Field.field[i][j].Value === 0 || Field.field[i][j].Value === 1);
                    }
                }
            });
        });

        describe("проверка методов увеличения поля по высоте и ширине", function () {
            it("при установке размера полю X = 8 размер поля становится x + 2 = 10", function () {
                Field.EnlargeFieldOnX(8);
                assert.lengthOf(Field.field, 10);
            });
            it("при установке размера полю Y = 8 размер поля становится y + 2 = 10", function () {
                Field.EnlargeFieldOnY(8);
                for (var i = 0; i < Field.field.length; i++) {
                    assert.lengthOf(Field.field[i], 10);
                }
            });
            it("ячейки поля является по прежнему объектом", function () {
                for (var i = 0; i < Field.field.length; i++) {
                    for (var j = 0; j < Field.field[0].length; j++) {
                        assert.isObject(Field.field[i][j]);
                    }
                }
            });
            it("значение ячеек поля по прежнему принадлежит множеству {0,1}", function () {
                for (var i = 0; i < Field.field.length; i++) {
                    for (var j = 0; j < Field.field[0].length; j++) {
                        assert(Field.field[i][j].Value === 0 || Field.field[i][j].Value === 1);
                    }
                }
            });
            it("значение вновь добавленных ячеек поля = 0", function () {
                for (var i = 5; i < Field.field.length; i++) {
                    for (var j = 5; j < Field.field[0].length; j++) {
                        assert(Field.field[i][j].Value === 0);
                    }
                }
            });
        });

        describe("проверка методов чтения и записи значений ячейки в текущем, прошлом и позапрошлом поколении", function () {
            it("установка значения всех ячеек поля в состояние 1 на всех поколениях и проверка методов чтения по значениям", function () {
                Field.ClearField();
                for (var i = 0; i < Field.field.length; i++) {
                    for (var j = 0; j < Field.field[i].length; j++) {
                        Field.field[i][j].Value = 1;
                        Field.field[i][j].ValueOnLastGeneration = 1;
                        Field.field[i][j].ValueOnPenultimateGeneration = 1;
                        assert(Field.ReadSquareValueByCoordinate(i, j) === 1);
                        assert(Field.ReadSquareValueByCoordinateOnLastGen(i, j) === 1);
                        assert(Field.ReadSquareValueByCoordinateOnPenultGen(i, j) === 1);
                    }
                }
            });
            it("установка значения всех ячеек поля в состояние 0 c помощью методов записи на всех поколениях и проверка значений", function () {
                for (var i = 0; i < Field.field.length; i++) {
                    for (var j = 0; j < Field.field[i].length; j++) {
                        Field.SetSquareValueByCoordinate(i, j, 0);
                        Field.SetSquareValueOnLGByCoordinate(i, j, 0);
                        Field.SetSquareValueOnPGByCoordinate(i, j, 0);
                        assert.equal(Field.ReadSquareValueByCoordinate(i, j), 0);
                        assert.equal(Field.ReadSquareValueByCoordinateOnLastGen(i, j), 0);
                        assert.equal(Field.ReadSquareValueByCoordinateOnPenultGen(i, j), 0);
                    }
                }
            });
            it("проверка метода смены значения ячейки на противоположное на текущем поколении по передаваемым координатам в рабочей области поля (за исключением крайних ячеек)", function () {
                Field.ClearField();
                for (var i = 1; i < Field.field.length - 1; i++) {
                    for (var j = 1; j < Field.field[i].length - 1; j++) {
                        Field.ChangeSquareValueByCoordinate(i, j);
                        assert.equal(Field.ReadSquareValueByCoordinate(i, j), 1);
                    }
                }
            });
        });
    });

    // проверка класса с логикой игры
    describe("Проверка класса ModelChangeField", function () {
        describe("проверка методов чтения и записи значений ячейки в текущем, прошлом и позапрошлом поколении", function () {
            it("установка значения всех ячеек поля в состояние 1 на всех поколениях и проверка методов чтения по значениям", function () {
                Field.ClearField();
                for (var i = 0; i < Field.field.length; i++) {
                    for (var j = 0; j < Field.field[i].length; j++) {
                        Field.field[i][j].Value = 1;
                        Field.field[i][j].ValueOnLastGeneration = 1;
                        Field.field[i][j].ValueOnPenultimateGeneration = 1;
                        assert(Field.ReadSquareValueByCoordinate(i, j) === 1);
                        assert(Field.ReadSquareValueByCoordinateOnLastGen(i, j) === 1);
                        assert(Field.ReadSquareValueByCoordinateOnPenultGen(i, j) === 1);
                    }
                }
            });
            it("установка значения всех ячеек поля в состояние 0 c помощью методов записи на всех поколениях и проверка значений", function () {
                for (var i = 0; i < Field.field.length; i++) {
                    for (var j = 0; j < Field.field[i].length; j++) {
                        Field.SetSquareValueByCoordinate(i, j, 0);
                        Field.SetSquareValueOnLGByCoordinate(i, j, 0);
                        Field.SetSquareValueOnPGByCoordinate(i, j, 0);
                        assert.equal(Field.ReadSquareValueByCoordinate(i, j), 0);
                        assert.equal(Field.ReadSquareValueByCoordinateOnLastGen(i, j), 0);
                        assert.equal(Field.ReadSquareValueByCoordinateOnPenultGen(i, j), 0);
                    }
                }
            });
            it("проверка метода смены значения ячейки на противоположное на текущем поколении по передаваемым координатам в рабочей области поля (за исключением крайних ячеек)", function () {
                Field.ClearField();
                for (var i = 1; i < Field.field.length - 1; i++) {
                    for (var j = 1; j < Field.field[i].length - 1; j++) {
                        Field.ChangeSquareValueByCoordinate(i, j);
                        assert.equal(Field.ReadSquareValueByCoordinate(i, j), 1);
                    }
                }
            });
        });
    });

    describe("Проверка класса ModelStopGame", function () {

    });

    describe("Проверка класса View", function () {

    });

    describe("Проверка класса Controller", function () {

    });
});