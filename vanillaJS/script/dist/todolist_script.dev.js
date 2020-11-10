"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _populateList = _interopRequireDefault(require("./modules/populateList.js"));

var _toggle = _interopRequireWildcard(require("./modules/toggle.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var navButtons = document.querySelectorAll('.each_task_status'); //新增任務

var addTaskButton = document.querySelector('.add_new_task');
var addTaskForm = document.querySelector('.add_task_form');
var cancelButton = document.querySelector('.cancel_button');
var fileName = document.querySelector('.file_name'); ///////編輯中

var editting = addTaskForm.querySelector('#edit'); //任務清單

var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
var taskList = document.querySelector('.todo_list'); //選取任務分類

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
} //新增任務


function newTask() {
  this.classList.add('click');
  addTaskForm.classList.add('click');
  setTimeout(function () {
    return addTaskForm.classList.add('click-active');
  }, 5);
  addTaskForm.querySelector('#edit').checked = true;
  addTaskForm.querySelector('label[for="edit"]').innerHTML = "<i class=\"fas fa-pen\"></i>";
  editting.nextElementSibling.classList.add('clicked');
  addTaskForm.querySelector('#status').addEventListener("click", _toggle["default"]);
  addTaskForm.querySelector('#priority').addEventListener("click", _toggle["default"]);
  addTaskForm.querySelector('#file_update').addEventListener("change", _toggle.fileNameUpdate);
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
  (0, _populateList["default"])(tasks, taskList);
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

function withDraw() {
  addTaskForm.classList.remove('click-active');
  setTimeout(function () {
    return addTaskForm.classList.remove('click');
  }, 280);
  setTimeout(function () {
    return addTaskButton.classList.remove('click');
  }, 280);
}

(0, _populateList["default"])(tasks, taskList);
navButtons.forEach(function (button) {
  return button.addEventListener("click", select);
}); //新增任務

addTaskButton.addEventListener("click", newTask);
addTaskForm.addEventListener("submit", addTask);
cancelButton.addEventListener("click", resetForm);
editting.addEventListener("input", withDraw);