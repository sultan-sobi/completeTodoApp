console.clear();


const container=document.querySelector('.container');
const card=document.querySelector('.card');
const form=document.querySelector('form');
const input=document.querySelector('input');
const unorderE=document.querySelector('#lists');
// adding todo
const addTodo=(todoId,todoValue)=>{
    let todoLists=document.createElement("li");
  
    todoLists.id=todoId;
    todoLists.classList.add("list-style");
   
    todoLists.innerHTML=`<span>${todoValue}</span><span><button id='delete'><i class='fa fa-trash'></i></button></span>`
    unorderE.appendChild(todoLists);
    const deleteB= todoLists.querySelector("#delete");
  deleteB.addEventListener("click",deleteItem);

   
}


// delete function
const deleteItem=(e)=>{
  const selectedTod= e.target.parentElement.parentElement.parentElement;
  unorderE.removeChild(selectedTod);
  showingMessage("todo is deleted","danger");
  const todoId=selectedTod.id;
  let todos=getTodosFromLocalStorage();
   todos=todos.filter((todo)=>todo.todoId!==todoId);
   localStorage.setItem("mytods",JSON.stringify(todos));

}

// showing mesage

const showingMessage=(text,status)=>{
      let messageE=document.getElementById("message");
      messageE.innerHTML=text;
      messageE.classList.add(`bg-${status}`)
     setTimeout(()=>{
        messageE.innerHTML=" ";
        messageE.classList.remove(`bg-${status}`);
     },1000)


}
// local storage

const getTodosFromLocalStorage=()=>{
  return localStorage.getItem("mytods") ?JSON.parse(localStorage.getItem("mytods")):[];
}
const loadTodos=()=>{
  const todos=getTodosFromLocalStorage();
  todos.map((todo)=>addTodo(todo.todoId,todo.todoValue))
  
}
// create todo
const createTodo=(event)=>{
    event.preventDefault();
     let todoValue=input.value;
    //  creating a unique
    let todoId=Date.now().toString();
      addTodo(todoId,todoValue);
    //  local storage
     
    const todos=getTodosFromLocalStorage()
   
    todos.push({todoId,todoValue});

    localStorage.setItem("mytods",JSON.stringify(todos));
      showingMessage(" todo is successfully added","success");
      input.value='';
}


form.addEventListener('submit',createTodo);
window.addEventListener('DOMContentLoaded',loadTodos);











