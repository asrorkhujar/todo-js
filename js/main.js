//1. Elementlar tanlab olindi
const elForm = document.querySelector('.js-form-todo');
const elInputToDo = elForm.querySelector('.js-form-amount');
const elInputToDoAuthor = elForm.querySelector('.js-form-amount-author');
const elTodoList = document.querySelector('.todo-list');
const elButtonWrapper = document.querySelector('.button-wrapper');

//Result spanlar
const allCount = document.querySelector('.all-result');
const completedCount = document.querySelector('.completed-result');
const uncompletedCount = document.querySelector('.uncompleted-result');

//Button controllers
const elAllBtn = document.querySelector('.btn-all');
const elCompletedBtn = document.querySelector('.btn-completed');
const elUncompletedBtn = document.querySelector('.btn-uncompleted');

//2. Har bir to-do ni saqlash uchun yangi bo'sh array ochildi
const toDos = [];

//12. Event delegation
elTodoList.addEventListener('click', (evt) => {
  if (evt.target.matches('.delete-btn')) {
    let todoBtnId = evt.target.dataset.todoId * 1;
    const foundTodoIndex = toDos.findIndex((todo) => todo.id === todoBtnId);
    toDos.splice(foundTodoIndex, 1);
    elTodoList.innerHTML = '';

    renderTodos(toDos, elTodoList);

  } else if (evt.target.matches('.checkbox-btn')) {
    let todoCheckedId = evt.target.dataset.checkId * 1;
    const foundCheckbox = toDos.find((todo) => todo.id === todoCheckedId);
    foundCheckbox.isCompleted = !foundCheckbox.isCompleted;
    elTodoList.innerHTML = '';

    renderTodos(toDos, elTodoList);
  }
});

//8. To-do larni render qilish dynamic funksiya tuzib olindi
const renderTodos = (arr, element) => {

  allCount.textContent = toDos.length;
  completedCount.textContent = toDos.filter((todo) => todo.isCompleted).length;
  uncompletedCount.textContent = toDos.filter((todo) => !todo.isCompleted).length;

  arr.forEach((todo) => {
    let newItemToDo = document.createElement('li');
    newItemToDo.setAttribute('class', 'todo-item bg-info text-white p-2 rounded mt-2 d-flex align-items-center shadow-sm');

    let newItemToDoInfoWrapper = document.createElement('div');
    newItemToDoInfoWrapper.setAttribute('class', 'd-flex');

    let newCheckbox = document.createElement('input');
    newCheckbox.setAttribute('class','checkbox-btn form-check-input ms-1 me-3');
    newCheckbox.type = 'checkbox';

    let newToDo = document.createElement('p');
    newToDo.setAttribute('class','mb-0');

    let newToDoAuthor = document.createElement('p');
    newToDoAuthor.setAttribute('class','mb-0 ms-3 fst-italic');

    let newDeleteBtn = document.createElement('button');

    //TEXT CONTENT
    newToDo.textContent = todo.name;
    newToDoAuthor.textContent = `➡ (${todo.author})`;
    newDeleteBtn.textContent = 'Delete';

    newDeleteBtn.setAttribute('class','delete-btn btn btn-danger ms-auto');
    newDeleteBtn.type = 'button';


    //11. Dataset adding
    newItemToDo.dataset.todoId = todo.id;
    newDeleteBtn.dataset.todoId = todo.id;
    newCheckbox.dataset.checkId = todo.id;

    if (todo.isCompleted) {
      newCheckbox.checked = true;
      newItemToDoInfoWrapper.style.textDecoration = 'line-through';
      newItemToDoInfoWrapper.style.opacity = '0.7';
    }

    element.appendChild(newItemToDo);
    newItemToDo.appendChild(newItemToDoInfoWrapper);
    newItemToDoInfoWrapper.appendChild(newCheckbox);
    newItemToDoInfoWrapper.appendChild(newToDo);
    newItemToDoInfoWrapper.appendChild(newToDoAuthor);
    newItemToDo.appendChild(newDeleteBtn);
  });
};

//3. Formani submitiga quloq solindi
elForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  //4. Input valuesi olindi
  let inputToDo = elInputToDo.value.trim();
  let inputAuthor = elInputToDoAuthor.value.trim();

  //5. Har bir to do uchun object ochildi
  let todo = {
    //6. To-do ichidagi eng oxirgi elementni ID tanlab olindi, ha safar yengi qo'shilgan to-doni ID siga 1ni qo'shib boradi. Agar birinchi to-do qo'shilayotgan vaqti uning IDsi 0ni olsin
    id: toDos[toDos.length - 1]?.id + 1 || 0,
    name: inputToDo,
    author: inputAuthor,
    isCompleted: false,
  };

  //7. todo objectini har safar submit bo'lganda todos arrayiga push qilsin
  toDos.push(todo);
  elInputToDo.value = '';
  elInputToDoAuthor.value = '';

  elTodoList.innerHTML = '';

  //9. todos arrayini render qilish uchun rendertodos functionga berib yuborildi
  renderTodos(toDos, elTodoList);
});

elAllBtn.addEventListener('click', () => {
  elTodoList.innerHTML = '';

  renderTodos(toDos, elTodoList);
});

elCompletedBtn.addEventListener('click', () => {
  let filteredCompleted = toDos.filter((todo) => todo.isCompleted);
  elTodoList.innerHTML = '';

  renderTodos(filteredCompleted, elTodoList);
});

elUncompletedBtn.addEventListener('click', () => {
  let filteredCompleted = toDos.filter((todo) => !todo.isCompleted);
  elTodoList.innerHTML = '';

  renderTodos(filteredCompleted, elTodoList);
});


//YOKI BU
/* elButtonWrapper.addEventListener("click", function (evt) {
  if (evt.target.matches(".btn-all") || evt.target.matches(".all-result")) {
    elList.innerHTML = null;

    renderTodos(toDos, elList);
  } else if (evt.target.matches(".btn-completed")) {
    let filteredCompleted = toDos.filter((todo) => todo.isCompleted);

    elList.innerHTML = null;

    renderTodos(filteredCompleted, elList);
  } else if (evt.target.matches(".btn-uncompleted")) {
    let filteredCompleted = toDos.filter((todo) => !todo.isCompleted);

    elList.innerHTML = null;

    renderTodos(filteredCompleted, elList);
  }
}); */