import { Component } from '../core/Component';

export class Form extends Component {
  setup(props) {
    this.state = {
      amount: ''
    };

    this.$rootElement = document.createElement('form');
    this.$rootElement.className = 'donate-form';

    const labelHTML = document.createElement('label');
    labelHTML.className = 'donate-form__input-label';
    labelHTML.textContent = 'Введите сумму в $';

    const inputHTML = document.createElement('input');
    inputHTML.className = 'donate-form__donate-input';
    inputHTML.name = 'amount';
    inputHTML.type = 'number';
    inputHTML.max = '100';
    inputHTML.min = '1';
    labelHTML.append(inputHTML);

    const buttonHTML = document.createElement('button');
    buttonHTML.className = 'donate-form__submit-button';
    buttonHTML.type = 'submit';
    buttonHTML.textContent = 'Задонатить';
    buttonHTML.setAttribute('disabled', 'true'); // Изначально кнопка отключена

    this.$rootElement.append(labelHTML, buttonHTML);

    this.$input = inputHTML;
    this.$button = buttonHTML;

    // Привязка контекста и установка слушателей
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.$input.addEventListener('input', this.handleInput);
    this.$rootElement.addEventListener('submit', this.handleSubmit);

    // Добавление обработчика onSubmit из props
    this.onSubmit = props.onSubmit || (() => { }); // Callback передается из App
  }

  get isValid() {
    const amount = Number(this.state.amount); // Проверяем валидность числа
    return amount >= 1 && amount <= 100;
  }

  handleInput(event) {
    this.state.amount = event.target.value; // Сохраняем значение в state
    if (this.isValid) {
      this.$button.removeAttribute('disabled'); // Активируем кнопку
    } else {
      this.$button.setAttribute('disabled', 'true'); // Деактивируем кнопку
    }
  }

  handleSubmit(event) {
    event.preventDefault(); // Отключаем перезагрузку страницы
    if (this.isValid) {
      this.onSubmit(Number(this.state.amount)); // Вызываем callback и передаем сумму
      this.state.amount = '';
      this.$input.value = ''; // Сбрасываем поле ввода
      this.$button.setAttribute('disabled', 'true'); // Снова отключаем кнопку
    }
  }
}
