document.addEventListener("DOMContentLoaded", () => {
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

  // Логика перетаскивания карточек
  let draggedEl = null;
  let offsetX = 0;
  let offsetY = 0;
  let initialContainer = null;

  document.addEventListener("mousedown", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("card")) {
      draggedEl = e.target;

      const rect = draggedEl.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      const computedStyle = getComputedStyle(draggedEl);
      initialContainer = draggedEl.parentNode;
      draggedEl.style.width = computedStyle.width;
      draggedEl.style.height = computedStyle.height;

      draggedEl.classList.add("dragged");
      document.documentElement.style.cursor = "grabbing";

      moveAt(e.pageX, e.pageY);
    }
  });

  function moveAt(pageX, pageY) {
    draggedEl.style.left = pageX - offsetX + "px";
    draggedEl.style.top = pageY - offsetY + "px";
  }

  document.addEventListener("mousemove", (e) => {
    if (draggedEl) {
      moveAt(e.pageX, e.pageY);
      document.querySelectorAll(".card, .addCardBtn").forEach((el) => {
        if (el !== draggedEl) el.classList.add("no-pointer");
      });
    }
  });

  document.addEventListener("mouseup", (e) => {
    e.preventDefault();
    document.querySelectorAll(".card, .addCardBtn").forEach((el) => {
      el.classList.remove("no-pointer");
    });

    if (draggedEl) {
      const columnUnder = document
        .elementFromPoint(e.clientX, e.clientY)
        .closest(".column");
      const cardContainer = columnUnder
        ? columnUnder.querySelector(".card-container")
        : null;

      if (cardContainer) {
        const mouseUpItem = document.elementFromPoint(e.clientX, e.clientY);
        if (mouseUpItem && mouseUpItem.classList.contains("card")) {
          const bounding = mouseUpItem.getBoundingClientRect();
          if (e.clientY < bounding.top + bounding.height / 2) {
            cardContainer.insertBefore(draggedEl, mouseUpItem);
          } else {
            cardContainer.insertBefore(draggedEl, mouseUpItem.nextSibling);
          }
        } else {
          cardContainer.appendChild(draggedEl);
        }
      } else {
        initialContainer.appendChild(draggedEl);
      }

      draggedEl.classList.remove("dragged");
      document.documentElement.style.cursor = "";

      saveCardsToLocalStorage(); // Сохраняем после перетаскивания карточки
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
});
