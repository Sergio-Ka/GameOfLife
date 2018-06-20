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
                Field.SetSquareValueOnLGByCoordinate(i, j, Field.ReadSquareValueByCoordinate(i, j));
                Field.SetSquareValueByCoordinate(i, j, RecountedField[i][j]);
            }
        }

        Field.NumberOfGeneration++;
    }

    // метод для просмотра экземпляра поля и выдачи сигнала к остановке игры если сложились условия

    StopGame(Field) {

        // оставновка программы, если во вселенной не осталось жизни

        var SummAllField = 0;

        for (var i = 1; i < Field.X - 1; i++) {
            for (var j = 1; j < Field.Y - 1; j++) {
                SummAllField += Field.ReadSquareValueByCoordinate(i, j);
            }
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

        // запись результатов в поле

        if (SummAllField == 0) {
            Field.GameOver = 1;
        }
        else if (EndOfGame2 == Field.X * Field.Y) {
            Field.GameOver = 3;
        }
        else if (EndOfGame1 == Field.X * Field.Y) {
            Field.GameOver = 2;
        }
        else {
            Field.GameOver = 0;
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

class Controller {
    Main(EField, EModelChangeField, EView) {
        var TimerId, StartFlag = false, CreateFieldFlag = false;

        // обработчик кнопки создать, присвоение размеров полю, вызов метода по созданию поля

        var ButtonCreateU = document.getElementById("create-universe");
        ButtonCreateU.addEventListener("click", function () {
            SetSizeOfField();
            EField.CreateRandomField();
            EView.UpdateView(EField);
            CreateFieldFlag = true;
        });

        // обработчик кнопки стереть, присвоение размеров полю, вызов метода по стиранию поля (по факту - заполнения ячейками в состоянии 0)

        var ButtonClearU = document.getElementById("clear-universe");
        ButtonClearU.addEventListener("click", function () {
            SetSizeOfField();
            EField.ClearField();
            EView.UpdateView(EField);
            CreateFieldFlag = true;
        });

        // обработчик кнопки старт, запускает таймер

        var ButtonStartGame = document.getElementById("start-game");
        ButtonStartGame.addEventListener("click", function () {
            Timer();
            StartFlag = true;
        });

        // обработчик кнопки стоп, обнуляет таймер

        var ButtonStopGame = document.getElementById("stop-game");
        ButtonStopGame.addEventListener("click", function () {
            clearInterval(TimerId);
            StartFlag = false;
        });

        // обработчик кнопки для продвижения на 1 шаг

        var ButtonStep = document.getElementById("step");
        ButtonStep.addEventListener("click", function () {
            EModelChangeField.FieldManipulatorByAlgorithm(EField);
            EView.UpdateView(EField);
        });

        // обработчик клика по ячейке

        document.body.addEventListener("click", function (event) {
            if (event.target.nodeName == "TD") {
                var Coordinate = event.target.getAttribute("id").split(" ");
                EField.ChangeSquareValueByCoordinate(Coordinate[0], Coordinate[1]);
                EView.UpdateView(EField);
            }
        });

        // обработчик анфокуса поля ввода высоты

        var HeightInput = document.getElementById("field-height");
        HeightInput.onblur = function () {
            var X = +document.getElementById("field-height").value;

            if (CreateFieldFlag) {
                if (X < EField.X) {
                    EField.CropFieldOnX(X);
                }
                else if (X > EField.X) {
                    EField.EnlargeFieldOnX(X);
                }

                EView.UpdateView(EField);
            }
        }

        // обработчик анфокуса поля ввода ширины

        var WidthInput = document.getElementById("field-width");
        WidthInput.onblur = function () {
            var Y = +document.getElementById("field-width").value;

            if (CreateFieldFlag) {
                if (Y < EField.Y) {
                    EField.CropFieldOnY(Y);
                }
                else if (Y > EField.Y) {
                    EField.EnlargeFieldOnY(Y);
                }

                EView.UpdateView(EField);
            }
        }

        // обработчики контрола скорости для динамического ее изменения

        /* var Slider = document.getElementsByClassName("ui-slider-handle")[0];
         Slider.addEventListener("mouseup", function () {
             if (StartFlag) {
                 Timer();
             }
         });
 
         Slider.addEventListener("mousemove", function () {
             if (StartFlag) {
                 Timer();
             }
         });*/

        // функции +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        function Timer() {
            var Speed = +document.getElementsByClassName("sliderValue")[0].value;
            clearInterval(TimerId);
            TimerId = setInterval(function () {
                EModelChangeField.StopGame(EField);
                EModelChangeField.FieldManipulatorByAlgorithm(EField);
                EView.UpdateView(EField);
                if (EField.GameOver != 0) {
                    clearInterval(TimerId);
                    StartFlag = false;
                    EField.GameOver = 0;
                }
            }, (10 - Speed) * 100);
        }

        function SetSizeOfField() {
            if (document.getElementById("field-height").value / 2 == 0) {
                document.getElementById("field-height").value = 38;
            }
            if (+document.getElementById("field-height").value > 100) {
                EField.X = 100;
                document.getElementById("field-height").value = 100;
            }
            else {
                EField.X = +document.getElementById("field-height").value;
            }
            if (document.getElementById("field-width").value / 2 == 0) {
                document.getElementById("field-width").value = 100;
            }
            if (+document.getElementById("field-width").value > 100) {
                EField.Y = 100;
                document.getElementById("field-width").value = 100;
            }
            else {
                EField.Y = +document.getElementById("field-width").value;
            }
        }
    }
}

var Cell = new ModelSquare();
var Field = new ModelField();
var ChangeField = new ModelChangeField();
var EView = new View();
var EController = new Controller();

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

                Field.field[1][2].Value = 1;
                Field.field[2][3].Value = 1;
                Field.field[3][1].Value = 1;
                Field.field[3][2].Value = 1;
                Field.field[3][3].Value = 1;

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
                
            });*/

            it("проверка того, что на 8 поколении остальные ячейки мертвы", function () {
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
        describe("проверка метода StopGame отвечающего за остановку игры по определенным условиям", function () {
            it("передача методу поля с отсутствющей жизнью вызывает остановку игры", function () {
                Field.ClearField();
                ChangeField.StopGame(Field);
                assert.equal(Field.GameOver, 1);
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

                ChangeField.StopGame(Field);
                assert.equal(Field.GameOver, 2);
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

                ChangeField.StopGame(Field);
                assert.equal(Field.GameOver, 3);
            });
        });
    });

    // проверка класса с отображения
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
        describe("проверка метода Main, отвечающего за обработку событий, возникающих при взаимодействии с контролами", function () {
            var spy_updateview = sinon.spy(EView, 'UpdateView');
            var spy_clearInt = sinon.spy(window, 'clearInterval');
            var spy_changefield = sinon.spy(ChangeField, 'FieldManipulatorByAlgorithm');
            var spy_onblurheightcrop = sinon.spy(Field, 'CropFieldOnX');
            var spy_onblurwidthcrop = sinon.spy(Field, 'CropFieldOnY');
            var spy_onblurwidthtenlarge = sinon.spy(Field, 'EnlargeFieldOnY');
            var spy_onblurheightenlarge = sinon.spy(Field, 'EnlargeFieldOnX');

            it('нажатие на кнопку СОЗДАТЬ вызывает функцию установки размеров поля с предварительной валидацией', function () {
                EController.Main(Field, ChangeField, EView);
                document.getElementById("field-height").value = 38;
                document.getElementById("field-width").value = 100;
                $('#create-universe').trigger('click');
                assert.equal(Field.X, 40);
                assert.equal(Field.Y, 102);
            });
            it('нажатие на кнопку СОЗДАТЬ вызывает метод создания поля', function () {
                var spy_create = sinon.spy(Field, 'CreateRandomField');
                $('#create-universe').trigger('click');
                sinon.assert.called(spy_create);
            });
            it('нажатие на кнопку СОЗДАТЬ вызывает метод отрисовки поля', function () {
                $('#create-universe').trigger('click');
                sinon.assert.called(spy_updateview);
            });
            it('нажатие на кнопку СТЕРЕТЬ вызывает функцию установки размеров поля с предварительной валидацией', function () {
                document.getElementById("field-height").value = 38;
                document.getElementById("field-width").value = 100;
                $('#clear-universe').trigger('click');
                assert.equal(Field.X, 40);
                assert.equal(Field.Y, 102);
            });
            it('нажатие на кнопку СТЕРЕТЬ вызывает метод стирания поля', function () {
                var spy_create = sinon.spy(Field, 'ClearField');
                $('#clear-universe').trigger('click');
                sinon.assert.called(spy_create);
            });
            it('нажатие на кнопку СТЕРЕТЬ вызывает метод отрисовки поля', function () {
                $('#clear-universe').trigger('click');
                sinon.assert.called(spy_updateview);
            });
            it('нажатие на кнопку СТАРТ вызывает функцию остановки таймера clearInterval (отчистка, если был запущен ранее)', function () {
                $('#start-game').trigger('click');
                sinon.assert.called(spy_clearInt);
            });
            it('нажатие на кнопку СТАРТ вызывает функцию запуска таймера setInterval', function () {
                var spy_setInt = sinon.spy(window, 'setInterval');
                $('#start-game').trigger('click');
                sinon.assert.called(spy_setInt);
            });
            it('нажатие на кнопку СТОП вызывает функцию остановки таймера clearInterval', function () {
                $('#stop-game').trigger('click');
                sinon.assert.called(spy_clearInt);
            });
            it('нажатие на кнопку 1 ШАГ вызывает метод пересчета поля', function () {
                $('#step').trigger('click');
                sinon.assert.called(spy_changefield);
            });
            it('нажатие на кнопку 1 ШАГ вызывает метод отрисовки поля', function () {
                $('#step').trigger('click');
                sinon.assert.called(spy_updateview);
            });
            it('нажатие на ячейку поля вызывает метод изменения ее состояния', function () {
                var spy_changesquare = sinon.spy(Field, 'ChangeSquareValueByCoordinate');
                $('td').trigger('click');
                sinon.assert.called(spy_changesquare);
            });
            it('нажатие на ячейку поля вызывает метод отрисовки поля', function () {
                $('td').trigger('click');
                sinon.assert.called(spy_updateview);
            });
            it('анфокус поля высоты в случае уменьшения высоты вызывает метод CropFieldOnX', function () {
                document.getElementById("field-height").value = 30;
                $('field-height').trigger('blur');
                sinon.assert.called(spy_onblurheightcrop);
            });
            it('анфокус поля высоты вызывает в случае увеличения высоты вызывает метод EnlargeFieldOnX', function () {
                document.getElementById("field-height").value = 38;
                $('field-height').trigger('blur');
                sinon.assert.called(spy_onblurheightenlarge);
            });
            it('анфокус поля высоты вызывает метод отрисовки поля', function () {
                $('field-height').trigger('blur');
                sinon.assert.called(spy_updateview);
            });
            it('анфокус поля ширины в случае уменьшения высоты вызывает метод CropFieldOnY', function () {
                document.getElementById("field-width").value = 50;
                $('field-width').trigger('blur');
                sinon.assert.called(spy_onblurwidthcrop);
            });
            it('анфокус поля ширины вызывает в случае увеличения высоты вызывает метод EnlargeFieldOnY', function () {
                document.getElementById("field-width").value = 100;
                $('field-width').trigger('blur');
                sinon.assert.called(spy_onblurwidthtenlarge);
            });
            it('анфокус поля ширины вызывает метод отрисовки поля', function () {
                $('field-width').trigger('blur');
                sinon.assert.called(spy_updateview);
            });
        });
    });
});