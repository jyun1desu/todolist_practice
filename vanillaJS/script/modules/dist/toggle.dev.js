"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleShow = toggleShow;
exports.toggleStatus = toggleStatus;
exports.deleteTask = deleteTask;

function toggleShow() {
  var task = this.parentNode.parentNode;
  var quick_detail = this.parentNode.nextElementSibling;
  var detail = quick_detail.nextElementSibling;
  var button = detail.nextElementSibling;
  var label = this.nextElementSibling;
  var icon = label.firstChild;
  var title = task.querySelector('input[type="text"]');
  var deleteIcon = task.querySelector('label.delete_icon');

  if (this.checked) {
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

function toggleStatus() {
  var label = this.nextElementSibling;
  var icon = label.firstChild;
  var task = this.parentNode.parentNode;
  var index = task.dataset.index;
  var usage = this.dataset.use;
  label.classList.toggle("clicked");
  task.classList.toggle("".concat(usage));
  icon.classList.toggle('fas');
  icon.classList.toggle('far');

  if (task.dataset.index) {
    tasks[index][usage] = !tasks[index][usage];
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
  populateList(tasks, taskList);
  countLeft();
}

function deleteTask() {
  var dataIndex = this.id.match(/\d+/); // const orderIndex = orderArray.findIndex(el => el == dataIndex);

  tasks.splice(dataIndex, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  populateList(tasks, taskList);
}