document.addEventListener("DOMContentLoaded", () => {
  let draggedEl = null;
  let offsetX = 0;
  let offsetY = 0;
  let initialContainer = null;
  let placeholder = null; // Элемент, который будет отображать место под сброс
  let isDragging = false; // Флаг для отслеживания начала перетаскивания
  let hasMoved = false; // Флаг, который будет отслеживать, переместилась ли карточка
  const moveThreshold = 10; // Минимальное расстояние для начала перемещения

  document.addEventListener("mousedown", (e) => {
    e.preventDefault(); // Предотвращаем выделение текста и другие действия при захвате

    if (e.target.classList.contains("card")) {
      draggedEl = e.target;
      const rect = draggedEl.getBoundingClientRect();

      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      const computedStyle = getComputedStyle(draggedEl);
      initialContainer = draggedEl.parentNode;

      // Получаем отступы карточки
      const marginBottom = parseInt(computedStyle.marginBottom, 10);
      const marginTop = parseInt(computedStyle.marginTop, 10);

      // Сохраняем размеры карточки с учетом отступов
      draggedEl.style.width = computedStyle.width;
      draggedEl.style.height = computedStyle.height;

      // Делаем карточку абсолютно позиционированной
      draggedEl.style.position = "absolute";
      draggedEl.style.zIndex = "1000";

      // Устанавливаем правильный курсор
      document.documentElement.style.cursor = "grabbing";

      // Создаем placeholder, который будет замещать карточку в списке
      placeholder = document.createElement("div");
      placeholder.className = "placeholder";
      placeholder.style.width = draggedEl.offsetWidth + "px";
      placeholder.style.height =
        draggedEl.offsetHeight + marginTop + marginBottom + "px"; // Учитываем отступы

      placeholder.style.background = "transparent"; // Место под сброс без рамки

      // Вставляем placeholder на место карточки
      initialContainer.insertBefore(placeholder, draggedEl);
      draggedEl.classList.add("dragged");

      // Прикрепляем карточку к body, чтобы она не ограничивалась контейнером
      document.body.appendChild(draggedEl);

      moveAt(e.pageX, e.pageY);
      hasMoved = false; // Изначально считаем, что карточка не была перемещена
    }
  });

  function moveAt(pageX, pageY) {
    draggedEl.style.left = pageX - offsetX + "px";
    draggedEl.style.top = pageY - offsetY + "px";
  }

  document.addEventListener("mousemove", (e) => {
    if (draggedEl) {
      moveAt(e.pageX, e.pageY);
      isDragging = true; // Начинаем перемещение

      // Если мышь двигается более чем на moveThreshold пикселей, считаем, что произошло перемещение
      const deltaX = Math.abs(e.clientX - offsetX);
      const deltaY = Math.abs(e.clientY - offsetY);

      if (deltaX > moveThreshold || deltaY > moveThreshold) {
        hasMoved = true; // Перемещение действительно произошло
      }

      // Обновляем размеры placeholder в реальном времени с учетом отступов
      const computedStyle = getComputedStyle(draggedEl);
      const marginBottom = parseInt(computedStyle.marginBottom, 10);
      const marginTop = parseInt(computedStyle.marginTop, 10);

      placeholder.style.width = draggedEl.offsetWidth + "px";
      placeholder.style.height =
        draggedEl.offsetHeight + marginTop + marginBottom + "px"; // Учитываем отступы

      // Пройдем по всем карточкам в колонке и вставим плейсхолдер перед той карточкой, куда будет сброшена текущая
      const cards = Array.from(initialContainer.querySelectorAll(".card"));
      let insertBeforeCard = null;

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const rect = card.getBoundingClientRect();
        if (e.clientY < rect.top + rect.height / 2) {
          insertBeforeCard = card;
          break;
        }
      }

      // Вставляем плейсхолдер перед нужной карточкой или в конец
      if (insertBeforeCard) {
        initialContainer.insertBefore(placeholder, insertBeforeCard);
      } else {
        initialContainer.appendChild(placeholder);
      }

      // Если перетаскиваем в другую колонку, перемещаем плейсхолдер
      const columnUnder = document
        .elementFromPoint(e.clientX, e.clientY)
        .closest(".column");

      if (columnUnder && columnUnder !== initialContainer) {
        const cardContainer = columnUnder.querySelector(".card-container");
        if (cardContainer && !cardContainer.contains(placeholder)) {
          const cardsInNewColumn = Array.from(
            cardContainer.querySelectorAll(".card")
          );
          let insertBeforeCardInNewColumn = null;

          // Определяем, куда вставить placeholder в новой колонке
          for (let i = 0; i < cardsInNewColumn.length; i++) {
            const card = cardsInNewColumn[i];
            const rect = card.getBoundingClientRect();
            if (e.clientY < rect.top + rect.height / 2) {
              insertBeforeCardInNewColumn = card;
              break;
            }
          }

          // Вставляем placeholder в нужное место
          if (insertBeforeCardInNewColumn) {
            cardContainer.insertBefore(
              placeholder,
              insertBeforeCardInNewColumn
            );
          } else {
            cardContainer.appendChild(placeholder);
          }
        }
      }
    }
  });

  document.addEventListener("mouseup", (e) => {
    if (draggedEl) {
      if (!hasMoved) {
        // Если перемещение не происходило, карточка остается на своем месте
        initialContainer.insertBefore(draggedEl, placeholder);
        if (placeholder) {
          placeholder.parentNode.removeChild(placeholder);
        }
      } else {
        // Если перемещение происходило, то размещаем карточку в новой колонке или месте
        const columnUnder = document
          .elementFromPoint(e.clientX, e.clientY)
          .closest(".column");

        const cardContainer = columnUnder
          ? columnUnder.querySelector(".card-container")
          : null;

        if (cardContainer) {
          // Вставляем карточку в контейнер в нужное место
          cardContainer.insertBefore(draggedEl, placeholder || null);

          // Убираем placeholder
          if (placeholder) {
            placeholder.parentNode.removeChild(placeholder);
          }
        } else {
          initialContainer.insertBefore(draggedEl, placeholder); // Если карточка не сброшена, возвращаем на место
          if (placeholder) {
            placeholder.parentNode.removeChild(placeholder);
          }
        }
      }

      // Очищаем ссылку на перемещаемую карточку
      draggedEl.classList.remove("dragged");
      draggedEl.style.position = ""; // Возвращаем обычную позицию карточке
      draggedEl.style.left = "";
      draggedEl.style.top = "";
      document.documentElement.style.cursor = "grab"; // Возвращаем курсор в состояние "grab"
      draggedEl = null;
    }
  });

  // Функция для сохранения карточек в LocalStorage
  function saveCardsToLocalStorage() {
    const columns = document.querySelectorAll(".column");
    const data = Array.from(columns).map((column) => {
      const cards = column.querySelectorAll(".card");
      return Array.from(cards).map((card) => card.textContent.trim());
    });
    localStorage.setItem("kanbanCards", JSON.stringify(data));
  }

  // Функция для загрузки карточек из LocalStorage
  function loadCardsFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem("kanbanCards"));
    if (data) {
      const columns = document.querySelectorAll(".column");
      data.forEach((columnCards, index) => {
        const cardContainer = columns[index].querySelector(".card-container");
        columnCards.forEach((cardText) => {
          const cardEl = document.createElement("div");
          cardEl.className = "card";
          cardEl.textContent = cardText;

          const deleteBtn = document.createElement("span");
          deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
          deleteBtn.className = "delete-btn";
          deleteBtn.onclick = (e) => {
            const card = e.target.closest(".card");
            card.parentNode.removeChild(card);
            saveCardsToLocalStorage();
          };

          cardEl.appendChild(deleteBtn);
          cardContainer.appendChild(cardEl);
        });
      });
    }
  }

  // Кнопка добавления карточек
  const addCardBtns = document.querySelectorAll(".addCardBtn");

  // Восстанавливаем сохраненные карточки
  loadCardsFromLocalStorage();

  addCardBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const clickedBtn = e.currentTarget;
      const cardContainer = clickedBtn.previousElementSibling;

      // Скрываем все кнопки addCardBtn
      addCardBtns.forEach((btn) => {
        btn.style.display = "none";
      });

      // Создаем новое поле ввода
      const cardEl = document.createElement("div");
      cardEl.className = "card";

      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Введите текст...";
      input.className = "cardInput";

      // Кнопка для добавления заметки
      const addNoteBtn = document.createElement("button");
      addNoteBtn.textContent = "Add";
      addNoteBtn.className = "addNoteBtn";

      // Кнопка для отмены ввода
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.className = "cancelBtn";

      // Вставляем кнопки "Add" и "Cancel" в тот же контейнер, где была кнопка "addCardBtn"
      const btnContainer = clickedBtn.parentElement;
      btnContainer.appendChild(addNoteBtn);
      btnContainer.appendChild(cancelBtn);

      // При нажатии на кнопку "Add" сохраняем заметку
      addNoteBtn.addEventListener("click", () => {
        const cardText = input.value.trim();
        if (cardText) {
          cardEl.textContent = cardText;
          cardEl.appendChild(deleteBtn);
          cardContainer.appendChild(cardEl);
          saveCardsToLocalStorage(); // Сохраняем после добавления карточки
          input.value = ""; // Очищаем поле ввода
          addNoteBtn.style.display = "none"; // Скрываем кнопку "Add"
          cancelBtn.style.display = "none"; // Скрываем кнопку "Cancel"
          // Возвращаем все кнопки addCardBtn обратно по центру
          addCardBtns.forEach((btn) => {
            btn.style.display = "block"; // Возвращаем кнопки в исходное состояние
            // Центрируем контейнер кнопок
            btn.parentElement.style.textAlign = "center"; // Центрируем контейнер кнопок
          });
        }
      });

      // При нажатии на кнопку "Cancel" отменяем операцию ввода
      cancelBtn.addEventListener("click", () => {
        // Скрываем поле ввода и саму карточку
        cardEl.style.display = "none";
        input.style.display = "none";
        addNoteBtn.style.display = "none";
        cancelBtn.style.display = "none";

        // Восстанавливаем кнопку addCardBtn в исходное состояние
        addCardBtns.forEach((btn) => {
          btn.style.display = "block"; // Возвращаем кнопку
          btn.parentElement.style.textAlign = "center"; // Центрируем контейнер кнопок
        });
      });

      // Слушаем событие "Enter" для сохранения заметки
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          const cardText = input.value.trim();
          if (cardText) {
            cardEl.textContent = cardText;
            cardEl.appendChild(deleteBtn);
            cardContainer.appendChild(cardEl);
            saveCardsToLocalStorage(); // Сохраняем после добавления карточки
            input.value = ""; // Очищаем поле ввода
            addNoteBtn.style.display = "none"; // Скрываем кнопку "Add"
            cancelBtn.style.display = "none"; // Скрываем кнопку "Cancel"
            // Возвращаем все кнопки addCardBtn обратно по центру
            addCardBtns.forEach((btn) => {
              btn.style.display = "block"; // Возвращаем кнопки в исходное состояние
              // Центрируем контейнер кнопок
              btn.parentElement.style.textAlign = "center"; // Центрируем контейнер кнопок
            });
          }
        }
      });

      const deleteBtn = document.createElement("span");
      deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
      deleteBtn.className = "delete-btn";
      deleteBtn.onclick = (e) => {
        const card = e.target.closest(".card");
        card.parentNode.removeChild(card);
        saveCardsToLocalStorage(); // Сохраняем после удаления карточки
      };

      // Добавляем поля в DOM
      cardEl.appendChild(input);
      cardContainer.appendChild(cardEl);
      input.focus();
    });
  });
});
