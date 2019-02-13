import { ModelSquare } from '../application/ModelSquare';
import { ModelField } from '../application/ModelField';
import { ModelChangeField } from '../application/ModelChangeField';
import { View } from '../application/View';
import { Controller } from '../application/Controller';

const Cell = new ModelSquare();
const Field = new ModelField();
const ChangeField = new ModelChangeField();
const EView = new View();
const EController = new Controller();

describe('Тест JS кода игры Жизнь Конвея', function () {

  // проверяем класс ячейки
  describe('Проверка класса ModelSquare', function () {
    describe('проверка инициализации полей состояния ячейки', function () {
      it('состояние в текущем поколении = 0', function () {
        assert.equal(Cell.getValue(), 0);
      });
      it('состояние в прошлом поколении = 0', function () {
        assert.equal(Cell.getValueOnLastGeneration(), 0);
      });
      it('состояние в позапрошлом поколении = 0', function () {
        assert.equal(Cell.getValueOnPenultimateGeneration(), 0);
      });
    });

    describe('проверка метода изменения состояния ячейки в текущем поколении', function () {
      it('при вызове метода меняет состояние ячейки в текущем поколении на противоположное (с 0 на 1)', function () {
        Cell.changeValue();
        assert.equal(Cell.getValue(), 1);
      });
      it('при вызове метода меняет состояние ячейки в текущем поколении на противоположное (с 1 на 0)', function () {
        Cell.changeValue();
        assert.equal(Cell.getValue(), 0);
      });
    });
  });

  // проверяем класс поля
  describe('Проверка класса ModelField', function () {
    describe('проверка инициализации полей размера поля при создании', function () {
      it('начальный размер поля X = 3', function () {
        assert.equal(Field.getX(), 3);
      });
      it('начальный размер поля Y = 3', function () {
        assert.equal(Field.getY(), 3);
      });
      it('при установке размера X = 3 полю размер равен x + 2 = 5', function () {
        Field.setX(3);
        assert.equal(Field.getX(), 5);
      });
      it('при установке размера Y = 3 полю размер равен y + 2 = 5', function () {
        Field.setY(3);
        assert.equal(Field.getY(), 5);
      });
    });

    describe('проверка метода создания рандомно заполненного поля', function () {
      it('при создании экземпляра класса поля (массив объектов класса ячейка) не существует', function () {
        assert.isUndefined(Field.field);
      });
      it('при вызове метода создается поле размером 5*5 ячеек', function () {
        Field.createRandomField();
        assert.lengthOf(Field.field, 5);
        for (let i = 0; i < Field.field.length; i+=1) {
          assert.lengthOf(Field.field[i], 5);
        }
      });
      it('каждая ячейка поля является объектом', function () {
        for (let i = 0; i < Field.field.length; i+=1) {
          for (let j = 0; j < Field.field[0].length; j+=1) {
            assert.isObject(Field.field[i][j]);
          }
        }
      });
      it('значение каждой ячейки поля принадлежит множеству {0,1}', function () {
        for (let i = 0; i < Field.field.length; i+=1) {
          for (let j = 0; j < Field.field[0].length; j+=1) {
            assert(Field.field[i][j].getValue() === 0 || Field.field[i][j].getValue() === 1);
          }
        }
      });
      it('значение каждой ячейки по краям поля = 0', function () {
        for (let i = 0; i < Field.field.length; i+=1) {
          for (let j = 0; j < Field.field[0].length; j+=1) {
            if (i == 0 || i == Field.field.length - 1 || j == 0 || j == Field.field[0].length - 1) {
              assert.equal(Field.field[i][j].getValue(), 0);
            }
          }
        }
      });
    });

    describe('проверка метода очистки поля', function () {
      it('значение каждой ячейки поля после вызова метода = 0', function () {
        Field.clearField();
        for (let i = 0; i < Field.field.length; i+=1) {
          for (let j = 0; j < Field.field[0].length; j+=1) {
            assert.equal(Field.field[i][j].getValue(), 0);
          }
        }
      });
    });

    describe('проверка методов обрезки поля по высоте и ширине', function () {
      it('при установке размера полю X = 2 размер поля становится x + 2 = 4', function () {
        Field.cropFieldOnX(2);
        assert.lengthOf(Field.field, 4);
      });
      it('при установке размера полю Y = 2 размер поля становится y + 2 = 4', function () {
        Field.cropFieldOnY(2);
        for (let i = 0; i < Field.field.length; i+=1) {
          assert.lengthOf(Field.field[i], 4);
        }
      });
      it('оставшиеся ячейки поля является по прежнему объектом', function () {
        for (let i = 0; i < Field.field.length; i+=1) {
          for (let j = 0; j < Field.field[0].length; j+=1) {
            assert.isObject(Field.field[i][j]);
          }
        }
      });
      it('значение оставшихся ячеек поля по прежнему принадлежит множеству {0,1}', function () {
        for (let i = 0; i < Field.field.length; i+=1) {
          for (let j = 0; j < Field.field[0].length; j+=1) {
            assert(Field.field[i][j].getValue() === 0 || Field.field[i][j].getValue() === 1);
          }
        }
      });
    });

    describe('проверка методов увеличения поля по высоте и ширине', function () {
      it('при установке размера полю X = 8 размер поля становится x + 2 = 10', function () {
        Field.enlargeFieldOnX(8);
        assert.lengthOf(Field.field, 10);
      });
      it('при установке размера полю Y = 8 размер поля становится y + 2 = 10', function () {
        Field.enlargeFieldOnY(8);
        for (let i = 0; i < Field.field.length; i+=1) {
          assert.lengthOf(Field.field[i], 10);
        }
      });
      it('ячейки поля является по прежнему объектом', function () {
        for (let i = 0; i < Field.field.length; i+=1) {
          for (let j = 0; j < Field.field[0].length; j+=1) {
            assert.isObject(Field.field[i][j]);
          }
        }
      });
      it('значение ячеек поля по прежнему принадлежит множеству {0,1}', function () {
        for (let i = 0; i < Field.field.length; i+=1) {
          for (let j = 0; j < Field.field[0].length; j+=1) {
            assert(Field.field[i][j].getValue() === 0 || Field.field[i][j].getValue() === 1);
          }
        }
      });
      it('значение вновь добавленных ячеек поля = 0', function () {
        for (let i = 5; i < Field.field.length; i+=1) {
          for (let j = 5; j < Field.field[0].length; j+=1) {
            assert(Field.field[i][j].getValue() === 0);
          }
        }
      });
    });

    describe('проверка методов чтения и записи значений ячейки в текущем, прошлом и позапрошлом поколении', function () {
      it('установка значения всех ячеек поля в состояние 1 на всех поколениях и проверка методов чтения по значениям', function () {
        Field.clearField();
        for (let i = 0; i < Field.field.length; i+=1) {
          for (let j = 0; j < Field.field[i].length; j+=1) {
            Field.setSquareValueByCoordinate(i, j, 1);
            Field.setSquareValueOnLGByCoordinate(i, j, 1);
            Field.setSquareValueOnPGByCoordinate(i, j, 1);
            assert(Field.readSquareValueByCoordinate(i, j) === 1);
            assert(Field.readSquareValueByCoordinateOnLastGen(i, j) === 1);
            assert(Field.readSquareValueByCoordinateOnPenultGen(i, j) === 1);
          }
        }
      });
      it('установка значения всех ячеек поля в состояние 0 c помощью методов записи на всех поколениях и проверка значений', function () {
        for (let i = 0; i < Field.field.length; i+=1) {
          for (let j = 0; j < Field.field[i].length; j+=1) {
            Field.setSquareValueByCoordinate(i, j, 0);
            Field.setSquareValueOnLGByCoordinate(i, j, 0);
            Field.setSquareValueOnPGByCoordinate(i, j, 0);
            assert(Field.readSquareValueByCoordinate(i, j) === 0);
            assert(Field.readSquareValueByCoordinateOnLastGen(i, j) === 0);
            assert(Field.readSquareValueByCoordinateOnPenultGen(i, j) === 0);
          }
        }
      });
      it('проверка метода смены значения ячейки на противоположное на текущем поколении по передаваемым координатам в рабочей области поля (за исключением крайних ячеек)', function () {
        Field.clearField();
        for (let i = 1; i < Field.field.length - 1; i+=1) {
          for (let j = 1; j < Field.field[i].length - 1; j+=1) {
            Field.changeSquareValueByCoordinate(i, j);
            assert.equal(Field.readSquareValueByCoordinate(i, j), 1);
          }
        }
      });
    });
  });

  // проверка класса с логикой игры
  describe('Проверка класса ModelChangeField', function () {
    describe('проверка метода manipulateFieldByAlgorithm отвечающего за изменение состояния поля в соответствии с алгоритмом', function () {
      it('создание поля 4*4, передача определенного рисунка (планер) поля методу и проверка состояния ячеек на втором поколении', function () {
        Field.setX(4);
        Field.setY(4);
        Field.clearField();

        Field.field[1][2].setValue(1);
        Field.field[2][3].setValue(1);
        Field.field[3][1].setValue(1);
        Field.field[3][2].setValue(1);
        Field.field[3][3].setValue(1);

        ChangeField.manipulateFieldByAlgorithm(Field);

        assert.equal(Field.readSquareValueByCoordinate(2, 1), 1);
        assert.equal(Field.readSquareValueByCoordinate(2, 3), 1);
        assert.equal(Field.readSquareValueByCoordinate(3, 2), 1);
        assert.equal(Field.readSquareValueByCoordinate(3, 3), 1);
        assert.equal(Field.readSquareValueByCoordinate(4, 2), 1);
      });
      it('второй вызов метода пересчета поля и проверка состояния ячеек на третьем поколении', function () {
        ChangeField.manipulateFieldByAlgorithm(Field);

        assert.equal(Field.readSquareValueByCoordinate(2, 3), 1);
        assert.equal(Field.readSquareValueByCoordinate(3, 1), 1);
        assert.equal(Field.readSquareValueByCoordinate(3, 3), 1);
        assert.equal(Field.readSquareValueByCoordinate(4, 2), 1);
        assert.equal(Field.readSquareValueByCoordinate(4, 3), 1);
      });
      it('третий вызов метода пересчета поля и проверка состояния ячеек на четвертом поколении', function () {
        ChangeField.manipulateFieldByAlgorithm(Field);

        assert.equal(Field.readSquareValueByCoordinate(2, 2), 1);
        assert.equal(Field.readSquareValueByCoordinate(3, 3), 1);
        assert.equal(Field.readSquareValueByCoordinate(3, 4), 1);
        assert.equal(Field.readSquareValueByCoordinate(4, 2), 1);
        assert.equal(Field.readSquareValueByCoordinate(4, 3), 1);
      });
      it('четвертый вызов метода пересчета поля и проверка состояния ячеек на пятом поколении', function () {
        ChangeField.manipulateFieldByAlgorithm(Field);

        assert.equal(Field.readSquareValueByCoordinate(2, 3), 1);
        assert.equal(Field.readSquareValueByCoordinate(3, 4), 1);
        assert.equal(Field.readSquareValueByCoordinate(4, 2), 1);
        assert.equal(Field.readSquareValueByCoordinate(4, 3), 1);
        assert.equal(Field.readSquareValueByCoordinate(4, 4), 1);
      });
      it('пятый вызов метода пересчета поля и проверка состояния ячеек на шестом поколении', function () {
        ChangeField.manipulateFieldByAlgorithm(Field);

        assert.equal(Field.readSquareValueByCoordinate(3, 2), 1);
        assert.equal(Field.readSquareValueByCoordinate(3, 4), 1);
        assert.equal(Field.readSquareValueByCoordinate(4, 3), 1);
        assert.equal(Field.readSquareValueByCoordinate(4, 4), 1);
      });
      it('шестой вызов метода пересчета поля и проверка состояния ячеек на седьмом поколении', function () {
        ChangeField.manipulateFieldByAlgorithm(Field);

        assert.equal(Field.readSquareValueByCoordinate(3, 4), 1);
        assert.equal(Field.readSquareValueByCoordinate(4, 3), 1);
        assert.equal(Field.readSquareValueByCoordinate(4, 4), 1);
      });
      it('седьмой вызов метода пересчета поля и проверка состояния ячеек на восьмом поколении', function () {
        ChangeField.manipulateFieldByAlgorithm(Field);

        assert.equal(Field.readSquareValueByCoordinate(3, 3), 1);
        assert.equal(Field.readSquareValueByCoordinate(3, 4), 1);
        assert.equal(Field.readSquareValueByCoordinate(4, 3), 1);
        assert.equal(Field.readSquareValueByCoordinate(4, 4), 1);
      });
      it('проверка полей ячеек на прошлом поколении для 8 поколения (соответствие рисунку 7)', function () {
        assert.equal(Field.field[3][4].getValueOnLastGeneration(), 1);
        assert.equal(Field.field[4][3].getValueOnLastGeneration(), 1);
        assert.equal(Field.field[4][4].getValueOnLastGeneration(), 1);

      });
      it('проверка полей ячеек на позапрошлом поколении для 8 поколения (соответствие рисунку 6 поколения)', function () {
        assert.equal(Field.field[3][2].getValueOnPenultimateGeneration(), 1);
        assert.equal(Field.field[3][4].getValueOnPenultimateGeneration(), 1);
        assert.equal(Field.field[4][3].getValueOnPenultimateGeneration(), 1);
        assert.equal(Field.field[4][4].getValueOnPenultimateGeneration(), 1);

      });

      it('проверка того, что на 8 поколении остальные ячейки мертвы', function () {
        ChangeField.manipulateFieldByAlgorithm(Field);

        Field.setSquareValueByCoordinate(3, 3, 0);
        Field.setSquareValueByCoordinate(3, 4, 0);
        Field.setSquareValueByCoordinate(4, 3, 0);
        Field.setSquareValueByCoordinate(4, 4, 0);

        for (let i = 0; i < Field.field.length; i+=1) {
          for (let j = 0; j < Field.field[0].length; j+=1) {
            assert.equal(Field.field[i][j].getValue(), 0);
          }
        }
      });
    });
    describe('проверка метода stopGame отвечающего за остановку игры по определенным условиям', function () {
      it('передача методу поля с отсутствющей жизнью вызывает остановку игры', function () {
        Field.clearField();
        ChangeField.stopGame(Field);
        assert.equal(Field.getGameOver(), 1);
      });
      it('передача методу поля с одинаковым рисунком на последних двух поколениях вызывает остановку игры', function () {
        Field.field[1][1].setValue(1);
        Field.field[1][2].setValue(1);
        Field.field[2][1].setValue(1);
        Field.field[2][2].setValue(1);

        Field.field[1][1].setValueOnLastGeneration(1);
        Field.field[1][2].setValueOnLastGeneration(1);
        Field.field[2][1].setValueOnLastGeneration(1);
        Field.field[2][2].setValueOnLastGeneration(1);

        ChangeField.stopGame(Field);
        assert.equal(Field.getGameOver(), 2);
      });

      it('передача методу поля с одинаковым рисунком на текущем и предпоследнем поколениях вызывает остановку игры', function () {
        Field.clearField();

        Field.field[1][1].setValue(1);
        Field.field[1][2].setValue(1);
        Field.field[2][1].setValue(1);
        Field.field[2][2].setValue(1);

        Field.field[1][1].setValueOnPenultimateGeneration(1);
        Field.field[1][2].setValueOnPenultimateGeneration(1);
        Field.field[2][1].setValueOnPenultimateGeneration(1);
        Field.field[2][2].setValueOnPenultimateGeneration(1);

        ChangeField.stopGame(Field);
        assert.equal(Field.getGameOver(), 3);
      });
    });
  });

  // проверка класса с отображением
  describe('Проверка класса View', function () {
    describe('проверка метода updateView отвечающего за отрисовку таблицы поля', function () {
      it('передача методу поля 5*5 с отсутствующей жизнью и проверка того, что создана таблица 5*5', function () {
        Field.setX(5);
        Field.setY(5);
        Field.clearField();
        EView.updateView(Field);

        assert.isNotNull(document.getElementsByClassName('universe'));
        assert.equal(document.getElementsByClassName('universe__line').length, 7);
        assert.equal(document.getElementsByClassName('universe__square').length, 49);
      });
      it('проверка того, что ячейкам присвоены соотвествующие классы и data-id = координаты', function () {
        let Cell, Coordinate;
        assert.equal(document.getElementsByClassName('universe__square universe__square_isDead').length, 49);
        for (let i = 0; i < 7; i+=1) {
          for (let j = 0; j < 7; j+=1) {
            Cell = document.getElementsByClassName('universe__square universe__square_isDead')[i * 7 + j];
            Coordinate = Cell.getAttribute('data-id').split(' ');
            assert.equal(i, Coordinate[0]);
            assert.equal(j, Coordinate[1]);
          }
        }
      });
      it('передача методу поля с определенным рисунком (квадрат в верхнем левом углу) и проверка присвоения соответствующих классов соответствующим ячейкам', function () {
        Field.field[1][1].setValue(1);
        Field.field[1][2].setValue(1);
        Field.field[2][1].setValue(1);
        Field.field[2][2].setValue(1);
        EView.updateView(Field);

        let Cell, Coordinate;
        Cell = document.getElementsByClassName('universe__square universe__square_isAlive');
        for (let i = 0; i < Cell.length / 2; i+=1) {
          for (let j = 0; j < Cell.length / 2; j+=1) {
            Coordinate = Cell[i * 2 + j].getAttribute('data-id').split(' ');
            assert.equal(Coordinate[0], i+1);
            assert.equal(Coordinate[1], j+1);
          }
        }
      });
      it('присвоение \'живым\' ячейкам класса \'мертвых\' и проверка всех ячеек на предмет наличия у них \'мертвого\' класса', function () {
        Field.field[1][1].setValue(0);
        Field.field[1][2].setValue(0);
        Field.field[2][1].setValue(0);
        Field.field[2][2].setValue(0);
        EView.updateView(Field);

        assert.equal(document.getElementsByClassName('universe__square universe__square_isDead').length, 49);
      });
    });
  });

  // проверка класса контроллера
  describe('Проверка класса Controller', function () {
    describe('проверка метода main, отвечающего за обработку событий, возникающих при взаимодействии с контролами', function () {
      let spy_updateview = sinon.spy(EView, 'updateView');
      let spy_changefield = sinon.spy(ChangeField, 'manipulateFieldByAlgorithm');
      let spy_onblurheightcrop = sinon.spy(Field, 'cropFieldOnX');
      let spy_onblurwidthcrop = sinon.spy(Field, 'cropFieldOnY');
      let spy_onblurwidthtenlarge = sinon.spy(Field, 'enlargeFieldOnY');
      let spy_onblurheightenlarge = sinon.spy(Field, 'enlargeFieldOnX');
      let spy_create = sinon.spy(Field, 'createRandomField');
      let spy_clear = sinon.spy(Field, 'clearField');
      let spy_changesquare = sinon.spy(Field, 'changeSquareValueByCoordinate');

      /*it('нажатие на кнопку СОЗДАТЬ метод создания рандомно заполненного поля', function () {
        $('create-universe').trigger('click');
        sinon.assert.called(spy_create);
      });
      it('нажатие на кнопку СОЗДАТЬ вызывает метод отрисовки поля', function () {
        $('create-universe').trigger('click');
        sinon.assert.called(spy_updateview);
      });
      it('нажатие на кнопку СТЕРЕТЬ вызывает метод стирания поля', function () {
        $('clear-universe').trigger('click');
        sinon.assert.called(spy_clear);
      });
      it('нажатие на кнопку СТЕРЕТЬ вызывает метод отрисовки поля', function () {
        $('clear-universe').trigger('click');
        sinon.assert.called(spy_updateview);
      });
      it('нажатие на кнопку СТАРТ вызывает метод пересчета поля', function () {
        $('start-game').trigger('click');
        sinon.assert.called(spy_changefield);
      });
      it('нажатие на кнопку СТАРТ вызывает метод отрисовки поля', function () {
        $('start-game').trigger('click');
        sinon.assert.called(spy_updateview);
      });
      it('нажатие на кнопку СТОП прекращает вызов метода пересчета поля', function () {
        $('stop-game').trigger('click');
        sinon.assert.called(spy_changefield);
      });
      it('нажатие на кнопку 1 ШАГ вызывает метод пересчета поля', function () {
        $('step').trigger('click');
        sinon.assert.called(spy_changefield);
      });
      it('нажатие на кнопку 1 ШАГ вызывает метод отрисовки поля', function () {
        $('step').trigger('click');
        sinon.assert.called(spy_updateview);
      });*/
      it('нажатие на ячейку поля вызывает метод изменения ее состояния', function () {
        EController.main(Field, ChangeField, EView);
        $('div').trigger('click');
        sinon.assert.called(spy_changesquare);
      });
      it('нажатие на ячейку поля вызывает метод отрисовки поля', function () {
        $('div').trigger('click');
        sinon.assert.called(spy_updateview);
      });
      it('анфокус поля высоты в случае уменьшения высоты вызывает метод cropFieldOnX', function () {
        document.getElementsByClassName('field-height')[0].value = 30;
        $('field-height').trigger('change');
        sinon.assert.called(spy_onblurheightcrop);
      });
      it('анфокус поля высоты в случае увеличения высоты вызывает метод enlargeFieldOnX', function () {
        document.getElementsByClassName('field-height')[0].value = 47;
        $('field-height').trigger('change');
        sinon.assert.called(spy_onblurheightenlarge);
      });
      it('анфокус поля высоты вызывает метод отрисовки поля', function () {
        $('field-height').trigger('change');
        sinon.assert.called(spy_updateview);
      });
      it('анфокус поля ширины в случае уменьшения высоты вызывает метод cropFieldOnY', function () {
        document.getElementsByClassName('field-width')[0].value = 50;
        $('field-width').trigger('change');
        sinon.assert.called(spy_onblurwidthcrop);
      });
      it('анфокус поля ширины в случае увеличения высоты вызывает метод enlargeFieldOnY', function () {
        document.getElementsByClassName('field-width')[0].value = 100;
        $('field-width').trigger('change');
        sinon.assert.called(spy_onblurwidthtenlarge);
      });
      it('анфокус поля ширины вызывает метод отрисовки поля', function () {
        $('field-width').trigger('change');
        sinon.assert.called(spy_updateview);
      });
    });
  });
});
