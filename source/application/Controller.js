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
        
        var str = "";

        for (var i = 0; i < Field.X; i++) {
            Tr = Table.appendChild(document.createElement("tr"));
            for (var j = 0; j < Field.Y; j++) {
                Td = Tr.appendChild(document.createElement("td"));
                Td.setAttribute("id", i.toString()+" "+j.toString());
                str += Field.ReadSquareValueByCoordinate(i, j);
                if (Field.ReadSquareValueByCoordinate(i, j) == 0) {
                    Td.setAttribute("class", "universe__square universe__square_isDead");
                }
                else if (Field.ReadSquareValueByCoordinate(i, j) == 1) {
                    Td.setAttribute("class", "universe__square universe__square_isAlive");
                }
            }
            str+="\n";
        }

        //alert(str);
    }
}



class ModelChangeField {
    
        // метод для манипуляции экземпляром поля в соответствии с алгоритмом
    
        FieldManipulatorByAlgorithm(Field) {
    
            // создаем переменные - массив для пересчета и вспомогательную
    
            var RecountedField = new Array(Field.X);
            var Summ;
            var str1 = "", str2 = "";
    
            for (var i = 1; i < Field.X-1; i++) {
    
                RecountedField[i] = new Array(Field.Y);
    
                for (var j = 1; j < Field.Y-1; j++) {
                    RecountedField[i][j]=0;


                    // для каждой ячейки считаем количество живых соседей
    
                    Summ = 0;
                    for (var k = i - 1; k < i + 2; k++) {
                        for (var l = j - 1; l < j + 2; l++) {
                            Summ += +Field.ReadSquareValueByCoordinate(k, l);
                        }
                    }
    
                    // заполняем вспомогательный массив на основе значения самой ячейки и количества живых соседей
                    str1 += Summ;

                    if (Field.ReadSquareValueByCoordinate(i, j) == 0 && Summ == 3) {
                        RecountedField[i][j] = 1;
                        //str1 += Field.ReadSquareValueByCoordinate(i, j);
                    }
                    else if (Field.ReadSquareValueByCoordinate(i, j) == 1 && (Summ == 3 || Summ == 4)) {
                        RecountedField[i][j] = 1;
                        //str1 += Field.ReadSquareValueByCoordinate(i, j);
                    }
                    else if (Field.ReadSquareValueByCoordinate(i, j) == 1 && (Summ < 3 || Summ > 4)) {
                        RecountedField[i][j] = 0;
                        //str1 += Field.ReadSquareValueByCoordinate(i, j);
                    }
                }
                str1 += "\n";
            }
    
            /* записываем данные во все поля (на текущем, прошлом и позапрошлом шаге) каждого экземпляра ячейки
            текущего экземпляра поля в соответствии с пересчитанным новым полем */
    
            for (i = 0; i < Field.X; i++) {
                for (j = 0; j < Field.Y; j++) {
                    Field.SetSquareValueOnPGByCoordinate(i, j, Field.ReadSquareValueByCoordinateOnLastGen(i, j));
                    Field.SetSquareValueOnLGByCoordinate(i, j, Field.ReadSquareValueByCoordinate(i, j));
                    if (i == 0 || i == Field.X-1 || j == 0 || j == Field.Y-1) {
                        Field.SetSquareValueByCoordinate(i, j, 0);
                    }
                    else {
                        Field.SetSquareValueByCoordinate(i, j, RecountedField[i][j]);
                    }
                    str2 += Field.ReadSquareValueByCoordinate(i, j);
                }
                str2 += "\n";
            }
            //alert(str2);
            console.log(str1);
        }
    }



var StartGameFlag = false;

var EView = new View();
var EModelChangeField = new ModelChangeField();

// обработчик кнопки создать, присвоение координат полю, вызов метода по созданию поля

var buttonCreateU = document.getElementById("create-universe");
buttonCreateU.addEventListener("click", function() {
    EField.X = + document.getElementById("field-width").value;
    EField.Y = + document.getElementById("field-height").value;
    EField.CreateRandomField();

    EView.UpdateView(EField);
});

// обработчик кнопки стереть, присвоение координат полю, вызов метода по стиранию поля (по факту - заполнения ячейками в состоянии 0)

var buttonClearU = document.getElementById("clear-universe");
buttonClearU.addEventListener("click", function() {
    EField.X = + document.getElementById("field-width").value;
    EField.Y = + document.getElementById("field-height").value;
    EField.ClearField();

    EView.UpdateView(EField);
});

// обработчик кнопки старт, запускает таймер

/*var buttonStartGame = document.getElementById("start-game");
buttonStartGame.addEventListener("click", function() {
    StartGameFlag = true;
});*/

// таймер для циклического повторения вызова метода, манипулирующего данными поля

/*if (StartGameFlag) {
    var timerId = setInterval(function() {
        EModelChangeField.FieldManipulatorByAlgorithm(EField);
        EView.UpdateView(EField);
      }, 300);
      
}*/
  
  /* через 5 сек остановить повторы
  setTimeout(function() {
    clearInterval(timerId);
    alert( 'стоп' );
  }, 5000);*/

  var buttonTick = document.getElementById("tick");
  buttonTick.addEventListener("click", function() {
    EModelChangeField.FieldManipulatorByAlgorithm(EField);
    EView.UpdateView(EField);
  });

// обработчик клика по ячейке

var squareClick;