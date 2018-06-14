'use strict';
/*import ModelSquare from './source/application/ModelSquare';*/

class ModelSquare {

    constructor() {
        this.value = 0;
        this.value = 0;
        this.valueOnPG = 0;
    }

    get Value() {
        return this.value;
    }

    set Value(val) {
        this.value = val;
    }

    get ValueOnLastGeneration() {
        return this.value;
    }

    set ValueOnLastGeneration(val) {
        this.value = val;
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

    SetSquareValueByCoordinate(X, Y, value) {
        this.field[X][Y].ValueOnLastGeneration = value;
    }

    SetSquareValueOnPGByCoordinate(X, Y, value) {
        this.field[X][Y].ValueOnPenultimateGeneration = value;
    }
}

class ModelChangeField {

    // метод для манипуляции экземпляром поля в соответствии с алгоритмом

    FieldManipulatorByAlgorithm(Field) {

        // создаем переменные - массив для пересчета и вспомогательную

        var RecountedField = new Array(Field.X);
        var Summ;

        for (var i = 0; i < Field.X; i++) {

            RecountedField[i] = new Array(Field.Y);

            for (var j = 0; j < Field.Y; j++) {

                // инициализация элементов вспомогательного массива нулями, чтобы всяких там сюрпризов не было

                RecountedField[i][j] = 0;

                // для каждой ячейки считаем количество живых соседей

                if (i != 0 && i != Field.X - 1 && j != 0 && j != Field.Y - 1) {
                    Summ = 0;
                    for (var k = i - 1; k < i + 2; k++) {
                        for (var l = j - 1; l < j + 2; l++) {
                            Summ += +Field.ReadSquareValueByCoordinate(k, l);
                        }
                    }

                    // заполняем вспомогательный массив на основе значения самой ячейки и количества живых соседей

                    if (Field.ReadSquareValueByCoordinate(i, j) == 0 && Summ == 3) {
                        RecountedField[i][j] = 1;
                    }
                    else if (Field.ReadSquareValueByCoordinate(i, j) == 1 && (Summ == 3 || Summ == 4)) {
                        RecountedField[i][j] = 1;
                    }
                    else if (Field.ReadSquareValueByCoordinate(i, j) == 1 && (Summ < 3 || Summ > 4)) {
                        RecountedField[i][j] = 0;
                    }
                }
            }
        }

        /* записываем данные во все поля (на текущем, прошлом и позапрошлом шаге) каждого экземпляра ячейки
        текущего экземпляра поля в соответствии с пересчитанным новым полем */

        for (i = 0; i < Field.X; i++) {
            for (j = 0; j < Field.Y; j++) {
                Field.SetSquareValueOnPGByCoordinate(i, j, Field.ReadSquareValueByCoordinateOnLastGen(i, j));
                Field.SetSquareValueByCoordinate(i, j, Field.ReadSquareValueByCoordinate(i, j));
                Field.SetSquareValueByCoordinate(i, j, RecountedField[i][j]);
            }
        }
    }
}

class ModelStopGame {
    StopGame(Field) {

        // оставновка программы, если во вселенной не осталось жизни

        var SummAllField = 0;

        for (var i = 1; i < Field.X - 1; i++) {
            for (var j = 1; j < Field.Y - 1; j++) {
                SummAllField += Field.ReadSquareValueByCoordinate(i, j);
            }
        }

        if (SummAllField == 0) {
            return true;
        }

        // оставновка программы, если во вселенной складываются устойчивые комбинации

        var EndOfGame1 = 0;
        var EndOfGame2 = 0;

        // сравнение массивов на 2х и 3х последних шагах

        for (i = 0; i < Field.X; i++) {
            for (j = 0; j < Field.Y; j++) {
                if (Field.ReadSquareValueByCoordinateOnLastGen(i, j) == Field.ReadSquareValueByCoordinate(i, j)) {
                    EndOfGame1++;
                }
                if (Field.ReadSquareValueByCoordinateOnPenultGen(i, j) == Field.ReadSquareValueByCoordinate(i, j)) {
                    EndOfGame2++;
                }
            }
        }

        if (EndOfGame1 == Field.X * Field.Y || EndOfGame2 == Field.X * Field.Y) {
            return true;
        }
    }
}

class View {
    UpdateView(Field) {

        // объявление переменных, получение доступа к элементу, в котором создается таблица вселенной

        var Table, Tr, Td;
        var Content = document.getElementsByClassName("page__content")[0];

        // проверка наличия уже созданной ранее таблицы вселенной, если есть то удаляем ее

        Table = document.getElementById("universe");
        if (Table != null) {
            Content.removeChild(Table);
        }

        // создаем новую таблицу вселенной с id=universe

        Table = Content.appendChild(document.createElement("table"));
        Table.setAttribute("id", "universe");

        // заполняем ячейку строками и ячейками в них
        // id ячеек - координаты х,у будут нужны для обработчика клика по ячейке для изменения ее состояния
        // цвет ячейки в соответствии с модификатором класса, назанчаемым на CSS

        for (var i = 0; i < Field.X; i++) {
            Tr = Table.appendChild(document.createElement("tr"));
            for (var j = 0; j < Field.Y; j++) {
                Td = Tr.appendChild(document.createElement("td"));
                Td.setAttribute("id", i.toString() + " " + j.toString());
                if (Field.ReadSquareValueByCoordinate(i, j) == 0) {
                    Td.setAttribute("class", "universe__square universe__square_isDead");
                }
                else if (Field.ReadSquareValueByCoordinate(i, j) == 1) {
                    Td.setAttribute("class", "universe__square universe__square_isAlive");
                }
            }
        }
    }
}

var Cell = new ModelSquare();
var Field = new ModelField();
var ChangeField = new ModelChangeField();
var EndOfGame = new ModelStopGame();
var EView = new View();

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
                        Field.SetSquareValueByCoordinate(i, j, 0);
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
        describe("проверка метода FieldManipulatorByAlgorithm отвечающего за изменение состояния поля в соответствии с алгоритмом", function () {
            it("создание поля 4*4, передача определенного рисунка (планер) поля методу и проверка состояния ячеек на втором поколении", function () {
                Field.X = 4;
                Field.Y = 4;
                Field.ClearField();

                Field.SetSquareValueByCoordinate(1, 2, 1);
                Field.SetSquareValueByCoordinate(2, 3, 1);
                Field.SetSquareValueByCoordinate(3, 1, 1);
                Field.SetSquareValueByCoordinate(3, 2, 1);
                Field.SetSquareValueByCoordinate(3, 3, 1);

                ChangeField.FieldManipulatorByAlgorithm(Field);

                assert.equal(Field.ReadSquareValueByCoordinate(2, 1), 1);
                assert.equal(Field.ReadSquareValueByCoordinate(2, 3), 1);
                assert.equal(Field.ReadSquareValueByCoordinate(3, 2), 1);
                assert.equal(Field.ReadSquareValueByCoordinate(3, 3), 1);
                assert.equal(Field.ReadSquareValueByCoordinate(4, 2), 1);
            });
            it("второй вызов метода пересчета поля и проверка состояния ячеек на третьем поколении", function () {
                ChangeField.FieldManipulatorByAlgorithm(Field);

                assert.equal(Field.ReadSquareValueByCoordinate(2, 3), 1);
                assert.equal(Field.ReadSquareValueByCoordinate(3, 1), 1);
                assert.equal(Field.ReadSquareValueByCoordinate(3, 3), 1);
                assert.equal(Field.ReadSquareValueByCoordinate(4, 2), 1);
                assert.equal(Field.ReadSquareValueByCoordinate(4, 3), 1);
            });
            it("третий вызов метода пересчета поля и проверка состояния ячеек на четвертом поколении", function () {
                ChangeField.FieldManipulatorByAlgorithm(Field);

                assert.equal(Field.ReadSquareValueByCoordinate(2, 2), 1);
                assert.equal(Field.ReadSquareValueByCoordinate(3, 3), 1);
                assert.equal(Field.ReadSquareValueByCoordinate(3, 4), 1);
                assert.equal(Field.ReadSquareValueByCoordinate(4, 2), 1);
                assert.equal(Field.ReadSquareValueByCoordinate(4, 3), 1);
            });
            it("четвертый вызов метода пересчета поля и проверка состояния ячеек на пятом поколении", function () {
                ChangeField.FieldManipulatorByAlgorithm(Field);

                assert.equal(Field.ReadSquareValueByCoordinate(2, 3), 1);
                assert.equal(Field.ReadSquareValueByCoordinate(3, 4), 1);
                assert.equal(Field.ReadSquareValueByCoordinate(4, 2), 1);
                assert.equal(Field.ReadSquareValueByCoordinate(4, 3), 1);
                assert.equal(Field.ReadSquareValueByCoordinate(4, 4), 1);
            });
            it("пятый вызов метода пересчета поля и проверка состояния ячеек на шестом поколении", function () {
                ChangeField.FieldManipulatorByAlgorithm(Field);

                assert.equal(Field.ReadSquareValueByCoordinate(3, 2), 1);
                assert.equal(Field.ReadSquareValueByCoordinate(3, 4), 1);
                assert.equal(Field.ReadSquareValueByCoordinate(4, 3), 1);
                assert.equal(Field.ReadSquareValueByCoordinate(4, 4), 1);
            });
            it("шестой вызов метода пересчета поля и проверка состояния ячеек на седьмом поколении", function () {
                ChangeField.FieldManipulatorByAlgorithm(Field);

                assert.equal(Field.ReadSquareValueByCoordinate(3, 4), 1);
                assert.equal(Field.ReadSquareValueByCoordinate(4, 3), 1);
                assert.equal(Field.ReadSquareValueByCoordinate(4, 4), 1);
            });
            it("седьмой вызов метода пересчета поля и проверка состояния ячеек на восьмом поколении", function () {
                ChangeField.FieldManipulatorByAlgorithm(Field);

                assert.equal(Field.ReadSquareValueByCoordinate(3, 3), 1);
                assert.equal(Field.ReadSquareValueByCoordinate(3, 4), 1);
                assert.equal(Field.ReadSquareValueByCoordinate(4, 3), 1);
                assert.equal(Field.ReadSquareValueByCoordinate(4, 4), 1);
            });
            it("проверка полей ячеек на прошлом поколении для 8 поколения (соответствие рисунку 7)", function () {
                assert.equal(Field.field[3][4].ValueOnLastGeneration, 1);
                assert.equal(Field.field[4][3].ValueOnLastGeneration, 1);
                assert.equal(Field.field[4][4].ValueOnLastGeneration, 1);
                
            });
            /*it("проверка полей ячеек на позапрошлом поколении для 8 поколения (соответствие рисунку 6 поколения)", function () {
                assert.equal(Field.field[3][2].ValueOnPenultimateGeneration, 1);
                assert.equal(Field.field[3][4].ValueOnPenultimateGeneration, 1);
                assert.equal(Field.field[4][3].ValueOnPenultimateGeneration, 1);
                assert.equal(Field.field[4][4].ValueOnPenultimateGeneration, 1);
                /*var Summ = "";
                for (var i = 0; i < Field.length; i++) {
                    for (var j = 0; j < Field[i].length; j++) {
                        Summ += Field.field[i][j].ValueOnPenultimateGeneration;
                    }
                    Summ += "\n";
                    alert(Summ);
                }
            });*/

            it("проверка того что на 8 поколении остальные ячейки мертвы", function () {
                ChangeField.FieldManipulatorByAlgorithm(Field);

                Field.SetSquareValueByCoordinate(3, 3, 0);
                Field.SetSquareValueByCoordinate(3, 4, 0);
                Field.SetSquareValueByCoordinate(4, 3, 0);
                Field.SetSquareValueByCoordinate(4, 4, 0);

                for (var i = 0; i < Field.field.length; i++) {
                    for (var j = 0; j < Field.field[0].length; j++) {
                        assert.equal(Field.field[i][j].Value, 0);
                    }
                }
            });
        });
    });

    describe("Проверка класса ModelStopGame", function () {
        describe("проверка метода StopGame отвечающего за отсановку игры по определенным условиям", function () {
            it("передача методу поля с отсутствющей жизнью вызывает остановку игры", function () {
                Field.ClearField();
                assert.isTrue(EndOfGame.StopGame(Field));
            });
            it("передача методу поля с одинаковым рисунком на последних двух поколениях вызывает остановку игры", function () {
                Field.field[1][1].Value = 1;
                Field.field[1][2].Value = 1;
                Field.field[2][1].Value = 1;
                Field.field[2][2].Value = 1;

                Field.field[1][1].ValueOnLastGeneration = 1;
                Field.field[1][2].ValueOnLastGeneration = 1;
                Field.field[2][1].ValueOnLastGeneration = 1;
                Field.field[2][2].ValueOnLastGeneration = 1;

                assert.isTrue(EndOfGame.StopGame(Field));
            });

            it("передача методу поля с одинаковым рисунком на текущем и предпоследнем поколениях вызывает остановку игры", function () {
                Field.ClearField();

                Field.field[1][1].Value = 1;
                Field.field[1][2].Value = 1;
                Field.field[2][1].Value = 1;
                Field.field[2][2].Value = 1;

                Field.field[1][1].ValueOnPenultimateGeneration = 1;
                Field.field[1][2].ValueOnPenultimateGeneration = 1;
                Field.field[2][1].ValueOnPenultimateGeneration = 1;
                Field.field[2][2].ValueOnPenultimateGeneration = 1;

                assert.isTrue(EndOfGame.StopGame(Field));
            });
        });
    });

    describe("Проверка класса View", function () {
        describe("проверка метода UpdateView отвечающего за отрисовку таблицы поля", function () {
            it("передача методу поля 5*5 с отсутствующей жизнью и проверка того, что создана таблица 5*5", function () {
                Field.X = 5;
                Field.Y = 5;
                Field.ClearField();
                EView.UpdateView(Field);

                assert.isNotNull(document.getElementById("universe"));
                assert.equal(document.getElementsByTagName("tr").length, 7);
                assert.equal(document.getElementsByTagName("td").length, 49);
            });
            it("проверка того, что ячейкам присвоены соотвествующие классы и id = координаты", function () {
                var Cell, Coordinate;
                assert.equal(document.getElementsByClassName("universe__square universe__square_isDead").length, 49);
                for (var i = 0; i < 7; i++) {
                    for (var j = 0; j < 7; j++) {
                        Cell = document.getElementsByClassName("universe__square universe__square_isDead")[i * 7 + j];
                        Coordinate = Cell.getAttribute("id").split(" ");
                        assert.equal(i, Coordinate[0]);
                        assert.equal(j, Coordinate[1]);
                    }
                }
            });
            it("передача методу поля с определенным рисунком (квадрат в верхнем левом углу) и проверка присвоения соответствующих классов соответствующим ячейкам", function () {
                Field.field[1][1].Value = 1;
                Field.field[1][2].Value = 1;
                Field.field[2][1].Value = 1;
                Field.field[2][2].Value = 1;
                EView.UpdateView(Field);

                var Cell, Coordinate, Td;
                Cell = document.getElementsByClassName("universe__square universe__square_isAlive");
                for (var i = 0; i < Cell.length / 2; i++) {
                    for (var j = 0; j < Cell.length / 2; j++) {
                        Coordinate = Cell[i * 2 + j].getAttribute("id").split(" ");
                        Td = document.getElementById((i + 1) + " " + (j + 1));
                        assert.equal(Td.getAttribute("class"), "universe__square universe__square_isAlive");
                    }
                }
            });
            it("присвоение \"живым\" ячейкам класса \"мертвых\" и проверка всех ячеек на предмет наличия у них \"мертвого\" класса", function () {
                Field.field[1][1].Value = 0;
                Field.field[1][2].Value = 0;
                Field.field[2][1].Value = 0;
                Field.field[2][2].Value = 0;
                EView.UpdateView(Field);

                assert.equal(document.getElementsByClassName("universe__square universe__square_isDead").length, 49);
            });
        });
    });

    describe("Проверка класса Controller", function () {
        describe("Не врубимо как тестить этот класс", function () {
            it("как-то чего-то надо потестить, а как - не ясно", function () {
                Field.ClearField();
                EView.UpdateView(Field);

                assert.equal(document.getElementsByClassName("universe__square universe__square_isDead").length, 49);
            });
        });
    });
});