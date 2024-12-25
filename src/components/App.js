import { Component } from '../core/Component';
import { Form } from './Form';
import { List } from './List';
import { ListItem } from './ListItem';

export class App extends Component {
  setup(props) {
    this.state = {
      total: 0,
      donates: [],
    };

    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'app';

    const h1HTML = document.createElement('h1');
    h1HTML.className = 'total-amount';
    const spanHTML = document.createElement('span');
    spanHTML.textContent = `Итого: $${this.state.total}`;
    h1HTML.append(spanHTML);

    this.$total = spanHTML;

    this.$rootElement.prepend(h1HTML);

    const donateForm = new Form({
      onSubmit: this.onItemCreate.bind(this),
    });

    this.$rootElement.appendChild(donateForm.$rootElement);

    this.donateList = new List();
    this.$rootElement.appendChild(this.donateList.$rootElement);
  }

  onItemCreate(amount) {
    const item = new ListItem({
      amount,
      onDelete: this.onItemDelete.bind(this), // Передаем callback для удаления
    });

    this.state.donates.push(item); // Добавляем в массив
    this.state.total += Number(amount); // Обновляем сумму
    this.$total.textContent = `Итого: $${this.state.total}`;

    this.donateList.addItem(item);
  }

  onItemDelete(item) {
    // Удаляем элемент из списка
    this.donateList.removeItem(item);

    // Уменьшаем сумму
    this.state.total -= Number(item.state.amount);
    this.$total.textContent = `Итого: $${this.state.total}`;

    // Удаляем элемент из массива
    this.state.donates = this.state.donates.filter((donate) => donate !== item);
  }
}
