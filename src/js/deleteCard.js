// deleteCard.js
const deleteCard = (boardData, cardText, columnKey, container, renderBoard) => {
  // Создаем новую версию boardData
  const newBoardData = { ...boardData };
  newBoardData[columnKey] = newBoardData[columnKey].filter((card) => card.text !== cardText);

  localStorage.setItem('boardData', JSON.stringify(newBoardData));
  renderBoard(newBoardData, container);
};

export default deleteCard;
