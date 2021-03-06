class PopupMessage {
  constructor() {
    this._init();
  }

  _init() {
    [this.messageWindow] = document.getElementsByClassName('js-popup-message');
    this.buttonClose = this.messageWindow.querySelector('.js-popup-message__button');
    this.content = this.messageWindow.querySelector('.js-popup-message__content');
    this.messageWindowText = this.messageWindow.querySelector('.js-popup-message__text');

    this.buttonClose.addEventListener('click', this._handlerButtonCloseClick.bind(this));
  }

  setMessage(textOfMessage) {
    this.messageWindowText.innerHTML = textOfMessage;
    this._setVisibleStatus(true);
  }

  _handlerButtonCloseClick() {
    this._setVisibleStatus(false);
  }

  _setVisibleStatus(status) {
    this.messageWindow.className = status
      ? 'popup-message js-popup-message popup-message_visible'
      : 'popup-message js-popup-message';
  }
}

export default PopupMessage;
