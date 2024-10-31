document.addEventListener("DOMContentLoaded", () => {
  const addCardBtn = document.querySelectorAll(".addCardBtn");

  addCardBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const clickedBtn = e.currentTarget;
      const cardContainer = clickedBtn.previousElementSibling;

      const cardEl = document.createElement("div");
      cardEl.className = "card";

      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Введите текст...";
      input.className = "cardInput";

      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          const cardText = input.value.trim();
          if (cardText) {
            cardEl.textContent = cardText;
            cardEl.appendChild(deleteBtn);
            cardContainer.appendChild(cardEl);
          }
        }
      });

      const deleteBtn = document.createElement("span");
      deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
      deleteBtn.className = "delete-btn";
      deleteBtn.onclick = (e) => {
        const card = e.target.closest(".card"); // находим ближайшего родителя с классом "card"
        card.parentNode.removeChild(card); // удаляем найденный элемент
      };

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
      // Убираем указатель для всех карт и кнопок, кроме перетаскиваемой
      document.querySelectorAll(".card, .addCardBtn").forEach((el) => {
        if (el !== draggedEl) el.classList.add("no-pointer");
      });
    }
  });

  document.addEventListener("mouseup", (e) => {
    e.preventDefault();

    // Включаем обратно указатель для всех карт и кнопок
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
        // Вставка карточки в нужное место в колонне
        const mouseUpItem = document.elementFromPoint(e.clientX, e.clientY);
        if (mouseUpItem && mouseUpItem.classList.contains("card")) {
          const bounding = mouseUpItem.getBoundingClientRect();
          // Проверяем, если курсор выше или ниже середины карточки
          if (e.clientY < bounding.top + bounding.height / 2) {
            cardContainer.insertBefore(draggedEl, mouseUpItem); // Вставляем перед карточкой
          } else {
            cardContainer.insertBefore(draggedEl, mouseUpItem.nextSibling); // Вставляем после карточки
          }
        } else {
          cardContainer.appendChild(draggedEl); // Если курсор не над карточкой, добавляем в конец
        }
      } else {
        initialContainer.appendChild(draggedEl); // Возвращаем карточку в первоначальный контейнер
      }

      draggedEl.classList.remove("dragged");
      document.documentElement.style.cursor = "";

      draggedEl = null;
    }
  });
});
