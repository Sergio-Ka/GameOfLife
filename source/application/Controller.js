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