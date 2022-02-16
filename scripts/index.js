//Selectors
const todoInput = document.querySelector('.todo__input');
const todoButton = document.querySelector('.todo__button');
const todoList = document.querySelector('.todo__list');
const filterOption = document.querySelector('.todo__filter');


//Functions
function addTodo(evt) {
  evt.preventDefault();
  //Create DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo')
  //Create LI
  const newTodo = document.createElement('li');
  newTodo.textContent = todoInput.value;
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
  todoInput.value = '';
}

//Delete To Do item
function deleteTodo(evt) {
  const item = evt.target;
  if (item.classList[0] === 'todo__delete-button') {
    item.closest('.todo').classList.add('todo__fall');
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

//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
todoList.addEventListener('click', completeTodo);
filterOption.addEventListener('click', filterTodo)
addTodo();
