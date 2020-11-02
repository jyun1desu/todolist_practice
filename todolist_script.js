const addTaskButton = document.querySelector('.add_new_task');
const addTaskForm = document.querySelector('.add_task_form');
const cancelButton = document.querySelector('.cancel_button');
const updateFile = document.querySelector('#file_update');
const fileName = document.querySelector('.file_name');

function newTask(){
    this.classList.add('click');
    addTaskForm.classList.add('click');
    setTimeout(()=>addTaskForm.classList.add('click-active'),5)
}

function addTask(e){
    e.preventDefault();
}

function cancelAdding(e){
    e.preventDefault();
}

function updateName(){
    const file = this.files[0].name;
    fileName.textContent = file

    console.log(fileName)

}

addTaskButton.addEventListener("click",newTask);
addTaskForm.addEventListener("submit",addTask);
cancelButton.addEventListener("click",cancelAdding);
updateFile.addEventListener("change",updateName)