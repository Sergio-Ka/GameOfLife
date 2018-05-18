'use strict';

export default class View {
    UpdateView(ModelField)
    {
        // элементу, который выводит таблицы задаем количество столбцов и строк
        Form1.dataGridView1.ColumnCount = ModelField.X;
        Form1.dataGridView1.RowCount = ModelField.Y;

        // устанавливаем равномерную ширину и высоту строк расчетно, делением ширины и высоты поля на количество строк и столбцов
        for (int i = 0; i < ModelField.X; i++)
        {
            Form1.dataGridView1.Rows[i].Height = (int)(Form1.dataGridView1.Height / ModelField.X);
        }
        for (int j = 0; j < ModelField.Y; j++)
        {
            Form1.dataGridView1.Columns[j].Width = (int)(Form1.dataGridView1.Width / ModelField.Y);
        }

        for (int i = 0; i < ModelField.X; i++)
        {
            for (int j = 0; j < ModelField.Y; j++)
            {
                if (ModelField.ReadSquareValueByCoordinate(i, j) == 0)
                {
                    Form1.dataGridView1.Rows[i].Cells[j].Style.BackColor = Color.White;
                }
                else if (ModelField.ReadSquareValueByCoordinate(i, j) == 1)
                {
                    Form1.dataGridView1.Rows[i].Cells[j].Style.BackColor = Color.Green;
                }
                else if (ModelField.ReadSquareValueByCoordinate(i, j) == 1)
                {
                    Form1.dataGridView1.Rows[i].Cells[j].Style.BackColor = Color.Green;
                }
            }
        }

        Form1.dataGridView1.ClearSelection();
    }
}