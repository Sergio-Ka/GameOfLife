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
/* harmony export (immutable) */ __webpack_exports__["a"] = ModelSquare;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var $slider1 = $('.js-slider-1');
$slider1.slider({
    min: 1,
    max: 10,
    value: 8,
    create: function (event, ui) {
        var $sliderhandle = $('.ui-slider-handle');
        $sliderhandle.append('<input class="slider-value js-slider-value" value="8"/><div class="slider-value__tail"></div>');
    },
    slide: function (event, ui) {
        var $slidervalue = $(".js-slider-value");
        $slidervalue.val(ui.value);
    }
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ModelSquare__ = __webpack_require__(0);




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
                this.field[i][j] = new __WEBPACK_IMPORTED_MODULE_0__ModelSquare__["a" /* default */]();
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
                this.field[i][j] = new __WEBPACK_IMPORTED_MODULE_0__ModelSquare__["a" /* default */]();
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
                    this.field[i][j] = new __WEBPACK_IMPORTED_MODULE_0__ModelSquare__["a" /* default */]();
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
                    this.field[i][j] = new __WEBPACK_IMPORTED_MODULE_0__ModelSquare__["a" /* default */]();
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
/* harmony export (immutable) */ __webpack_exports__["a"] = ModelField;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


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
/* harmony export (immutable) */ __webpack_exports__["a"] = ModelChangeField;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class View {
    UpdateView(Field) {
        
        // объявление переменных, получение доступа к элементу, в котором создается таблица вселенной

        var Table, Tr, Td;
        var Content = document.getElementsByClassName("page__content")[0];
        var Generation = document.getElementsByClassName("generation")[0];

        // проверка наличия уже созданной ранее таблицы вселенной, если есть то удаляем ее

        Table = document.getElementsByClassName("universe")[0];
        if (Table != null) {
            Content.removeChild(Table);
        }

        // создаем новую таблицу вселенной с id=universe

        Table = Content.appendChild(document.createElement("div"));
        Table.setAttribute("class", "universe");

        // заполняем ячейку строками и ячейками в них
        // id ячеек - координаты х,у будут нужны для обработчика клика по ячейке для изменения ее состояния
        // цвет ячейки в соответствии с модификатором класса, назанчаемым на CSS

        for (var i = 0; i < Field.X; i++) {
            Tr = Table.appendChild(document.createElement("div"));
            Tr.setAttribute("class", "universe__line");
            for (var j = 0; j < Field.Y; j++) {
                Td = Tr.appendChild(document.createElement("div"));
                Td.setAttribute("id", i.toString() + " " + j.toString());
                if (Field.ReadSquareValueByCoordinate(i, j) == 0) {
                    Td.setAttribute("class", "universe__square universe__square_isDead");
                }
                else if (Field.ReadSquareValueByCoordinate(i, j) == 1) {
                    Td.setAttribute("class", "universe__square universe__square_isAlive");
                }
            }
        }

        Generation.setAttribute("value", Field.NumberOfGeneration);

        switch(Field.GameOver) {
            case 1: alert("Игра закончена, так как во вселенной не осталось жизни!");
            break;
            case 2: alert("Игра закончена, так как во вселенной сложились устойчивые комбинации на 2-х последних поколениях!");
            break;
            case 3: alert("Игра закончена, так как во вселенной сложились устойчивые комбинации на текущем и предпоследнем поколениях!");
            break;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = View;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Controller {
    Main(EField, EModelChangeField, EView) {
        var TimerId, StartFlag = false, CreateFieldFlag = false;

        // обработчик кнопки создать, присвоение размеров полю, вызов метода по созданию поля

        var ButtonCreateU = document.getElementsByClassName("create-universe")[0];
        ButtonCreateU.addEventListener("click", function () {
            SetSizeOfField();
            EField.CreateRandomField();
            EView.UpdateView(EField);
            CreateFieldFlag = true;
        });

        // обработчик кнопки стереть, присвоение размеров полю, вызов метода по стиранию поля (по факту - заполнения ячейками в состоянии 0)

        var ButtonClearU = document.getElementsByClassName("clear-universe")[0];
        ButtonClearU.addEventListener("click", function () {
            SetSizeOfField();
            EField.ClearField();
            EView.UpdateView(EField);
            CreateFieldFlag = true;
        });

        // обработчик кнопки старт, запускает таймер

        var ButtonStartGame = document.getElementsByClassName("start-game")[0];
        ButtonStartGame.addEventListener("click", function () {
            Timer();
            StartFlag = true;
        });

        // обработчик кнопки стоп, обнуляет таймер

        var ButtonStopGame = document.getElementsByClassName("stop-game")[0];
        ButtonStopGame.addEventListener("click", function () {
            clearInterval(TimerId);
            StartFlag = false;
        });

        // обработчик кнопки для продвижения на 1 шаг

        var ButtonStep = document.getElementsByClassName("step")[0];
        ButtonStep.addEventListener("click", function () {
            EModelChangeField.FieldManipulatorByAlgorithm(EField);
            EView.UpdateView(EField);
        });

        // обработчик клика по ячейке

        document.body.addEventListener("click", function (event) {
            if (event.target.nodeName == "DIV") {
                if(event.target.getAttribute("id") != null) {
                    var Coordinate = event.target.getAttribute("id").split(" ");
                    EField.ChangeSquareValueByCoordinate(Coordinate[0], Coordinate[1]);
                    EView.UpdateView(EField);
                }
            }
        });

        // обработчик анфокуса поля ввода высоты

        var HeightInput = document.getElementsByClassName("field-height")[0];
        HeightInput.onblur = function () {
            var X = +document.getElementsByClassName("field-height")[0].value;

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

        var WidthInput = document.getElementsByClassName("field-width")[0];
        WidthInput.onblur = function () {
            var Y = +document.getElementsByClassName("field-width")[0].value;

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

        var Slider = document.getElementsByClassName("ui-slider-handle")[0];
        Slider.addEventListener("mouseup", function () {
            if (StartFlag) {
                Timer();
            }
        });

        Slider.addEventListener("mousemove", function () {
            if (StartFlag) {
                Timer();
            }
        });

        // функции +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        function Timer() {
            var Speed = +document.getElementsByClassName("js-slider-value")[0].value;
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
            if (document.getElementsByClassName("field-height")[0].value / 2 == 0) {
                document.getElementsByClassName("field-height")[0].value = 47;
            }
            if (+document.getElementsByClassName("field-height")[0].value > 100) {
                EField.X = 100;
                document.getElementsByClassName("field-height")[0].value = 100;
            }
            else {
                EField.X = +document.getElementsByClassName("field-height")[0].value;
            }
            if (document.getElementsByClassName("field-width")[0].value / 2 == 0) {
                document.getElementsByClassName("field-width")[0].value = 100;
            }
            if (+document.getElementsByClassName("field-width")[0].value > 100) {
                EField.Y = 100;
                document.getElementsByClassName("field-width")[0].value = 100;
            }
            else {
                EField.Y = +document.getElementsByClassName("field-width")[0].value;
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Controller;


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







var EField = new __WEBPACK_IMPORTED_MODULE_0__ModelField__["a" /* default */]();
var EModelChangeField = new __WEBPACK_IMPORTED_MODULE_1__ModelChangeField__["a" /* default */]();
var EView = new __WEBPACK_IMPORTED_MODULE_2__View__["a" /* default */]();
var EController = new __WEBPACK_IMPORTED_MODULE_3__Controller__["a" /* default */]();

EController.Main(EField, EModelChangeField, EView);

/***/ })
/******/ ]);