import Observer from './observer';
import PopupMessage from '../blocks/popup-message/popup-message';
import constants from './constants';

class View extends Observer {
  constructor() {
    super();
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
    [this.buttonCreateUniverse] = document.getElementsByClassName('js-create-universe');
    [this.buttonClearUniverse] = document.getElementsByClassName('js-clear-universe');
    [this.buttonStartGame] = document.getElementsByClassName('js-start-game');
    [this.buttonStopGame] = document.getElementsByClassName('js-stop-game');
    [this.buttonMakeStep] = document.getElementsByClassName('js-step');
    [this.heightInput] = document.getElementsByClassName('js-field-height');
    [this.widthInput] = document.getElementsByClassName('js-field-width');
    [this.slider] = document.getElementsByClassName('ui-slider-handle');
    [this.sliderPopup] = document.getElementsByClassName('js-slider-with-pop-up__value');

    [this.content] = document.getElementsByClassName('js-wrap__content');
    [this.generation] = document.getElementsByClassName('js-generation');
    [this.table] = document.getElementsByClassName('js-field');
  }

  _addListeners() {
    window.addEventListener('load', this._handleWindowLoad.bind(this));
    this.buttonCreateUniverse.addEventListener('click', this._handleCreateUniverseButtonClick.bind(this));
    this.buttonClearUniverse.addEventListener('click', this._handleClearUniverseButtonClick.bind(this));
    this.buttonStartGame.addEventListener('click', this._handleStartGameButtonClick.bind(this));
    this.buttonStopGame.addEventListener('click', this._handleStopGameButtonClick.bind(this));
    this.buttonMakeStep.addEventListener('click', this._handleMakeStepButtonClick.bind(this));
    this.content.addEventListener('click', this._handleContentClick.bind(this));
    this.heightInput.addEventListener('change', this._handleHeightInputChange.bind(this));
    this.widthInput.addEventListener('change', this._handleWidthInputChange.bind(this));
    this.slider.addEventListener('click', this._handleSliderClick.bind(this));
    this.slider.addEventListener('mousemove', this._handleSliderMousemove.bind(this));
  }

  _handleWindowLoad() {
    this._createUniverse();
  }

  _handleCreateUniverseButtonClick() {
    this._createUniverse();
  }

  _createUniverse() {
    this.publish('createUniverse', this.heightInput.value, this.widthInput.value);
  }

  _handleClearUniverseButtonClick() {
    this.publish('clearUniverse');
  }

  _handleStartGameButtonClick() {
    this.publish('startGame', this.sliderPopup.value);
  }

  _handleStopGameButtonClick() {
    this.publish('stopGame');
  }

  _handleMakeStepButtonClick() {
    this.publish('makeStep');
  }

  _handleContentClick(event) {
    if (event.target.getAttribute('data-cell-id') !== null) {
      const [i, j] = event.target.getAttribute('data-cell-id').split(' ');
      this.publish('cellClick', i, j);
    }
  }

  _handleHeightInputChange() {
    this.publish('changeHightInput', this.heightInput.value);
  }

  _handleWidthInputChange() {
    this.publish('changeWidthInput', this.widthInput.value);
  }

  _handleSliderClick() {
    this._restartGame();
  }

  _handleSliderMousemove() {
    this._restartGame();
  }

  _restartGame() {
    this.publish('restartGame', this.sliderPopup.value);
  }

  _createView(fieldMatrix, gameOver, numberOfGeneration) {
    if (this.table !== null) {
      this.content.removeChild(this.table);
    }

    this.table = this.content.appendChild(document.createElement('div'));
    this.table.className = 'field js-field';
    const fragment = document.createDocumentFragment();

    fieldMatrix.forEach((row, i) => {
      const rowBlock = fragment.appendChild(document.createElement('div'));
      rowBlock.className = 'field__line';
      row.forEach((cell, j) => {
        const cellBlock = rowBlock.appendChild(document.createElement('div'));
        cellBlock.setAttribute('data-cell-id', `${i} ${j}`);
        cellBlock.className = this._getCellCSSClass(cell.getLifeStatus());
      });
    });

    this.table.appendChild(fragment);
    this.generation.setAttribute('value', numberOfGeneration);
    if (gameOver) {
      this._showMessage();
    }
  }

  _showMessage() {
    const popupMessage = new PopupMessage();
    popupMessage.setMessage('Игра закончена! Измените поле вручную или создайте новое.');
  }

  _getCellCSSClass(cellLifeStatus) {
    const cellCSSClass = cellLifeStatus === constants.DEAD_CELL
      ? 'field__cell field__cell_dead'
      : 'field__cell field__cell_alive';
    return cellCSSClass;
  }
}

export default View;
