document.addEventListener("DOMContentLoaded", () => {
  const addCardBtn = document.querySelectorAll(".addCardBtn");

  addCardBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const clickedBtn = e.currentTarget;
      const cardContainer = clickedBtn.previousElementSibling;

      // Создаем карточку
      const cardEl = document.createElement("div");
      cardEl.className = "card";

      // Создаем текстовое поле для ввода текста
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Введите текст...";
      input.className = "cardInput";

      // Добавляем обработчик события для нажатия клавиши Enter
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          const cardText = input.value.trim();
          if (cardText) {
            // Устанавливаем текст карточки и очищаем поле ввода
            cardEl.textContent = cardText;
            cardEl.appendChild(deleteBtn); // Добавляем кнопку удаления
            cardContainer.appendChild(cardEl); // Добавляем карточку в контейнер
          }
        }
      });

      // Добавляем кнопку удаления карточки
      const deleteBtn = document.createElement("span");
      deleteBtn.innerHTML = '<i class="fas fa-times"></i>'; // Используем иконку FontAwesome для крестика
      deleteBtn.className = "delete-btn"; // Назначаем класс для кнопки удаления
      deleteBtn.onclick = () => {
        cardContainer.removeChild(cardEl); // Удаляем карточку при нажатии на кнопку
      };

      // Добавляем текстовое поле в карточку
      cardEl.appendChild(input);
      cardContainer.appendChild(cardEl); // Добавляем карточку в контейнер
      input.focus(); // Фокусируемся на поле ввода
    });
  });
});
