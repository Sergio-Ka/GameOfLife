'use strict';

export default class Controller {
    Main(EField, EModelChangeField, EView) {
        var TimerId, StartFlag = false, CreateFieldFlag = false;

        // обработчик кнопки создать, присвоение размеров полю, вызов метода по созданию поля

        var ButtonCreateU = document.getElementById("create-universe");
        ButtonCreateU.addEventListener("click", function () {
            SetSizeOfField();
            EField.CreateRandomField();
            EView.UpdateView(EField);
            CreateFieldFlag = true;
        });

        // обработчик кнопки стереть, присвоение размеров полю, вызов метода по стиранию поля (по факту - заполнения ячейками в состоянии 0)

        var ButtonClearU = document.getElementById("clear-universe");
        ButtonClearU.addEventListener("click", function () {
            SetSizeOfField();
            EField.ClearField();
            EView.UpdateView(EField);
            CreateFieldFlag = true;
        });

        // обработчик кнопки старт, запускает таймер

        var ButtonStartGame = document.getElementById("start-game");
        ButtonStartGame.addEventListener("click", function () {
            Timer();
            StartFlag = true;
        });

        // обработчик кнопки стоп, обнуляет таймер

        var ButtonStopGame = document.getElementById("stop-game");
        ButtonStopGame.addEventListener("click", function () {
            clearInterval(TimerId);
            StartFlag = false;
        });

        // обработчик кнопки для продвижения на 1 шаг

        var ButtonStep = document.getElementById("step");
        ButtonStep.addEventListener("click", function () {
            EModelChangeField.FieldManipulatorByAlgorithm(EField);
            EView.UpdateView(EField);
        });

        // обработчик клика по ячейке

        document.body.addEventListener("click", function (event) {
            if (event.target.nodeName == "TD") {
                var Coordinate = event.target.getAttribute("id").split(" ");
                EField.ChangeSquareValueByCoordinate(Coordinate[0], Coordinate[1]);
                EView.UpdateView(EField);
            }
        });

        // обработчик анфокуса поля ввода высоты

        var HeightInput = document.getElementById("field-height");
        HeightInput.onblur = function () {
            var X = +document.getElementById("field-height").value;

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

        var WidthInput = document.getElementById("field-width");
        WidthInput.onblur = function () {
            var Y = +document.getElementById("field-width").value;

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
            var Speed = +document.getElementsByClassName("sliderValue")[0].value;
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
            if (document.getElementById("field-height").value / 2 == 0) {
                document.getElementById("field-height").value = 38;
            }
            if (+document.getElementById("field-height").value > 100) {
                EField.X = 100;
                document.getElementById("field-height").value = 100;
            }
            else {
                EField.X = +document.getElementById("field-height").value;
            }
            if (document.getElementById("field-width").value / 2 == 0) {
                document.getElementById("field-width").value = 100;
            }
            if (+document.getElementById("field-width").value > 100) {
                EField.Y = 100;
                document.getElementById("field-width").value = 100;
            }
            else {
                EField.Y = +document.getElementById("field-width").value;
            }
        }
    }
}