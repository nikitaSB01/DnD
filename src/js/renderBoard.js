// renderBoard.js
function renderBoard(boardData, columns, container, onDragStart, onDragOver, onDrop, deleteCard) {
  // Создание новой версии контейнера, чтобы избежать изменения параметров
  const newContainer = document.createElement('div');

  // Создание колонок
  columns.forEach((column, index) => {
    const columnEl = document.createElement('div');
    columnEl.className = 'column';
    columnEl.setAttribute('data-column', index);

    const header = document.createElement('h3');
    header.textContent = column.title;
    columnEl.appendChild(header);

    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';

    // Создание карточек
    boardData[column.key].forEach((card) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'card';
      cardEl.textContent = card.text;

      // Удаление карточки
      const deleteBtn = document.createElement('span');
      deleteBtn.textContent = '\uE951'; // Символ крестика
      deleteBtn.className = 'delete-btn';
      deleteBtn.onclick = () => {
        deleteCard(boardData, card.text, column.key, container, renderBoard);
      };

      cardEl.appendChild(deleteBtn);
      cardContainer.appendChild(cardEl);

      // Перетаскивание карточки
      cardEl.draggable = true;
      cardEl.ondragstart = (e) => onDragStart(e, cardEl, column.key);
      cardEl.ondragover = onDragOver;
      cardEl.ondrop = (e) => onDrop(e, column.key, boardData, container, renderBoard, deleteCard);
    });

    columnEl.appendChild(cardContainer);
    newContainer.appendChild(columnEl);
  });

  // Очищаем контейнер и добавляем новый контент
  while (container.firstChild) {
    container.removeChild(container.firstChild); // Удаляем все дочерние элементы
  }
  container.appendChild(newContainer); // Добавляем новый контент
}

export default renderBoard;
