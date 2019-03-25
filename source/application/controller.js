import Observer from './observer';
import constants from './constants';

class Controller extends Observer {
  constructor() {
    super();
    this.firstStartFlag = true;
  }

  processEventFromView(event, ...args) {
    switch (event) {
      case 'createUniverse': this.publish(event, Number(args[0]), Number(args[1]));
        break;
      case 'clearUniverse': this.publish(event);
        break;
      case 'startGame': this._startTimer(Number(args[0]));
        break;
      case 'restartGame': this._restartTimer(Number(args[0]));
        break;
      case 'stopGame': this._resetTimer();
        break;
      case 'makeStep': this.publish(event);
        break;
      case 'cellClick': this.publish(event, Number(args[0]), Number(args[1]));
        break;
      case 'changeHightInput': this.publish('resizeField', 'Y', Number(args[0]));
        break;
      case 'changeWidthInput': this.publish('resizeField', 'X', Number(args[0]));
        break;
      default:
        break;
    }
  }

  processEventFromModel(rows, colums, field, gameOverStatus, numberOfGeneration) {
    this.gameOverStatus = gameOverStatus;
    this.publish('updateView', field, gameOverStatus, numberOfGeneration);
  }

  _actionOnTimer() {
    this.publish('makeStep');
    if (this.gameOverStatus) {
      this._resetTimer();
    }
  }

  _startTimer(speed) {
    clearInterval(this.timerId);
    this.timerId = setInterval(this._actionOnTimer.bind(this),
      (constants.MAX_SPEED - speed) * constants.STEP_OF_DELAY);
    this.firstStartFlag = false;
  }

  _restartTimer(speed) {
    if (!this.firstStartFlag) {
      clearInterval(this.timerId);
      this.timerId = setInterval(this._actionOnTimer.bind(this),
        (constants.MAX_SPEED - speed) * constants.STEP_OF_DELAY);
    }
  }

  _resetTimer() {
    clearInterval(this.timerId);
    this.firstStartFlag = true;
    this.publish('resetGame');
  }
}

export default Controller;
