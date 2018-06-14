'use strict';

export default class ModelStopGame {
    StopGame(Field) {

        // оставновка программы, если во вселенной не осталось жизни

        var SummAllField = 0;

        for (var i = 1; i < Field.X - 1; i++) {
            for (var j = 1; j < Field.Y - 1; j++) {
                SummAllField += Field.ReadSquareValueByCoordinate(i, j);
            }
        }

        if (SummAllField == 0) {
            return true;
        }

        // оставновка программы, если во вселенной складываются устойчивые комбинации

        var EndOfGame1 = 0;
        var EndOfGame2 = 0;

        // сравнение массивов на 2х и 3х последних шагах
        
        for (i = 0; i < Field.X; i++) {
            for (j = 0; j < Field.Y; j++) {
                if (Field.ReadSquareValueByCoordinateOnLastGen(i, j) == Field.ReadSquareValueByCoordinate(i, j)) {
                    EndOfGame1++;
                }
                if (Field.ReadSquareValueByCoordinateOnPenultGen(i, j) == Field.ReadSquareValueByCoordinate(i, j)) {
                    EndOfGame2++;
                }
            }
        }

        if (EndOfGame1 == Field.X * Field.Y || EndOfGame2 == Field.X * Field.Y) {
            return true;
        }
    }
}