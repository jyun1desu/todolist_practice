import populateList from "./populateList.js";
import editTask from './endEdit.js';

export function toggleShow() {
    const task = this.parentNode.parentNode;
    const quick_detail = this.parentNode.nextElementSibling;
    const detail = quick_detail.nextElementSibling;
    const button = detail.nextElementSibling;
    const title = task.querySelector('input[type="text"]');
    const deleteIcon = task.querySelector('.delete_icon');
    this.classList.toggle('clicked');
    this.classList.toggle('fas');
    this.classList.toggle('far');

    task.addEventListener("click", editTask)

    if (this.classList.contains('fas')) {
        task.classList.add('noquery');
        quick_detail.style.setProperty('display', 'none');
        detail.style.setProperty('display', 'block');
        button.style.setProperty('display', 'flex');
        deleteIcon.classList.add("editting")
        title.readOnly = false;
        task.setAttribute('draggable', false);
    } else {
        console.log("withdraw")
        task.classList.remove('noquery')
        task.setAttribute('draggable', true);
        detail.style.setProperty('display', 'none');
        button.style.setProperty('display', 'none');
        quick_detail.style.setProperty('display', 'flex');
        deleteIcon.classList.remove("editting")
        title.readOnly = true;
    }
}

export function toggleStatus() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const taskList = document.querySelector('.todo_list');
    const task = this.parentNode.parentNode;
    const index = task.dataset.index;
    const usage = this.dataset.use;
    this.classList.toggle("clicked");
    task.classList.toggle(`${usage}`);
    this.classList.toggle('fas');
    this.classList.toggle('far');
    tasks[index][usage] = !tasks[index][usage];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    if(!task.classList.contains("noquery")) populateList(tasks,taskList);
}

export function deleteTask() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const taskList = document.querySelector('.todo_list');
    const dataIndex = this.id.match(/\d+/);
    tasks.splice(dataIndex, 1)
    localStorage.setItem('tasks', JSON.stringify(tasks));
    populateList(tasks, taskList);
}

export function fileNameUpdate() {
    const file = this.files[0].name;
    const fileNameElement = this.nextElementSibling;
    fileNameElement.textContent = file;
}



export default {
    toggleShow,
    toggleStatus,
    deleteTask,
    fileNameUpdate
}