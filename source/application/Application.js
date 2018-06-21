'use strict';

import ModelField from './ModelField';
import ModelChangeField from './ModelChangeField';
import View from './View';
import Controller from './Controller';

var EField = new ModelField();
var EModelChangeField = new ModelChangeField();
var EView = new View();
var EController = new Controller();

EController.Main(EField, EModelChangeField, EView);