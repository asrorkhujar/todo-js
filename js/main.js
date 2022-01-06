const elForm = document.querySelector('.js-form-todo');
const elInputToDo = elForm.querySelector('.js-form-amount');
const elInputToDoAuthor = elForm.querySelector('.js-form-amount-author');
const elTodoList = document.querySelector('.todo-list');

const toDos = [];

elForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  let inputToDo = elInputToDo.value.trim();
  let inputAuthor = elInputToDoAuthor.value.trim();

  let todo = {
    name: inputToDo,
    author: inputAuthor,
    id: toDos.length
  }

  toDos.push(todo);
  elInputToDo.value = '';
  elInputToDoAuthor.value = '';
  elTodoList.innerHTML = '';

  for (let item of toDos) {
    let newItemToDo = document.createElement('li');
    newItemToDo.setAttribute('class', 'todo-item bg-info text-white p-2 rounded mt-2 d-flex shadow-sm');

    let newItemToDoInfo = document.createElement('span');
    newItemToDoInfo.setAttribute('class', 'ms-3 fst-italic');

    let checkBtn = document.createElement('input');
    checkBtn.setAttribute('class', 'js-check form-check-input me-2 ms-auto');
    checkBtn.setAttribute("type", "checkbox");
    checkBtn.setAttribute("id", "checkDone");

    checkBtn.addEventListener('change', (evt) => {
      evt.preventDefault();
      newItemToDo.classList.toggle('checked');
    });


    newItemToDo.textContent = item.name;
    newItemToDoInfo.textContent = `(${item.author})`;

    elTodoList.appendChild(newItemToDo);
    newItemToDo.appendChild(newItemToDoInfo);
    newItemToDo.appendChild(checkBtn);
  }

});