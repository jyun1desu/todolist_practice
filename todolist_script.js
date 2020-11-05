const navButtons = document.querySelectorAll('.each_task_status');
//新增任務
const addTaskButton = document.querySelector('.add_new_task');
const addTaskForm = document.querySelector('.add_task_form');
const cancelButton = document.querySelector('.cancel_button');
const updateFile = document.querySelector('#file_update');
const fileName = document.querySelector('.file_name');
///////編輯中
const editting = addTaskForm.querySelector('#edit');
///////剩餘任務數量
const countLeft = document.querySelector('.left_tasks_numbers');
//任務清單
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const taskList = document.querySelector('.todo_list');
let taskOrdinal = 0
//編輯任務

function populateList(tasks = [], taskList) {
    taskList.innerHTML = tasks.map((task, index) => {
        return `
        <form data-index="${index}" class="tasks ${task.primary?"primary":""} ${task.done?"done":""}">
        <div class="main_information">
        <input id="status${index}" data-use="done" onclick="toggleStatus(this)" class="completed_checkbox" type="checkbox"
            ${task.done?"checked":" "}>
                        <label for="status${index}" class="completed_checkbox  ${task.done?" clicked":""}"><i
            class="fas fa-check"></i></label>
        <input type="text" class="task_title" value="${task.taskTitle}" placeholder="Type Something Here..." readonly>
        <input id="priority${index}" data-use="primary" onclick="toggleStatus(this)" class="star_mark" type="checkbox"
            ${task.primary?"checked":" "}>
                        <label for="priority${index}" class="star_mark ${task.primary?" clicked":""}"><i
            class="${task.primary?"fas":"far"} fa-star"></i></label>
        <input id="edit${index}" onclick="toggleShow(this)" class="edit_icon" type="checkbox">
        <label for="edit${index}" class="edit_icon"><i class="far fa-pen"></i><label>
    </div>
    
    <div class="quick_detail">
        ${task.deadlineDate?`<span>
            <i class="far fa-calendar-alt"></i>
            <span>${task.deadlineDate}</span></span>`:""}
        ${task.updateFile?`<span><i class="far fa-file"></i></span>`:""}
        ${task.memo?`<span><i class="far fa-comment-dots"></i></span>`:""}
    </div>
    
    <div class="detail_area" style="display:none;">
        <div class="deadline">
            <i class="icon far fa-calendar-alt"></i>
            <div class="content_block">
                <p>Deadline</p>
                <div class="time_block">
                    <input name="date" class="deadline_date" value="${task.deadlineDate}" type="date"
                        placeholder="yyyy/mm/dd">
                    <input name="time" class="deadline_time" value="${task.deadlineTime}" type="time" placeholder="hh:mm">
                </div>
            </div>
        </div>
        <div class="file_update">
            <i class="icon far fa-file"></i>
            <div class="content_block">
                <p>File</p>
                <input id="file_update${index}" onchange="fileNameUpdate(this)" name="update" type="file" class="update_button">
                <span class="file_name">${task.updateFile||""}</span>
                <label for="file_update${index}"></label>
            </div>
        </div>
        <div class="memo">
            <i class="icon far fa-comment-dots"></i>
            <div class="content_block">
                <p>Comment</p>
                <textarea name="memo_content" placeholder="Type your memo here...">${task.memo}</textarea>
            </div>
        </div>

    </div>
    <div class="button_area" style="display:none;">
    <button type="button" class="cancel_edit_button">&times; Cancel</button>
    <button type="button" class="save_button">&#43; Save</button>
</div>
        </form>
        `
    }).join("");
    countLeft.textContent = `${tasks.filter(task=>task.done===false).length} task${tasks.filter(task=>task.done===false).length>1?"s":""} left`
}

function focus() {
    navButtons.forEach(button => button.classList.remove('focus-active'));
    this.classList.add('focus-active');
}

// function selectAll(){
//     // populateList(tasks, taskList);
// }

// function sortUndo() {
//     // const sortedList = tasks.filter(task => !task.done);
//     // populateList(sortedList, taskList);
// }

// function sortDone() {
// //     const sortedList = tasks.filter(task => task.done);
// //     populateList(sortedList, taskList);
// // }

function newTask() {
    this.classList.add('click');
    addTaskForm.classList.add('click');
    setTimeout(() => addTaskForm.classList.add('click-active'), 5)
    addTaskForm.querySelector('#edit').checked = true;
    addTaskForm.querySelector('label[for="edit"]').innerHTML = `<i class="fas fa-pen"></i>`;
    editting.nextElementSibling.classList.add('clicked')
}

function addTask(e) {
    e.preventDefault();
    const taskTitle = this.querySelector('[name="title"]').value;
    const deadlineDate = this.querySelector('[name="date"]').value;
    const deadlineTime = this.querySelector('[name="time"]').value;
    const updateFile = this.querySelector('.file_name').textContent;
    const memo = this.querySelector('[name="memo_content"]').value;
    const status = this.querySelector('input#status');

    if (!taskTitle.length) {
        this.querySelector('[name="title"]').placeholder = "Please add the task title here";
        this.querySelector('[name="title"]').style.setProperty("--c", "#D0021B")
        return;
    }

    taskOrdinal++

    const task = {
        taskTitle,
        deadlineDate,
        deadlineTime,
        updateFile,
        memo,
        taskOrdinal,
        done: status.checked,
        primary: priority.checked
    }

    tasks.push(task);
    populateList(tasks, taskList);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.reset();
    resetForm();
}

function resetForm() {
    addTaskForm.querySelector('[name="title"]').placeholder = "Type Something Here...";
    addTaskForm.querySelector('[name="title"]').style.setProperty("--c", "#c8c8c8");
    addTaskForm.classList.remove('primary');
    addTaskForm.classList.remove('done');
    addTaskForm.querySelector('label[for="priority"]').innerHTML = `<i class="far fa-star">`;
    fileName.textContent = "";
    addTaskForm.reset();
    addTaskForm.querySelector('label[for="status"]').classList.remove('clicked')
    addTaskForm.querySelector('label[for="priority"]').classList.remove('clicked')
    withDraw();
}

function fileNameUpdate(element) {
    const file = element.files[0].name;
    const fileNameElement = element.nextElementSibling;
    fileNameElement.textContent = file;
}

function withDraw() {
    addTaskForm.classList.remove('click-active');
    setTimeout(() => addTaskForm.classList.remove('click'), 280);
    setTimeout(() => addTaskButton.classList.remove('click'), 280);
}

function toggleStatus(element) {
    const label = element.nextElementSibling;
    const icon = label.firstChild;
    const task = element.parentNode.parentNode;
    const index = task.dataset.index;
    const usage = element.dataset.use;
    label.classList.toggle("clicked");
    task.classList.toggle(`${usage}`);
    icon.classList.toggle('fas');
    icon.classList.toggle('far');
    if (task.dataset.index) {
        tasks[index][usage] = !tasks[index][usage];
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    countLeft.textContent = `${tasks.filter(task=>task.done===false).length} task${tasks.filter(task=>task.done===false).length>1?"s":""} left`
}

function toggleShow(element) {
    const task = element.parentNode.parentNode;
    const quick_detail = element.parentNode.nextElementSibling;
    const detail = quick_detail.nextElementSibling;
    const button = detail.nextElementSibling;
    const label = element.nextElementSibling;
    const icon = label.firstChild
    const title = task.querySelector('input[type="text"]');

    if (element.checked) {
        task.classList.add('noquery');
        quick_detail.style.setProperty('display', 'none');
        detail.style.setProperty('display', 'block');
        button.style.setProperty('display', 'flex');
        label.classList.add("clicked");
        icon.classList.add('fas');
        icon.classList.remove('far');
        title.readOnly = false;
    } else {
        task.classList.remove('noquery')
        detail.style.setProperty('display', 'none');
        button.style.setProperty('display', 'none');
        quick_detail.style.setProperty('display', 'flex');
        label.classList.remove("clicked");
        icon.classList.add('far');
        icon.classList.remove('fas');
        title.readOnly = true;
    }
}

function editTask(e) {
    const element = e.target;
    const taskForm = element.parentNode.parentNode;
    const title = taskForm.querySelector('input[type="text"]');
    const index = taskForm.dataset.index;
    const taskCoords = tasks[index];

    if (element.matches('button.cancel_edit_button')) {
        title.value = taskCoords.taskTitle;;
        taskForm.querySelector('[name="date"]').value = taskCoords.deadlineDate;
        taskForm.querySelector('[name="time"]').value = taskCoords.deadlineTime;
        taskForm.querySelector('[name="memo_content"]').value = taskCoords.memo;
    }

    if (element.matches('button.save_button')) {
        const editedTitle = title.value;
        const editedDate = taskForm.querySelector('[name="date"]').value;
        const editedTime = taskForm.querySelector('[name="time"]').value;
        const editedFile = taskForm.querySelector('.file_name').textContent
        const editedMemo = taskForm.querySelector('[name="memo_content"]').value;

        if (!title.value.length) {
            title.placeholder = "Please add the task title here";
            title.style.setProperty("--c", "#D0021B")
            return;
        }

        taskCoords.taskTitle = editedTitle;
        taskCoords.deadlineDate = editedDate;
        taskCoords.deadlineTime = editedTime;
        taskCoords.updateFile = editedFile;
        taskCoords.memo = editedMemo;
        localStorage.setItem('tasks', JSON.stringify(tasks));


    }
}

populateList(tasks, taskList);
//navbar分類點擊
navButtons.forEach(button => button.addEventListener("click", focus));
//新增任務
addTaskButton.addEventListener("click", newTask);
addTaskForm.addEventListener("submit", addTask);
cancelButton.addEventListener("click", resetForm);
editting.addEventListener("input", withDraw);
taskList.addEventListener("click", editTask);

//計算剩餘任務數量