'use strict';

export default class ModelChangeField {

    // метод для манипуляции экземпляром поля в соответствии с алгоритмом

    FieldManipulatorByAlgorithm(Field) {

        // создаем переменные - массив для перещета и вспомогательную

        var RecountedField = new Array(Field.X);
        var Summ;

        for (var i = 1; i < Field.X-1; i++) {

            RecountedField[i] = new Array(Field.Y);

            for (var j = 1; j < Field.Y-1; j++) {

                // для каждой ячейки считаем количество живых соседей

                Summ = 0;
                for (var k = i - 1; k < i + 2; k++) {
                    for (var l = j - 1; l < j + 2; l++) {
                        Summ += Field.ReadSquareValueByCoordinate(k, l);
                    }
                }

                // заполняем вспомогательный массив на основе значения самой ячейки и количества живых соседей

                if (Field.ReadSquareValueByCoordinate(i, j) == 0 && Summ == 3) {
                    RecountedField[i][j] = 1;
                }
                else if (Field.ReadSquareValueByCoordinate(i, j) == 1 && (Summ == 3 || Summ == 4)) {
                    RecountedField[i][j] = 1;
                }
                else if (Field.ReadSquareValueByCoordinate(i, j) == 1 && (Summ < 3 || Summ > 4)) {
                    RecountedField[i][j] = 0;
                }
            }
        }

        /* записываем данные во все поля (на текущем, прошлом и позапрошлом шаге) каждого экземпляра ячейки
        текущего экземпляра поля в соответствии с пересчитанным новым полем */

        for (i = 0; i < Field.X; i++) {
            for (j = 0; j < Field.Y; j++) {
                Field.SetSquareValueOnPGByCoordinate(i, j, Field.ReadSquareValueByCoordinateOnLastGen(i, j));
                Field.SetSquareValueOnLGByCoordinate(i, j, Field.ReadSquareValueByCoordinate(i, j));
                Field.SetSquareValueByCoordinate(i, j, RecountedField[i][j]);
            }
        }
    }
}