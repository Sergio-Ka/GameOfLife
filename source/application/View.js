class View {
  constructor() {
    this.document = window.document;
    this._subscribers = [];
    this._findElements();
    this._addListeners();
  }

  _findElements() {
    [this.buttonCreateUniverse] = this.document.getElementsByClassName('create-universe');
    [this.buttonClearUniverse] = this.document.getElementsByClassName('clear-universe');
    [this.buttonStartGame] = this.document.getElementsByClassName('start-game');
    [this.buttonStopGame] = this.document.getElementsByClassName('stop-game');
    [this.buttonMakeStep] = this.document.getElementsByClassName('step');
    [this.heightInput] = this.document.getElementsByClassName('field-height');
    [this.widthInput] = this.document.getElementsByClassName('field-width');
    [this.slider] = this.document.getElementsByClassName('ui-slider-handle');
    [this.sliderPopup] = this.document.getElementsByClassName('js-slider-value');

    [this.content] = this.document.getElementsByClassName('wrap__content');
    [this.generation] = this.document.getElementsByClassName('generation');
    [this.table] = this.document.getElementsByClassName('field');
  }

  _addListeners() {
    window.addEventListener('load', () => { this._notifySubscribers('createUniverse', this.heightInput.value, this.widthInput.value); });
    this.buttonCreateUniverse.addEventListener('click', () => { this._notifySubscribers('createUniverse', this.heightInput.value, this.widthInput.value); });
    this.buttonClearUniverse.addEventListener('click', () => { this._notifySubscribers('clearUniverse', this.heightInput.value, this.widthInput.value); });
    this.buttonStartGame.addEventListener('click', () => { this._notifySubscribers('startGame', Number(this.sliderPopup.value)); });
    this.buttonStopGame.addEventListener('click', () => { this._notifySubscribers('stopGame'); });
    this.buttonMakeStep.addEventListener('click', () => { this._notifySubscribers('makeStep'); });
    this.content.addEventListener('click', (event) => { this._cellClick(event); });
    this.heightInput.addEventListener('change', () => { this._notifySubscribers('changeHightInput', this.heightInput.value); });
    this.widthInput.addEventListener('change', () => { this._notifySubscribers('changeWidthInput', this.widthInput.value); });
    this.slider.addEventListener('click', () => { this._notifySubscribers('startGame', Number(this.sliderPopup.value)); });
    this.slider.addEventListener('mousemove', () => { this._notifySubscribers('startGame', Number(this.sliderPopup.value)); });
  }

  _cellClick(event) {
    if (event.target.getAttribute('data-id') !== null) {
      this.coordinate = event.target.getAttribute('data-id').split(' ');
    }
    this._notifySubscribers('cellClick', this.coordinate[0], this.coordinate[1]);
  }

  subscribe(subscriber) {
    this._subscribers.push(subscriber);
  }

  unsubscribe(subscriber) {
    this._subscribers.splice(this._subscribers.indexOf(subscriber), 1);
  }

  _notifySubscribers(...parametrs) {
    this._subscribers.forEach((subscriber) => {
      subscriber.updateFromView(...parametrs);
    });
  }

  createView(field, endGameStatus, numberOfGeneration) {
    let tr;
    let td;

    if (this.table) {
      this.content.removeChild(this.table);
    }

    this.table = this.content.appendChild(this.document.createElement('div'));
    this.table.setAttribute('class', 'field');
    const fragment = this.document.createDocumentFragment();

    for (let i = 0; i < field.length; i += 1) {
      tr = fragment.appendChild(this.document.createElement('div'));
      tr.setAttribute('class', 'field__line');
      for (let j = 0; j < field[i].length; j += 1) {
        td = tr.appendChild(this.document.createElement('div'));
        td.setAttribute('data-id', `${i} ${j}`);
        if (field[i][j].getLifeStatus() === 0) {
          td.setAttribute('class', 'field__cell field__cell_isDead');
        } else if (field[i][j].getLifeStatus() === 1) {
          td.setAttribute('class', 'field__cell field__cell_isAlive');
        }
      }
    }

    this.table.appendChild(fragment);
    this.generation.setAttribute('value', numberOfGeneration);

    switch (endGameStatus) {
      case 1: alert('Игра закончена, так как во вселенной не осталось жизни!');
        break;
      case 2: alert('Игра закончена, так как во вселенной сложились устойчивые комбинации на 2-х последних поколениях!');
        break;
      case 3: alert('Игра закончена, так как во вселенной сложились устойчивые комбинации на текущем и предпоследнем поколениях!');
        break;
      default:
        break;
    }
  }

  /* _updateView(field) {
    const generation = this.document.getElementsByClassName('generation')[0];
    let cell = null;
    let cssClass = null;

    for (let i = 0; i < field.getYSizeOfField(); i += 1) {
      for (let j = 0; j < field.getXSizeOfField(); j += 1) {
        cell = document.querySelector(`.field__cell[data-id="${i} ${j}"]`);
        cssClass = cell.getAttribute('class').split(' ');
        if (field.readCellLifeStatus(i, j) === 1 && cssClass[1] === 'field__cell_isDead') {
          cell.setAttribute('class', 'field__cell field__cell_isAlive');
        }
        if (field.readCellLifeStatus(i, j) === 0 && cssClass[1] === 'field__cell_isAlive') {
          cell.setAttribute('class', 'field__cell field__cell_isDead');
        }
      }
    }

    generation.setAttribute('value', field.getNumberOfGeneration());

    switch (field.getEndGameStatus()) {
      case 1: alert('Игра закончена, так как во вселенной не осталось жизни!');
        break;
      case 2: alert('Игра закончена, так как во вселенной сложились устойчивые комбинации на 2-х последних поколениях!');
        break;
      case 3: alert('Игра закончена, так как во вселенной сложились устойчивые комбинации на текущем и предпоследнем поколениях!');
        break;
      default:
        break;
    }
  } */
}

export default View;
