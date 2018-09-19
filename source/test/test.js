$('body').append('<div class="control-container" style="display: none;"></div>');
$('.control-container').append('<input type="number" value="47" class="field-height" />');
$('.control-container').append('<input type="number" value="100" class="field-width" />');
$('.control-container').append('<div class="js-slider-1"></div>');
$('.control-container').append('<input type="text" value="1" class="generation" />');
$('.control-container').append('<button class="create-universe">СОЗДАТЬ</button>');
$('.control-container').append('<button class="clear-universe">СТЕРЕТЬ</button>');
$('.control-container').append('<button class="start-game">СТАРТ</button>');
$('.control-container').append('<button class="stop-game">СТОП</button>');
$('.control-container').append('<button class="step">1 ШАГ</button>');
$('body').append('<div class="page__content"></div>');
require('../blocks/slider1/slider1.js');

require('./spec.js');

$('body').append('<div id="mocha"></div>');
$('body').append('<script> mocha.run();</script>');
