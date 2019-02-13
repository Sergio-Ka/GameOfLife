class SliderWithPopUp {

  constructor($element) {
    this.$element = $element;
    this.initSlider();
  }

  getSliderSettings() {
    const value = this.$element.data('value');

    return {
      min: this.$element.data('min'),
      max: this.$element.data('max'),
      step: this.$element.data('step'),
      value: value,
      range: this.$element.data('range'),
      create: (event) => {
        const $sliderHandle = $(event.target).find('.ui-slider-handle');
        $sliderHandle.append(`<input class="slider-value js-slider-value" value="${value}"/><div class="slider-value__tail"></div>`);
      },
      slide: (event, ui) => {
        const $sliderValue = $(event.target).find('.js-slider-value');
        $sliderValue.val(ui.value);
      },
    }
  }

  initSlider() {
    this.$element.slider(this.getSliderSettings());

    const $sliderTheme = this.$element.data('theme');
    const $sliderHandle = this.$element.find('.ui-slider-handle');
    const $sliderMinRange = this.$element.find('.ui-slider-range-min');

    $sliderHandle.addClass(`slider-with-pop-up__handle_theme_${$sliderTheme}`);
    $sliderMinRange.addClass(`slider-with-pop-up__range-min_theme_${$sliderTheme}`);
  }
}

$('.js-slider-with-pop-up').each((index, domElement) => {
  new SliderWithPopUp($(domElement));
});