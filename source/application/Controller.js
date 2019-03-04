import Observer from './observer';

class Controller extends Observer {
  constructor(model, view) {
    super();
    this.model = model;
    this.view = view;
    this.timerId = 0;
    this._subscribe();
  }

  processEventFromView(event, ...args) {
    switch (event) {
      case 'createUniverse': this.publish(event, ...args);
        break;
      case 'clearUniverse': this.publish(event, ...args);
        break;
      case 'startGame': this._timer(args[0]);
        break;
      case 'stopGame': clearInterval(this.timerId);
        break;
      case 'makeStep': this.publish(event, ...args);
        break;
      case 'cellClick': this.publish(event, ...args);
        break;
      case 'changeHightInput': this.publish('resizeField', 'Y', args[0]);
        break;
      case 'changeWidthInput': this.publish('resizeField', 'X', args[0]);
        break;
      default:
        break;
    }
  }

  processEventFromModel(rows, colums, field, gameOverStatus, endGameStatus, numberOfGeneration) {
    this.gameOverStatus = gameOverStatus;
    this.publish('updateView', field, endGameStatus, numberOfGeneration);
  }

  _subscribe() {
    this.model.subscribe(this.processEventFromModel.bind(this));
    this.view.subscribe(this.processEventFromView.bind(this));
  }

  _actionOnTimer() {
    this.model.calculateGeneration();
    if (this.gameOverStatus) {
      clearInterval(this.timerId);
      this.publish('resetGame');
    }
  }

  _timer(speed) {
    clearInterval(this.timerId);
    this.timerId = setInterval(this._actionOnTimer.bind(this), (10 - speed) * 100);
  }
}

export default Controller;
