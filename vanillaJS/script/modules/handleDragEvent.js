import populateList from "./populateList.js";

let draggedElement;
let currentPassbyElement;
let previousY;

//拖曳物件
export function handleDragStart() {
    draggedElement = this
    this.style.opacity = "0.3";
    this.style.transform = "scale(1) translateY(0)";
    this.parentNode.classList.add('pop');
}
export function handleDragEnd() {
    this.style.opacity = "1";
    this.style.transform = "scale(1) translateY(0)";
    currentPassbyElement.style.margin = "0 0 8px";
    document.querySelectorAll(".droppable_area").forEach(area=>area.classList.remove('pop'));
}
export function handleDragPassby(e) {
    if (draggedElement.parentNode === this.parentNode && draggedElement !== this) {
        const moveDown = e.pageY > previousY;
        this.style.margin = `${moveDown?"0 0px 50px":"50px 0px 8px"}`;
    }
    if (currentPassbyElement && currentPassbyElement !== this) {
        currentPassbyElement.style.margin = "0 0 8px";
    }
    currentPassbyElement = this;
    previousY = e.pageY;
}
//拖曳物件drop區域
export function handleDragover(e) {
    e.preventDefault();
}
export function handleDrop(e) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const dropdownArea = this;
    const draggedElementArea = draggedElement.parentNode;
    if (draggedElementArea !== dropdownArea) return;

    const moveDown = e.pageY > currentPassbyElement.offsetTop;
    const old_index = draggedElement.dataset.index;
    let new_index;
    if (moveDown) {
        dropdownArea.insertBefore(draggedElement, currentPassbyElement.nextElementSibling)
        new_index = Number(currentPassbyElement.nextElementSibling.dataset.index)+1;
        console.log(new_index)
    }
    if (!moveDown) {
        dropdownArea.insertBefore(draggedElement, currentPassbyElement)
        new_index = Number(currentPassbyElement.dataset.index);;
    }

    const task = tasks[old_index];
    tasks.splice(old_index, 1)
    tasks.splice(new_index, 0, task)
    localStorage.setItem('tasks', JSON.stringify(tasks));
    const taskList = document.querySelector('.todo_list');
    populateList(tasks, taskList);
}

export default {handleDragStart, handleDragEnd, handleDragPassby,handleDragover,handleDrop}