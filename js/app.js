const add_todo_form = document.querySelector('#add-todo-form');
const parseFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

// fetching username from the URL
const url = document.URL;
let nameInput = url.substr(url.lastIndexOf('=') + 1, url.length);
nameInput = nameInput.replace(/\+/g, ' ');
//

const showUser = (key) => {
    const obj = parseFromLocalStorage(key);

    if(nameInput === obj.name) {
        document.querySelector('.welcome').innerHTML = `Welcome ${obj.name}
        `;
    }
}

const addTodo = (key, arr) => {
    const obj = parseFromLocalStorage(key);
    obj.todos.push(arr);
    const jsonData = JSON.stringify(obj);
    localStorage.setItem(key, jsonData);
}

const showTodo = (key) => {
    const obj = parseFromLocalStorage(key);
    const list_el = document.querySelector('.todo-list');

    if(obj.todos.length === 0) {
        list_el.innerHTML += `<p class="no-todo"> No todos left! </p>`;
    }
    else {
        for(let i of obj.todos) {
            list_el.innerHTML += `
              <div class="todo-item">
                <p>
                  <input class="checkbox" type="checkbox">
                  <input class="todo-title" value="${i[0]}" type="text" readonly>
                </p>
                <span class="options">
                  <button type="submit" class="edit">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <i class="fa-solid fa-trash delete"> </i>
                </span>
              </div>
            `;
        }
    }
}

const editTodo = (key) => {
    const titles = document.getElementsByClassName('todo-title');
    const edit_btns = document.getElementsByClassName('edit');
    const obj = parseFromLocalStorage(key);
    const todo_arr = obj.todos;

    for(let i=0; i<edit_btns.length; i++) {
        edit_btns[i].addEventListener('click', (e) => {
            e.preventDefault();
            if(titles[i].hasAttribute('readonly')) {
                titles[i].removeAttribute('readonly');
            } else {
                titles[i].setAttribute('readonly', 'readonly');
                todo_arr[i][0] = titles[i].value;
            }

            if(edit_btns[i].classList.contains('edit')) edit_btns[i].classList.toggle('save');

            if(edit_btns[i].classList.contains('save')) edit_btns[i].innerHTML = '<i class="fa-sharp fa-solid fa-check"></i>';
            else edit_btns[i].innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

            const jsonData = JSON.stringify(obj);
            localStorage.setItem(key, jsonData);
        })
    }
}

const deleteTodo = (key) => {
    const delete_btns = document.getElementsByClassName('delete');
    const obj = parseFromLocalStorage(key);
    const todo_arr = obj.todos;

    for(let i=0; i<delete_btns.length; i++) {
        delete_btns[i].addEventListener('click', () => {
            todo_arr.splice(i, 1);
            const jsonData = JSON.stringify(obj);
            localStorage.setItem(key, jsonData);
            window.location.reload(true);
        })
    }
}

const editStatus = (key) => {
    const check_boxes = document.getElementsByClassName('checkbox');
    const titles = document.getElementsByClassName('todo-title');
    const obj = parseFromLocalStorage(key);
    const todo_arr = obj.todos;

    for(let i=0; i<check_boxes.length; i++) {
        check_boxes[i].addEventListener('change', function() {
            if (this.checked) {
                todo_arr[i][2] = true;
                titles[i].classList.remove('not-checked');
                titles[i].classList.add('checked');
            } else {
                todo_arr[i][2] = false;
                titles[i].classList.remove('checked');
                titles[i].classList.add('not-checked');
            }
            const jsonData = JSON.stringify(obj);
            localStorage.setItem(key, jsonData);
        });

        if(todo_arr[i][2] === true) {
            check_boxes[i].checked = true;
            titles[i].classList.remove('not-checked');
            titles[i].classList.add('checked');
        } else {
            check_boxes[i].checked = false;
            titles[i].classList.remove('checked');
            titles[i].classList.add('not-checked');
        }
    }
}

function main() {
    showUser(nameInput);

    add_todo_form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.querySelector('#title').value;
        if(!title ) {
            alert('Please enter a task name!');
            return;
        }
        addTodo(nameInput, [title,false]);
        window.location.reload(true);
    })

    showTodo(nameInput);
    editTodo(nameInput);
    deleteTodo(nameInput);
    editStatus(nameInput);
}

main();
