// SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todolist = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// EVENT LISTENERS 
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addToDo);
todolist.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);


// FUNCTIONS 
function addToDo(e) {
    e.preventDefault();
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    saveLocalTodos(todoInput.value);

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
    const clicked = e.target;
    let todo = clicked.parentElement;
    if (clicked.classList[0] === 'trash-btn') {
        todo.classList.add('fall');
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
    }
    if (clicked.classList[0] === 'complete-btn') {
        console.log("completed")
        todo.classList.toggle('completed')
    }
}

function filterTodo(e) {
    const todos = todolist.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
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
    })
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}