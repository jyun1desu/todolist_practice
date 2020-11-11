"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleShow = toggleShow;
exports.toggleStatus = toggleStatus;
exports.deleteTask = deleteTask;
exports.fileNameUpdate = fileNameUpdate;
exports["default"] = void 0;

var _populateList = _interopRequireDefault(require("./populateList.js"));

var _endEdit = _interopRequireDefault(require("./endEdit.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function toggleShow() {
  var task = this.parentNode.parentNode;
  var quick_detail = this.parentNode.nextElementSibling;
  var detail = quick_detail.nextElementSibling;
  var button = detail.nextElementSibling;
  var title = task.querySelector('input[type="text"]');
  var deleteIcon = task.querySelector('.delete_icon');
  this.classList.toggle('clicked');
  this.classList.toggle('fas');
  this.classList.toggle('far');
  task.addEventListener("click", _endEdit["default"]);

  if (this.classList.contains('fas')) {
    task.classList.add('noquery');
    quick_detail.style.setProperty('display', 'none');
    detail.style.setProperty('display', 'block');
    button.style.setProperty('display', 'flex');
    deleteIcon.classList.add("editting");
    title.readOnly = false;
    task.setAttribute('draggable', false);
  } else {
    console.log("withdraw");
    task.classList.remove('noquery');
    task.setAttribute('draggable', true);
    detail.style.setProperty('display', 'none');
    button.style.setProperty('display', 'none');
    quick_detail.style.setProperty('display', 'flex');
    deleteIcon.classList.remove("editting");
    title.readOnly = true;
  }
}

function toggleStatus() {
  var tasks = JSON.parse(localStorage.getItem('tasks'));
  var taskList = document.querySelector('.todo_list');
  var task = this.parentNode.parentNode;
  var index = task.dataset.index;
  var usage = this.dataset.use;
  this.classList.toggle("clicked");
  task.classList.toggle("".concat(usage));
  this.classList.toggle('fas');
  this.classList.toggle('far');
  tasks[index][usage] = !tasks[index][usage];
  localStorage.setItem('tasks', JSON.stringify(tasks));
  if (!task.classList.contains("noquery")) (0, _populateList["default"])(tasks, taskList);
}

function deleteTask() {
  var tasks = JSON.parse(localStorage.getItem('tasks'));
  var taskList = document.querySelector('.todo_list');
  var dataIndex = this.id.match(/\d+/);
  tasks.splice(dataIndex, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  (0, _populateList["default"])(tasks, taskList);
}

function fileNameUpdate() {
  var file = this.files[0].name;
  var fileNameElement = this.nextElementSibling;
  fileNameElement.textContent = file;
}

var _default = {
  toggleShow: toggleShow,
  toggleStatus: toggleStatus,
  deleteTask: deleteTask,
  fileNameUpdate: fileNameUpdate
};
exports["default"] = _default;