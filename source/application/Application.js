import FacadeAndPublisherOfModel from './model-facade';
import View from './view';
import Controller from './controller';

const model = new FacadeAndPublisherOfModel();
const view = new View();
const controller = new Controller(model, view);
