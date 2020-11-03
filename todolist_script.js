const navButtons = document.querySelectorAll('.each_task_status');
const addTaskButton = document.querySelector('.add_new_task');
const addTaskForm = document.querySelector('.add_task_form');
const cancelButton = document.querySelector('.cancel_button');
const updateFile = document.querySelector('#file_update');
const fileName = document.querySelector('.file_name');
//完成狀態
const status = document.querySelector('input#status');
//打星星
// const priority = document.querySelector('#priority');
//編輯中
const editting = document.querySelector('#edit');
//剩餘任務數量
const countLeft = document.querySelector('.left_tasks_numbers');
//任務清單
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const taskList = document.querySelector('.todo_list');

function newTask() {
    this.classList.add('click');
    addTaskForm.classList.add('click');
    setTimeout(() => addTaskForm.classList.add('click-active'), 5)
    addTaskForm.querySelector('#edit').checked = true;
    addTaskForm.querySelector('label[for="edit"]').innerHTML = `<i class="fas fa-pen"></i>`;

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
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.reset();
    resetForm();
}

function resetForm() {
    addTaskForm.querySelector('[name="title"]').placeholder = "Type Something Here...";
    addTaskForm.querySelector('[name="title"]').style.setProperty("--c", "#c8c8c8");
    addTaskForm.querySelector('.title_area').classList.remove('marked');
    addTaskForm.querySelector('.title_area').classList.remove('task-done');
    addTaskForm.querySelector('label[for="priority"]').innerHTML = `<i class="far fa-star">`;
    withDraw();
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

function toggleDone(e) {
    const checkbox = this.parentNode;
    if (this.checked) checkbox.classList.add('task-done');
    else(checkbox.classList.remove('task-done'))
}

function withDraw() {
    addTaskForm.classList.remove('click-active');
    setTimeout(() => addTaskForm.classList.remove('click'), 280);
    setTimeout(() => addTaskButton.classList.remove('click'), 280);
}

function handleEdit() {
    const editMark = this.parentNode.querySelector('label[for="edit"]');
    if (this.checked) {
        editMark.innerHTML = `<i class="fas fa-pen"></i>`;
    } else {
        editMark.innerHTML = `<i class="far fa-pen"></i>`;
        addTaskForm.classList.remove('click-active');
        setTimeout(() => addTaskForm.classList.remove('click'), 280);
        setTimeout(() => addTaskButton.classList.remove('click'), 280);
    }
}

function populateList(tasks = [], taskList) {
    taskList.innerHTML = tasks.map((task,index) => {
        return `
        <li class="tasks ${task.primary?"marked":""} ${task.done?"task-done":""}">
            <div class="title_overview">
                <div class="main_information">
                    <input id="status${index}" class="completed_checkbox" type="checkbox" ${task.done?"checked":" "}>
                    <label for="status${index}" class="completed_checkbox" ><i class="fas fa-check"></i></label>
                    <p class="task_title">${task.taskTitle}</p>
                    <input id="priority${index}" class="star_mark" type="checkbox" ${task.primary?"checked":" "}>
                    <label for="priority${index}" class="star_mark"><i class="${task.primary?"fas":"far"} fa-star"></i></label>
                    <input id="edit${index}" class="edit_icon" type="checkbox">
                    <label for="edit${index}" class="edit_icon"><i class="far fa-pen"></i><label>
                </div>

                <div class="detail">
                ${task.deadlineDate?`<span>
                <i class="far fa-calendar-alt"></i>
                <span>${task.deadlineDate}</span></span>`:""}
                ${task.updateFile?`<span><i class="far fa-file"></i></span>`:""}
                ${task.memo?`<span><i class="far fa-comment-dots"></i></span>`:""}
                    </div>
                </div>
        </li>
        `
    }).join("");
}


//navbar分類點擊
navButtons.forEach(button => button.addEventListener("click", focus));
//新增任務
addTaskButton.addEventListener("click", newTask);
addTaskForm.addEventListener("submit", addTask);
cancelButton.addEventListener("click", resetForm);
updateFile.addEventListener("change", updateName)
// priority.addEventListener("change", markPriority);
status.addEventListener("change", toggleDone);
editting.addEventListener("input", handleEdit);
//點擊外圍收回新增表單
window.addEventListener("click", (e) => {
    if (e.target === document.body) withDraw();
});
populateList(tasks, taskList);

taskList.addEventListener("click", hello);

function hello(e) {
    if (!e.target.matches('i')) return;
    const input = e.target.parentNode.previousElementSibling;
    const inputType = input.classList[0];
    const task = input.parentNode.parentNode.parentNode;
    switch (inputType) {
        case "completed_checkbox":
            task.classList.toggle('task-done');
            break;
        case "star_mark":
            task.classList.toggle('marked');
            if (input.checked) {
                e.target.parentNode.innerHTML = `<i class="far fa-star"></i>`;
            }else{
                e.target.parentNode.innerHTML = `<i class="fas fa-star"></i>`;
            }
            break;
        case "edit_icon":
            if (input.checked) {
                e.target.parentNode.innerHTML = `<i class="far fa-pen"></i>`;
            } else {
                e.target.parentNode.innerHTML = `<i class="fas fa-pen"></i>`;
            }
            break;
    }
}

//計算剩餘任務數量
countLeft.textContent = `${tasks.filter(task=>task.done===false).length} task${tasks.filter(task=>task.done===false).length>1?"s":""} left`