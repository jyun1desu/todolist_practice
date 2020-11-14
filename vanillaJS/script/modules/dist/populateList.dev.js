"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = populateList;

var _countLeft = _interopRequireDefault(require("./countLeft.js"));

var _handleTaskEvents = _interopRequireDefault(require("./handleTaskEvents.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function populateList() {
  var tasksArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var taskList = arguments.length > 1 ? arguments[1] : undefined;
  var taskHTMLlist = tasksArray.map(function (task, index) {
    var eachTaskHTML = "<form data-index=\"".concat(index, "\" class=\"tasks ").concat(task.primary ? "primary" : "", " ").concat(task.done ? "done" : "", "\" draggable=\"true\">\n        <div class=\"drag_icon\">\n        </div>\n        <div class=\"main_information\">\n            <i id=\"status").concat(index, "\" data-use=\"done\" class=\"fas fa-check completed_checkbox ").concat(task.done ? " clicked" : "", "\"></i>\n            <input type=\"text\" class=\"task_title\" value=\"").concat(task.taskTitle, "\" placeholder=\"Type Something Here...\" readonly>\n            <i id=\"priority").concat(index, "\" data-use=\"primary\" class=\"").concat(task.primary ? " clicked" : "", " ").concat(task.primary ? " fas" : "far", "\n                fa-star star_mark\"></i>\n            <i id=\"edit").concat(index, "\" class=\"far fa-pen edit_icon\"></i>\n            <i id=\"delete").concat(index, "\" class=\"far fa-trash-alt delete_icon\"></i>\n        </div>\n    \n        <div class=\"quick_detail\">\n            ").concat(task.deadlineDate ? "<span>\n                <i class=\"far fa-calendar-alt\"></i>\n                <span>".concat(task.deadlineDate, "</span></span>") : "", "\n            ").concat(task.updateFile ? "<span><i class=\"far fa-file\"></i></span>" : "", "\n            ").concat(task.memo ? "<span><i class=\"far fa-comment-dots\"></i></span>" : "", " </div>\n        <div class=\"detail_area\" style=\"display:none;\">\n            <div class=\"deadline\"> <i class=\"icon far fa-calendar-alt\"></i>\n                <div class=\"content_block\">\n                    <p>Deadline</p>\n                    <div class=\"time_block\"> <input name=\"date\" class=\"deadline_date\" value=\"").concat(task.deadlineDate, "\"\n                            type=\"date\" placeholder=\"yyyy/mm/dd\"> <input name=\"time\" class=\"deadline_time\"\n                            value=\"").concat(task.deadlineTime, "\" type=\"time\" placeholder=\"hh:mm\"> </div>\n                </div>\n            </div>\n            <div class=\"file_update\">\n                <i class=\"icon far fa-file\"></i>\n                <div class=\"content_block\">\n                    <p>File</p>\n                    <input id=\"file_update").concat(index, "\" name=\"update\" type=\"file\" class=\"update_button\">\n                    <span class=\"file_name\">").concat(task.updateFile || "", "</span>\n                    <label for=\"file_update").concat(index, "\"></label>\n                </div>\n            </div>\n            <div class=\"memo\">\n                <i class=\"icon far fa-comment-dots\"></i>\n                <div class=\"content_block\">\n                    <p>Comment</p>\n                    <textarea name=\"memo_content\" placeholder=\"Type your memo here...\">").concat(task.memo, "</textarea>\n                </div>\n            </div>\n    \n        </div>\n        <div class=\"button_area\" style=\"display:none;\">\n            <button type=\"button\" class=\"cancel_edit_button\">&times; Cancel</button>\n            <button type=\"button\" class=\"save_button\">&#43; Save</button>\n        </div>\n    </form>");
    return eachTaskHTML;
  });
  var sortedPrimary = taskHTMLlist.filter(function (el) {
    return el.includes("tasks primary ") && !el.includes("class=\"tasks primary done\"");
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
  (0, _handleTaskEvents["default"])();
  (0, _countLeft["default"])();
}