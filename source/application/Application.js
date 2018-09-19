import { ModelField } from './ModelField';
import { ModelChangeField } from './ModelChangeField';
import { View } from './View';
import { Controller } from './Controller';

const eField = new ModelField();
const eModelChangeField = new ModelChangeField();
const eView = new View();
const eController = new Controller();

eController.main(eField, eModelChangeField, eView);
