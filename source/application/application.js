import FacadeOfModel from './model-facade';
import View from './view';
import Controller from './controller';

class Application {
  constructor() {
    this._model = new FacadeOfModel();
    this._view = new View();
  }

  initialize() {
    this._controller = new Controller(this._model, this._view);
    this._view.referTo(this._controller);
    this._model.referTo(this._controller);
  }
}

const application = new Application();
application.initialize();
