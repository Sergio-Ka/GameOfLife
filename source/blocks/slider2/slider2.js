$("#slider2").slider({ // вид второго слайдера и настройки
    value: '',
    min: 0,
    max: 100,
    value: 75,
    range: 'min'
});

// добавляем разные классы для одинаковых слайдеров чтобы настроить стили независимо

$('#slider2 .ui-slider-handle').each(function (index, handle) {
    if (index % 2 == 0)
    $(handle).addClass('even-handle');
    else $(handle).addClass('odd-handle');
});

$('#slider2 .ui-slider-range-min').each(function (index, handle) {
    if (index % 2 == 0)
    $(handle).addClass('even-range-min');
    else $(handle).addClass('odd-range-min');
});