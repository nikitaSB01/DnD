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
      deleteBtn.onclick = () => {
        cardContainer.removeChild(cardEl);
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

      initialContainer = draggedEl.parentNode;
      draggedEl.style.position = "absolute"; // Устанавливаем позиционирование
      draggedEl.style.zIndex = "1000"; // Повышаем z-index
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
      draggedEl.style.cursor = "grabbing"; // Курсор при перетаскивании
    }
  });

  document.addEventListener("mouseup", (e) => {
    e.preventDefault();
    if (draggedEl) {
      draggedEl.style.cursor = "grab"; // Возвращаем курсор
      const columnUnder = document
        .elementFromPoint(e.clientX, e.clientY)
        .closest(".column");
      const cardContainer = columnUnder
        ? columnUnder.querySelector(".card-container")
        : null;

      if (cardContainer) {
        cardContainer.appendChild(draggedEl);
      } else {
        initialContainer.appendChild(draggedEl); // Возвращаем карточку в первоначальный контейнер
      }

      // Сбросим все стили позиционирования
      draggedEl.style.position = "";
      draggedEl.style.zIndex = "";
      draggedEl.style.left = "";
      draggedEl.style.top = "";
      draggedEl = null;
    }
  });
});
