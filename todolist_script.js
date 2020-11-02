const navButtons = document.querySelectorAll('.each_task_status');
const addTaskButton = document.querySelector('.add_new_task');
const addTaskForm = document.querySelector('.add_task_form');
const cancelButton = document.querySelector('.cancel_button');
const updateFile = document.querySelector('#file_update');
const fileName = document.querySelector('.file_name');
const priority = document.querySelector('#priority');
//剩餘任務數量
const countLeft = document.querySelector('.left_tasks_numbers');

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function newTask() {
    this.classList.add('click');
    addTaskForm.classList.add('click');
    setTimeout(() => addTaskForm.classList.add('click-active'), 5)
}

function addTask(e) {
    e.preventDefault();
    const taskTitle = this.querySelector('[name="title"]').value;
    const deadlineDate = this.querySelector('[name="date"]').value;
    const deadlineTime = this.querySelector('[name="time"]').value;
    const updateFile = this.querySelector('[name="update"]').value;
    const memo = this.querySelector('[name="memo_content"]').value;
    const status = this.querySelector('input#status');

    if (!taskTitle.length) {
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
        done: status.checked,
        primary: priority.checked
    }

    tasks.push(task);
    this.querySelector('[name="title"]').placeholder = "Type Something Here...";
    this.querySelector('[name="title"]').style.setProperty("--c", "#000000");
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.querySelector('.title_area').classList.remove('marked');
    this.querySelector('label[for="priority"]').innerHTML = `<i class="far fa-star">`;
    this.reset();
}

function cancelAdding(e) {
    e.preventDefault();
    addTaskForm.reset();
    addTaskForm.querySelector('.title_area').classList.remove('marked');
    addTaskForm.querySelector('label[for="priority"]').innerHTML = `<i class="far fa-star">`;
}

function updateName() {
    const file = this.files[0].name;
    fileName.textContent = file;
}

function markPriority(e) {
    const starMark = this.parentNode.querySelector('label[for="priority"]');
    if (this.checked) {
        this.parentNode.classList.add('marked');
        starMark.innerHTML = `<i class="fas fa-star"></i>`;
    } else {
        this.parentNode.classList.remove('marked');
        starMark.innerHTML = `<i class="far fa-star"></i>`;
    }
}

function focus() {
    navButtons.forEach(button => button.classList.remove('focus-active'));
    this.classList.add('focus-active');
}


navButtons.forEach(button => button.addEventListener("click", focus));
addTaskButton.addEventListener("click", newTask);
addTaskForm.addEventListener("submit", addTask);
cancelButton.addEventListener("click", cancelAdding);
updateFile.addEventListener("change", updateName)
priority.addEventListener("change", markPriority);


countLeft.textContent=`${tasks.filter(task=>task.done===false).length} task${tasks.filter(task=>task.done===false).length>1?"s":""} left`