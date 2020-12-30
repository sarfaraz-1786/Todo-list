let action1 = true;
let action2 = false;
let action3 = true;

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.todo-filter');

todoButton.addEventListener('click', addtodo);
todoList.addEventListener('click', deleteCheck);
todoFilter.addEventListener('click', todofilter);
document.addEventListener('DOMContentLoaded', getTodos);

//add todo
function addtodo(e, todo) {
    e.preventDefault();
    if (action1) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-div');
        //todo li
        const todoli = document.createElement('li');
        todoli.classList.add('todo-item');
        todoli.innerText = todoInput.value;
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
        // edit button
        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        todoDiv.appendChild(editBtn);
        //appending div
        todoList.appendChild(todoDiv);
        //localStorage
        if (todoInput.value != "") {
            localstorage(todoInput.value);
        }
        todoInput.value = "";
    }
    if (action2) {
        todo1.childNodes[0].innerText = todoInput.value;
        todoInput.value = "";
        action1 = true;
        action2 = false;
        const todoarray = todoolist();
        localstorage(todoarray);
    }
    if (todo != null) {
        todo1 = todo;
        action2 = true;
    }
}

//todolist array
const todoolist = () => {
    var todoslist = [];
    const todoparent = todoList.childNodes;
    todoparent.forEach((todoo) => {
        const textValue = todoo.innerText;
        todoslist.push(textValue);
    })
    return todoslist;
}

//delete and check
function deleteCheck(e) {
    const item = e.target;
    const todo = item.parentElement;
    //delete
    if (item.classList[0] === "trash-btn") {
        todo.classList.add('delete');
        removelocalstorage(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
    }
    //check
    if (item.classList[0] === 'check-btn') {
        todo.classList.toggle('completed');
    }
    //edit
    if (item.classList[0] === "edit-btn") {
        todoInput.value = todo.children[0].innerText;
        action1 = false;
        action3 = false;
        addtodo(e, todo);
        localStorage.clear();
    }
}
//todo filter
function todofilter(e) {
    todos = todoList.childNodes;
    const filterValue = e.target.value;
    todos.forEach((todo) => {
        switch (filterValue) {
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

//creating local storage
const localstorage = (todo) => {
    if (action3) {
        let todos;
        if (localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
        console.log(todos)
    } else if (!action3) {
        let todos = [];
        todo.forEach((todo) => {
            todos.push(todo);
        })
        localStorage.setItem("todos", JSON.stringify(todos));
        action3 = true;
    }
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach((todo) => {
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
        // edit button
        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        todoDiv.appendChild(editBtn);

        todoList.appendChild(todoDiv);
    });
}

const removelocalstorage = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoindex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoindex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}