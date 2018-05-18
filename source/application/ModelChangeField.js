'use strict';

export default class ModelChangeField {
    FieldManipulatorByAlgorithm(ModelField) {
        var RecountedField = new Array(ModelField.X);
        var Summ;

        for (var i = 1; i < ModelField.X-1; i++) {
            for (var j = 1; j < ModelField.Y-1; j++) {
                Summ = 0;
                for (var k = i - 1; k < i + 2; k++) {
                    for (var l = j - 1; l < j + 2; l++) {
                        Summ += ModelField.ReadSquareValueByCoordinate(k, l);
                    }
                }

                RecountedField[i] = new Array(ModelField.Y);

                if (ModelField.ReadSquareValueByCoordinate(i, j) == 0 && Summ == 3) {
                    RecountedField[i][j] = 1;
                }
                else if (ModelField.ReadSquareValueByCoordinate(i, j) == 1 && (Summ == 3 || Summ == 4)) {
                    RecountedField[i][j] = 1;
                }
                else if (ModelField.ReadSquareValueByCoordinate(i, j) == 1 && (Summ < 3 || Summ > 4)) {
                    RecountedField[i][j] = 0;
                }
            }
        }

        for (i = 0; i < ModelField.X; i++) {
            for (j = 0; j < ModelField.Y; j++) {
                ModelField.SetSquareValueOnPGByCoordinate(i, j, ModelField.ReadSquareValueByCoordinateOnLastGen(i, j));
                ModelField.SetSquareValueOnLGByCoordinate(i, j, ModelField.ReadSquareValueByCoordinate(i, j));
                ModelField.SetSquareValueByCoordinate(i, j, RecountedField[i][j]);
            }
        }
    }
}