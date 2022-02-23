//Selectors
const todoForm = document.querySelector('.todo__form');
const todoInput = todoForm.querySelector('.todo__input');
const todoError = todoForm.querySelector(`.${todoInput.id}-error`);
const todoButton = document.querySelector('.todo__button');
const todoList = document.querySelector('.todo__list');
const filterOption = document.querySelector('.todo__filter');

//Functions
function addTodo() {
  //Create DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo')
  //Create LI
  const newTodo = document.createElement('li');
  newTodo.textContent = todoInput.value;
  newTodo.classList.add('todo__item');
  todoDiv.appendChild(newTodo);
  //Add LocalStorage
  saveLocalTodos(todoInput.value);
  //MarkButton
  const markButton = document.createElement('button');
  markButton.innerHTML = '<i class="todo__mark-button-img fa-solid fa-check"></i>';
  markButton.classList.add('todo__mark-button');
  todoDiv.appendChild(markButton);
  //DeleteButton
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="todo__delete-button-img fa-solid fa-trash-can"></i>';
  deleteButton.classList.add('todo__delete-button');
  todoDiv.appendChild(deleteButton);
  //Append To Do
  todoList.prepend(todoDiv);
  todoInput.value = '';
}

//Delete To Do item
function deleteTodo(evt) {
  const item = evt.target;
  if (item.classList[0] === 'todo__delete-button') {
    item.closest('.todo').classList.add('todo__fall');
    removeLocalTodo(item.closest('.todo'));
    item.closest('.todo').addEventListener('transitionend', function () {
      item.closest('.todo').remove();
    })
  }
}

//Complete To Do item
function completeTodo(evt) {
  const item = evt.target;
  if (item.classList[0] === 'todo__mark-button') {
    item.closest('.todo').classList.toggle('todo_completed');
  }
}

//Filter function
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('todo_completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('todo_completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

//Validate functions
//Show error function
function showInputError() {
  todoError.textContent = 'Minimum allowed number of characters: 2';
  todoError.classList.add('todo__error-visible_active');
}
//Hide error function
function hideInputError() {
  todoError.textContent = '';
  todoError.classList.remove('todo__error-visible_active');
}
//Check validation
const isValid = () => {
  if (!todoInput.validity.valid) {
    showInputError();
  } else {
    hideInputError();
  }
};

todoInput.addEventListener('input', function () {
  isValid();
  toggleButtonState();
});

todoForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

function hasInvalidInput() {
  return !todoInput.validity.valid;
}

//Block Submit button
function toggleButtonState() {
  if(hasInvalidInput()) {
    todoButton.classList.add('todo__button-inactive');
    todoButton.setAttribute('disabled', true);
  } else {
    todoButton.classList.remove('todo__button-inactive');
    todoButton.removeAttribute('disabled');
  }
}

//Local Storage
function saveLocalTodos(todo) {
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.textContent = todo;
    newTodo.classList.add('todo__item');
    todoDiv.appendChild(newTodo);
    //MarkButton
    const markButton = document.createElement('button');
    markButton.innerHTML = '<i class="todo__mark-button-img fa-solid fa-check"></i>';
    markButton.classList.add('todo__mark-button');
    todoDiv.appendChild(markButton);

    //DeleteButton
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="todo__delete-button-img fa-solid fa-trash-can"></i>';
    deleteButton.classList.add('todo__delete-button');
    todoDiv.appendChild(deleteButton);
    //Append To Do
    todoList.prepend(todoDiv);
  });
}

function removeLocalTodo(todo) {
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].textContent;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

//Event Listeners
todoButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  addTodo();
  toggleButtonState();
});
todoList.addEventListener('click', deleteTodo);
todoList.addEventListener('click', completeTodo);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);


