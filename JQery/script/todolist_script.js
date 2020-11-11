//render latest localstorage
//click to add new task
//edit new task and submit(done,primary,task data like title,deadline,memo...)
    //if cancel, reset the form
    //edit old task is same with edit new tasks
//render and at the same time add event listener to some element
//listen to toggle(done/primary),delete,drag event
//save to localstorage

// const navButtons = document.querySelectorAll('.each_task_status');


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


$(".each_task_status").on("click", select);