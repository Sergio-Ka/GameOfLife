import Field from './model/model-field';
import FieldChanger from './model/model-field-changer';
import Observer from './observer';

class FacadeOfModel extends Observer {
  constructor() {
    super();
    this._field = new Field();
    this._fieldChanger = new FieldChanger();
  }

  calculateGeneration() {
    this._fieldChanger.calculateField(this._field);
    this.publish(
      this._field.getYSizeOfField(),
      this._field.getXSizeOfField(),
      this._field.field,
      this._field.getGameOver(),
      this._field.getEndGameStatus(),
      this._field.getNumberOfGeneration(),
    );
  }

  createField(numberOfRows, numberOfColumns) {
    this._field.setXSizeOfField(numberOfColumns);
    this._field.setYSizeOfField(numberOfRows);
    this._field.createRandomField();
    this.publish(
      this._field.getYSizeOfField(),
      this._field.getXSizeOfField(),
      this._field.field,
      this._field.getGameOver(),
      this._field.getEndGameStatus(),
      this._field.getNumberOfGeneration(),
    );
  }

  clearField() {
    this._field.clearField();
    this.publish(
      this._field.getYSizeOfField(),
      this._field.getXSizeOfField(),
      this._field.field,
      this._field.getGameOver(),
      this._field.getEndGameStatus(),
      this._field.getNumberOfGeneration(),
    );
  }

  toggleCellStatus(row, column) {
    this._field.toggleCellLifeStatus(row, column);
    this.publish(
      this._field.getYSizeOfField(),
      this._field.getXSizeOfField(),
      this._field.field,
      this._field.getGameOver(),
      this._field.getEndGameStatus(),
      this._field.getNumberOfGeneration(),
    );
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
    this.publish(
      this._field.getYSizeOfField(),
      this._field.getXSizeOfField(),
      this._field.field,
      this._field.getGameOver(),
      this._field.getEndGameStatus(),
      this._field.getNumberOfGeneration(),
    );
  }

  resetGameStatus() {
    this._field.setGameOver(false);
    this._field.setEndGameStatus(0);
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
      case 'createUniverse': this.createField(args[0], args[1]);
        break;
      case 'clearUniverse': this.clearField();
        break;
      case 'makeStep': this.calculateGeneration();
        break;
      case 'cellClick': this.toggleCellStatus(args[0], args[1]);
        break;
      case 'resizeField': this.resizeField(args[0], args[1]);
        break;
      case 'resetGame': this.resetGameStatus();
        break;
      default:
        break;
    }
  }
}

export default FacadeOfModel;
