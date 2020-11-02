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
    const taskTitle = this.querySelector('[name="title"]').value;
    const deadlineDate = this.querySelector('[name="date"]').value;
    const deadlineTime = this.querySelector('[name="time"]').value;
    const updateFile = this.querySelector('[name="update"]').value;
    const memo = this.querySelector('[name="memo_content"]').value;

    if(!taskTitle.length){
        this.querySelector('[name="title"]').placeholder = "Please add the task title here";
        this.querySelector('[name="title"]').style.setProperty("--c", "#D0021B")
        return;
    }
    const task = {
        taskTitle,
        deadlineDate,
        deadlineTime,
        updateFile,
        memo,
        done: false
    }
    console.log(task);
}

function cancelAdding(e){
    e.preventDefault();
}

function updateName(){
    const file = this.files[0].name;
    fileName.textContent = file;
}

addTaskButton.addEventListener("click",newTask);
addTaskForm.addEventListener("submit",addTask);
cancelButton.addEventListener("click",cancelAdding);
updateFile.addEventListener("change",updateName)