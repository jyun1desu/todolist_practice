"use strict";

var navButtons = document.querySelectorAll('.each_task_status'); //新增任務

var addTaskButton = document.querySelector('.add_new_task');
var addTaskForm = document.querySelector('.add_task_form');
var cancelButton = document.querySelector('.cancel_button');
var updateFile = document.querySelector('#file_update');
var fileName = document.querySelector('.file_name'); ///////編輯中

var editting = addTaskForm.querySelector('#edit'); ///////剩餘任務數量

var countLeft = document.querySelector('.left_tasks_numbers'); //任務清單

var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
var taskList = document.querySelector('.todo_list');
var orderArray = JSON.parse(localStorage.getItem('order')) || []; //編輯任務

var droppableAreas = Array.from(document.querySelectorAll('.droppable_area'));
droppableAreas.forEach(function (area) {
  area.addEventListener('dragover', handleDragover);
  area.addEventListener('drop', handleDrop);
});
var draggedElement;
var currentPassbyElement;
var previousY; //拖曳物件

function handleDragStart(event, element) {
  draggedElement = element;
  element.style.opacity = "0.3";
  element.style.transform = "scale(1) translateY(0)";
  element.parentNode.classList.add('pop');
}

function handleDragEnd(event, element) {
  element.style.opacity = "1";
  element.style.transform = "scale(1) translateY(0)";
  currentPassbyElement.style.margin = "0 0 8px";
  element.parentNode.classList.remove('pop');
}

function handleDragPassby(event, element) {
  if (draggedElement.parentNode === element.parentNode && draggedElement !== element) {
    var moveDown = event.pageY > previousY;
    element.style.margin = "".concat(moveDown ? "0 0px 50px" : "50px 0px 8px");
  }

  if (currentPassbyElement && currentPassbyElement !== element) {
    currentPassbyElement.style.margin = "0 0 8px";
  }

  currentPassbyElement = element;
  previousY = event.pageY;
} //拖曳物件drop區域


function handleDragover(e) {
  e.preventDefault();
}

function handleDrop(e) {
  var draggedElementArea = draggedElement.parentNode;
  var dropdownArea = this;
  if (draggedElementArea !== dropdownArea) return;
  var moveDown = e.pageY > currentPassbyElement.offsetTop;

  if (moveDown) {
    dropdownArea.insertBefore(draggedElement, currentPassbyElement.nextElementSibling);
  }

  if (!moveDown) {
    dropdownArea.insertBefore(draggedElement, currentPassbyElement);
  }

  var orderArray = Array.from(document.querySelectorAll('.tasks')).map(function (el) {
    return el.dataset.index;
  });
  localStorage.setItem('order', JSON.stringify(orderArray));
} //印出列表


function populateList() {
  var tasksArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var taskList = arguments.length > 1 ? arguments[1] : undefined;
  var taskHTMLlist = tasksArray.map(function (task, index) {
    var eachTaskHTML = "<form data-index=\"".concat(index, "\" ondragstart=\"handleDragStart(event,this)\" ondragend=\"handleDragEnd(event,this)\" ondragenter=\"handleDragPassby(event,this)\" class=\"tasks ").concat(task.primary ? "primary" : "", " ").concat(task.done ? "done" : "", "\" draggable=\"true\">\n        <div class=\"drag_icon\">\n        </div>\n        <div class=\"main_information\">\n        <input id=\"status").concat(index, "\" data-use=\"done\" onclick=\"toggleStatus(this)\" class=\"completed_checkbox\" type=\"checkbox\"\n            ").concat(task.done ? "checked" : " ", ">\n                        <label for=\"status").concat(index, "\" class=\"completed_checkbox  ").concat(task.done ? " clicked" : "", "\"><i\n            class=\"fas fa-check\"></i></label>\n        <input type=\"text\" class=\"task_title\" value=\"").concat(task.taskTitle, "\" placeholder=\"Type Something Here...\" readonly>\n        <input id=\"priority").concat(index, "\" data-use=\"primary\" onclick=\"toggleStatus(this)\" class=\"star_mark\" type=\"checkbox\"\n            ").concat(task.primary ? "checked" : " ", ">\n                        <label for=\"priority").concat(index, "\" class=\"star_mark ").concat(task.primary ? " clicked" : "", "\"><i\n            class=\"").concat(task.primary ? "fas" : "far", " fa-star\"></i></label>\n        <input id=\"edit").concat(index, "\" onclick=\"toggleShow(this)\" class=\"edit_icon\" type=\"checkbox\">\n        <label for=\"edit").concat(index, "\" class=\"edit_icon\"><i class=\"far fa-pen\"></i></label>\n        \n        <input id=\"delete").concat(index, "\" class=\"delete_icon\" type=\"checkbox\">\n        <label for=\"delete").concat(index, "\" onclick=\"deleteTask(this)\" class=\"delete_icon\"><i class=\"far fa-trash-alt\"></i></label>\n        </div>\n        \n        <div class=\"quick_detail\">\n        ").concat(task.deadlineDate ? "<span>\n            <i class=\"far fa-calendar-alt\"></i>\n            <span>".concat(task.deadlineDate, "</span></span>") : "", "\n        ").concat(task.updateFile ? "<span><i class=\"far fa-file\"></i></span>" : "", "\n        ").concat(task.memo ? "<span><i class=\"far fa-comment-dots\"></i></span>" : "", "\n        </div>\n        \n        <div class=\"detail_area\" style=\"display:none;\">\n        <div class=\"deadline\">\n            <i class=\"icon far fa-calendar-alt\"></i>\n            <div class=\"content_block\">\n                <p>Deadline</p>\n                <div class=\"time_block\">\n                    <input name=\"date\" class=\"deadline_date\" value=\"").concat(task.deadlineDate, "\" type=\"date\"\n                        placeholder=\"yyyy/mm/dd\">\n                    <input name=\"time\" class=\"deadline_time\" value=\"").concat(task.deadlineTime, "\" type=\"time\" placeholder=\"hh:mm\">\n                </div>\n            </div>\n        </div>\n        <div class=\"file_update\">\n            <i class=\"icon far fa-file\"></i>\n            <div class=\"content_block\">\n                <p>File</p>\n                <input id=\"file_update").concat(index, "\" onchange=\"fileNameUpdate(this)\" name=\"update\" type=\"file\" class=\"update_button\">\n                <span class=\"file_name\">").concat(task.updateFile || "", "</span>\n                <label for=\"file_update").concat(index, "\"></label>\n            </div>\n        </div>\n        <div class=\"memo\">\n            <i class=\"icon far fa-comment-dots\"></i>\n            <div class=\"content_block\">\n                <p>Comment</p>\n                <textarea name=\"memo_content\" placeholder=\"Type your memo here...\">").concat(task.memo, "</textarea>\n            </div>\n        </div>\n        \n        </div>\n        <div class=\"button_area\" style=\"display:none;\">\n        <button type=\"button\" class=\"cancel_edit_button\">&times; Cancel</button>\n        <button type=\"button\" class=\"save_button\">&#43; Save</button>\n        </div>\n        </form>");
    return eachTaskHTML;
  });

  if (orderArray) {
    taskHTMLlist = orderArray.map(function (order) {
      return taskHTMLlist[order];
    });
  }

  var sortedPrimary = taskHTMLlist.filter(function (el) {
    return el.includes("tasks primary") && !el.includes("tasks primary done");
  }).join("");
  var sortedNormal = taskHTMLlist.filter(function (el) {
    return el.includes("class=\"tasks  \"");
  }).join("");
  var sortedDonePrimary = taskHTMLlist.filter(function (el) {
    return el.includes("tasks primary done");
  }).join("");
  var sortedDoneNormal = taskHTMLlist.filter(function (el) {
    return el.includes("tasks  done");
  }).join("");
  var primaryBlock = taskList.querySelector('#primary_category');
  var normalBlock = taskList.querySelector('#normal_category');
  var donePrimaryBlock = taskList.querySelector('#done_primary_category');
  var doneNormalBlock = taskList.querySelector('#done_normal_category');
  primaryBlock.innerHTML = sortedPrimary;
  normalBlock.innerHTML = sortedNormal;
  donePrimaryBlock.innerHTML = sortedDonePrimary;
  doneNormalBlock.innerHTML = sortedDoneNormal;
  countLeft.textContent = "".concat(tasks.filter(function (task) {
    return task.done === false;
  }).length, " task").concat(tasks.filter(function (task) {
    return task.done === false;
  }).length > 1 ? "s" : "", " left");
} //選取任務分類


function select() {
  navButtons.forEach(function (button) {
    return button.classList.remove('focus-active');
  });

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
  setTimeout(function () {
    return addTaskForm.classList.add('click-active');
  }, 5);
  addTaskForm.querySelector('#edit').checked = true;
  addTaskForm.querySelector('label[for="edit"]').innerHTML = "<i class=\"fas fa-pen\"></i>";
  editting.nextElementSibling.classList.add('clicked');
}

function addTask(e) {
  e.preventDefault();
  var taskTitle = this.querySelector('[name="title"]').value;
  var deadlineDate = this.querySelector('[name="date"]').value;
  var deadlineTime = this.querySelector('[name="time"]').value;
  var updateFile = this.querySelector('.file_name').textContent;
  var memo = this.querySelector('[name="memo_content"]').value;
  var status = this.querySelector('input#status');

  if (!taskTitle.length) {
    this.querySelector('[name="title"]').placeholder = "Please add the task title here";
    this.querySelector('[name="title"]').style.setProperty("--c", "#D0021B");
    return;
  }

  var task = {
    taskTitle: taskTitle,
    deadlineDate: deadlineDate,
    deadlineTime: deadlineTime,
    updateFile: updateFile,
    memo: memo,
    done: status.checked,
    primary: priority.checked
  };
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  orderArray.push("".concat(tasks.length - 1));
  localStorage.setItem('order', JSON.stringify(orderArray));
  populateList(tasks, taskList);
  this.reset();
  resetForm();
}

function resetForm() {
  addTaskForm.querySelector('[name="title"]').placeholder = "Type Something Here...";
  addTaskForm.querySelector('[name="title"]').style.setProperty("--c", "#c8c8c8");
  addTaskForm.classList.remove('primary');
  addTaskForm.classList.remove('done');
  addTaskForm.querySelector('label[for="priority"]').innerHTML = "<i class=\"far fa-star\">";
  fileName.textContent = "";
  addTaskForm.reset();
  addTaskForm.querySelector('label[for="status"]').classList.remove('clicked');
  addTaskForm.querySelector('label[for="priority"]').classList.remove('clicked');
  withDraw();
}

function fileNameUpdate(element) {
  var file = element.files[0].name;
  var fileNameElement = element.nextElementSibling;
  fileNameElement.textContent = file;
}

function withDraw() {
  addTaskForm.classList.remove('click-active');
  setTimeout(function () {
    return addTaskForm.classList.remove('click');
  }, 280);
  setTimeout(function () {
    return addTaskButton.classList.remove('click');
  }, 280);
}

function toggleStatus(element) {
  var label = element.nextElementSibling;
  var icon = label.firstChild;
  var task = element.parentNode.parentNode;
  var index = task.dataset.index;
  var usage = element.dataset.use;
  label.classList.toggle("clicked");
  task.classList.toggle("".concat(usage));
  icon.classList.toggle('fas');
  icon.classList.toggle('far');

  if (task.dataset.index) {
    tasks[index][usage] = !tasks[index][usage];
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
  populateList(tasks, taskList);
  countLeft.textContent = "".concat(tasks.filter(function (task) {
    return task.done === false;
  }).length, " task").concat(tasks.filter(function (task) {
    return task.done === false;
  }).length > 1 ? "s" : "", " left");
}

function toggleShow(element) {
  var task = element.parentNode.parentNode;
  var quick_detail = element.parentNode.nextElementSibling;
  var detail = quick_detail.nextElementSibling;
  var button = detail.nextElementSibling;
  var label = element.nextElementSibling;
  var icon = label.firstChild;
  var title = task.querySelector('input[type="text"]');
  var deleteIcon = task.querySelector('label.delete_icon');

  if (element.checked) {
    task.classList.add('noquery');
    quick_detail.style.setProperty('display', 'none');
    detail.style.setProperty('display', 'block');
    button.style.setProperty('display', 'flex');
    label.classList.add("clicked");
    deleteIcon.classList.add("editting");
    icon.classList.add('fas');
    icon.classList.remove('far');
    title.readOnly = false;
    task.setAttribute('draggable', false);
  } else {
    task.classList.remove('noquery');
    task.setAttribute('draggable', true);
    detail.style.setProperty('display', 'none');
    button.style.setProperty('display', 'none');
    quick_detail.style.setProperty('display', 'flex');
    label.classList.remove("clicked");
    icon.classList.add('far');
    icon.classList.remove('fas');
    deleteIcon.classList.remove("editting");
    title.readOnly = true;
  }
}

function editTask(e) {
  var element = e.target;
  var taskForm = element.parentNode.parentNode;
  var title = taskForm.querySelector('input[type="text"]');
  var index = taskForm.dataset.index;
  var taskCoords = tasks[index];

  if (element.matches('button.cancel_edit_button')) {
    title.value = taskCoords.taskTitle;
    ;
    taskForm.querySelector('[name="date"]').value = taskCoords.deadlineDate;
    taskForm.querySelector('[name="time"]').value = taskCoords.deadlineTime;
    taskForm.querySelector('[name="memo_content"]').value = taskCoords.memo;
  }

  if (element.matches('button.save_button')) {
    var editedTitle = title.value;
    var editedDate = taskForm.querySelector('[name="date"]').value;
    var editedTime = taskForm.querySelector('[name="time"]').value;
    var editedFile = taskForm.querySelector('.file_name').textContent;
    var editedMemo = taskForm.querySelector('[name="memo_content"]').value;

    if (!title.value.length) {
      title.placeholder = "Please add the task title here";
      title.style.setProperty("--c", "#D0021B");
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

function deleteTask(element) {
  var dataIndex = element.previousElementSibling.id.match(/\d+/);
  var orderIndex = orderArray.findIndex(function (el) {
    return el == dataIndex;
  });
  tasks.splice(dataIndex, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  orderArray.splice(orderIndex, 1);
  var deleted = orderArray.map(function (el) {
    if (el > orderIndex) {
      return el - 1;
    } else {
      return el;
    }
  });
  localStorage.setItem('order', JSON.stringify(deleted));
  orderArray = JSON.parse(localStorage.getItem('order'));
  populateList(tasks, taskList);
}

populateList(tasks, taskList);
navButtons.forEach(function (button) {
  return button.addEventListener("click", select);
}); //新增任務

addTaskButton.addEventListener("click", newTask);
addTaskForm.addEventListener("submit", addTask);
cancelButton.addEventListener("click", resetForm); //編輯任務

editting.addEventListener("input", withDraw);
taskList.addEventListener("click", editTask);