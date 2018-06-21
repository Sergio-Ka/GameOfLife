'use strict';

require('./spec.js');
$("body").append("<div id='mocha'></div>");
$("body").append("<script> mocha.run();</script>");
$("body").append("<div id='control-container' style='display: none;'></div>");
$("#control-container").append("<input type='number' value='38' id='field-height')></div>");
$("#control-container").append("<input type='number' value='100' id='field-width')></div>");
$("#control-container").append("<div id='slider1'></div>");
$("#control-container").append("<input type='text' value='1' id='generation' disabled)></div>");
$("#control-container").append("<button id='create-universe'>СОЗДАТЬ</button>");
$("#control-container").append("<button id='clear-universe'>СТЕРЕТЬ</button>");
$("#control-container").append("<button id='start-game'>СТАРТ</button>");
$("#control-container").append("<button id='stop-game'>СТОП</button>");
$("#control-container").append("<button id='step'>1 ШАГ</button>");
$("body").append("<div class='page__content'></div>");
require('../blocks/slider1/slider1.js');