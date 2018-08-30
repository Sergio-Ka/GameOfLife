var $slider1 = $('.js-slider-1');
$slider1.slider({
    min: 1,
    max: 10,
    value: 8,
    create: function (event, ui) {
        var $sliderhandle = $('.ui-slider-handle');
        $sliderhandle.append('<input class="slider-value js-slider-value" value="8"/><div class="slider-value__tail"></div>');
    },
    slide: function (event, ui) {
        var $slidervalue = $(".js-slider-value");
        $slidervalue.val(ui.value);
    }
});