import populateList from "./modules/populateList.js";
import toggleStatus from "./modules/toggle.js";
import { fileNameUpdate } from './modules/toggle.js';


const navButtons = document.querySelectorAll('.each_task_status');
//新增任務
const addTaskButton = document.querySelector('.add_new_task');
const addTaskForm = document.querySelector('.add_task_form');
const cancelButton = document.querySelector('.cancel_button');
const fileName = document.querySelector('.file_name');
///////編輯中
const editting = addTaskForm.querySelector('#edit');
const status = addTaskForm.querySelector('#status');
const priority = addTaskForm.querySelector('#priority');
//任務清單
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const taskList = document.querySelector('.todo_list');

//選取任務分類
function select() {
    navButtons.forEach(button => button.classList.remove('focus-active'));
    switch (this.id) {
        case "selectAll":
            this.classList.add('focus-active');
            taskList.classList.remove('sort-undone');
            taskList.classList.remove('sort-done');
            break;
        case "selectUndone":
            this.classList.add('focus-active');
            taskList.classList.add('sort-undone');
            taskList.classList.remove('sort-done');
            break;
        case "selectDone":
            this.classList.add('focus-active');
            taskList.classList.add('sort-done');
            taskList.classList.remove('sort-undone');
            break;
    }
}
//新增任務
function newTask() {
    this.classList.add('click');
    addTaskForm.classList.add('click');
    setTimeout(() => addTaskForm.classList.add('click-active'), 5)
    editting.classList.add('clicked')

    const doneCheck = addTaskForm.querySelector('#status');
    const primaryCheck = addTaskForm.querySelector('#priority');;
    doneCheck.addEventListener("click", toggle);
    primaryCheck.addEventListener("click", toggle);
    addTaskForm.querySelector('#file_update').addEventListener("change", fileNameUpdate);
}

function toggle(){
    addTaskForm.classList.toggle(this.dataset.use);
    this.classList.toggle('fas');
    this.classList.toggle('far');
    this.classList.toggle("clicked");
}

function addTask(e) {
    e.preventDefault();
    const taskTitle = this.querySelector('[name="title"]').value;
    const deadlineDate = this.querySelector('[name="date"]').value;
    const deadlineTime = this.querySelector('[name="time"]').value;
    const updateFile = this.querySelector('.file_name').textContent;
    const memo = this.querySelector('[name="memo_content"]').value;

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
        done: status.classList.contains('clicked'),
        primary: priority.classList.contains('clicked')
    }

    const tasks = JSON.parse(localStorage.getItem('tasks'))||[];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    populateList(tasks, taskList);
    this.reset();
    resetForm();
}

function resetForm() {
    addTaskForm.querySelector('[name="title"]').placeholder = "Type Something Here...";
    addTaskForm.querySelector('[name="title"]').style.setProperty("--c", "#c8c8c8");
    addTaskForm.classList.remove('priority');
    addTaskForm.classList.remove('status');
    fileName.textContent = "";
    priority.classList.add('far')
    status.classList.add('far')
    priority.classList.remove('clicked','fas')
    status.classList.remove('clicked','fas')
    addTaskForm.reset();
    withDraw();
}

function withDraw() {
    addTaskForm.classList.remove('click-active');
    setTimeout(() => addTaskForm.classList.remove('click'), 280);
    setTimeout(() => addTaskButton.classList.remove('click'), 280);
}

populateList(tasks, taskList);
navButtons.forEach(button => button.addEventListener("click", select));
//新增任務
addTaskButton.addEventListener("click", newTask);
addTaskForm.addEventListener("submit", addTask);
cancelButton.addEventListener("click", resetForm);
editting.addEventListener("click", withDraw);
