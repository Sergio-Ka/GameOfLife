'use strict';

import ModelSquare from '../application/ModelSquare';
import ModelField from '../application/ModelField';
import ModelChangeField from '../application/ModelChangeField';
import View from '../application/View';
import Controller from '../application/Controller';

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
                        Field.SetSquareValueByCoordinate(i, j, 1);
                        Field.SetSquareValueOnLGByCoordinate(i, j, 1);
                        Field.SetSquareValueOnPGByCoordinate(i, j, 1);
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
                        assert(Field.ReadSquareValueByCoordinate(i, j) === 0);
                        assert(Field.ReadSquareValueByCoordinateOnLastGen(i, j) === 0);
                        assert(Field.ReadSquareValueByCoordinateOnPenultGen(i, j) === 0);
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
            it("проверка полей ячеек на позапрошлом поколении для 8 поколения (соответствие рисунку 6 поколения)", function () {
                assert.equal(Field.field[3][2].ValueOnPenultimateGeneration, 1);
                assert.equal(Field.field[3][4].ValueOnPenultimateGeneration, 1);
                assert.equal(Field.field[4][3].ValueOnPenultimateGeneration, 1);
                assert.equal(Field.field[4][4].ValueOnPenultimateGeneration, 1);

            });

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
            it('анфокус поля высоты в случае увеличения высоты вызывает метод EnlargeFieldOnX', function () {
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
            it('анфокус поля ширины в случае увеличения высоты вызывает метод EnlargeFieldOnY', function () {
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