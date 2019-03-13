class PopupMessage {
  constructor() {
    this._init();
  }

  _init() {
    [this.element] = document.getElementsByClassName('js-popup-message');
    this.button = this.element.querySelector('.js-popup-message-close');
    this.content = this.element.querySelector('.popup-message__content');
    this.elementText = this.element.querySelector('.popup-message__text');

    this.button.addEventListener('click', () => { this._visibleStatus(false); });
  }

  message(textOfMessage) {
    this.elementText.innerHTML = textOfMessage;
    this._visibleStatus(true);
  }

  _visibleStatus(status) {
    if (status) {
      this.element.style.display = 'block';
      this.content.style.display = 'block';
    } else {
      this.element.style.display = 'none';
      this.content.style.display = 'none';
    }
  }
}

export default PopupMessage;
