$("#slider1").slider({ // вид первого слайдера и настройки
    value: '',
    min: 0,
    max: 100,
	value: 50,
    create: function (event, ui) {
        $('.ui-slider-handle').append('<input class="sliderValue" value="50"/>');
        $('.ui-slider-handle').append('<div class="sliderValue_2"></div>');
    },
    slide: function (event, ui) {
        $(".sliderValue").val(ui.value);
    }
});