'use strict';

export default class ModelStopGame {
    StopGame(ModelField, Form1) {
        // оставновка программы, если во вселенной не осталось жизни
        var SummAllField = 0;

        for (var i = 1; i < ModelField.X - 1; i++) {
            for (var j = 1; j < ModelField.Y - 1; j++) {
                SummAllField += ModelField.ReadSquareValueByCoordinate(i, j);
            }
        }

        if (SummAllField == 0) {
            // останавливаем таймер
            /*Form1.timer1.Stop();
            // делаем таймер недоступным
            Form1.timer1.Enabled = false;*/
        }
        
        // оставновка программы, если во вселенной складываются устойчивые комбинации
        var EndOfGame1 = 0;
        var EndOfGame2 = 0;

        // сравнение массивов на 2х и 3х последних шагах
        for (i = 0; i < ModelField.X; i++) {
            for (j = 0; j < ModelField.Y; j++) {
                if (ModelField.ReadSquareValueByCoordinateOnLastGen(i, j) == ModelField.ReadSquareValueByCoordinate(i, j)) {
                    EndOfGame1++;
                }
                if (ModelField.ReadSquareValueByCoordinate(i, j) == ModelField.ReadSquareValueByCoordinateOnPenultGen(i, j)) {
                    EndOfGame2++;
                }
            }
        }

        if (EndOfGame1 == ModelField.X * ModelField.Y || EndOfGame2 == ModelField.X * ModelField.Y) {
            // останавливаем таймер
            /*Form1.timer1.Stop();
            // делаем таймер недоступным
            Form1.timer1.Enabled = false;*/
        }
    }
}