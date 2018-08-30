'use strict';

export default class Controller {
    Main(EField, EModelChangeField, EView) {
        var TimerId, StartFlag = false, CreateFieldFlag = false;

        // обработчик кнопки создать, присвоение размеров полю, вызов метода по созданию поля

        var ButtonCreateU = document.getElementsByClassName("create-universe")[0];
        ButtonCreateU.addEventListener("click", function () {
            SetSizeOfField();
            EField.CreateRandomField();
            EView.UpdateView(EField);
            CreateFieldFlag = true;
        });

        // обработчик кнопки стереть, присвоение размеров полю, вызов метода по стиранию поля (по факту - заполнения ячейками в состоянии 0)

        var ButtonClearU = document.getElementsByClassName("clear-universe")[0];
        ButtonClearU.addEventListener("click", function () {
            SetSizeOfField();
            EField.ClearField();
            EView.UpdateView(EField);
            CreateFieldFlag = true;
        });

        // обработчик кнопки старт, запускает таймер

        var ButtonStartGame = document.getElementsByClassName("start-game")[0];
        ButtonStartGame.addEventListener("click", function () {
            Timer();
            StartFlag = true;
        });

        // обработчик кнопки стоп, обнуляет таймер

        var ButtonStopGame = document.getElementsByClassName("stop-game")[0];
        ButtonStopGame.addEventListener("click", function () {
            clearInterval(TimerId);
            StartFlag = false;
        });

        // обработчик кнопки для продвижения на 1 шаг

        var ButtonStep = document.getElementsByClassName("step")[0];
        ButtonStep.addEventListener("click", function () {
            EModelChangeField.FieldManipulatorByAlgorithm(EField);
            EView.UpdateView(EField);
        });

        // обработчик клика по ячейке

        document.body.addEventListener("click", function (event) {
            if (event.target.nodeName == "DIV") {
                if(event.target.getAttribute("id") != null) {
                    var Coordinate = event.target.getAttribute("id").split(" ");
                    EField.ChangeSquareValueByCoordinate(Coordinate[0], Coordinate[1]);
                    EView.UpdateView(EField);
                }
            }
        });

        // обработчик анфокуса поля ввода высоты

        var HeightInput = document.getElementsByClassName("field-height")[0];
        HeightInput.onblur = function () {
            var X = +document.getElementsByClassName("field-height")[0].value;

            if (CreateFieldFlag) {
                if (X < EField.X) {
                    EField.CropFieldOnX(X);
                }
                else if (X > EField.X) {
                    EField.EnlargeFieldOnX(X);
                }

                EView.UpdateView(EField);
            }
        }

        // обработчик анфокуса поля ввода ширины

        var WidthInput = document.getElementsByClassName("field-width")[0];
        WidthInput.onblur = function () {
            var Y = +document.getElementsByClassName("field-width")[0].value;

            if (CreateFieldFlag) {
                if (Y < EField.Y) {
                    EField.CropFieldOnY(Y);
                }
                else if (Y > EField.Y) {
                    EField.EnlargeFieldOnY(Y);
                }

                EView.UpdateView(EField);
            }
        }

        // обработчики контрола скорости для динамического ее изменения

        var Slider = document.getElementsByClassName("ui-slider-handle")[0];
        Slider.addEventListener("mouseup", function () {
            if (StartFlag) {
                Timer();
            }
        });

        Slider.addEventListener("mousemove", function () {
            if (StartFlag) {
                Timer();
            }
        });

        // функции +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        function Timer() {
            var Speed = +document.getElementsByClassName("js-slider-value")[0].value;
            clearInterval(TimerId);
            TimerId = setInterval(function () {
                EModelChangeField.StopGame(EField);
                EModelChangeField.FieldManipulatorByAlgorithm(EField);
                EView.UpdateView(EField);
                if (EField.GameOver != 0) {
                    clearInterval(TimerId);
                    StartFlag = false;
                    EField.GameOver = 0;
                }
            }, (10 - Speed) * 100);
        }

        function SetSizeOfField() {
            if (document.getElementsByClassName("field-height")[0].value / 2 == 0) {
                document.getElementsByClassName("field-height")[0].value = 47;
            }
            if (+document.getElementsByClassName("field-height")[0].value > 100) {
                EField.X = 100;
                document.getElementsByClassName("field-height")[0].value = 100;
            }
            else {
                EField.X = +document.getElementsByClassName("field-height")[0].value;
            }
            if (document.getElementsByClassName("field-width")[0].value / 2 == 0) {
                document.getElementsByClassName("field-width")[0].value = 100;
            }
            if (+document.getElementsByClassName("field-width")[0].value > 100) {
                EField.Y = 100;
                document.getElementsByClassName("field-width")[0].value = 100;
            }
            else {
                EField.Y = +document.getElementsByClassName("field-width")[0].value;
            }
        }
    }
}