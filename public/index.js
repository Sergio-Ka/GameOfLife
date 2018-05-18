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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_styl__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__pages_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_slider1_slider1_styl__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_slider1_slider1_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__blocks_slider1_slider1_styl__);

__webpack_require__(2);

__webpack_require__(22);
__webpack_require__(23);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_images_favicon_ico__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_images_favicon_ico___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__main_images_favicon_ico__);


/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/favicon.ico";

/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 22 */
/***/ (function(module, exports) {

$("#slider1").slider({ // вид первого слайдера и настройки
    value: '',
    min: 1,
    max: 10,
	value: 5,
    create: function (event, ui) {
        $('.ui-slider-handle').append('<input class="sliderValue" value="5"/>');
        $('.ui-slider-handle').append('<div class="sliderValue_2"></div>');
    },
    slide: function (event, ui) {
        $(".sliderValue").val(ui.value);
    }
});

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__) {

"use strict";
/*import ModelSquare from './ModelSquare';
import ModelField from './ModelField';*/

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
                for (var j = 0; j < this.x; j++) {
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
    
        ReadSquareValueByCoordinate(X, Y) {
            return this.field[X][Y].Value;
        }
    
        ReadSquareValueByCoordinateOnLastGen(X, Y) {
            return this.field[X][Y].ValueOnLastGeneration;
        }
    
        ReadSquareValueByCoordinateOnPenultGen(X, Y) {
            return this.field[X][Y].ValueOnPenultimateGeneration;
        }
    
        ChangeSquareValueByCoordinate(X,  Y) {
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



var Field = new ModelField();

// обработчик кнопки создать, присвоение координат полю, вызов метода по созданию поля

var buttonCreateU = document.getElementById("create-universe");
buttonCreateU.addEventListener("click", function() {
    Field.X = + document.getElementById("field-width").value;
    Field.Y = + document.getElementById("field-height").value;
    Field.CreateRandomField();

    var summ = "";
    for (var i = 0; i < Field.X; i++) {
        for (var j = 0; j < Field.Y; j++) {
            summ = summ + Field.field[i][j].Value;
        }
        summ = summ + "\n";
    }

    //alert(summ);
    /*console.log(Field.X);
    console.log(Field.Y);*/
    
    var table, tr, td;
    var content = document.getElementsByClassName("page__content")[0];
    table = document.getElementById("universe");

    if ( table != null) {
        content.removeChild(table);
    }
    
    table = content.appendChild(document.createElement("table"));
    table.setAttribute("id", "universe");

    for (var i = 0; i < Field.X; i++) {
        tr = table.appendChild(document.createElement("tr"));
        for (var j = 0; j < Field.Y; j++) {
            td = tr.appendChild(document.createElement("td"));
            td.setAttribute("id", i.toString()+j.toString());
            if (Field.field[i][j].Value == 0) {
            td.setAttribute("class", "isDead");
            }
            else if (Field.field[i][j].Value == 1) {
                td.setAttribute("class", "isAlive");
                }
        }
    }
});

// обработчик кнопки стереть, присвоение координат полю, вызов метода по стиранию поля

var buttonClearU = document.getElementById("clear-universe");
buttonClearU.addEventListener("click", function() {
    Field.X = + document.getElementById("field-width").value;
    Field.Y = + document.getElementById("field-height").value;
    Field.ClearField();

    var summ = "";
    for (var i = 0; i < Field.X; i++) {
        for (var j = 0; j < Field.Y; j++) {
            summ = summ + Field.field[i][j].Value;
        }
        summ = summ + "\n";
    }

    //alert(summ);
    //console.log(summ);

    var table, tr, td;
    var content = document.getElementsByClassName("page__content")[0];
    table = document.getElementById("universe");

    if ( table != null) {
        content.removeChild(table);
    }
    
    table = content.appendChild(document.createElement("table"));
    table.setAttribute("id", "universe");

    for (var i = 0; i < Field.X; i++) {
        tr = table.appendChild(document.createElement("tr"));
        for (var j = 0; j < Field.Y; j++) {
            td = tr.appendChild(document.createElement("td"));
            td.setAttribute("id", i.toString()+j.toString());
            if (Field.field[i][j].Value == 0) {
            td.setAttribute("class", "isDead");
            }
            else if (Field.field[i][j].Value == 1) {
                td.setAttribute("class", "isAlive");
                }
        }
    }
});

/***/ })
/******/ ]);