"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleDragStart = handleDragStart;
exports.handleDragEnd = handleDragEnd;
exports.handleDragPassby = handleDragPassby;
exports.handleDragover = handleDragover;
exports.handleDrop = handleDrop;
exports["default"] = void 0;

var _populateList = _interopRequireDefault(require("./populateList.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var draggedElement;
var currentPassbyElement;
var previousY; //拖曳物件

function handleDragStart() {
  draggedElement = this;
  this.style.opacity = "0.3";
  this.style.transform = "scale(1) translateY(0)";
  this.parentNode.classList.add('pop');
}

function handleDragEnd() {
  this.style.opacity = "1";
  this.style.transform = "scale(1) translateY(0)";
  currentPassbyElement.style.margin = "0 0 8px";
  document.querySelectorAll(".droppable_area").forEach(function (area) {
    return area.classList.remove('pop');
  });
}

function handleDragPassby(e) {
  if (draggedElement.parentNode === this.parentNode && draggedElement !== this) {
    var moveDown = e.pageY > previousY;
    this.style.margin = "".concat(moveDown ? "0 0px 50px" : "50px 0px 8px");
  }

  if (currentPassbyElement && currentPassbyElement !== this) {
    currentPassbyElement.style.margin = "0 0 8px";
  }

  currentPassbyElement = this;
  previousY = e.pageY;
} //拖曳物件drop區域


function handleDragover(e) {
  e.preventDefault();
}

function handleDrop(e) {
  var tasks = JSON.parse(localStorage.getItem('tasks'));
  var dropdownArea = this;
  var draggedElementArea = draggedElement.parentNode;
  if (draggedElementArea !== dropdownArea) return;
  var moveDown = e.pageY > currentPassbyElement.offsetTop;
  var old_index = draggedElement.dataset.index;
  var new_index;

  if (moveDown) {
    dropdownArea.insertBefore(draggedElement, currentPassbyElement.nextElementSibling);
    new_index = Number(currentPassbyElement.nextElementSibling.dataset.index) + 1;
    console.log(new_index);
  }

  if (!moveDown) {
    dropdownArea.insertBefore(draggedElement, currentPassbyElement);
    new_index = Number(currentPassbyElement.dataset.index);
    ;
  }

  var task = tasks[old_index];
  tasks.splice(old_index, 1);
  tasks.splice(new_index, 0, task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  var taskList = document.querySelector('.todo_list');
  (0, _populateList["default"])(tasks, taskList);
}

var _default = {
  handleDragStart: handleDragStart,
  handleDragEnd: handleDragEnd,
  handleDragPassby: handleDragPassby,
  handleDragover: handleDragover,
  handleDrop: handleDrop
};
exports["default"] = _default;