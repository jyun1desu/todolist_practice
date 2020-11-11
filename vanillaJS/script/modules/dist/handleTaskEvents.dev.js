"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = handleTaskEvents;

var _toggle = require("./toggle.js");

var _handleDragEvent = require("./handleDragEvent.js");

function handleTaskEvents() {
  var tasks = document.querySelectorAll("form.tasks");
  tasks.forEach(function (task) {
    var edit = task.querySelectorAll(".edit_icon");
    var completed = task.querySelectorAll(".completed_checkbox");
    var marked = task.querySelectorAll(".star_mark");
    var updateButton = task.querySelectorAll(".update_button");
    var deleteButton = task.querySelectorAll(".delete_icon");
    edit.forEach(function (button) {
      return button.addEventListener("click", _toggle.toggleShow);
    });
    completed.forEach(function (button) {
      return button.addEventListener("click", _toggle.toggleStatus);
    });
    marked.forEach(function (button) {
      return button.addEventListener("click", _toggle.toggleStatus);
    });
    deleteButton.forEach(function (button) {
      return button.addEventListener("click", _toggle.deleteTask);
    });
    updateButton.forEach(function (button) {
      return button.addEventListener("change", _toggle.fileNameUpdate);
    });
    task.addEventListener("dragstart", _handleDragEvent.handleDragStart);
    task.addEventListener("dragenter", _handleDragEvent.handleDragPassby);
    task.addEventListener("dragend", _handleDragEvent.handleDragEnd);
  });
  var droppableAreas = Array.from(document.querySelectorAll('.droppable_area'));
  droppableAreas.forEach(function (area) {
    area.addEventListener('dragover', _handleDragEvent.handleDragover);
    area.addEventListener('drop', _handleDragEvent.handleDrop);
  });
}