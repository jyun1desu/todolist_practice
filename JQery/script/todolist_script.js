//render latest localstorage
//click to add new task
//edit new task and submit(done,primary,task data like title,deadline,memo...)
//if cancel, reset the form
//edit old task is same with edit new tasks
//render and at the same time add event listener to some element
//listen to toggle(done/primary),delete,drag event
//save to localstorage

// const navButtons = document.querySelectorAll('.each_task_status');

import fileNameUpdate from './modules/fileNameUpdate.js';

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
    $('.add_task_form').toggleClass(this.id);
    $(this).toggleClass('fas');
    $(this).toggleClass('far');
    $(this).toggleClass("clicked");
}



$(".each_task_status").on("click", select);
$(".add_new_task").on("click", newTask);