import Field from './model-field';
import BasicLogicOfGame from './model-basic-logic';

class FacadeAndPublisherOfModel {
  constructor() {
    this._subscribers = [];
    this._field = new Field();
    this._fieldChanger = new BasicLogicOfGame();
  }

  calculateGeneration() {
    this._fieldChanger.fieldCalculator(this._field);
    this._notifySubscribers(this._field.getYSizeOfField(),
      this._field.getXSizeOfField(),
      this._field.field,
      this._field.getGameOver(),
      this._field.getEndGameStatus(),
      this._field.getNumberOfGeneration());
  }

  createField(numberOfRows, numberOfColumns) {
    this._field.setXSizeOfField(numberOfColumns);
    this._field.setYSizeOfField(numberOfRows);
    this._field.createRandomField();
    this._notifySubscribers(this._field.getYSizeOfField(),
      this._field.getXSizeOfField(),
      this._field.field,
      this._field.getGameOver(),
      this._field.getEndGameStatus(),
      this._field.getNumberOfGeneration());
  }

  clearField() {
    this._field.clearField();
    this._notifySubscribers(this._field.getYSizeOfField(),
      this._field.getXSizeOfField(),
      this._field.field,
      this._field.getGameOver(),
      this._field.getEndGameStatus(),
      this._field.getNumberOfGeneration());
  }

  toggleCellStatus(row, column) {
    this._field.toggleCellLifeStatus(row, column);
    this._notifySubscribers(this._field.getYSizeOfField(),
      this._field.getXSizeOfField(),
      this._field.field,
      this._field.getGameOver(),
      this._field.getEndGameStatus(),
      this._field.getNumberOfGeneration());
  }

  resizeField(axis, size) {
    if (axis === 'X') {
      if (size > this._field.getXSizeOfField()) {
        this._field.enlargeFieldOnXaxis(size);
      } else if (size < this._field.getXSizeOfField()) {
        this._field.cropFieldOnXaxis(size);
      }
    }
    if (axis === 'Y') {
      if (size > this._field.getYSizeOfField()) {
        this._field.enlargeFieldOnYaxis(size);
      } else if (size < this._field.getYSizeOfField()) {
        this._field.cropFieldOnYaxis(size);
      }
    }
    this._notifySubscribers(this._field.getYSizeOfField(),
      this._field.getXSizeOfField(),
      this._field.field,
      this._field.getGameOver(),
      this._field.getEndGameStatus(),
      this._field.getNumberOfGeneration());
  }

  subscribe(subscriber) {
    this._subscribers.push(subscriber);
  }

  unsubscribe(subscriber) {
    this._subscribers.splice(this._subscribers.indexOf(subscriber), 1);
  }

  _notifySubscribers(...parametrs) {
    this._subscribers.forEach((subscriber) => {
      subscriber.updateFromModel(...parametrs);
    });
  }
}

export default FacadeAndPublisherOfModel;
