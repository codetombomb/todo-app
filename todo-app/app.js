// SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todolist = document.querySelector(".todo-list");

// EVENT LISTENERS 
todoButton.addEventListener('click', addToDo);
todolist.addEventListener('click', deleteCheck);


// FUNCTIONS 
function addToDo(e) {
    e.preventDefault();
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = "<i class='fas fa-check'></i>"
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = "<i class='fas fa-trash'></i>"
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    todolist.appendChild(todoDiv);
    todoInput.value = "";
}

function deleteCheck(e) {
    const clicked = e.target.parentElement;
    console.log(clicked)
    let todo = clicked.parentElement;
    if (clicked.classList[0] === 'trash-btn') {
        todo.remove();
    }
    if (clicked.classList[0] === 'complete-btn') {
        console.log("completed",)
        todo.classList.toggle('completed')
    }
}