
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.todo-filter');

todoButton.addEventListener('click', addtodo);
todoList.addEventListener('click', deleteCheck);
todoFilter.addEventListener('click', todofilter);
document.addEventListener('DOMContentLoaded', getTodos);

//add todo

function addtodo(e) {
    e.preventDefault();
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-div');
    //todo li
    const todoli = document.createElement('li');
    todoli.classList.add('todo-item');
    todoli.innerText = todoInput.value;
    todoDiv.appendChild(todoli);
    //localStorage
    if (todoInput.value != "") {
        localstorage(todoInput.value);
    }
    //todo check btn
    const checkBtn = document.createElement('button');
    checkBtn.classList.add('check-btn');
    checkBtn.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(checkBtn);
    //todo trash btn
    const trashBtn = document.createElement('button');
    trashBtn.classList.add('trash-btn');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashBtn);
    // localstorage(todo);
    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    //delete
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add('delete');
        removelocalstorage(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
    }
    //check
    if (item.classList[0] === 'check-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function todofilter(e) {
    todos = todoList.childNodes;
    const filterValue = e.target.value;
    todos.forEach(function (todo) {
        switch (filterValue) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    console.log(todo)
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    console.log(todo)
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function localstorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-div');
        //todo li
        const todoli = document.createElement('li');
        todoli.classList.add('todo-item');
        todoli.innerText = todo;
        todoDiv.appendChild(todoli);
        //todo check btn
        const checkBtn = document.createElement('button');
        checkBtn.classList.add('check-btn');
        checkBtn.innerHTML = '<i class="fas fa-check"></i>';
        todoDiv.appendChild(checkBtn);
        //todo trash btn
        const trashBtn = document.createElement('button');
        trashBtn.classList.add('trash-btn');
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
        todoDiv.appendChild(trashBtn);
        // localstorage(todo);
        todoList.appendChild(todoDiv);
    });
}

function removelocalstorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    console.log(todos)
    const todoindex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoindex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}