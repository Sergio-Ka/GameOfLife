# GameOfLife
JavaScript Game of Life by John Conway

Игра Жизнь Джона Конвея, реализованнная на языке Java Script

GitHubPages: https://sergio-ka.github.io/GameOfLife/

Диаграмма классов UML: https://sergio-ka.github.io/GameOfLife/UML-diagram-of-class.png

Клонирование репозитория:
git clone https://github.com/Sergio-Ka/GameOfLife.git

Установка модулей для сборки:
npm i (или npm install)

Команды:
- разовая сборка для production: npm run build,
- сборка для разработки (с опцией -watch и без минификации js-файла сборки): npm run dev,
- сервер с live reload: npm run server, http://localhost:8080/.

Для открытия игры запустить index.html в папке /public. Для тестов открыть test.html в папке /public либо перейти по кнопке ТЕСТ с экрана игры.

Структура игры состоит из следующих классов:

1. Класс Cell. Класс ячейки. В своем единственном поле содержит информацию о содержимом ячейки (статусы "жива"-"мертва"). Так же содержит методы для доступа к этиму полю. При вызове конструктора поле равно 0 (то есть "мертва"). Содержит так же метод, который при его вызове меняет состояние в текущем поколении на противоположное для данной ячейки. Класс относится к Model паттерна MVC.

2. Класс Field. Класс поля (или "вселенной"). В своих полях содержит: псевдодвумерный массив для населения его экземплярами класса ячейки; массив с историей содержащий поля на всех шагах; размеры поля по вертикали и горизонтали (инициализируются при вызове конструктора цифрами 3 - минимально допустимый размер); номер текущего поколения (инициализируется числом 1); флаг остановки игры (инициализируется значением false). В составе класса имеются методы для доступа к размерам поля, номеру поколения, значения флага остановки игры, которые осуществляют валидацию значений при записи. Так же имеются следующие методы:
+ "createRandomField" - создает массив необходимой размерности, заполняет его экземплярами класса Cell, устанавливает рандомное значение для текущего шага у каждой ячейки (0 или 1 - "мертва" или "жива").
+ "clearField" - устанавдивает статус каждой клетки = 0 ("мертва").
+ "cropFieldOnX" и "cropFieldOnY" данные методы обрезают до нужных размеров имеющееся поле справа и снизу с сохранением состояния оставшейся области.
+ "enlargeFieldOnX" и "enlargeFieldOnY" данные методы дополняют до указанных размеров имеющееся поле справа и снизу пустыми ("мертвыми") ячейками. На любом шаге игра может быть остановлена и размеры поля могут быть изменены, ячейки могут быть дорисованы или стерты, а игра продолжена далее.
+ "toggleCellLifeStatus" меняет значение ячейки пна противоположное по указанным координатам (для возможности изменения состояния ячейки по клику на ней). 
Импортирует Cell. Класс относится к Model паттерна MVC.

Два этих класса используются только как структуры для хранения информации, логики игры в них нет.

3. Класс FieldChanger. Класс обсчета поля. Содержит несколько методов. Метод "makeStep" обеспечивает с помощью вспомагательных методов обработку значений ячеек имеющегося поля и изменение их состояний в соответствии с логикой игры. Метод "_StopGame" с помощью вспомагательных методов просматривает поле на всех поколениях и сравнивает их с текущим и если складываются условия для остановки игры, генерирует сигнал остановки. Второй метод запускается внутри первого и является приватным. Класс относится к Model паттерна MVC.

Данный класс содержит основную логику игры.

4. Класс FacadeOfModel. Класс отвечает за реализацию фасада по паттерну Фасад для многофайловой модели. Фактически преобразует много мелких низкоуровневых методов модели к небольшому числу высокоуровневых методов, которые и образуют интерфейс (савокупность публичных членов класса) модели. Так же данный класс берет на себя роль издателя и подписчика в паттерне Наблюдатель на вход принимаются события и данные от контроллера, что вызывает в свою очередь вызов высокоуровневых методов фасада, на выход генерируются события, которые прослушивает контроллер, сообщающие о состоянии модели.

5. Класс View. Класс отвечает за отрисовку поля, отображение номера текущего поколения и вывод информационного окошка об остановке игры. За данную часть функционала отвечает метод "_createView". Класс реализует сущность подписчика и слушает события контроллера. Из него берет данные о состоянии ячеек, создает таблицу поля в html документе с соответствующим классами CSS нужных ячеек, обеспечивающими цветовое оформление состояний "жив"-"мертв". Кроме этого присваивает ячейкам таблицы атрибут data-id, в котором указаны координаты в ячейке. Это необходимо для возможности рисовать поле кликом мышки по ячейкам. Вторая часть класса отвечает за навешивание событий контролам, которые являются частью отображения. Эта часть генерирует события, прослушиваемые контроллером и реализует сущность издателя, сообщая о своем состоянии подписчикам. Класс относится к View паттерна MVC.

6. Класс Controller. Служит посредником между моделью и отображением, принимая события одного класса и генерируя нужные события для другого класса. Так же содержит логику запуска пересчета поля модели с нужным интервалом времени, что обеспечивает автоматическую прокрутку игры.
Класс относится к Controller паттерна MVC.

7. Класс Observer. Класс, от которого наследуются классы фасада, контролера и отображения. Содержит в себе универсальные методы для реализации паттерна Наблюдатель-Издатель, позволяющие стать любому классу, который наследуется от этого класса либо издателем либо подписчиком, либо одновременно и тем и другим.

8. Класс Application. Класс приложения, в нем создаются инстансы каждого класса и передаются ссылки друг на друга для последующего оформления подписок в соответствии с паттерном Наблюдатель. Экземпляры классов FacadeOfModel (в его модуль уже импортирован класс Field (в который импортируется класс Cell) и класс FieldChanger), View подписываются на события класса Controller, а класс контроллера подписан на события класса View и FacadeOfModel. Application.js подключен к html-странице, на которой созданы контролы с соответствующими классами, и создан блок для отрисовки в нем таблицы для отображения поля. Таким образом обеспечивается разделение приложения на четкие слои. Сама информация и логика ее преобразования содержится в классах Model, вызывает эти преобразования класс Controller, обрабатывая события взаимодействия с контролами, которые генерируются во View, он же передает классу View команду на отображение обрабатывая события, прослушиваемые от класса фасада модели. View берет необходимую информацию для отображения при прослушивании класса контроллера.