// app.js
import renderBoard from './renderBoard';
import addCard from './addCard';
import deleteCard from './deleteCard';
import { onDragStart, onDragOver, onDrop } from './dragAndDrop';


const boardData = JSON.parse(localStorage.getItem('boardData')) || {
  todo: [],
  inProgress: [],
  done: [],
};

const columns = [
  { title: 'To Do', key: 'todo' },
  { title: 'In Progress', key: 'inProgress' },
  { title: 'Done', key: 'done' },
];

const container = document.getElementById('board');

// Вызовите функцию renderBoard после загрузки данных
renderBoard(boardData, columns, container, onDragStart, onDragOver, onDrop, deleteCard);

// Пример добавления карточки в первую колонку
document.getElementById('add-card-todo').addEventListener('click', () => addCard(boardData, 'todo', container, renderBoard));
document.getElementById('add-card-in-progress').addEventListener('click', () => addCard(boardData, 'inProgress', container, renderBoard));
document.getElementById('add-card-done').addEventListener('click', () => addCard(boardData, 'done', container, renderBoard));
