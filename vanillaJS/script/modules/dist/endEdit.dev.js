"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = editTask;

var _populateList = _interopRequireDefault(require("./populateList.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function editTask(e) {
  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  var taskList = document.querySelector('.todo_list');
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
    (0, _populateList["default"])(tasks, taskList);
  }
}