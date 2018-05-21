'use strict';

export default class View {

    // метод для отрисовки поля на странице

    UpdateView(Field) {
        // объявление переменных, получение доступа к элементу, в котором создается таблица вселенной
            
        var table, tr, td;
        var content = document.getElementsByClassName("page__content")[0];
    
        // проверка наличия уже созданной ранее таблицы вселенной, если есть то удаляем ее
            
        table = document.getElementById("universe");    
        if ( table != null) {
            content.removeChild(table);
        }
            
        // создаем новую таблицу вселенной с id=universe
    
        table = content.appendChild(document.createElement("table"));
        table.setAttribute("id", "universe");
    
        // заполняем ячейку строками и ячейками в них
        // id ячеек - координаты х,у будут нужны для обработчика клика по ячейке для изменения ее состояния
        // цвет ячейки в соответствии с модификатором класса, назанчаемым на CSS
        
        for (var i = 0; i < Field.X; i++) {
            tr = table.appendChild(document.createElement("tr"));
            for (var j = 0; j < Field.Y; j++) {
                td = tr.appendChild(document.createElement("td"));
                td.setAttribute("id", i.toString()+" "+j.toString());
                if (Field.field[i][j].Value == 0) {
                    td.setAttribute("class", "universe__square universe__square_isDead");
                }
                else if (Field.field[i][j].Value == 1) {
                    td.setAttribute("class", "universe__square universe__square_isAlive");
                }
            }
        }
    }
}