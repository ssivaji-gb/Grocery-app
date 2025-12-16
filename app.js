
const submit = document.querySelector('.submit-btn');
const list = document.querySelector('.grocery-list');
const clear_btn = document.querySelector('.clear-btn');
const groceryInput = document.querySelector('.grocery');
const alertContainer = document.querySelector('.alert'); 
let final = JSON.parse(localStorage.getItem('groceryitem')) || [];
console.log(final);
let editFlag = false; 
let editID = null; 

submit.addEventListener('click', addData);
clear_btn.addEventListener('click', clearList); 

// Page Reload 
window.addEventListener('DOMContentLoaded', () => {
    final.forEach(uiDisplay);
    if (final.length > 0) {
        clear_btn.style.display = 'block';
    }
});

//alert
function showAlert(text, action) {
    alertContainer.innerHTML = text;
    alertContainer.classList.add(action); 
    setTimeout(function () {
        alertContainer.innerHTML = '';
        alertContainer.classList.remove(action);
    }, 3000);
}

function addData(e) {
    e.preventDefault();
    let data = groceryInput.value.trim();

    if (data === '') {
        showAlert('Please enter a valid item', 'alert-danger');
        return;
    } else if (data && !editFlag) {
        const newItem = {
            id: new Date().getTime().toString(),
            items: data,
        };
        
        final.push(newItem);
        localStorage.setItem('groceryitem', JSON.stringify(final));
        uiDisplay(newItem);
        showAlert('Item Added Successfully', 'alert-success');
        setBackToDefault();

    } else if (data && editFlag) {
        
        editItemInStorage(editID, data);
        const edit = document.querySelector(`[data-id="${editID}"] p`);
        edit.textContent = data;
        showAlert('Item Updated Successfully', 'alert-success');
        setBackToDefault();
    }
}

// UI Display Function 
function uiDisplay(item) {
    const li = document.createElement('article');
    li.classList.add('grocery-item');
    li.setAttribute('data-id', item.id);
    li.innerHTML = `
        <p class="title">${item.items}</p>
        <span>
            <button type="button" class="edit-btn">
                <i><img src="edit (1).svg" alt="edit"></i>
            </button>
            <button type="button" class="delete-btn">
                <i><img src="trash-2.svg" alt="delete"></i>
            </button>
        </span>
    `;

    const deleteBtn = li.querySelector('.delete-btn');
    const editBtn = li.querySelector('.edit-btn');

    deleteBtn.addEventListener('click', deleteItem);
    editBtn.addEventListener('click', editItem);

    list.appendChild(li);

  
    clear_btn.style.display = 'block';
}


// Delete function 
function deleteItem(e) {
    const element = e.currentTarget.closest('.grocery-item');
    const id = element.dataset.id;

    list.removeChild(element);
    deleteItemFromStorage(id);
    setBackToDefault();

    if (final.length === 0) {
        clear_btn.style.display = 'none';
    }
    showAlert('Item Removed', 'alert-danger');
}

function deleteItemFromStorage(id) {
    final = final.filter(item => item.id !== id);
    localStorage.setItem('groceryitem', JSON.stringify(final));
}

// Edit function
function editItem(e) {
    const element = e.currentTarget.closest('.grocery-item');
    const id = element.dataset.id;
    const itemText = element.querySelector('.title').textContent;

    groceryInput.value = itemText;
    editFlag = true;
    editID = id;
    submit.textContent = 'Edit'; // Change button text to reflect edit mode
}

function editItemInStorage(id, newValue) {
    final = final.map(item => {
        if (item.id === id) {
            item.items = newValue;
        }
        return item;
    });
    localStorage.setItem('groceryitem', JSON.stringify(final));
}


function clearList() {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    clear_btn.style.display = 'none';
    localStorage.removeItem('groceryitem');
    final = [];
    showAlert('Empty List', 'alert-danger');
    setBackToDefault();
}

function setBackToDefault() {
    groceryInput.value = '';
    editFlag = false;
    editID = null;
    submit.textContent = 'Submit'; 
}
