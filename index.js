var todos = [];

var addTodoForm = document.querySelector("#addTodoForm");

var listGroup = document.querySelector(".list-group");

function createListItem(todoValue, todoIndex) {
  var li = document.createElement("li");
  li.setAttribute("class", "list-group-item d-flex justify-content-between");

  if (todos[todoIndex].completed) {
    li.classList.add("bg-secondary");
  }

  li.addEventListener("click", function () {
    if (todos[todoIndex].completed) {
      // Remove bg-secondary from Li
      li.classList.remove("bg-secondary");
      // set Completed to false
      todos[todoIndex].completed = false;
    } else {
      // add bg-secondary to Li
      li.classList.add("bg-secondary");
      // set completed true
      todos[todoIndex].completed = true;
    }

    localStorage.setItem("todos", JSON.stringify(todos));
  });

  // create Span
  var span = document.createElement("span");
  span.innerHTML = todoValue;

  // Create Icon
  var icon = document.createElement("i");
  icon.setAttribute("class", "fas fa-trash-alt");
  icon.addEventListener("click", function (event) {
    event.stopPropagation();
    event.target.parentElement.remove();
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  });

  li.appendChild(span);
  li.appendChild(icon);

  return li;
}

function renderTodos(todos) {
  todos.forEach(function (todo, index) {
    var li = createListItem(todo.value, index, todo.completed);
    listGroup.appendChild(li);
  });
}

//Check is todo Exist in LocalStorage
var storedTodos = localStorage.getItem("todos");
// if Exist
if (storedTodos) {
  var parsedStoredTodos = JSON.parse(storedTodos);
  todos = parsedStoredTodos;
  renderTodos(todos);
  // Loop over Array, create li Element and Append to the DOM
}

addTodoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var todoValue = addTodoForm.todo.value;

  todos.push({
    value: todoValue,
    completed: false,
  });

  addTodoForm.todo.value = "";

  localStorage.setItem("todos", JSON.stringify(todos));

  var li = createListItem(todoValue, todos.length - 1);
  listGroup.appendChild(li);
});
