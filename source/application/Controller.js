class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.timerId = 0;
    this._sibscribe();
  }

  updateFromView(event, ...args) {
    switch (event) {
      case 'createUniverse': this.model.createField(args[0], args[1]);
        break;
      case 'clearUniverse': this.model.clearField();
        break;
      case 'startGame': this._timer(args[0]);
        break;
      case 'stopGame': clearInterval(this.timerId);
        break;
      case 'makeStep': this.model.calculateGeneration();
        break;
      case 'cellClick': this.model.toggleCellStatus(args[0], args[1]);
        break;
      case 'changeHightInput': this.model.resizeField('Y', args[0]);
        break;
      case 'changeWidthInput': this.model.resizeField('X', args[0]);
        break;
      default:
        break;
    }
  }

  updateFromModel(rows, colums, field, gameOverStatus, endGameStatus, numberOfGeneration) {
    this.gameOverStatus = gameOverStatus;
    this.view.createView(field, endGameStatus, numberOfGeneration);
  }

  _sibscribe() {
    this.model.subscribe(this);
    this.view.subscribe(this);
  }

  _actionOnTimer() {
    this.model.calculateGeneration();
    if (this.gameOverStatus) {
      clearInterval(this.timerId);
      // startFlag = false;
      // field.setGameOver(false);
      // field.setEndGameStatus(0);
    }
  }

  _timer(speed) {
    clearInterval(this.timerId);
    this.timerId = setInterval(this._actionOnTimer(), (10 - speed) * 100);
  }
}

export default Controller;
