import {
    toggleShow
} from './toggle.js';
import {
    fileNameUpdate
} from './toggle.js';
import {
    toggleStatus
} from './toggle.js';
import {
    deleteTask
} from './toggle.js';
import {
    handleDragStart
} from './handleDragEvent.js';
import {
    handleDragEnd
} from './handleDragEvent.js';
import {
    handleDragPassby
} from './handleDragEvent.js';
import {
    handleDragover
} from './handleDragEvent.js';
import {
    handleDrop
} from './handleDragEvent.js';

export default function handleTaskEvents() {
    const tasks = document.querySelectorAll("form.tasks");
    tasks.forEach(task => {
        const edit = task.querySelectorAll("input.edit_icon");
        const completed = task.querySelectorAll("input.completed_checkbox");
        const marked = task.querySelectorAll("input.star_mark");
        const updateButton = task.querySelectorAll("input.update_button")
        const deleteButton = task.querySelectorAll("input.delete_icon");

        edit.forEach(button => button.addEventListener("click", toggleShow))
        completed.forEach(button => button.addEventListener("click", toggleStatus));
        marked.forEach(button => button.addEventListener("click", toggleStatus));
        deleteButton.forEach(button => button.addEventListener("click", deleteTask));
        updateButton.forEach(button => button.addEventListener("change", fileNameUpdate));

        task.addEventListener("dragstart", handleDragStart);
        task.addEventListener("dragenter", handleDragPassby);
        task.addEventListener("dragend", handleDragEnd)

    })

    const droppableAreas = Array.from(document.querySelectorAll('.droppable_area'));
    droppableAreas.forEach(area => {
        area.addEventListener('dragover', handleDragover);
        area.addEventListener('drop', handleDrop);
    })

}