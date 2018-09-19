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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_styl__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_styl__);


__webpack_require__(1);
__webpack_require__(8);


/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ModelField__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ModelChangeField__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__View__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Controller__ = __webpack_require__(5);





const eField = new __WEBPACK_IMPORTED_MODULE_0__ModelField__["a" /* ModelField */]();
const eModelChangeField = new __WEBPACK_IMPORTED_MODULE_1__ModelChangeField__["a" /* ModelChangeField */]();
const eView = new __WEBPACK_IMPORTED_MODULE_2__View__["a" /* View */]();
const eController = new __WEBPACK_IMPORTED_MODULE_3__Controller__["a" /* Controller */]();

eController.main(eField, eModelChangeField, eView);


/***/ })
/******/ ]);