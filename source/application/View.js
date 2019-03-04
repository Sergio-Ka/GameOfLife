import Observer from './observer';

class View extends Observer {
  constructor() {
    super();
    this.document = window.document;
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
    window.addEventListener('load', () => { this.publish('createUniverse', this.heightInput.value, this.widthInput.value); });
    this.buttonCreateUniverse.addEventListener('click', () => { this.publish('createUniverse', this.heightInput.value, this.widthInput.value); });
    this.buttonClearUniverse.addEventListener('click', () => { this.publish('clearUniverse', this.heightInput.value, this.widthInput.value); });
    this.buttonStartGame.addEventListener('click', () => { this.publish('startGame', Number(this.sliderPopup.value)); });
    this.buttonStopGame.addEventListener('click', () => { this.publish('stopGame'); });
    this.buttonMakeStep.addEventListener('click', () => { this.publish('makeStep'); });
    this.content.addEventListener('click', (event) => { this._cellClick(event); });
    this.heightInput.addEventListener('change', () => { this.publish('changeHightInput', this.heightInput.value); });
    this.widthInput.addEventListener('change', () => { this.publish('changeWidthInput', this.widthInput.value); });
    this.slider.addEventListener('click', () => { this.publish('startGame', Number(this.sliderPopup.value)); });
    this.slider.addEventListener('mousemove', () => { this.publish('startGame', Number(this.sliderPopup.value)); });
  }

  _cellClick(event) {
    if (event.target.getAttribute('data-id') !== null) {
      this.coordinate = event.target.getAttribute('data-id').split(' ');
    }
    this.publish('cellClick', this.coordinate[0], this.coordinate[1]);
  }

  _subscribe() {
    this.controller.subscribe(this.processEvent.bind(this));
  }

  referTo(controller) {
    this.controller = controller;
    this._subscribe();
  }

  processEvent(event, ...args) {
    switch (event) {
      case 'updateView': this.createView(args[0], args[1], args[2]);
        break;
      default:
        break;
    }
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
}

export default View;
