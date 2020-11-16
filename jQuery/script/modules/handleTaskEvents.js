import {
    toggleShow
} from './toggle.js'
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
import {
    fileNameUpdate
} from './fileNameUpdate.js';

export default function handleTaskEvents() {
        $('.tasks .edit_icon').on("click", toggleShow);
        $('.tasks .completed_checkbox').on("click", toggleStatus);
        $('.tasks .star_mark').on("click", toggleStatus);
        $('.tasks .delete_icon').on("click", deleteTask);
        $('.tasks .update_button').on("change", fileNameUpdate);

        $("form.tasks").on("dragstart", handleDragStart);
        $("form.tasks").on("dragenter", handleDragPassby);
        $("form.tasks").on("dragend", handleDragEnd)

    $('.droppable_area').on('dragover', handleDragover);
    $('.droppable_area').on('drop', handleDrop);
}