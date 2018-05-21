'use strict';

export default class ModelSquare {
	
	/* инициализация полей класса при создании во избежание проблем 
	(так как логика остановки игры сравнивает текущее и два последних поколения)*/

	constructor() {
	this.value = 0;
	this.valueOnLG = 0;
	this.valueOnPG = 0;
	}

	// геттеры и сеттеры для полей класса
  
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

	// единственный метод изменения состояния ячейки в текущем поколении
  
	ChangeValue() {
		if (this.value == 0) {
			this.value = 1;
		}
		else {
			this.value = 0;
		}
	}
}