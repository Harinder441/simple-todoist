const todoContainer = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
const todoList = localStorage.getItem("todoList")?JSON.parse(localStorage.getItem("todoList")):[];
window.onload = ()=>{
const today_date = new Date().toLocaleDateString("en-us", { weekday: "long", year: "numeric", month: "short", day: "numeric" });
document.getElementById("subheading").innerText = today_date;
if(todoList){
    todoList.forEach(todo=>{
        addTodoItemDOM(todo.text,todo.id,todo.completed)
    })
}

todoForm.addEventListener("submit",event=>handleAddSubmit(event))

}



const handleAddSubmit = (e) => {
    e.preventDefault()
    const todoInput = document.getElementById("todo-input");
    const todo = todoInput.value;
    if(todo){
    addTodoItemDOM(todo,'todo-'+todoList.length+1,false);
    addTodoItemLocalStorage(todo,'todo-'+todoList.length+1,false);
    todoInput.value = "";
    }
  
  };

const handleCheckBoxChange = (e,todoLabel)=>{
    if(e.target.checked){
        todoLabel.classList.add("text-decoration-line-through")
    }
    else{
        todoLabel.classList.remove("text-decoration-line-through")
    }  
    const todoItem = todoList.find((todo)=>todo.id===e.target.id);
    todoItem.completed =e.target.checked;
    localStorage.setItem("todoList",JSON.stringify(todoList))

}
const handleTodoClear =()=>{
    todoList.splice(0,todoList.length);
    localStorage.setItem("todoList",JSON.stringify(todoList))
    todoContainer.innerHTML="";
}




const addTodoItemLocalStorage =(text,id,completed)=>{
  
   todoList.push({
         text:text,
         completed:completed,
         id:id,
        }) 
  localStorage.setItem("todoList",JSON.stringify(todoList))
   
}


const addTodoItemDOM = (text,id,checked) => {
  const todoList = document.createElement("li");
  todoList.className = "list-group-item p-3";
  const todoCheck = document.createElement("input");
  todoCheck.className ="form-check-input me-1" ;
  todoCheck.type ="checkbox";
  todoCheck.id=id;
  todoCheck.checked=checked;
  const todoLabel = document.createElement("label");
  todoLabel.className ="form-check-label" ;
  todoLabel.for ="checkbox";
  todoLabel.innerText = text;
  if(checked){
    todoLabel.classList.add("text-decoration-line-through");
  }
  todoCheck.addEventListener('change',(event)=>handleCheckBoxChange(event,todoLabel));
  todoList.append(todoCheck,todoLabel);
  
  todoContainer.appendChild(todoList);
};


