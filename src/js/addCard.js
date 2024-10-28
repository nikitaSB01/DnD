// addCard.js
const addCard = (boardData, columnKey, container, renderBoard) => {
  const cardText = prompt('Enter card text:');
  if (cardText) {
    boardData[columnKey].push({ text: cardText });
    localStorage.setItem('boardData', JSON.stringify(boardData));
    renderBoard(boardData, container);
  }
};

export default addCard;
