import Observer from './observer';
import PopupMessage from '../blocks/popup-message/popup-message';
import constants from './constants';

class View extends Observer {
  constructor() {
    super();
    this.document = window.document;
    this._findElements();
    this._addListeners();
  }

  processEvent(event, ...args) {
    switch (event) {
      case 'updateView': this._createView(args[0], args[1], args[2]);
        break;
      default:
        break;
    }
  }

  _findElements() {
    [this.buttonCreateUniverse] = this.document.getElementsByClassName('js-create-universe');
    [this.buttonClearUniverse] = this.document.getElementsByClassName('js-clear-universe');
    [this.buttonStartGame] = this.document.getElementsByClassName('js-start-game');
    [this.buttonStopGame] = this.document.getElementsByClassName('js-stop-game');
    [this.buttonMakeStep] = this.document.getElementsByClassName('js-step');
    [this.heightInput] = this.document.getElementsByClassName('js-field-height');
    [this.widthInput] = this.document.getElementsByClassName('js-field-width');
    [this.slider] = this.document.getElementsByClassName('ui-slider-handle');
    [this.sliderPopup] = this.document.getElementsByClassName('js-slider-with-pop-up__value');

    [this.content] = this.document.getElementsByClassName('js-wrap__content');
    [this.generation] = this.document.getElementsByClassName('js-generation');
    [this.table] = this.document.getElementsByClassName('js-field');
  }

  _addListeners() {
    window.addEventListener('load', () => { this.publish('createUniverse', this.heightInput.value, this.widthInput.value); });
    this.buttonCreateUniverse.addEventListener('click', () => { this.publish('createUniverse', this.heightInput.value, this.widthInput.value); });
    this.buttonClearUniverse.addEventListener('click', () => { this.publish('clearUniverse', this.heightInput.value, this.widthInput.value); });
    this.buttonStartGame.addEventListener('click', () => { this.publish('startGame', Number(this.sliderPopup.value)); });
    this.buttonStopGame.addEventListener('click', () => { this.publish('stopGame'); });
    this.buttonMakeStep.addEventListener('click', () => { this.publish('makeStep'); });
    this.content.addEventListener('click', (event) => { this._cellClick(event); });
    this.heightInput.addEventListener('change', () => { this.publish('changeHightInput', Number(this.heightInput.value)); });
    this.widthInput.addEventListener('change', () => { this.publish('changeWidthInput', Number(this.widthInput.value)); });
    this.slider.addEventListener('click', () => { this.publish('restartGame', Number(this.sliderPopup.value)); });
    this.slider.addEventListener('mousemove', () => { this.publish('restartGame', Number(this.sliderPopup.value)); });
  }

  _cellClick(event) {
    if (event.target.getAttribute('data-id') !== null) {
      this.coordinate = event.target.getAttribute('data-id').split(' ');
    }
    this.publish('cellClick', this.coordinate[0], this.coordinate[1]);
  }

  _createView(field, endGameStatus, numberOfGeneration) {
    let tr;
    let td;

    if (this.table) {
      this.content.removeChild(this.table);
    }

    this.table = this.content.appendChild(this.document.createElement('div'));
    this.table.setAttribute('class', 'field js-field');
    const fragment = this.document.createDocumentFragment();

    field.forEach((item, i) => {
      tr = fragment.appendChild(this.document.createElement('div'));
      tr.setAttribute('class', 'field__line js-field__line');
      item.forEach((element, j) => {
        td = tr.appendChild(this.document.createElement('div'));
        td.setAttribute('data-id', `${i} ${j}`);
        if (element.getLifeStatus() === constants.DEAD_CELL) {
          td.setAttribute('class', 'field__cell field__cell_dead js-field__cell js-field__cell_dead');
        } else if (element.getLifeStatus() === constants.ALIVE_CELL) {
          td.setAttribute('class', 'field__cell field__cell_alive js-field__cell js-field__cell_alive');
        }
      });
    });

    this.table.appendChild(fragment);
    this.generation.setAttribute('value', numberOfGeneration);
    const popupMessage = new PopupMessage();

    switch (endGameStatus) {
      case constants.GAME_STOPPED_BY_DEAD_UNIVERSE:
        popupMessage.message('Игра закончена, так как во вселенной не осталось жизни!');
        break;
      case constants.GAME_STOPPED_BY_STABLE_COMBINATION_ON_2_LATEST_GENERATIONS:
        popupMessage.message('Игра закончена, так как во вселенной сложились устойчивые комбинации на 2-х последних поколениях!');
        break;
      case constants.GAME_STOPPED_BY_STABLE_COMBINATION_ON_LAST_AND_PENULTIMATE_GENERATION:
        popupMessage.message('Игра закончена, так как во вселенной сложились устойчивые комбинации на текущем и предпоследнем поколениях!');
        break;
      default:
        break;
    }
  }
}

export default View;
