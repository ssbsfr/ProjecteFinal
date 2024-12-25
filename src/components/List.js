import { Component } from '../core/Component';

export class List extends Component {
  setup() {
    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'donates-container';

    const h2HTML = document.createElement('h2');
    h2HTML.className = 'donates-container__title';
    h2HTML.textContent = 'Список донатов';

    const divHTMLDonatesContainerDonates = document.createElement('div');
    divHTMLDonatesContainerDonates.className = 'donates-container__donates';

    this.$rootElement.append(h2HTML, divHTMLDonatesContainerDonates);

    this.$listContainer = divHTMLDonatesContainerDonates;
    console.log('listContainer: ', this.$listContainer);
  }

  addItem(item) {
    this.$listContainer.appendChild(item.$rootElement); // Добавляем элемент
  }

  removeItem(item) {
    this.$listContainer.removeChild(item.$rootElement); // Удаляем элемент
  }
}
