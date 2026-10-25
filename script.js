/* ============================================================
   СПИСОК ДЕЛ — эталонное решение
   Главное правило: источник истины — массив tasks.
   Страница только показывает то, что лежит в массиве.
   ============================================================ */

/* --- данные ------------------------------------------------- */

// у каждого дела свой id: по нему мы найдём нужный объект при удалении
let nextId = 4;

const tasks = [
  { id: 1, text: "Разобрать макет" },
  { id: 2, text: "Сверстать шапку" },
  { id: 3, text: "Починить отступы" },
];

/* --- элементы страницы -------------------------------------- */

const listEl = document.querySelector(".todo");
const counterEl = document.querySelector(".counter__value");
const fieldEl = document.querySelector("#newTask");
const addBtn = document.querySelector("#addBtn");

/* --- создание элемента -------------------------------------- */

// получает объект дела, возвращает готовый элемент списка
function createTaskElement(task) {
  const item = document.createElement("li");
  item.className = "todo__item";
  item.dataset.id = task.id; // связь элемента с объектом в массиве

  const text = document.createElement("span");
  text.className = "todo__text";
  text.textContent = task.text; // textContent, а не innerHTML: текст ввёл пользователь

  const removeBtn = document.createElement("button");
  removeBtn.className = "todo__remove";
  removeBtn.type = "button";
  removeBtn.textContent = "Удалить";

  // обработчик вешаем сразу: он помнит, к какому делу относится
  removeBtn.addEventListener("click", () => removeTask(task.id));

  item.append(text, removeBtn);
  return item;
}

/* --- счётчик ------------------------------------------------ */

function updateCounter() {
  counterEl.textContent = tasks.length;
}

/* --- первая отрисовка --------------------------------------- */

function renderAll() {
  listEl.textContent = ""; // очищаем контейнер перед отрисовкой

  tasks.forEach((task) => {
    listEl.append(createTaskElement(task));
  });

  updateCounter();
}

/* --- добавление --------------------------------------------- */

function addTask(text) {
  const task = { id: nextId, text: text };
  nextId = nextId + 1;

  tasks.push(task);                       // сначала данные
  listEl.append(createTaskElement(task)); // потом страница
  updateCounter();
}

/* --- удаление ----------------------------------------------- */

function removeTask(id) {
  // 1. убираем объект из массива
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return; // такого дела нет — выходим

  tasks.splice(index, 1); // splice меняет исходный массив

  // 2. убираем элемент со страницы
  const item = listEl.querySelector(`[data-id="${id}"]`);
  item.remove();

  updateCounter();
}

/* --- кнопка «Добавить» -------------------------------------- */

addBtn.addEventListener("click", () => {
  const text = fieldEl.value.trim(); // trim убирает пробелы по краям

  if (text === "") return; // пустые дела не добавляем

  addTask(text);
  fieldEl.value = ""; // очищаем поле
  fieldEl.focus();    // и возвращаем в него курсор
});

/* --- запуск ------------------------------------------------- */

renderAll();

/* ============================================================
   ЧТО ПРОВЕРИТЬ ПОСЛЕ ЗАПУСКА

   1. Добавить дело и вывести console.log(tasks) — массив и экран
      должны совпадать.
   2. Удалить дело из середины и снова вывести массив.
   3. Нажать «Добавить» с пустым полем — ничего не произойдёт.

   ЧЕМ МОЖНО ПРОДОЛЖИТЬ

   - Кнопка «Очистить всё»: tasks.length = 0 и listEl.textContent = ""
   - Отметка «сделано»: добавить полю done значение true или false
     и переключать класс у элемента
   ============================================================ */


   const oldArray = [1, 2, 3];
   const newArray = [...oldArray];