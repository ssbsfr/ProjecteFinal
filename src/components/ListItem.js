import { Component } from '../core/Component';

export class ListItem extends Component {
  setup(props) {
    // Устанавливаем состояние
    this.state = {
      id: Date.now(), // Генерация уникального идентификатора
      date: new Date(), // Текущая дата
      amount: props.amount, // Сумма доната
    };

    // Создаем корневой элемент
    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'donate-item';

    // Форматируем дату для отображения
    const formattedDate = this.state.date.toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    // Создаем структуру элемента
    this.$rootElement.innerHTML = `
      ${formattedDate} - <b>$${this.state.amount}</b>
    `;

    // Кнопка удаления
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Удалить';
    deleteButton.addEventListener('click', this.handleDelete.bind(this)); // Привязываем обработчик удаления

    this.$rootElement.appendChild(deleteButton); // Добавляем кнопку в корневой элемент
  }

  handleDelete() {
    if (this.props.onDelete) {
      this.props.onDelete(this); // Вызываем callback для удаления
    }
  }
}
