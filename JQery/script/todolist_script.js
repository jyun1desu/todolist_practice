import fileNameUpdate from './modules/fileNameUpdate.js';
import populateList from "./modules/populateList.js";

const addTaskForm = document.querySelector('.add_task_form');
// const fileName = document.querySelector('.file_name');
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const $taskList = $('.todo_list');

//選取任務分類
function select() {
    $(".each_task_status").removeClass('focus-active');
    $(this).addClass('focus-active');
    switch ($(this).attr('id')) {
        case "selectAll":
            $(".todo_list").removeClass('sort-undone');
            $(".todo_list").removeClass('sort-done');
            break;
        case "selectUndone":
            $(".todo_list").addClass('sort-undone');
            $(".todo_list").removeClass('sort-done');
            break;
        case "selectDone":
            $(".todo_list").addClass('sort-done');
            $(".todo_list").removeClass('sort-undone');
            break;
    }
}

//新增任務
function newTask() {
    $(this).addClass('click');
    $('.add_task_form').addClass('click');
    setTimeout(() => $('.add_task_form').addClass('click-active'), 5);
    $('#edit').addClass('clicked');

    $('#status').on("click", toggle);
    $('#priority').on("click", toggle);
    $('#file_update').on("change", fileNameUpdate);
}

//更改狀態
function toggle(){
    $('.add_task_form').toggleClass(this.dataset.use);
    $(this).toggleClass('fas');
    $(this).toggleClass('far');
    $(this).toggleClass("clicked");
}

function addTask(e) {
    e.preventDefault();
    const taskTitle = $('.add_task_form input[name="title"]').val();
    const deadlineDate = $('.add_task_form input[name="date"]').val();
    const deadlineTime = $('.add_task_form input[name="time"]').val();
    const updateFile = $('.add_task_form .file_name').text();
    const memo = $('.add_task_form textarea[name="memo_content"]').val();

    if (!taskTitle.length) {
        $('.add_task_form input[name="title"]').attr("placeholder", "Please add the task title here")
        $('.add_task_form input[name="title"]').get(0).style.setProperty("--c", "#D0021B")
        return;
    }

    const task = {
        taskTitle,
        deadlineDate,
        deadlineTime,
        updateFile,
        memo,
        done: $('#status').hasClass('clicked'),
        primary: $('priority').hasClass('clicked')
    }

    const tasks = JSON.parse(localStorage.getItem('tasks'))||[];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    populateList(tasks, $taskList);
    this.reset();
    resetForm();
}

function resetForm() {
    $('.add_task_form input[name="title"]').attr("placeholder", "Type Something Here...")
    $('.add_task_form input[name="title"]').get(0).style.setProperty("--c", "#c8c8c8")
    $('.add_task_form').removeClass('primary');
    $('.add_task_form').removeClass('done');
    console.log
    $('.add_task_form .file_name').text("");
    $('#priority').addClass('far');
    $('#status').addClass('far');
    $('#priority').removeClass('clicked');
    $('#priority').removeClass('fas');
    $('#status').removeClass('clicked');
    $('#status').removeClass('fas');
    addTaskForm.reset();
    withDraw();
}

function withDraw() {
    $('.add_task_form').removeClass('click-active');
    setTimeout(() => $('.add_task_form').removeClass('click'), 280);
    setTimeout(() => $('.add_new_task').removeClass('click'), 280);
}

populateList(tasks, $taskList);
$(".each_task_status").on("click", select);
$(".add_new_task").on("click", newTask);
$('.add_task_form').on("submit", addTask);
$('.add_task_form .cancel_button').on("click",resetForm)
$('#edit').on("click", withDraw);