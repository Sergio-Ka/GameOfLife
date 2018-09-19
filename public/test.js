/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModelSquare; });
class ModelSquare {
  constructor() {
    this.value = 0;
    this.valueOnLG = 0;
    this.valueOnPG = 0;
  }

  getValue() {
    return this.value;
  }

  setValue(val) {
    this.value = val;
  }

  getValueOnLastGeneration() {
    return this.valueOnLG;
  }

  setValueOnLastGeneration(val) {
    this.valueOnLG = val;
  }

  getValueOnPenultimateGeneration() {
    return this.valueOnPG;
  }

  setValueOnPenultimateGeneration(val) {
    this.valueOnPG = val;
  }

  changeValue() {
    if (this.value === 0) {
      this.value = 1;
    } else {
      this.value = 0;
    }
  }
}




/***/ }),
/* 1 */
/***/ (function(module, exports) {

const $slider1 = $('.js-slider-1');
$slider1.slider({
  min: 1,
  max: 10,
  value: 8,
  create: (function create() {
    const $sliderHandle = $('.ui-slider-handle');
    $sliderHandle.append('<input class="slider-value js-slider-value" value="8" disabled/><div class="slider-value__tail"></div>');
  }),
  slide: (function slide(event, ui) {
    const $sliderValue = $('.js-slider-value');
    $sliderValue.val(ui.value);
  }),
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModelField; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ModelSquare__ = __webpack_require__(0);


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
        this.field[i][j] = new __WEBPACK_IMPORTED_MODULE_0__ModelSquare__["a" /* ModelSquare */]();
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
        this.field[i][j] = new __WEBPACK_IMPORTED_MODULE_0__ModelSquare__["a" /* ModelSquare */]();
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
          this.field[i][j] = new __WEBPACK_IMPORTED_MODULE_0__ModelSquare__["a" /* ModelSquare */]();
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
          this.field[i][j] = new __WEBPACK_IMPORTED_MODULE_0__ModelSquare__["a" /* ModelSquare */]();
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




/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModelChangeField; });
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




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return View; });
class View {
  constructor() {
    this.document = window.document;
  }

  updateView(field) {
    const content = this.document.getElementsByClassName('page__content')[0];
    const generation = this.document.getElementsByClassName('generation')[0];
    let tr;
    let td;
    let [table] = this.document.getElementsByClassName('universe');

    if (table) {
      content.removeChild(table);
    }

    table = content.appendChild(this.document.createElement('div'));
    table.setAttribute('class', 'universe');

    const fragment = this.document.createDocumentFragment();

    /* заполняем ячейку строками и ячейками в них
       data-id ячеек - координаты х,у будут нужны для обработчика клика по ячейке
       для изменения ее состояния цвет ячейки в соответствии с модификатором
       класса, назанчаемым на CSS */
    for (let i = 0; i < field.getX(); i += 1) {
      tr = fragment.appendChild(this.document.createElement('div'));
      tr.setAttribute('class', 'universe__line');
      for (let j = 0; j < field.getY(); j += 1) {
        td = tr.appendChild(this.document.createElement('div'));
        td.setAttribute('data-id', `${i} ${j}`);
        if (field.readSquareValueByCoordinate(i, j) === 0) {
          td.setAttribute('class', 'universe__square universe__square_isDead');
        } else if (field.readSquareValueByCoordinate(i, j) === 1) {
          td.setAttribute('class', 'universe__square universe__square_isAlive');
        }
      }
    }

    table.appendChild(fragment);

    generation.setAttribute('value', field.getNumberOfGeneration());

    switch (field.getGameOver()) {
      case 1: alert('Игра закончена, так как во вселенной не осталось жизни!');
        break;
      case 2: alert('Игра закончена, так как во вселенной сложились устойчивые комбинации на 2-х последних поколениях!');
        break;
      case 3: alert('Игра закончена, так как во вселенной сложились устойчивые комбинации на текущем и предпоследнем поколениях!');
        break;
      default:
        break;
    }
  }
}




/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Controller; });
class Controller {
  constructor() {
    this.document = window.document;
  }

  main(eField, eModelChangeField, eView) {
    const buttonCreateU = this.document.getElementsByClassName('create-universe')[0];
    const buttonClearU = this.document.getElementsByClassName('clear-universe')[0];
    const buttonStartGame = this.document.getElementsByClassName('start-game')[0];
    const buttonStopGame = this.document.getElementsByClassName('stop-game')[0];
    const buttonStep = this.document.getElementsByClassName('step')[0];
    const heightInput = this.document.getElementsByClassName('field-height')[0];
    const widthInput = this.document.getElementsByClassName('field-width')[0];
    const slider = this.document.getElementsByClassName('ui-slider-handle')[0];
    const documentBody = this.document.body;

    let timerId;
    let startFlag = false;
    let createFieldFlag = false;

    // функции
    const actionOnTimer = function actOnTimer() {
      eModelChangeField.stopGame(eField);
      eModelChangeField.manipulateFieldByAlgorithm(eField);
      eView.updateView(eField);
      if (eField.getGameOver() !== 0) {
        clearInterval(timerId);
        startFlag = false;
        eField.setGameOver(0);
      }
    };

    const timer = function someTimer() {
      const speed = Number(document.getElementsByClassName('js-slider-value')[0].value);
      clearInterval(timerId);
      timerId = setInterval(actionOnTimer, (10 - speed) * 100);
    };

    const setSizeOfField = function someSetSizeOfField() {
      if (document.getElementsByClassName('field-height')[0].value / 2 === 0) {
        document.getElementsByClassName('field-height')[0].value = 47;
      }
      if (Number(document.getElementsByClassName('field-height')[0].value) > 100) {
        eField.setX(100);
        document.getElementsByClassName('field-height')[0].value = 100;
      } else {
        eField.setX(Number(document.getElementsByClassName('field-height')[0].value));
      }
      if (document.getElementsByClassName('field-width')[0].value / 2 === 0) {
        document.getElementsByClassName('field-width')[0].value = 100;
      }
      if (Number(document.getElementsByClassName('field-width')[0].value) > 100) {
        eField.setY(100);
        document.getElementsByClassName('field-width')[0].value = 100;
      } else {
        eField.setY(Number(document.getElementsByClassName('field-width')[0].value));
      }
    };

    const create = function createUniverse() {
      setSizeOfField();
      eField.createRandomField();
      eView.updateView(eField);
      createFieldFlag = true;
    };

    const clear = function clearUniverse() {
      setSizeOfField();
      eField.clearField();
      eView.updateView(eField);
      createFieldFlag = true;
    };

    const start = function startGame() {
      timer();
      startFlag = true;
    };

    const stop = function stopGame() {
      clearInterval(timerId);
      startFlag = false;
    };

    const step = function oneStep() {
      eModelChangeField.manipulateFieldByAlgorithm(eField);
      eView.updateView(eField);
    };

    const cellClick = function clickOnCell(event) {
      if (event.target.nodeName === 'DIV') {
        if (event.target.getAttribute('data-id') !== null) {
          const coordinate = event.target.getAttribute('data-id').split(' ');
          eField.changeSquareValueByCoordinate(coordinate[0], coordinate[1]);
          eView.updateView(eField);
        }
      }
    };

    const changeHI = function changeHeightInput() {
      const x = Number(document.getElementsByClassName('field-height')[0].value);
      if (createFieldFlag) {
        if (x < eField.getX()) {
          eField.cropFieldOnX(x);
        } else if (x > eField.getX()) {
          eField.enlargeFieldOnX(x);
        }
        eView.updateView(eField);
      }
    };

    const changeWI = function changeWidthInput() {
      const y = Number(document.getElementsByClassName('field-width')[0].value);
      if (createFieldFlag) {
        if (y < eField.getY()) {
          eField.cropFieldOnY(y);
        } else if (y > eField.getY()) {
          eField.enlargeFieldOnY(y);
        }
        eView.updateView(eField);
      }
    };

    const changeSpeed = function changeSpeed() {
      if (startFlag) {
        timer();
      }
    };

    // Обработчики

    // создание поля при загрузке
    window.onload = create;

    // обработчик кнопки создать, присвоение размеров полю, вызов метода по созданию поля
    buttonCreateU.addEventListener('click', create);

    /* обработчик кнопки стереть, присвоение размеров полю, вызов метода
    по стиранию поля (по факту - заполнения ячейками в состоянии 0) */
    buttonClearU.addEventListener('click', clear);

    // обработчик кнопки старт, запускает таймер
    buttonStartGame.addEventListener('click', start);

    // обработчик кнопки стоп, обнуляет таймер
    buttonStopGame.addEventListener('click', stop);

    // обработчик кнопки для продвижения на 1 шаг
    buttonStep.addEventListener('click', step);

    // обработчик клика по ячейке
    documentBody.addEventListener('click', cellClick);

    // обработчик анфокуса поля ввода высоты
    heightInput.addEventListener('change', changeHI);

    // обработчик анфокуса поля ввода ширины
    widthInput.addEventListener('change', changeWI);

    // обработчики контрола скорости для динамического ее изменения
    slider.addEventListener('click', changeSpeed);
    slider.addEventListener('mousemove', changeSpeed);
  }
}




/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

$('body').append('<div class="control-container" style="display: none;"></div>');
$('.control-container').append('<input type="number" value="47" class="field-height" />');
$('.control-container').append('<input type="number" value="100" class="field-width" />');
$('.control-container').append('<div class="js-slider-1"></div>');
$('.control-container').append('<input type="text" value="1" class="generation" />');
$('.control-container').append('<button class="create-universe">СОЗДАТЬ</button>');
$('.control-container').append('<button class="clear-universe">СТЕРЕТЬ</button>');
$('.control-container').append('<button class="start-game">СТАРТ</button>');
$('.control-container').append('<button class="stop-game">СТОП</button>');
$('.control-container').append('<button class="step">1 ШАГ</button>');
$('body').append('<div class="page__content"></div>');
__webpack_require__(1);

__webpack_require__(10);

$('body').append('<div id="mocha"></div>');
$('body').append('<script> mocha.run();</script>');


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__application_ModelSquare__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__application_ModelField__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__application_ModelChangeField__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__application_View__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__application_Controller__ = __webpack_require__(5);






const Cell = new __WEBPACK_IMPORTED_MODULE_0__application_ModelSquare__["a" /* ModelSquare */]();
const Field = new __WEBPACK_IMPORTED_MODULE_1__application_ModelField__["a" /* ModelField */]();
const ChangeField = new __WEBPACK_IMPORTED_MODULE_2__application_ModelChangeField__["a" /* ModelChangeField */]();
const EView = new __WEBPACK_IMPORTED_MODULE_3__application_View__["a" /* View */]();
const EController = new __WEBPACK_IMPORTED_MODULE_4__application_Controller__["a" /* Controller */]();

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

      it('нажатие на кнопку СОЗДАТЬ метод создания рандомно заполненного поля', function () {
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
      });
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


/***/ })
/******/ ]);