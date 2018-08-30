'use strict';

export default class View {
    UpdateView(Field) {
        
        // объявление переменных, получение доступа к элементу, в котором создается таблица вселенной

        var Table, Tr, Td;
        var Content = document.getElementsByClassName("page__content")[0];
        var Generation = document.getElementsByClassName("generation")[0];

        // проверка наличия уже созданной ранее таблицы вселенной, если есть то удаляем ее

        Table = document.getElementsByClassName("universe")[0];
        if (Table != null) {
            Content.removeChild(Table);
        }

        // создаем новую таблицу вселенной с id=universe

        Table = Content.appendChild(document.createElement("div"));
        Table.setAttribute("class", "universe");

        // заполняем ячейку строками и ячейками в них
        // id ячеек - координаты х,у будут нужны для обработчика клика по ячейке для изменения ее состояния
        // цвет ячейки в соответствии с модификатором класса, назанчаемым на CSS

        for (var i = 0; i < Field.X; i++) {
            Tr = Table.appendChild(document.createElement("div"));
            Tr.setAttribute("class", "universe__line");
            for (var j = 0; j < Field.Y; j++) {
                Td = Tr.appendChild(document.createElement("div"));
                Td.setAttribute("id", i.toString() + " " + j.toString());
                if (Field.ReadSquareValueByCoordinate(i, j) == 0) {
                    Td.setAttribute("class", "universe__square universe__square_isDead");
                }
                else if (Field.ReadSquareValueByCoordinate(i, j) == 1) {
                    Td.setAttribute("class", "universe__square universe__square_isAlive");
                }
            }
        }

        Generation.setAttribute("value", Field.NumberOfGeneration);

        switch(Field.GameOver) {
            case 1: alert("Игра закончена, так как во вселенной не осталось жизни!");
            break;
            case 2: alert("Игра закончена, так как во вселенной сложились устойчивые комбинации на 2-х последних поколениях!");
            break;
            case 3: alert("Игра закончена, так как во вселенной сложились устойчивые комбинации на текущем и предпоследнем поколениях!");
            break;
        }
    }
}