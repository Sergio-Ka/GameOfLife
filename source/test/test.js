$('body').append('<div class="control-container" style="display: none;"></div>');
$('.control-container').append('<input type="number" value="47" class="js-field-height" />');
$('.control-container').append('<input type="number" value="100" class="js-field-width" />');
$('.control-container').append('<div class="js-slider-with-pop-up"><div class="ui-slider-handle"></div><input value="8" class="js-slider-with-pop-up__value" /></div>');
$('.control-container').append('<input type="text" value="1" class="js-generation" />');
$('.control-container').append('<button class="js-create-universe">СОЗДАТЬ</button>');
$('.control-container').append('<button class="js-clear-universe">СТЕРЕТЬ</button>');
$('.control-container').append('<button class="js-start-game">СТАРТ</button>');
$('.control-container').append('<button class="js-stop-game">СТОП</button>');
$('.control-container').append('<button class="js-step">1 ШАГ</button>');
$('body').append('<div class="js-wrap__content" style="display: none;"><div class="js-field"></div></div>');
$('body').append('<div class="js-popup-message" style="display: none;"><div class="popup-message__content"><div class="popup-message__text"></div><button class="js-popup-message-close"></button></div></div>');

require('./spec.js');

$('body').append('<div id="mocha"></div>');
$('body').append('<script> mocha.run();</script>');
