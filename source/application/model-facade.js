import Field from './model/model-field';
import FieldChanger from './model/model-field-changer';
import Observer from './observer';
import constants from './constants';

class FacadeOfModel extends Observer {
  constructor() {
    super();
    this._field = new Field();
    this._fieldChanger = new FieldChanger();
  }

  processEvent(event, ...args) {
    switch (event) {
      case 'createUniverse': this._createField(args[0], args[1]);
        break;
      case 'clearUniverse': this._clearField();
        break;
      case 'makeStep': this._calculateGeneration();
        break;
      case 'cellClick': this._toggleCellStatus(args[0], args[1]);
        break;
      case 'resizeField': this._resizeField(args[0], args[1]);
        break;
      case 'resetGame': this._resetGameStatus();
        break;
      default:
        break;
    }
  }

  _calculateGeneration() {
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

  _createField(numberOfRows, numberOfColumns) {
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

  _clearField() {
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

  _toggleCellStatus(row, column) {
    this._field.setGameOver(false);
    this._field.setEndGameStatus(constants.GAME_IS_RUNNING); // 0
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

  _resizeField(axis, size) {
    if (axis === 'X') {
      if (size + constants.DOUBLE_WIDTH_OF_FIELD_BORDER > this._field.getXSizeOfField()) {
        this._field.enlargeFieldOnXaxis(size);
      } else if (size + constants.DOUBLE_WIDTH_OF_FIELD_BORDER < this._field.getXSizeOfField()) {
        this._field.cropFieldOnXaxis(size);
      }
    }
    if (axis === 'Y') {
      if (size + constants.DOUBLE_WIDTH_OF_FIELD_BORDER > this._field.getYSizeOfField()) {
        this._field.enlargeFieldOnYaxis(size);
      } else if (size + constants.DOUBLE_WIDTH_OF_FIELD_BORDER < this._field.getYSizeOfField()) {
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

  _resetGameStatus() {
    this._field.setGameOver(false);
    this._field.setEndGameStatus(constants.GAME_IS_RUNNING); // 0
  }
}

export default FacadeOfModel;
