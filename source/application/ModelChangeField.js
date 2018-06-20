'use strict';

export default class ModelChangeField {

    // метод для манипуляции экземпляром поля в соответствии с алгоритмом

    FieldManipulatorByAlgorithm(Field) {

        // создаем переменные - массив для пересчета и вспомогательную

        var RecountedField = new Array(Field.X);
        var Summ;

        for (var i = 0; i < Field.X; i++) {

            RecountedField[i] = new Array(Field.Y);

            for (var j = 0; j < Field.Y; j++) {

                // инициализация элементов вспомогательного массива нулями, чтобы всяких там сюрпризов не было

                RecountedField[i][j] = 0;

                // для каждой ячейки считаем количество живых соседей

                if (i != 0 && i != Field.X - 1 && j != 0 && j != Field.Y - 1) {
                    Summ = 0;
                    for (var k = i - 1; k < i + 2; k++) {
                        for (var l = j - 1; l < j + 2; l++) {
                            Summ += +Field.ReadSquareValueByCoordinate(k, l);
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

        Field.NumberOfGeneration++;
    }

    // метод для просмотра экземпляра поля и выдачи сигнала к остановке игры если сложились условия

    StopGame(Field) {

        // оставновка программы, если во вселенной не осталось жизни

        var SummAllField = 0;

        for (var i = 1; i < Field.X - 1; i++) {
            for (var j = 1; j < Field.Y - 1; j++) {
                SummAllField += Field.ReadSquareValueByCoordinate(i, j);
            }
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

        // запись результатов в поле

        if (SummAllField == 0) {
            Field.GameOver = 1;
        }
        else if (EndOfGame2 == Field.X * Field.Y) {
            Field.GameOver = 3;
        }
        else if (EndOfGame1 == Field.X * Field.Y) {
            Field.GameOver = 2;
        }
        else {
            Field.GameOver = 0;
        }
    }
}