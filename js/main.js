const inputValue = document.querySelector('#input-field');
const addBtn = document.querySelector('#addInput');
const saveEdit = document.querySelector('#editInput');
const items = document.querySelectorAll('.items')[0];
const emptyError = document.querySelector('#empty-error');
const formWrapper = document.forms[0];
const todoItem = document.createElement('li')

let todoItems = JSON.parse(localStorage.getItem('todo-list')) || [];
// localStorage.clear();

let error;

window.addEventListener('DOMContentLoaded', () => {
    inputValue.focus();
})

addBtn.addEventListener('click', function (event) {
    event.preventDefault();
    inputValue.value = inputValue.value.trim();
    console.log(inputValue.value);
    if (inputValue.value === '') {
        emptyError.innerHTML = "<p>Error!<br>To do item can't be empty!</p>";
        formWrapper.classList.add('error-shake');
        console.log('inner html :', emptyError.innerHTML);
        return false;
    } else {
        formWrapper.classList.remove('error-shake');
        emptyError.innerHTML = '';
        console.log('inner html :', emptyError.innerHTML);
    }
    //local storage
    todoItems.push({
        inputValue : inputValue.value,
        isChecked : false
    });
    localStorage.setItem('todo-list' , JSON.stringify(todoItems));
    for(let i = 0 ; i < todoItems.length ; i++){
        console.log(todoItems[i].inputValue);
        // const childs = items.childElementCount + 1;
        const todoItem = document.createElement('li')
        todoItem.innerHTML = `<div class="todo-input">
        <input class="me-xxl-4" type="checkbox" name="todoItem${i}" id="todoItem${i}">
        <label for="todoItem${i}">${todoItems[i].inputValue}</label>
        </div>
        <div class="todo-btn">
        <a onclick='editFunc(todo-item${i},this)' id="editBtn"><span class="iconify fs-1" data-icon="ei:pencil"></span>                        </span></a>
        <a onclick='delFunc(todo-item${i})' id="binBtn"><span class="iconify fs-3" data-icon="ri:delete-bin-line"></a>
        </div>`
        todoItem.setAttribute('class', 'item d-flex justify-content-between align-items-center my-5');
        todoItem.setAttribute('id', `todo-item${i}`);
        inputValue.value = '';
    }

    
    items.prepend(todoItem);
    

})



// Edit function 

function editFunc(id){
    let item = document.querySelector('#todo-item`$id`')
}
