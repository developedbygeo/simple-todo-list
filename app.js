// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filter = document.querySelector(".filter-tasks");

// // Event Listeners
document.addEventListener("DOMContentLoaded", getItems);
todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", checkDelete);
filter.addEventListener("change", filterList);

// Functions

// Function to add items
function addToDo(e) {
  e.preventDefault();
  //Creating the container
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const todoLi = document.createElement("li");
  todoLi.classList.add("todo-item");
  todoLi.innerText = todoInput.value;
  // Adding todoLi to container
  todoDiv.appendChild(todoLi);
  // Adding to-do to localStorage
  saveLocalItems(todoInput.value);
  // Check button
  const checkBtn = document.createElement("button");
  checkBtn.innerHTML = `<i class="fas fa-check"></i>`;
  checkBtn.classList.add("check-btn");
  todoDiv.appendChild(checkBtn);
  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
  deleteBtn.classList.add("delete-btn");
  todoDiv.appendChild(deleteBtn);
  // Adding the whole div to the original container
  todoList.appendChild(todoDiv);
  // Clearing the input field
  todoInput.value = "";
}

// Function to delete or mark items
function checkDelete(e) {
  const todoItem = e.target;
  // Deleting the item by checking its class
  if (todoItem.classList[0] === "delete-btn") {
    const deleteItem = todoItem.parentElement;
    // Adding class for animation effect
    deleteItem.classList.add("deleting");
    removeLocalItems(deleteItem);
    // Event listener for the transition to end before removing
    deleteItem.addEventListener("transitionend", function () {
      deleteItem.remove();
    });
  }
  // Marking the item as completed
  if (todoItem.classList[0] === "check-btn") {
    const checkedItem = todoItem.parentElement;
    checkedItem.classList.toggle("completed");
  }
}

// Filtering function
function filterList(e) {
  const todoItems = todoList.childNodes;
  todoItems.forEach(function (item) {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;
      case "completed":
        if (item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      case "pending":
        if (!item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
    }
  });
}

// Saving to local storage
function saveLocalItems(item) {
  let items;
  // Checking whether the localstorage is empty
  if (localStorage.getItem("items") === null) {
    items = [];
    // If not, we push new items to it
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
}

// Updating localstorage
function getItems() {
  let items;
  // Checking whether the localStorage is empty
  if (localStorage.getItem("items") === null) {
    items = [];
    // If not, we push new items to it
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  /* Iterating over the localStorage items and adding them to the list. This time the innerText is equal 
  to the item, so that the pre-existing values populate the fields.*/

  items.forEach(function (item) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const todoLi = document.createElement("li");
    todoLi.classList.add("todo-item");
    todoLi.innerText = item;
    // Adding todoLi to container
    todoDiv.appendChild(todoLi);
    // Check button
    const checkBtn = document.createElement("button");
    checkBtn.innerHTML = `<i class="fas fa-check"></i>`;
    checkBtn.classList.add("check-btn");
    todoDiv.appendChild(checkBtn);
    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteBtn.classList.add("delete-btn");
    todoDiv.appendChild(deleteBtn);
    // Adding the whole div to the original container
    todoList.appendChild(todoDiv);
  });
}
// Function to remove items from localStorage once the delete-btn is pressed
function removeLocalItems(item) {
  let items;
  // Checking whether the localStorage is empty
  if (localStorage.getItem("items") === null) {
    items = [];
    // If not, we push new items to it
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  // Locating the index of the selected entry to remove
  const itemIndex = item.children[0].innerText;
  // Calling splice to remove selected entry
  items.splice(items.indexOf(itemIndex), 1);
  // Pushing localStorage back, now that it has been edited with splice
  localStorage.setItem("items", JSON.stringify(items));
}
