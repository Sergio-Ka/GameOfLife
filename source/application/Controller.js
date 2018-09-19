class Controller {
  constructor() {
    this.document = window.document;
  }

  main(eField, eModelChangeField, eView) {
    const buttonCreateU = this.document.getElementsByClassName('create-universe')[0];
    const buttonClearU = this.document.getElementsByClassName('clear-universe')[0];
    const buttonStartGame = this.document.getElementsByClassName('start-game')[0];
    const buttonStopGame = this.document.getElementsByClassName('stop-game')[0];
    const buttonStep = this.document.getElementsByClassName('step')[0];
    const heightInput = this.document.getElementsByClassName('field-height')[0];
    const widthInput = this.document.getElementsByClassName('field-width')[0];
    const slider = this.document.getElementsByClassName('ui-slider-handle')[0];
    const documentBody = this.document.body;

    let timerId;
    let startFlag = false;
    let createFieldFlag = false;

    // функции
    const actionOnTimer = function actOnTimer() {
      eModelChangeField.stopGame(eField);
      eModelChangeField.manipulateFieldByAlgorithm(eField);
      eView.updateView(eField);
      if (eField.getGameOver() !== 0) {
        clearInterval(timerId);
        startFlag = false;
        eField.setGameOver(0);
      }
    };

    const timer = function someTimer() {
      const speed = Number(document.getElementsByClassName('js-slider-value')[0].value);
      clearInterval(timerId);
      timerId = setInterval(actionOnTimer, (10 - speed) * 100);
    };

    const setSizeOfField = function someSetSizeOfField() {
      if (document.getElementsByClassName('field-height')[0].value / 2 === 0) {
        document.getElementsByClassName('field-height')[0].value = 47;
      }
      if (Number(document.getElementsByClassName('field-height')[0].value) > 100) {
        eField.setX(100);
        document.getElementsByClassName('field-height')[0].value = 100;
      } else {
        eField.setX(Number(document.getElementsByClassName('field-height')[0].value));
      }
      if (document.getElementsByClassName('field-width')[0].value / 2 === 0) {
        document.getElementsByClassName('field-width')[0].value = 100;
      }
      if (Number(document.getElementsByClassName('field-width')[0].value) > 100) {
        eField.setY(100);
        document.getElementsByClassName('field-width')[0].value = 100;
      } else {
        eField.setY(Number(document.getElementsByClassName('field-width')[0].value));
      }
    };

    const create = function createUniverse() {
      setSizeOfField();
      eField.createRandomField();
      eView.updateView(eField);
      createFieldFlag = true;
    };

    const clear = function clearUniverse() {
      setSizeOfField();
      eField.clearField();
      eView.updateView(eField);
      createFieldFlag = true;
    };

    const start = function startGame() {
      timer();
      startFlag = true;
    };

    const stop = function stopGame() {
      clearInterval(timerId);
      startFlag = false;
    };

    const step = function oneStep() {
      eModelChangeField.manipulateFieldByAlgorithm(eField);
      eView.updateView(eField);
    };

    const cellClick = function clickOnCell(event) {
      if (event.target.nodeName === 'DIV') {
        if (event.target.getAttribute('data-id') !== null) {
          const coordinate = event.target.getAttribute('data-id').split(' ');
          eField.changeSquareValueByCoordinate(coordinate[0], coordinate[1]);
          eView.updateView(eField);
        }
      }
    };

    const changeHI = function changeHeightInput() {
      const x = Number(document.getElementsByClassName('field-height')[0].value);
      if (createFieldFlag) {
        if (x < eField.getX()) {
          eField.cropFieldOnX(x);
        } else if (x > eField.getX()) {
          eField.enlargeFieldOnX(x);
        }
        eView.updateView(eField);
      }
    };

    const changeWI = function changeWidthInput() {
      const y = Number(document.getElementsByClassName('field-width')[0].value);
      if (createFieldFlag) {
        if (y < eField.getY()) {
          eField.cropFieldOnY(y);
        } else if (y > eField.getY()) {
          eField.enlargeFieldOnY(y);
        }
        eView.updateView(eField);
      }
    };

    const changeSpeed = function changeSpeed() {
      if (startFlag) {
        timer();
      }
    };

    // Обработчики

    // создание поля при загрузке
    window.onload = create;

    // обработчик кнопки создать, присвоение размеров полю, вызов метода по созданию поля
    buttonCreateU.addEventListener('click', create);

    /* обработчик кнопки стереть, присвоение размеров полю, вызов метода
    по стиранию поля (по факту - заполнения ячейками в состоянии 0) */
    buttonClearU.addEventListener('click', clear);

    // обработчик кнопки старт, запускает таймер
    buttonStartGame.addEventListener('click', start);

    // обработчик кнопки стоп, обнуляет таймер
    buttonStopGame.addEventListener('click', stop);

    // обработчик кнопки для продвижения на 1 шаг
    buttonStep.addEventListener('click', step);

    // обработчик клика по ячейке
    documentBody.addEventListener('click', cellClick);

    // обработчик анфокуса поля ввода высоты
    heightInput.addEventListener('change', changeHI);

    // обработчик анфокуса поля ввода ширины
    widthInput.addEventListener('change', changeWI);

    // обработчики контрола скорости для динамического ее изменения
    slider.addEventListener('click', changeSpeed);
    slider.addEventListener('mousemove', changeSpeed);
  }
}

export {
  Controller,
};
