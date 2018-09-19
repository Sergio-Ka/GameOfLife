const $slider1 = $('.js-slider-1');
$slider1.slider({
  min: 1,
  max: 10,
  value: 8,
  create: (function create() {
    const $sliderHandle = $('.ui-slider-handle');
    $sliderHandle.append('<input class="slider-value js-slider-value" value="8" disabled/><div class="slider-value__tail"></div>');
  }),
  slide: (function slide(event, ui) {
    const $sliderValue = $('.js-slider-value');
    $sliderValue.val(ui.value);
  }),
});
