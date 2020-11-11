//selector:

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event listeners:
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Function:

function addTodo(event) {
  event.preventDefault();
  //todo div:
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create li:
  const nowTodo = document.createElement("li");
  nowTodo.innerText = todoInput.value;
  nowTodo.classList.add("todo-item");
  //áp dụng html dom appendChild() : https://www.w3schools.com/jsref/met_node_appendchild.asp
  todoDiv.appendChild(nowTodo);
  //thêm todo này vào localTorage:
  seveLocalStore(todoInput.value);

  //check mark button:
  const completeButton = document.createElement("button");
  //=> (property) HTMLElement.innerText: string
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);

  //check trash button:
  const trashButton = document.createElement("button");
  //=> (property) HTMLElement.innerText: string
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //append to list:
  todoList.appendChild(todoDiv);
  //clear: clear sẻ bằng một chuỗi NaN.
  //in put value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  //delete:
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //animation: học css rồi phải biết animation nha mấy má :v
    todo.classList.add("fall");
    removeLocalStore(todo);
    todo.addEventListener("transitioned", function () {
      todo.remove();
    });
  }
  //check: nút toggle thui :
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  //lồng trong forEach là một switch để xem lấy được dữ liệu hay là ko nè :v
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function seveLocalStore(todo) {
  //check xem đã có gì trong này chưa: Bắt đầu nha mấy má :v
  let todos;
  //kiểm tra sẻ so sánh tuyệt đối là null
  if (localStorage.getItem("todos") === null) {
    //array rổng để khi mà mở localstore ra thì nó sẻ như dậy nè : ["a", "b", "c" ....];
    todos = [];
  } else {
    //json api trong localStore lấy json để liêt kết client lên và hiện thị dữ liệu trong localstore:
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));

  // => xong mấy dòng này thì chạy lên dòng 26 gọi nó ra nha mấy má :v
}
function getTodos() {
  console.log("duc long");
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li:
    const nowTodo = document.createElement("li");
    nowTodo.innerText = todo;
    nowTodo.classList.add("todo-item");
    //áp dụng html dom appendChild() : https://www.w3schools.com/jsref/met_node_appendchild.asp
    todoDiv.appendChild(nowTodo);
    //check mark button:
    const completeButton = document.createElement("button");
    //=> (property) HTMLElement.innerText: string
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    //check trash button:
    const trashButton = document.createElement("button");
    //=> (property) HTMLElement.innerText: string
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to list:
    todoList.appendChild(todoDiv);
  });
}

function removeLocalStore(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
