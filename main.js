
// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes names
const FINISH = "fa-check-circle";
const PROGRESS = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let TASK, id;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if(data){
    TASK = JSON.parse(data);
    id = TASK.length; 
    loadList(TASK); 
}else{
    // if data isn't empty
    TASK = [];
    id = 0;
}

// load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// Show current date
const options = {weekday : "short", month:"long", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add task function

function addToDo(toDo, id, done, trash){
    
    if(trash){ return; }
    
    const DONE = done ? FINISH : PROGRESS;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}

// add an item to the list user the enter key
document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        const toDo = input.value;
        
        // if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false);
            
            TASK.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            
            // add item to localstorage 
            localStorage.setItem("TODO", JSON.stringify(TASK));
            
            id++;
        }
        input.value = "";
    }
});


// complete task 
function completeToDo(element){
    element.classList.toggle(FINISH);
    element.classList.toggle(PROGRESS);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    TASK[element.id].done = TASK[element.id].done ? false : true;
}

// remove task
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    TASK[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; 
    const elementJob = element.attributes.job.value; 
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    
    // add item to localstorage 
    localStorage.setItem("TODO", JSON.stringify(TASK));
});


















