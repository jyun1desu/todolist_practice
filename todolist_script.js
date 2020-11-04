const navButtons = document.querySelectorAll('.each_task_status');
//新增任務
const addTaskButton = document.querySelector('.add_new_task');
const addTaskForm = document.querySelector('.add_task_form');
const cancelButton = document.querySelector('.cancel_button');
const updateFile = document.querySelector('#file_update');
const fileName = document.querySelector('.file_name');
////////完成狀態
const status = document.querySelector('input#status');
///////打星星
const priority = document.querySelector('#priority');
///////編輯中
const editting = addTaskForm.querySelector('#edit');
///////剩餘任務數量
const countLeft = document.querySelector('.left_tasks_numbers');
//已存在任務
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const taskList = document.querySelector('.todo_list');

function populateList(tasks = [], taskList) {
    taskList.innerHTML = tasks.map((task, index) => {
        return `
        <form data-index="${index}" class="tasks ${task.primary?"primary":""} ${task.done?"done":""}">
        <div class="main_information">
        <input id="status${index}" data-use="done" onclick="toggleStatus(this)" class="completed_checkbox" type="checkbox"
            ${task.done?"checked":" "}>
                        <label for="status${index}" class="completed_checkbox  ${task.done?" clicked":""}"><i
            class="fas fa-check"></i></label>
        <p class="task_title">${task.taskTitle}</p>
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
                <input id="file_update" name="update" type="file" class="update_button" value="">
                ${task.updateFile?`<span class="file_name">${task.updateFile}</span>`:""}
                <label for="file_update"></label>
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
    <button class="cancel_edit_button">&times; Cancel</button>
    <button class="save_button">&#43; Save</button>
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
    populateList(tasks, taskList);
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
    fileName.textContent = "";
    withDraw();
}

function updateName() {
    const file = this.files[0].name;
    fileName.textContent = file;
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
    if(task.dataset.index){
        tasks[index][usage] = !tasks[index][usage];
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    countLeft.textContent = `${tasks.filter(task=>task.done===false).length} task${tasks.filter(task=>task.done===false).length>1?"s":""} left`
}

function toggleShow(element){
    const quick_detail = element.parentNode.nextElementSibling;
    const detail = quick_detail.nextElementSibling;
    const button = detail.nextElementSibling;
    const label = element.nextElementSibling;
    const icon = label.firstChild

    if(element.checked){
        quick_detail.style.setProperty('display','none');
        detail.style.setProperty('display','block');
        button.style.setProperty('display','flex');
        label.classList.add("clicked");
        icon.classList.add('fas');
        icon.classList.remove('far');
    }else{
        detail.style.setProperty('display','none');
        button.style.setProperty('display','none');
        quick_detail.style.setProperty('display','flex');
        label.classList.remove("clicked");
        icon.classList.add('far');
        icon.classList.remove('fas');
    }
}

populateList(tasks, taskList);
//navbar分類點擊
navButtons.forEach(button => button.addEventListener("click", focus));
//新增任務
addTaskButton.addEventListener("click", newTask);
addTaskForm.addEventListener("submit", addTask);
cancelButton.addEventListener("click", resetForm);
updateFile.addEventListener("change", updateName);
editting.addEventListener("input", withDraw);

//計算剩餘任務數量
