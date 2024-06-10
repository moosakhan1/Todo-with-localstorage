document.addEventListener('DOMContentLoaded', () => {
    var loginPage = document.getElementById('login-page');
    var homePage = document.getElementById('home-page');
    var loginForm = document.getElementById('login-form');
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    var logoutBtn = document.getElementById('logout-btn');
    var todoForm = document.getElementById('todo-form');
    var todoInput = document.getElementById('todo-input');
    var todoList = document.getElementById('todo-list');

    function checkUserLogin() {
        var email = localStorage.getItem('email');
        var password = localStorage.getItem('password');
        if (email && password) {
            showHomePage();
        } else {
            showLoginPage();
        }
    }

    function showLoginPage() {
        loginPage.classList.add('active');
        homePage.classList.remove('active');
    }

    function showHomePage() {
        loginPage.classList.remove('active');
        homePage.classList.add('active');
        displayTodos();
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        var email = emailInput.value;
        var password = passwordInput.value;
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        showHomePage();
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        showLoginPage();
        passwordInput.innerHTML = ""


    });

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        var todo = todoInput.value.trim();
        if (todo) {
            saveTodoToLocal(todo);
            todoInput.value = '';
            displayTodos();
        }
    });

    function saveTodoToLocal(todo) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function displayTodos() {
        var todos = JSON.parse(localStorage.getItem('todos')) || [];
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            var li = document.createElement('li');
            li.textContent = todo;
            var removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', () => {
                removeTodoFromLocal(index);
                displayTodos();
            });
            li.appendChild(removeBtn);
            todoList.appendChild(li);
        });
    }

    function removeTodoFromLocal(index) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    checkUserLogin();
});
