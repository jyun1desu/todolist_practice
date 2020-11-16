import populateList from "./populateList.js";
import editTask from './endEdit.js';

export function toggleShow() {
    const $task = $(this).parent().parent();
    const $quick_detail = $(this).parent().next();
    const $detail = $quick_detail.next();
    const $button = $detail.next();
    const $title = $task.find('input[type="text"]');
    const $deleteIcon = $task.find('.delete_icon');
    $(this).toggleClass('clicked');
    $(this).toggleClass('fas');
    $(this).toggleClass('far');

    $task.on("click", editTask)

    if ($(this).hasClass('fas')) {
        $task.addClass('noquery');
        $quick_detail.css('display', 'none');
        $detail.css('display', 'block');
        $button.css('display', 'flex');
        $title.removeAttr("readonly");
        $deleteIcon.addClass("editting");
        $task.attr('draggable', false);
    } else {
        $task.removeClass('noquery')
        $task.attr('draggable', true);
        $detail.css('display', 'none');
        $button.css('display', 'none');
        $quick_detail.css('display', 'flex');
        $deleteIcon.removeClass("editting")
        $title.removeAttr("readonly");
        $title.attr("readonly",true);
    }
}

export function toggleStatus() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const $taskList = $('.todo_list');
    const $task = $(this).parent().parent();
    const $index = $task.data('index');
    const $usage = $(this).data('use');
    $(this).toggleClass("clicked");
    $(this).toggleClass('fas');
    $(this).toggleClass('far');
    $task.toggleClass(`${$usage}`);
    tasks[$index][$usage] = !tasks[$index][$usage];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    if(!$task.hasClass("noquery")) populateList(tasks,$taskList);
}

export function deleteTask() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const $taskList = $('.todo_list');
    const dataIndex = this.id.match(/\d+/);
    tasks.splice(dataIndex, 1)
    localStorage.setItem('tasks', JSON.stringify(tasks));
    populateList(tasks, $taskList);
}

export default {
    toggleShow,
    toggleStatus,
    deleteTask,
}