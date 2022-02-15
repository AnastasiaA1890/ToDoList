//Selectors
const todoInput = document.querySelector('.todo__input');
const todoButton = document.querySelector('.todo__button');
const todoList = document.querySelector('.todo__list');
//Functions
todoButton.addEventListener('click', addTodo)
//Event Listeners
function addTodo(event) {
  //Prevent form from submitting
  event.preventDefault();
  //Create DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  //Create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = 'hey';
  newTodo.classList.add('todo__item');
  todoDiv.appendChild(newTodo);
  //MarkButton
  const markButton = document.createElement('button');
  markButton.innerHTML = '<img src="./images/check-mark.svg" alt="Mark Button" class="todo__mark-button-img">';
  markButton.classList.add('todo__mark-button');
  todoDiv.appendChild(markButton);
  //DeleteButton
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<img src="./images/trash.svg" alt="Delete Button" class="todo__delete-button-img">';
  deleteButton.classList.add('todo__delete-button');
  todoDiv.appendChild(deleteButton);
  //Append To DO
  todoList.appendChild(todoDiv);
}
addTodo();