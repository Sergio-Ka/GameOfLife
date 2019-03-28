import FacadeOfModel from './model-facade';
import View from './view';
import Controller from './controller';

class Application {
  constructor() {
    this._model = new FacadeOfModel();
    this._view = new View();
    this._controller = new Controller();
  }

  initialize() {
    this._controller.subscribe(this._model.processEvent.bind(this._model));
    this._controller.subscribe(this._view.processEvent.bind(this._view));
    this._view.subscribe(this._controller.processEventFromView.bind(this._controller));
    this._model.subscribe(this._controller.processEventFromModel.bind(this._controller));
  }
}

const application = new Application();
application.initialize();
