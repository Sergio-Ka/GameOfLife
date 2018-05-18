'use strict';

export default class ModelSquare {
	
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