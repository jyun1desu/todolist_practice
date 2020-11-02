const addTaskButton = document.querySelector('.add_new_task');
const addTaskForm = document.querySelector('.add_task_form');
const cancelButton = document.querySelector('.cancel_button');
const updateFile = document.querySelector('#file_update');
const fileName = document.querySelector('.file_name');
const priority = document.querySelector('#priority');

const tasks = [];

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
        done: false,
        primary: priority.checked
    }

    tasks.push(task);
    this.querySelector('[name="title"]').placeholder = "Type Something Here...";
    this.querySelector('[name="title"]').style.setProperty("--c", "#000000");
    this.reset();
    this.querySelector('.title_area').style.backgroundColor = "transparent";
    this.querySelector('label[for="priority"]').innerHTML = `<i class="far fa-star">`;
    this.querySelector('label[for="priority"]').style.color = "#000000";
}

function cancelAdding(e){
    e.preventDefault();
    addTaskForm.reset();
    addTaskForm.querySelector('.title_area').style.backgroundColor = "transparent";
    addTaskForm.querySelector('label[for="priority"]').innerHTML = `<i class="far fa-star">`;
    addTaskForm.querySelector('label[for="priority"]').style.color = "#000000";
}

function updateName(){
    const file = this.files[0].name;
    fileName.textContent = file;
}

function markPriority(e){
    const starMark = this.parentNode.querySelector('label[for="priority"]');
    if(this.checked){
        this.parentNode.style.backgroundColor = "#FFF2DC";
        starMark.innerHTML = `<i class="fas fa-star"></i>`;
        starMark.style.color = "#F5A623";
    }else{
        this.parentNode.style.backgroundColor = "transparent";
        starMark.innerHTML = `<i class="far fa-star"></i>`;
        starMark.style.color = "#000000";
    }
}

addTaskButton.addEventListener("click",newTask);
addTaskForm.addEventListener("submit",addTask);
cancelButton.addEventListener("click",cancelAdding);
updateFile.addEventListener("change",updateName)
priority.addEventListener("change",markPriority);