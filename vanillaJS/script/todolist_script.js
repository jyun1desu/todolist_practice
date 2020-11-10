// import populateList from "./modules/populateList.js";


const navButtons = document.querySelectorAll('.each_task_status');
//新增任務
const addTaskButton = document.querySelector('.add_new_task');
const addTaskForm = document.querySelector('.add_task_form');
const cancelButton = document.querySelector('.cancel_button');
const updateFile = document.querySelector('#file_update');
const fileName = document.querySelector('.file_name');
///////編輯中
const editting = addTaskForm.querySelector('#edit');
//任務清單
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const taskList = document.querySelector('.todo_list');
// let orderArray = JSON.parse(localStorage.getItem('order')) || [];
//編輯任務

const droppableAreas = Array.from(document.querySelectorAll('.droppable_area'));
droppableAreas.forEach(area => {
    area.addEventListener('dragover', handleDragover);
    area.addEventListener('drop', handleDrop);
})

let draggedElement;
let currentPassbyElement;
let previousY;

//拖曳物件
function handleDragStart(event, element) {
    draggedElement = element
    element.style.opacity = "0.3";
    element.style.transform = "scale(1) translateY(0)";
    element.parentNode.classList.add('pop');
}
function handleDragEnd(event, element) {
    element.style.opacity = "1";
    element.style.transform = "scale(1) translateY(0)";
    currentPassbyElement.style.margin = "0 0 8px";
}
function handleDragPassby(event, element) {
    if (draggedElement.parentNode === element.parentNode && draggedElement !== element) {
        const moveDown = event.pageY > previousY;
        element.style.margin = `${moveDown?"0 0px 50px":"50px 0px 8px"}`;
    }
    if (currentPassbyElement && currentPassbyElement !== element) {
        currentPassbyElement.style.margin = "0 0 8px";
    }
    currentPassbyElement = element;
    previousY = event.pageY;
}
//拖曳物件drop區域
function handleDragover(e) {
    e.preventDefault();
}
function handleDrop(e) {
    const draggedElementArea = draggedElement.parentNode;
    const dropdownArea = this;
    dropdownArea.classList.remove('pop');
    if (draggedElementArea !== dropdownArea) return;

    const moveDown = e.pageY > currentPassbyElement.offsetTop;
    if (moveDown) {
        dropdownArea.insertBefore(draggedElement, currentPassbyElement.nextElementSibling)
    }
    if (!moveDown) {
        dropdownArea.insertBefore(draggedElement, currentPassbyElement)
    }

    const old_index = draggedElement.dataset.index;
    const new_index = Array.from(document.querySelectorAll('.tasks')).indexOf(draggedElement)
    const task = tasks[old_index];
    tasks.splice(old_index, 1)
    tasks.splice(new_index, 0, task)
    localStorage.setItem('tasks', JSON.stringify(tasks));

    populateList(tasks, taskList);

}
//印出列表
function populateList(tasksArray = [], taskList) {
    let taskHTMLlist = tasksArray.map((task, index) => {
        const eachTaskHTML = `<form data-index="${index}" ondragstart="handleDragStart(event,this)" ondragend="handleDragEnd(event,this)" ondragenter="handleDragPassby(event,this)" class="tasks ${task.primary?"primary":""} ${task.done?"done":""}" draggable="true">
        <div class="drag_icon">
        </div>
        <div class="main_information">
        <input id="status${index}" data-use="done" class="completed_checkbox" type="checkbox"
            ${task.done?"checked":" "}>
                        <label for="status${index}" class="completed_checkbox  ${task.done?" clicked":""}"><i
            class="fas fa-check"></i></label>
        <input type="text" class="task_title" value="${task.taskTitle}" placeholder="Type Something Here..." readonly>
        <input id="priority${index}" data-use="primary" class="star_mark" type="checkbox"
            ${task.primary?"checked":" "}>
                        <label for="priority${index}" class="star_mark ${task.primary?" clicked":""}"><i
            class="${task.primary?"fas":"far"} fa-star"></i></label>
        <input id="edit${index}" class="edit_icon" type="checkbox">
        <label for="edit${index}" class="edit_icon"><i class="far fa-pen"></i></label>
        
        <input id="delete${index}" class="delete_icon" type="checkbox">
        <label for="delete${index}" class="delete_icon"><i class="far fa-trash-alt"></i></label>
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
                <input id="file_update${index}" name="update" type="file" class="update_button">
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
        </form>`
        return eachTaskHTML
    })

    const sortedPrimary = taskHTMLlist.filter(el => el.includes(`tasks primary`) && !el.includes(`tasks primary done`)).join("");
    const sortedNormal = taskHTMLlist.filter(el => el.includes(`class="tasks  "`)).join("");
    const sortedDonePrimary = taskHTMLlist.filter(el => el.includes(`tasks primary done`)).join("");
    const sortedDoneNormal = taskHTMLlist.filter(el => el.includes(`tasks  done`)).join("");
    const primaryBlock = taskList.querySelector('#primary_category');
    const normalBlock = taskList.querySelector('#normal_category');
    const donePrimaryBlock = taskList.querySelector('#done_primary_category');
    const doneNormalBlock = taskList.querySelector('#done_normal_category');

    primaryBlock.innerHTML = sortedPrimary;
    normalBlock.innerHTML = sortedNormal;
    donePrimaryBlock.innerHTML = sortedDonePrimary;
    doneNormalBlock.innerHTML = sortedDoneNormal;

    const edit = document.querySelectorAll("input.edit_icon");
    edit.forEach(button=>button.addEventListener("click",toggleShow))
    const completed = document.querySelectorAll("input.completed_checkbox");
    completed.forEach(button=>button.addEventListener("click",toggleStatus))
    const marked = document.querySelectorAll("input.star_mark");
    marked.forEach(button=>button.addEventListener("click",toggleStatus))
    const deleteButton = document.querySelectorAll("input.delete_icon");
    deleteButton.forEach(button=>button.addEventListener("click",deleteTask))

    countLeft();
}

function countLeft(){
    const countLeft = document.querySelector('.left_tasks_numbers');
    countLeft.textContent = `${tasks.filter(task=>task.done===false).length} task${tasks.filter(task=>task.done===false).length>1?"s":""} left`
}

//選取任務分類
function select() {
    navButtons.forEach(button => button.classList.remove('focus-active'));
    switch (this.id) {
        case "selectAll":
            this.classList.add('focus-active');
            taskList.classList.remove('sort-undone');
            taskList.classList.remove('sort-done');
            break;
        case "selectUndone":
            this.classList.add('focus-active');
            taskList.classList.add('sort-undone');
            taskList.classList.remove('sort-done');
            break;
        case "selectDone":
            this.classList.add('focus-active');
            taskList.classList.add('sort-done');
            taskList.classList.remove('sort-undone');
            break;
    }
}

function newTask() {
    this.classList.add('click');
    addTaskForm.classList.add('click');
    setTimeout(() => addTaskForm.classList.add('click-active'), 5)
    addTaskForm.querySelector('#edit').checked = true;
    addTaskForm.querySelector('label[for="edit"]').innerHTML = `<i class="fas fa-pen"></i>`;
    editting.nextElementSibling.classList.add('clicked')

    addTaskForm.querySelector('#status').addEventListener("click",toggleStatus);
    addTaskForm.querySelector('#priority').addEventListener("click",toggleStatus);
    addTaskForm.querySelector('#file_update').addEventListener("change",fileNameUpdate);
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
    // orderArray.push(`${tasks.length-1}`);
    // localStorage.setItem('order', JSON.stringify(orderArray));
    populateList(tasks, taskList);
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

function fileNameUpdate() {
    const file = this.files[0].name;
    const fileNameElement = this.nextElementSibling;
    fileNameElement.textContent = file;
}

function withDraw() {
    addTaskForm.classList.remove('click-active');
    setTimeout(() => addTaskForm.classList.remove('click'), 280);
    setTimeout(() => addTaskButton.classList.remove('click'), 280);
}

function toggleStatus() {
    const label = this.nextElementSibling;
    const icon = label.firstChild;
    const task = this.parentNode.parentNode;
    const index = task.dataset.index;
    const usage = this.dataset.use;
    label.classList.toggle("clicked");
    task.classList.toggle(`${usage}`);
    icon.classList.toggle('fas');
    icon.classList.toggle('far');
    if (task.dataset.index) {
        tasks[index][usage] = !tasks[index][usage];
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    populateList(tasks, taskList);
    countLeft();
}

function toggleShow() {
    const task = this.parentNode.parentNode;
    const quick_detail = this.parentNode.nextElementSibling;
    const detail = quick_detail.nextElementSibling;
    const button = detail.nextElementSibling;
    const label = this.nextElementSibling;
    const icon = label.firstChild
    const title = task.querySelector('input[type="text"]');
    const deleteIcon = task.querySelector('label.delete_icon');

    if (this.checked) {
        task.classList.add('noquery');
        quick_detail.style.setProperty('display', 'none');
        detail.style.setProperty('display', 'block');
        button.style.setProperty('display', 'flex');
        label.classList.add("clicked");
        deleteIcon.classList.add("editting")
        icon.classList.add('fas');
        icon.classList.remove('far');
        title.readOnly = false;
        task.setAttribute('draggable', false);
    } else {
        task.classList.remove('noquery')
        task.setAttribute('draggable', true);
        detail.style.setProperty('display', 'none');
        button.style.setProperty('display', 'none');
        quick_detail.style.setProperty('display', 'flex');
        label.classList.remove("clicked");
        icon.classList.add('far');
        icon.classList.remove('fas');
        deleteIcon.classList.remove("editting")
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
        populateList(tasks, taskList);
    }
}

function deleteTask() {
    const dataIndex = this.id.match(/\d+/);
    // const orderIndex = orderArray.findIndex(el => el == dataIndex);
    tasks.splice(dataIndex, 1)
    localStorage.setItem('tasks', JSON.stringify(tasks));
    populateList(tasks, taskList);
}

populateList(tasks, taskList);
navButtons.forEach(button=>button.addEventListener("click",select));
//新增任務
addTaskButton.addEventListener("click", newTask);
addTaskForm.addEventListener("submit", addTask);
cancelButton.addEventListener("click", resetForm);
//編輯任務
editting.addEventListener("input", withDraw);
taskList.addEventListener("click", editTask);