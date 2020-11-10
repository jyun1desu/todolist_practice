"use strict";

var _require = require('@testing-library/dom'),
    getByTestId = _require.getByTestId,
    fireEvent = _require.fireEvent;

var localstorage = require('./localstorage');

describe('新增、刪除、修改', function () {
  afterEach(function () {
    document.body.innerHTML = '';
  }); // Arrange
  // Ready necessary DOM on this unit test

  test('新增任務:不是重要任務、不是完成任務，增加任務名稱first,日期2020-12-20', function () {
    // From DOM get necessary element, ex input and button
    document.body.innerHTML = "\n        <div class=\"add_new_task\" data-testid=\"newTodo\">+ Add Task</div>\n        <form class=\"add_task_form\">\n                <div class=\"title_area\">\n                    <input data-testid=\"status\" id=\"status\" data-use=\"done\" class=\"completed_checkbox\" type=\"checkbox\">\n                    <label for=\"status\" class=\"completed_checkbox\"><i class=\"fas fa-check\"></i></label>\n                    <input data-testid=\"title\" name=\"title\" class=\"task_title\" type=\"text\" placeholder=\"Type Something Here...\">\n                    <input data-testid=\"priority\" id=\"priority\" data-use=\"primary\" class=\"star_mark\" type=\"checkbox\">\n                    <label for=\"priority\" class=\"star_mark\"><i class=\"far fa-star\"></i></label>\n                    <input data-testid=\"edit\" id=\"edit\" class=\"edit_icon\" type=\"checkbox\" checked=\"\">\n                    <label for=\"edit\" class=\"edit_icon\"><i class=\"fas fa-pen\"></i><label>\n                </label></label></div>\n    \n                <div class=\"detail_area\">\n                    <div class=\"deadline\">\n                        <i class=\"icon far fa-calendar-alt\"></i>\n                        <div class=\"content_block\">\n                            <p>Deadline</p>\n                            <div class=\"time_block\">\n                                <input data-testid=\"date\" name=\"date\" class=\"deadline_date\" type=\"date\" placeholder=\"yyyy/mm/dd\">\n                                <input data-testid=\"time\" name=\"time\" class=\"deadline_time\" type=\"time\" placeholder=\"hh:mm\">\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"file_update\">\n                        <i class=\"icon far fa-file\"></i>\n                        <div class=\"content_block\">\n                            <p>File</p>\n                            <input data-testid=\"file_update\" id=\"file_update\" name=\"update\" type=\"file\" class=\"update_button\" value=\"\">\n                            <span class=\"file_name\"></span><label for=\"file_update\"></label>\n                        </div>\n    \n                    </div>\n                    <div class=\"memo\">\n                        <i class=\"icon far fa-comment-dots\"></i>\n                        <div class=\"content_block\">\n                            <p>Comment</p>\n                            <textarea data-testid=\"memo_content\" name=\"memo_content\" placeholder=\"Type your memo here...\"></textarea>\n                        </div>\n                    </div>\n    \n                </div>\n    \n                <div class=\"button_area\">\n                    <button data-testid=\"cancel_button\" type=\"reset\" class=\"cancel_button\">\xD7 Cancel</button>\n                    <button data-testid=\"submit_button\" type=\"submit\" class=\"submit_button\">+ Add Task</button>\n                </div>\n            </form>\n    \n            <div class=\"todo_list\" droppable=\"\">\n                <div id=\"primary_category\" class=\"droppable_area\"></div>\n                <div data-testid=\"normal_category\" id=\"normal_category\" class=\"droppable_area\"></div>\n                <div id=\"done_category\">\n                    <div id=\"done_primary_category\" class=\"droppable_area\"></div>\n                    <div id=\"done_normal_category\" class=\"droppable_area\"></div>\n                </div>\n            </div>\n            <p data-testid=\"left_tasks_numbers\" class=\"left_tasks_numbers\">0 task left</p>\n            \n        ";

    require('../script/todolist_script.js');

    window.localStorage = localStorage;
    var container = document.body;
    var addTaskButton = getByTestId(container, 'newTodo');
    var taskTitle = getByTestId(container, 'title');
    var date = getByTestId(container, 'date');
    var submitButton = getByTestId(container, 'submit_button'); // Act

    fireEvent.click(addTaskButton);
    taskTitle.value = "first";
    date.value = "2020-12-20";
    fireEvent.click(submitButton); // Assert

    var normalTodo = getByTestId(container, 'normal_category');
    var countLeft = getByTestId(container, 'left_tasks_numbers');
    var expectedResult = "<form data-index=\"0\" ondragstart=\"handleDragStart(event,this)\" ondragend=\"handleDragEnd(event,this)\" ondragenter=\"handleDragPassby(event,this)\" class=\"tasks  \" draggable=\"true\">\n        <div class=\"drag_icon\">\n        </div>\n        <div class=\"main_information\">\n        <input id=\"status0\" data-use=\"done\" class=\"completed_checkbox\" type=\"checkbox\">\n                        <label for=\"status0\" class=\"completed_checkbox  \"><i class=\"fas fa-check\"></i></label>\n        <input type=\"text\" class=\"task_title\" value=\"first\" placeholder=\"Type Something Here...\" readonly=\"\">\n        <input id=\"priority0\" data-use=\"primary\" class=\"star_mark\" type=\"checkbox\">\n                        <label for=\"priority0\" class=\"star_mark \"><i class=\"far fa-star\"></i></label>\n        <input id=\"edit0\" class=\"edit_icon\" type=\"checkbox\">\n        <label for=\"edit0\" class=\"edit_icon\"><i class=\"far fa-pen\"></i></label>\n        \n        <input id=\"delete0\" class=\"delete_icon\" type=\"checkbox\">\n        <label for=\"delete0\" class=\"delete_icon\"><i class=\"far fa-trash-alt\"></i></label>\n        </div>\n        \n        <div class=\"quick_detail\">\n        <span>\n            <i class=\"far fa-calendar-alt\"></i>\n            <span>2020-12-20</span></span>\n        \n        \n        </div>\n        \n        <div class=\"detail_area\" style=\"display:none;\">\n        <div class=\"deadline\">\n            <i class=\"icon far fa-calendar-alt\"></i>\n            <div class=\"content_block\">\n                <p>Deadline</p>\n                <div class=\"time_block\">\n                    <input name=\"date\" class=\"deadline_date\" value=\"2020-12-20\" type=\"date\" placeholder=\"yyyy/mm/dd\">\n                    <input name=\"time\" class=\"deadline_time\" value=\"\" type=\"time\" placeholder=\"hh:mm\">\n                </div>\n            </div>\n        </div>\n        <div class=\"file_update\">\n            <i class=\"icon far fa-file\"></i>\n            <div class=\"content_block\">\n                <p>File</p>\n                <input id=\"file_update0\" name=\"update\" type=\"file\" class=\"update_button\">\n                <span class=\"file_name\"></span>\n                <label for=\"file_update0\"></label>\n            </div>\n        </div>\n        <div class=\"memo\">\n            <i class=\"icon far fa-comment-dots\"></i>\n            <div class=\"content_block\">\n                <p>Comment</p>\n                <textarea name=\"memo_content\" placeholder=\"Type your memo here...\"></textarea>\n            </div>\n        </div>\n        \n        </div>\n        <div class=\"button_area\" style=\"display:none;\">\n        <button type=\"button\" class=\"cancel_edit_button\">\xD7 Cancel</button>\n        <button type=\"button\" class=\"save_button\">+ Save</button>\n        </div>\n        </form>";
    var actualResult = normalTodo.innerHTML;
    expect(actualResult).toBe(expectedResult);
    expect(countLeft.textContent).toBe("1 task left");
  });
  test('編輯任務：更改任務日期為2020-12-30', function () {
    document.body.innerHTML = "<div class=\"todo_list\" droppable=\"\">\n        <div id=\"primary_category\" class=\"droppable_area\"></div>\n        <div id=\"normal_category\" class=\"droppable_area\"><form data-index=\"0\" ondragstart=\"handleDragStart(event,this)\" ondragend=\"handleDragEnd(event,this)\" ondragenter=\"handleDragPassby(event,this)\" class=\"tasks  \" draggable=\"true\">\n    <div class=\"drag_icon\">\n    </div>\n    <div class=\"main_information\">\n    <input id=\"status0\" data-use=\"done\" class=\"completed_checkbox\" type=\"checkbox\">\n                    <label for=\"status0\" class=\"completed_checkbox  \"><i class=\"fas fa-check\"></i></label>\n    <input type=\"text\" class=\"task_title\" value=\"first\" placeholder=\"Type Something Here...\" readonly=\"\">\n    <input id=\"priority0\" data-use=\"primary\" class=\"star_mark\" type=\"checkbox\">\n                    <label for=\"priority0\" class=\"star_mark \"><i class=\"far fa-star\"></i></label>\n    <input id=\"edit0\" class=\"edit_icon\" type=\"checkbox\">\n    <label for=\"edit0\" class=\"edit_icon\"><i class=\"far fa-pen\"></i></label>\n    \n    <input id=\"delete0\" class=\"delete_icon\" type=\"checkbox\">\n    <label for=\"delete0\" class=\"delete_icon\"><i class=\"far fa-trash-alt\"></i></label>\n    </div>\n    \n    <div class=\"quick_detail\">\n    <span>\n        <i class=\"far fa-calendar-alt\"></i>\n        <span>2020-12-20</span></span>\n    \n    \n    </div>\n    \n    <div class=\"detail_area\" style=\"display:none;\">\n    <div class=\"deadline\">\n        <i class=\"icon far fa-calendar-alt\"></i>\n        <div class=\"content_block\">\n            <p>Deadline</p>\n            <div class=\"time_block\">\n                <input name=\"date\" class=\"deadline_date\" value=\"2020-12-20\" type=\"date\" placeholder=\"yyyy/mm/dd\">\n                <input name=\"time\" class=\"deadline_time\" value=\"\" type=\"time\" placeholder=\"hh:mm\">\n            </div>\n        </div>\n    </div>\n    <div class=\"file_update\">\n        <i class=\"icon far fa-file\"></i>\n        <div class=\"content_block\">\n            <p>File</p>\n            <input id=\"file_update0\" name=\"update\" type=\"file\" class=\"update_button\">\n            <span class=\"file_name\"></span>\n            <label for=\"file_update0\"></label>\n        </div>\n    </div>\n    <div class=\"memo\">\n        <i class=\"icon far fa-comment-dots\"></i>\n        <div class=\"content_block\">\n            <p>Comment</p>\n            <textarea name=\"memo_content\" placeholder=\"Type your memo here...\"></textarea>\n        </div>\n    </div>\n    \n    </div>\n    <div class=\"button_area\" style=\"display:none;\">\n    <button type=\"button\" class=\"cancel_edit_button\">\xD7 Cancel</button>\n    <button type=\"button\" class=\"save_button\">+ Save</button>\n    </div>\n    </form></div>\n        <div id=\"done_category\">\n            <div id=\"done_primary_category\" class=\"droppable_area\"></div>\n            <div id=\"done_normal_category\" class=\"droppable_area\"></div>\n        </div>\n    </div>";

    require('../script/todolist_script.js');

    window.localStorage = localStorage;
    console.log(window.localStorage.tasks); //Arrange

    var container = document.body;
    var taskList = container.querySelector('.todo_list');
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    var task = container.querySelector('.tasks');
    var editButton = container.querySelector("input.edit_icon");
    var date = container.querySelector(".deadline_date");
    var saveButton = container.querySelector(".save_button"); // Act

    var populateList = require('../script/modules/populateList');

    populateList(tasks, taskList);
    fireEvent.click(editButton);
    date.value = "2020-12-30";
    saveButton.click(); // Assert

    var hactualResult = task.innerHTML;
    var hexpectedResult = "<form data-index=\"0\" ondragstart=\"handleDragStart(event,this)\" ondragend=\"handleDragEnd(event,this)\" ondragenter=\"handleDragPassby(event,this)\" class=\"tasks  \" draggable=\"true\">\n        <div class=\"drag_icon\">\n        </div>\n        <div class=\"main_information\">\n        <input id=\"status0\" data-use=\"done\" class=\"completed_checkbox\" type=\"checkbox\">\n                        <label for=\"status0\" class=\"completed_checkbox  \"><i class=\"fas fa-check\"></i></label>\n        <input type=\"text\" class=\"task_title\" value=\"first\" placeholder=\"Type Something Here...\" readonly=\"\">\n        <input id=\"priority0\" data-use=\"primary\" class=\"star_mark\" type=\"checkbox\">\n                        <label for=\"priority0\" class=\"star_mark \"><i class=\"far fa-star\"></i></label>\n        <input id=\"edit0\" class=\"edit_icon\" type=\"checkbox\">\n        <label for=\"edit0\" class=\"edit_icon\"><i class=\"far fa-pen\"></i></label>\n        \n        <input id=\"delete0\" class=\"delete_icon\" type=\"checkbox\">\n        <label for=\"delete0\" class=\"delete_icon\"><i class=\"far fa-trash-alt\"></i></label>\n        </div>\n        \n        <div class=\"quick_detail\">\n        <span>\n            <i class=\"far fa-calendar-alt\"></i>\n            <span>2020-12-30</span></span>\n        \n        \n        </div>\n        \n        <div class=\"detail_area\" style=\"display:none;\">\n        <div class=\"deadline\">\n            <i class=\"icon far fa-calendar-alt\"></i>\n            <div class=\"content_block\">\n                <p>Deadline</p>\n                <div class=\"time_block\">\n                    <input name=\"date\" class=\"deadline_date\" value=\"2020-12-30\" type=\"date\" placeholder=\"yyyy/mm/dd\">\n                    <input name=\"time\" class=\"deadline_time\" value=\"\" type=\"time\" placeholder=\"hh:mm\">\n                </div>\n            </div>\n        </div>\n        <div class=\"file_update\">\n            <i class=\"icon far fa-file\"></i>\n            <div class=\"content_block\">\n                <p>File</p>\n                <input id=\"file_update0\" name=\"update\" type=\"file\" class=\"update_button\">\n                <span class=\"file_name\"></span>\n                <label for=\"file_update0\"></label>\n            </div>\n        </div>\n        <div class=\"memo\">\n            <i class=\"icon far fa-comment-dots\"></i>\n            <div class=\"content_block\">\n                <p>Comment</p>\n                <textarea name=\"memo_content\" placeholder=\"Type your memo here...\"></textarea>\n            </div>\n        </div>\n        \n        </div>\n        <div class=\"button_area\" style=\"display:none;\">\n        <button type=\"button\" class=\"cancel_edit_button\">\xD7 Cancel</button>\n        <button type=\"button\" class=\"save_button\">+ Save</button>\n        </div>\n        </form></div>\n            <div id=\"done_category\">\n                <div id=\"done_primary_category\" class=\"droppable_area\"></div>\n                <div id=\"done_normal_category\" class=\"droppable_area\"></div>\n            </div>\n        </div>";
    expect(hactualResult).toBe(hexpectedResult);
  });
});