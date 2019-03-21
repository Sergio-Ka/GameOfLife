/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */

import Cell from '../application/model/model-cell';
import Field from '../application/model/model-field';
import FieldChanger from '../application/model/model-field-changer';
import View from '../application/view';
import Controller from '../application/controller';

const cellFromClass = new Cell();
const field = new Field();
const fieldChanger = new FieldChanger();
const view = new View();
const controller = new Controller();

describe('Тест JS кода игры Жизнь Конвея', () => {
  // проверяем класс ячейки
  describe('Проверка класса Cell', () => {
    describe('проверка инициализации полей состояния ячейки', () => {
      it('состояние в текущем поколении = 0', () => {
        assert.equal(cellFromClass.getLifeStatus(), 0);
      });
      it('состояние в прошлом поколении = 0', () => {
        assert.equal(cellFromClass.getLifeStatusOnLastGeneration(), 0);
      });
      it('состояние в позапрошлом поколении = 0', () => {
        assert.equal(cellFromClass.getLifeStatusOnPenultimateGeneration(), 0);
      });
    });

    describe('проверка метода изменения состояния ячейки в текущем поколении', () => {
      it('при вызове метода меняет состояние ячейки в текущем поколении на противоположное (с 0 на 1)', () => {
        cellFromClass.toggleLifeStatus();
        assert.equal(cellFromClass.getLifeStatus(), 1);
      });
      it('при вызове метода меняет состояние ячейки в текущем поколении на противоположное (с 1 на 0)', () => {
        cellFromClass.toggleLifeStatus();
        assert.equal(cellFromClass.getLifeStatus(), 0);
      });
    });

    describe('проверка методов записи в ячейку и чтения из нее', () => {
      it('запись в текущем поколении 1 и чтение', () => {
        cellFromClass.setLifeStatus(1);
        assert.equal(cellFromClass.getLifeStatus(), 1);
      });
      it('запись в предыдущем поколении 1 и чтение', () => {
        cellFromClass.setLifeStatusOnLastGeneration(1);
        assert.equal(cellFromClass.getLifeStatusOnLastGeneration(), 1);
      });
      it('запись в позапрошлом поколении 1 и чтение', () => {
        cellFromClass.setLifeStatusOnPenultimateGeneration(1);
        assert.equal(cellFromClass.getLifeStatusOnPenultimateGeneration(), 1);
      });
    });
  });

  // проверяем класс поля
  describe('Проверка класса Field', () => {
    describe('проверка инициализации полей размера поля при создании', () => {
      it('начальный размер поля X = 3', () => {
        assert.equal(field.getXSizeOfField(), 3);
      });
      it('начальный размер поля Y = 3', () => {
        assert.equal(field.getYSizeOfField(), 3);
      });
      it('при установке размера X = 3 полю размер равен 3', () => {
        field.setXSizeOfField(3);
        assert.equal(field.getXSizeOfField(), 3);
      });
      it('при установке размера Y = 3 полю размер равен 3', () => {
        field.setYSizeOfField(3);
        assert.equal(field.getYSizeOfField(), 3);
      });
    });

    describe('проверка методов чтения и записи значения текущего поколения поля', () => {
      it('начальный значение поколения при инициализации = 1', () => {
        assert.equal(field.getNumberOfGeneration(), 1);
      });
      it('установка значения поколения методом записи = 10 и проверка значения методом чтения', () => {
        field.setNumberOfGeneration(10);
        assert.equal(field.getNumberOfGeneration(), 10);
      });
    });

    describe('проверка методов чтения и записи значения поля класса содержащего данные окончания игры', () => {
      it('начальное значение поля = false', () => {
        assert.isNotTrue(field.getGameOver());
      });
      it('установка значения флага = true и проверка значения методом чтения', () => {
        field.setGameOver(true);
        assert.isTrue(field.getGameOver());
        field.setGameOver(false);
      });
    });

    describe('проверка методов чтения и записи значения поля класса содержащего данные о причине окончания игры', () => {
      it('начальное значение поля = 0', () => {
        assert.equal(field.getGameStatus(), 0);
      });
      it('установка значения флага = 3 и проверка значения методом чтения', () => {
        field.setGameStatus(3);
        assert.equal(field.getGameStatus(), 3);
        field.setGameStatus(0);
      });
      it('попытка ввода значения флага отличного от допустимых (0, 1, 2, 3) приводит к значению флага 0', () => {
        field.setGameStatus(10);
        assert.equal(field.getGameStatus(), 0);
      });
    });

    describe('проверка методов чтения и записи значения поля класса содержащего данные о сумме живых ячеек', () => {
      it('начальное значение поля = 0', () => {
        assert.equal(field.getSumOfAllCells(), 0);
      });
      it('установка значения поля = 1111 и проверка значения методом чтения', () => {
        field.setSumOfAllCells(1111);
        assert.equal(field.getSumOfAllCells(), 1111);
        field.setSumOfAllCells(0);
      });
    });

    describe('проверка метода создания рандомно заполненного поля', () => {
      it('при создании экземпляра класса поля (массив объектов класса ячейка) не существует', () => {
        assert.isUndefined(field.field);
      });
      it('при вызове метода создается поле размером 5*5 ячеек', () => {
        field.setYSizeOfField(5);
        field.setXSizeOfField(5);
        field.createRandomField();
        assert.lengthOf(field.field, 5);
        for (let i = 0; i < field.field.length; i += 1) {
          assert.lengthOf(field.field[i], 5);
        }
      });
      it('каждая ячейка поля является объектом', () => {
        for (let i = 0; i < field.field.length; i += 1) {
          for (let j = 0; j < field.field[0].length; j += 1) {
            assert.isObject(field.field[i][j]);
          }
        }
      });
      it('значение каждой ячейки поля принадлежит множеству {0,1}', () => {
        for (let i = 0; i < field.field.length; i += 1) {
          for (let j = 0; j < field.field[0].length; j += 1) {
            assert(field.field[i][j].getLifeStatus() === 0
              || field.field[i][j].getLifeStatus() === 1);
          }
        }
      });
    });

    describe('проверка метода очистки поля', () => {
      it('значение каждой ячейки поля после вызова метода на всех поколениях = 0', () => {
        field.clearField();
        for (let i = 0; i < field.field.length; i += 1) {
          for (let j = 0; j < field.field[0].length; j += 1) {
            assert.equal(field.field[i][j].getLifeStatus(), 0);
            assert.equal(field.field[i][j].getLifeStatusOnLastGeneration(), 0);
            assert.equal(field.field[i][j].getLifeStatusOnPenultimateGeneration(), 0);
          }
        }
      });
    });

    describe('проверка методов обрезки поля по высоте и ширине', () => {
      it('при установке размера полю Y = 4 размер поля становится 4', () => {
        field.cropFieldOnYaxis(4);
        assert.lengthOf(field.field, 4);
      });
      it('при установке размера полю X = 4 размер поля становится 4', () => {
        field.cropFieldOnXaxis(4);
        for (let i = 0; i < field.field.length; i += 1) {
          assert.lengthOf(field.field[i], 4);
        }
      });
      it('оставшиеся ячейки поля является по прежнему объектом', () => {
        for (let i = 0; i < field.field.length; i += 1) {
          for (let j = 0; j < field.field[0].length; j += 1) {
            assert.isObject(field.field[i][j]);
          }
        }
      });
      it('значение оставшихся ячеек поля по прежнему принадлежит множеству {0,1}', () => {
        for (let i = 0; i < field.field.length; i += 1) {
          for (let j = 0; j < field.field[0].length; j += 1) {
            assert(field.field[i][j].getLifeStatus() === 0
              || field.field[i][j].getLifeStatus() === 1);
          }
        }
      });
    });

    describe('проверка методов увеличения поля по высоте и ширине', () => {
      it('при установке размера полю Y = 8 размер поля становится 8', () => {
        field.enlargeFieldOnYaxis(8);
        assert.lengthOf(field.field, 8);
      });
      it('при установке размера полю X = 8 размер поля становится 8', () => {
        field.enlargeFieldOnXaxis(8);
        for (let i = 0; i < field.field.length; i += 1) {
          assert.lengthOf(field.field[i], 8);
        }
      });
      it('ячейки поля являются по прежнему объектом', () => {
        for (let i = 0; i < field.field.length; i += 1) {
          for (let j = 0; j < field.field[0].length; j += 1) {
            assert.isObject(field.field[i][j]);
          }
        }
      });
      it('значение ячеек поля по прежнему принадлежит множеству {0,1}', () => {
        for (let i = 0; i < field.field.length; i += 1) {
          for (let j = 0; j < field.field[0].length; j += 1) {
            assert(field.field[i][j].getLifeStatus() === 0
              || field.field[i][j].getLifeStatus() === 1);
          }
        }
      });
      it('значение вновь добавленных ячеек поля = 0', () => {
        for (let i = 5; i < field.field.length; i += 1) {
          for (let j = 5; j < field.field[0].length; j += 1) {
            assert(field.field[i][j].getLifeStatus() === 0);
          }
        }
      });
    });

    describe('проверка методов чтения и записи значений ячейки в текущем, прошлом и позапрошлом поколении', () => {
      it('установка значения всех ячеек поля в состояние 1 на всех поколениях и проверка методов чтения по значениям', () => {
        field.clearField();
        for (let i = 0; i < field.field.length; i += 1) {
          for (let j = 0; j < field.field[i].length; j += 1) {
            field.setCellLifeStatus(i, j, 1);
            field.setCellLifeStatusOnLastGeneration(i, j, 1);
            field.setCellLifeStatusOnPenultimateGeneration(i, j, 1);
            assert(field.readCellLifeStatus(i, j) === 1);
            assert(field.readCellLifeStatusOnLastGeneration(i, j) === 1);
            assert(field.readCellLifeStatusOnPenultimateGeneration(i, j) === 1);
          }
        }
      });
      it('установка значения всех ячеек поля в состояние 0 c помощью методов записи на всех поколениях и проверка значений', () => {
        for (let i = 0; i < field.field.length; i += 1) {
          for (let j = 0; j < field.field[i].length; j += 1) {
            field.setCellLifeStatus(i, j, 0);
            field.setCellLifeStatusOnLastGeneration(i, j, 0);
            field.setCellLifeStatusOnPenultimateGeneration(i, j, 0);
            assert(field.readCellLifeStatus(i, j) === 0);
            assert(field.readCellLifeStatusOnLastGeneration(i, j) === 0);
            assert(field.readCellLifeStatusOnPenultimateGeneration(i, j) === 0);
          }
        }
      });
      it('проверка метода смены значения ячейки на противоположное на текущем поколении по передаваемым координатам в рабочей области поля (за исключением крайних ячеек)', () => {
        field.clearField();
        for (let i = 1; i < field.field.length - 1; i += 1) {
          for (let j = 1; j < field.field[i].length - 1; j += 1) {
            field.toggleCellLifeStatus(i, j);
            assert.equal(field.readCellLifeStatus(i, j), 1);
          }
        }
      });
    });

    describe('проверка метода подсчета живых ячеек поля', () => {
      it('установка определенного рисунка поля с количеством живых ячеек = 5 и проверка значения поля', () => {
        field.setXSizeOfField(4);
        field.setYSizeOfField(4);
        field.clearField();

        field.field[1][2].setLifeStatus(1);
        field.field[2][3].setLifeStatus(1);
        field.field[3][1].setLifeStatus(1);
        field.field[3][2].setLifeStatus(1);
        field.field[3][3].setLifeStatus(1);

        field._sumAllCells();
        assert.equal(field.getSumOfAllCells(), 5);
      });
    });
  });

  // проверка класса с логикой игры
  describe('Проверка класса fieldChanger', () => {
    describe('проверка метода calculateField отвечающего за изменение состояния поля в соответствии с алгоритмом', () => {
      it('создание поля 4*4, передача определенного рисунка (планер) поля методу и проверка состояния ячеек на втором поколении', () => {
        field.setXSizeOfField(4);
        field.setYSizeOfField(4);
        field.clearField();

        field.field[0][1].setLifeStatus(1);
        field.field[1][2].setLifeStatus(1);
        field.field[2][0].setLifeStatus(1);
        field.field[2][1].setLifeStatus(1);
        field.field[2][2].setLifeStatus(1);

        fieldChanger.calculateField(field);

        assert.equal(field.readCellLifeStatus(1, 0), 1);
        assert.equal(field.readCellLifeStatus(1, 2), 1);
        assert.equal(field.readCellLifeStatus(2, 1), 1);
        assert.equal(field.readCellLifeStatus(2, 2), 1);
        assert.equal(field.readCellLifeStatus(3, 1), 1);
      });
      it('второй вызов метода пересчета поля и проверка состояния ячеек на третьем поколении', () => {
        fieldChanger.calculateField(field);

        assert.equal(field.readCellLifeStatus(2, 3), 1);
        assert.equal(field.readCellLifeStatus(3, 1), 1);
        assert.equal(field.readCellLifeStatus(3, 3), 1);
        assert.equal(field.readCellLifeStatus(4, 2), 1);
        assert.equal(field.readCellLifeStatus(4, 3), 1);
      });
      it('третий вызов метода пересчета поля и проверка состояния ячеек на четвертом поколении', () => {
        fieldChanger.calculateField(field);

        assert.equal(field.readCellLifeStatus(2, 2), 1);
        assert.equal(field.readCellLifeStatus(3, 3), 1);
        assert.equal(field.readCellLifeStatus(3, 4), 1);
        assert.equal(field.readCellLifeStatus(4, 2), 1);
        assert.equal(field.readCellLifeStatus(4, 3), 1);
      });
      it('четвертый вызов метода пересчета поля и проверка состояния ячеек на пятом поколении', () => {
        fieldChanger.calculateField(field);

        assert.equal(field.readCellLifeStatus(2, 3), 1);
        assert.equal(field.readCellLifeStatus(3, 4), 1);
        assert.equal(field.readCellLifeStatus(4, 2), 1);
        assert.equal(field.readCellLifeStatus(4, 3), 1);
        assert.equal(field.readCellLifeStatus(4, 4), 1);
      });
      it('пятый вызов метода пересчета поля и проверка состояния ячеек на шестом поколении', () => {
        fieldChanger.calculateField(field);

        assert.equal(field.readCellLifeStatus(3, 2), 1);
        assert.equal(field.readCellLifeStatus(3, 4), 1);
        assert.equal(field.readCellLifeStatus(4, 3), 1);
        assert.equal(field.readCellLifeStatus(4, 4), 1);
      });
      it('шестой вызов метода пересчета поля и проверка состояния ячеек на седьмом поколении', () => {
        fieldChanger.calculateField(field);

        assert.equal(field.readCellLifeStatus(3, 4), 1);
        assert.equal(field.readCellLifeStatus(4, 3), 1);
        assert.equal(field.readCellLifeStatus(4, 4), 1);
      });
      it('седьмой вызов метода пересчета поля и проверка состояния ячеек на восьмом поколении', () => {
        fieldChanger.calculateField(field);

        assert.equal(field.readCellLifeStatus(3, 3), 1);
        assert.equal(field.readCellLifeStatus(3, 4), 1);
        assert.equal(field.readCellLifeStatus(4, 3), 1);
        assert.equal(field.readCellLifeStatus(4, 4), 1);
      });
      it('проверка полей ячеек на прошлом поколении для 8 поколения (соответствие рисунку 7)', () => {
        assert.equal(field.field[3][4].getLifeStatusOnLastGeneration(), 1);
        assert.equal(field.field[4][3].getLifeStatusOnLastGeneration(), 1);
        assert.equal(field.field[4][4].getLifeStatusOnLastGeneration(), 1);
      });
      it('проверка полей ячеек на позапрошлом поколении для 8 поколения (соответствие рисунку 6 поколения)', () => {
        assert.equal(field.field[3][2].getLifeStatusOnPenultimateGeneration(), 1);
        assert.equal(field.field[3][4].getLifeStatusOnPenultimateGeneration(), 1);
        assert.equal(field.field[4][3].getLifeStatusOnPenultimateGeneration(), 1);
        assert.equal(field.field[4][4].getLifeStatusOnPenultimateGeneration(), 1);
      });
      it('проверка того, что на 8 поколении остальные ячейки мертвы', () => {
        fieldChanger.calculateField(field);

        field.setCellLifeStatus(3, 3, 0);
        field.setCellLifeStatus(3, 4, 0);
        field.setCellLifeStatus(4, 3, 0);
        field.setCellLifeStatus(4, 4, 0);

        for (let i = 0; i < field.field.length; i += 1) {
          for (let j = 0; j < field.field[0].length; j += 1) {
            assert.equal(field.field[i][j].getLifeStatus(), 0);
          }
        }
      });
    });

    describe('проверка метода _stopGame отвечающего за остановку игры по определенным условиям', () => {
      it('передача методу поля с отсутствющей жизнью вызывает остановку игры', () => {
        field.clearField();
        fieldChanger._stopGame(field);
        assert.isTrue(field.getGameOver());
      });
      it('передача методу поля с одинаковым рисунком на последних двух поколениях вызывает остановку игры', () => {
        field.clearField();

        field.field[1][1].setLifeStatus(1);
        field.field[1][2].setLifeStatus(1);
        field.field[2][1].setLifeStatus(1);
        field.field[2][2].setLifeStatus(1);

        field.field[1][1].setLifeStatusOnLastGeneration(1);
        field.field[1][2].setLifeStatusOnLastGeneration(1);
        field.field[2][1].setLifeStatusOnLastGeneration(1);
        field.field[2][2].setLifeStatusOnLastGeneration(1);

        fieldChanger._stopGame(field);
        assert.isTrue(field.getGameOver());
      });

      it('передача методу поля с одинаковым рисунком на текущем и предпоследнем поколениях вызывает остановку игры', () => {
        field.clearField();

        field.field[1][1].setLifeStatus(1);
        field.field[1][2].setLifeStatus(1);
        field.field[2][1].setLifeStatus(1);
        field.field[2][2].setLifeStatus(1);

        field.field[1][1].setLifeStatusOnPenultimateGeneration(1);
        field.field[1][2].setLifeStatusOnPenultimateGeneration(1);
        field.field[2][1].setLifeStatusOnPenultimateGeneration(1);
        field.field[2][2].setLifeStatusOnPenultimateGeneration(1);

        fieldChanger._stopGame(field);
        assert.isTrue(field.getGameOver());
      });
    });
  });

  // проверка класса с отображением
  describe('Проверка класса View', () => {
    describe('проверка метода _createView отвечающего за отрисовку таблицы поля', () => {
      it('передача методу поля 5*5 с отсутствующей жизнью и проверка того, что создана таблица 5*5', () => {
        field.setXSizeOfField(5);
        field.setYSizeOfField(5);
        field.createRandomField();
        field.clearField();
        view._createView(field.field, 0, 1);

        assert.isNotNull(document.getElementsByClassName('js-field'));
        assert.equal(document.getElementsByClassName('js-field__line').length, 5);
        assert.equal(document.getElementsByClassName('js-field__cell').length, 25);
      });
      it('проверка того, что ячейкам присвоены соотвествующие классы и id = координаты', () => {
        assert.equal(document.getElementsByClassName('js-field__cell_dead').length, 25);
        let cellSquare;
        let coordinate;
        for (let i = 0; i < 5; i += 1) {
          for (let j = 0; j < 5; j += 1) {
            cellSquare = document.getElementsByClassName('js-field__cell_dead')[i * 5 + j];
            coordinate = cellSquare.getAttribute('data-id').split(' ');
            assert.equal(i, coordinate[0]);
            assert.equal(j, coordinate[1]);
          }
        }
      });
      it('передача методу поля с определенным рисунком (квадрат в верхнем левом углу) и проверка присвоения соответствующих классов соответствующим ячейкам', () => {
        field.clearField();
        field.field[1][1].setLifeStatus(1);
        field.field[1][2].setLifeStatus(1);
        field.field[2][1].setLifeStatus(1);
        field.field[2][2].setLifeStatus(1);
        view._createView(field.field, 0, 1);

        let coordinate;
        const cellSquare = document.getElementsByClassName('js-field__cell_alive');
        for (let i = 0; i < cellSquare.length / 2; i += 1) {
          for (let j = 0; j < cellSquare.length / 2; j += 1) {
            coordinate = cellSquare[i * 2 + j].getAttribute('data-id').split(' ');
            assert.equal(coordinate[0], i + 1);
            assert.equal(coordinate[1], j + 1);
          }
        }
      });
      it('присвоение \'живым\' ячейкам класса \'мертвых\' и проверка всех ячеек на предмет наличия у них \'мертвого\' класса', () => {
        field.field[1][1].setLifeStatus(0);
        field.field[1][2].setLifeStatus(0);
        field.field[2][1].setLifeStatus(0);
        field.field[2][2].setLifeStatus(0);
        view._createView(field.field, 0, 1);

        assert.equal(document.getElementsByClassName('js-field__cell_dead').length, 25);
      });
    });
    describe('проверка части view, отвечающей за обработку событий, возникающих при взаимодействии с контролами', () => {
      const spyCreateView = sinon.spy(view, '_createView');
      const spyFieldChanger = sinon.spy(fieldChanger, 'calculateField');
      const spyOnBlurHeightCrop = sinon.spy(field, 'cropFieldOnXaxis');
      const spyOnBlurWidthCrop = sinon.spy(field, 'cropFieldOnYaxis');
      const spyOnBlurWidthtEnlarge = sinon.spy(field, 'enlargeFieldOnYaxis');
      const spyOnBlurHeightEnlarge = sinon.spy(field, 'enlargeFieldOnXaxis');
      const spyCreate = sinon.spy(field, 'createRandomField');
      const spyClear = sinon.spy(field, 'clearField');
      const spytoggleCellLifeStatus = sinon.spy(field, 'toggleCellLifeStatus');

      it('нажатие на кнопку СОЗДАТЬ метод создания рандомно заполненного поля', () => {
        $('.js-create-universe').trigger('click');
        sinon.assert.called(spyCreate);
      });
      it('нажатие на кнопку СОЗДАТЬ вызывает метод отрисовки поля', () => {
        $('.js-create-universe').trigger('click');
        sinon.assert.called(spyCreateView);
      });
      it('нажатие на кнопку СТЕРЕТЬ вызывает метод стирания поля', () => {
        $('.js-clear-universe').trigger('click');
        sinon.assert.called(spyClear);
      });
      it('нажатие на кнопку СТЕРЕТЬ вызывает метод отрисовки поля', () => {
        $('.js-clear-universe').trigger('click');
        sinon.assert.called(spyCreateView);
      });
      it('нажатие на кнопку СТАРТ вызывает метод пересчета поля', () => {
        $('.js-start-game').trigger('click');
        sinon.assert.called(spyFieldChanger);
      });
      it('нажатие на кнопку СТАРТ вызывает метод отрисовки поля', () => {
        $('.js-start-game').trigger('click');
        sinon.assert.called(spyCreateView);
      });
      it('нажатие на кнопку СТОП прекращает вызов метода пересчета поля', () => {
        $('.js-stop-game').trigger('click');
        sinon.assert.called(spyFieldChanger);
      });
      it('нажатие на кнопку 1 ШАГ вызывает метод пересчета поля', () => {
        $('.js-step').trigger('click');
        sinon.assert.called(spyFieldChanger);
      });
      it('нажатие на кнопку 1 ШАГ вызывает метод отрисовки поля', () => {
        $('.js-step').trigger('click');
        sinon.assert.called(spyCreateView);
      });
      it('нажатие на ячейку поля вызывает метод изменения ее состояния', () => {
        $('.js-field__cell').trigger('click');
        sinon.assert.called(spytoggleCellLifeStatus);
      });
      it('нажатие на ячейку поля вызывает метод отрисовки поля', () => {
        $('.js-field__cell').trigger('click');
        sinon.assert.called(spyCreateView);
      });
      it('анфокус поля высоты в случае уменьшения высоты вызывает метод cropFieldOnX', () => {
        document.getElementsByClassName('js-field-height')[0].value = 30;
        $('.js-field-height').trigger('change');
        sinon.assert.called(spyOnBlurHeightCrop);
      });
      it('анфокус поля высоты в случае увеличения высоты вызывает метод enlargeFieldOnX', () => {
        document.getElementsByClassName('js-field-height')[0].value = 47;
        $('.js-field-height').trigger('change');
        sinon.assert.called(spyOnBlurHeightEnlarge);
      });
      it('анфокус поля высоты вызывает метод отрисовки поля', () => {
        $('.js-field-height').trigger('change');
        sinon.assert.called(spyCreateView);
      });
      it('анфокус поля ширины в случае уменьшения высоты вызывает метод cropFieldOnY', () => {
        document.getElementsByClassName('js-field-width')[0].value = 50;
        $('.js-field-width').trigger('change');
        sinon.assert.called(spyOnBlurWidthCrop);
      });
      it('анфокус поля ширины в случае увеличения высоты вызывает метод enlargeFieldOnY', () => {
        document.getElementsByClassName('js-field-width')[0].value = 100;
        $('.js-field-width').trigger('change');
        sinon.assert.called(spyOnBlurWidthtEnlarge);
      });
      it('анфокус поля ширины вызывает метод отрисовки поля', () => {
        $('.js-field-width').trigger('change');
        sinon.assert.called(spyCreateView);
      });
    });
  });

  // проверка класса контроллера
  describe('Проверка класса Controller', () => {
    describe('проверка метода processEventFromView отвечающего за обработку событий из View', () => {
      const spyPublish = sinon.spy(controller, 'publish');
      const spyStartTimer = sinon.spy(controller, '_startTimer');
      const spyRestartTimer = sinon.spy(controller, '_restartTimer');
      const spyResetTimer = sinon.spy(controller, '_resetTimer');

      it('передача методу сообщения createUniverse вызывает метод publish наследуемый от класса Observer', () => {
        controller.processEventFromView('createUniverse', 5, 5);
        sinon.assert.called(spyPublish);
      });
      it('передача методу сообщения clearUniverse вызывает метод publish наследуемый от класса Observer', () => {
        controller.processEventFromView('clearUniverse');
        sinon.assert.called(spyPublish);
      });
      it('передача методу сообщения makeStep вызывает метод publish наследуемый от класса Observer', () => {
        controller.processEventFromView('makeStep');
        sinon.assert.called(spyPublish);
      });
      it('передача методу сообщения cellClick вызывает метод publish наследуемый от класса Observer', () => {
        controller.processEventFromView('cellClick');
        sinon.assert.called(spyPublish);
      });
      it('передача методу сообщения changeHightInput вызывает метод publish наследуемый от класса Observer', () => {
        controller.processEventFromView('resizeField');
        sinon.assert.called(spyPublish);
      });
      it('передача методу сообщения changeWidthInput вызывает метод publish наследуемый от класса Observer', () => {
        controller.processEventFromView('resizeField');
        sinon.assert.called(spyPublish);
      });
      it('передача методу сообщения startGame вызывает метод _startTimer', () => {
        controller.processEventFromView('startGame');
        sinon.assert.called(spyStartTimer);
      });
      it('передача методу сообщения restartGame вызывает метод _restartTimer', () => {
        controller.processEventFromView('restartGame');
        sinon.assert.called(spyRestartTimer);
      });
      it('передача методу сообщения stopGame вызывает метод _resetTimer', () => {
        controller.processEventFromView('stopGame');
        sinon.assert.called(spyResetTimer);
      });
    });
  });
});
