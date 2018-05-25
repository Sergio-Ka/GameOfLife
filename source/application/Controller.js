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

var EField = new ModelField();

class View {
    UpdateView(Field) {
        // объявление переменных, получение доступа к элементу, в котором создается таблица вселенной
            
        var Table, Tr, Td;
        var Content = document.getElementsByClassName("page__content")[0];
    
        // проверка наличия уже созданной ранее таблицы вселенной, если есть то удаляем ее
            
        Table = document.getElementById("universe");    
        if ( Table != null) {
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
                Td.setAttribute("id", i.toString()+" "+j.toString());
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

                    if (i != 0 && i != Field.X-1 && j != 0 && j != Field.Y-1) {
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
                    if (Field.ReadSquareValueByCoordinate(i, j) == Field.ReadSquareValueByCoordinateOnPenultGen(i, j)) {
                        EndOfGame2++;
                    }
                }
            }
    
            if (EndOfGame1 == Field.X * Field.Y || EndOfGame2 == Field.X * Field.Y) {
                return true;
            }
        }
    }



var TimerId, Speed = 7, Step = 0;

var Generation = document.getElementById("generation");

var EView = new View();
var EModelChangeField = new ModelChangeField();
var EModelStopGame = new ModelStopGame();

// обработчик кнопки создать, присвоение размеров полю, вызов метода по созданию поля

var ButtonCreateU = document.getElementById("create-universe");
ButtonCreateU.addEventListener("click", function() {
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

    EField.CreateRandomField();
    EView.UpdateView(EField);
    Step = 1;
    Generation.setAttribute("value", Step);
});

// обработчик кнопки стереть, присвоение размеров полю, вызов метода по стиранию поля (по факту - заполнения ячейками в состоянии 0)

var ButtonClearU = document.getElementById("clear-universe");
ButtonClearU.addEventListener("click", function() {
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

    EField.ClearField();
    EView.UpdateView(EField);
    Step = 1;
    Generation.setAttribute("value", Step);
});

// обработчик кнопки старт, запускает таймер

var ButtonStartGame = document.getElementById("start-game");
ButtonStartGame.addEventListener("click", function() {
    Speed = +document.getElementsByClassName("sliderValue")[0].value;
        clearInterval(TimerId);
        TimerId = setInterval(function() {
            EModelChangeField.FieldManipulatorByAlgorithm(EField);
            EView.UpdateView(EField);
            Step++;
            Generation.setAttribute("value", Step);
            if (EModelStopGame.StopGame(EField)) {
                clearInterval(TimerId);
            }
        }, (10-Speed)*100);
});

// обработчик кнопки стоп, обнуляет таймер

var ButtonStopGame = document.getElementById("stop-game");
ButtonStopGame.addEventListener("click", function() {
    clearInterval(TimerId);
});

// обработчик кнопки для продвижения на 1 шаг

  var ButtonStep = document.getElementById("step");
  ButtonStep.addEventListener("click", function() {
    EModelChangeField.FieldManipulatorByAlgorithm(EField);
    EView.UpdateView(EField);
    Step++;
    Generation.setAttribute("value", Step);
  });

// обработчик клика по ячейке

document.body.addEventListener("click", function(event
) {
    if (event.target.nodeName == "TD") {
        var Coordinate = event.target.getAttribute("id").split(" ");
        EField.ChangeSquareValueByCoordinate(Coordinate[0],  Coordinate[1]);
        EView.UpdateView(EField);
    }
});

// обработчик анфокуса поля ввода высоты

var HeightInput = document.getElementById("field-height");
HeightInput.onblur = function() {
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

    EField.CreateRandomField();
    EView.UpdateView(EField);
}

// обработчик анфокуса поля ввода ширины

var WidthInput = document.getElementById("field-width");
WidthInput.onblur = function() {
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

    EField.CreateRandomField();
    EView.UpdateView(EField);
}