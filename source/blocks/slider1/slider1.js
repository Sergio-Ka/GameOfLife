$("#slider1").slider({ // вид первого слайдера и настройки
    value: '',
    min: 1,
    max: 10,
	value: 5,
    create: function (event, ui) {
        $('.ui-slider-handle').append('<input class="sliderValue" value="5"/>');
        $('.ui-slider-handle').append('<div class="sliderValue_2"></div>');
    },
    slide: function (event, ui) {
        $(".sliderValue").val(ui.value);
    }
});