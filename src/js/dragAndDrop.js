// dragAndDrop.js
const onDragStart = (e, cardEl, columnKey) => {
  e.dataTransfer.setData('text/plain', JSON.stringify({ text: cardEl.textContent, columnKey }));
};

const onDragOver = (e) => {
  e.preventDefault();
};

const onDrop = (e, targetColumnKey, boardData, container, renderBoard, deleteCard) => {
  e.preventDefault();
  const { text, columnKey } = JSON.parse(e.dataTransfer.getData('text/plain'));
  deleteCard(boardData, text, columnKey, container, renderBoard);
  boardData[targetColumnKey].push({ text });
  localStorage.setItem('boardData', JSON.stringify(boardData));
  renderBoard(boardData, container);
};

export { onDragStart, onDragOver, onDrop };
