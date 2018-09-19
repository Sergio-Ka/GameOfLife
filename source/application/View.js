class View {
  constructor() {
    this.document = window.document;
  }

  updateView(field) {
    const content = this.document.getElementsByClassName('page__content')[0];
    const generation = this.document.getElementsByClassName('generation')[0];
    let tr;
    let td;
    let [table] = this.document.getElementsByClassName('universe');

    if (table) {
      content.removeChild(table);
    }

    table = content.appendChild(this.document.createElement('div'));
    table.setAttribute('class', 'universe');

    const fragment = this.document.createDocumentFragment();

    /* заполняем ячейку строками и ячейками в них
       data-id ячеек - координаты х,у будут нужны для обработчика клика по ячейке
       для изменения ее состояния цвет ячейки в соответствии с модификатором
       класса, назанчаемым на CSS */
    for (let i = 0; i < field.getX(); i += 1) {
      tr = fragment.appendChild(this.document.createElement('div'));
      tr.setAttribute('class', 'universe__line');
      for (let j = 0; j < field.getY(); j += 1) {
        td = tr.appendChild(this.document.createElement('div'));
        td.setAttribute('data-id', `${i} ${j}`);
        if (field.readSquareValueByCoordinate(i, j) === 0) {
          td.setAttribute('class', 'universe__square universe__square_isDead');
        } else if (field.readSquareValueByCoordinate(i, j) === 1) {
          td.setAttribute('class', 'universe__square universe__square_isAlive');
        }
      }
    }

    table.appendChild(fragment);

    generation.setAttribute('value', field.getNumberOfGeneration());

    switch (field.getGameOver()) {
      case 1: alert('Игра закончена, так как во вселенной не осталось жизни!');
        break;
      case 2: alert('Игра закончена, так как во вселенной сложились устойчивые комбинации на 2-х последних поколениях!');
        break;
      case 3: alert('Игра закончена, так как во вселенной сложились устойчивые комбинации на текущем и предпоследнем поколениях!');
        break;
      default:
        break;
    }
  }
}

export {
  View,
};
