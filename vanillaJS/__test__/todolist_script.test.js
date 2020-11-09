const {
    getByTestId,
    fireEvent
} = require('@testing-library/dom');

describe('新增、刪除、修改', () => {
    // Arrange
    // Ready necessary DOM on this unit test
    document.body.innerHTML = `
    <div class="add_new_task" data-testid="newTodo">+ Add Task</div>
    <form class="add_task_form">
            <div class="title_area">
                <input data-testid="status" id="status" data-use="done" onclick="toggleStatus(this)" class="completed_checkbox" type="checkbox">
                <label for="status" class="completed_checkbox"><i class="fas fa-check"></i></label>
                <input data-testid="title" name="title" class="task_title" type="text" placeholder="Type Something Here...">
                <input data-testid="priority" id="priority" data-use="primary" onclick="toggleStatus(this)" class="star_mark" type="checkbox">
                <label for="priority" class="star_mark"><i class="far fa-star"></i></label>
                <input data-testid="edit" id="edit" class="edit_icon" type="checkbox" checked="">
                <label for="edit" class="edit_icon"><i class="fas fa-pen"></i><label>
            </label></label></div>

            <div class="detail_area">
                <div class="deadline">
                    <i class="icon far fa-calendar-alt"></i>
                    <div class="content_block">
                        <p>Deadline</p>
                        <div class="time_block">
                            <input data-testid="date" name="date" class="deadline_date" type="date" placeholder="yyyy/mm/dd">
                            <input data-testid="time" name="time" class="deadline_time" type="time" placeholder="hh:mm">
                        </div>
                    </div>
                </div>
                <div class="file_update">
                    <i class="icon far fa-file"></i>
                    <div class="content_block">
                        <p>File</p>
                        <input data-testid="file_update" id="file_update" onchange="fileNameUpdate(this)" name="update" type="file" class="update_button" value="">
                        <span class="file_name"></span><label for="file_update"></label>
                    </div>

                </div>
                <div class="memo">
                    <i class="icon far fa-comment-dots"></i>
                    <div class="content_block">
                        <p>Comment</p>
                        <textarea data-testid="memo_content" name="memo_content" placeholder="Type your memo here..."></textarea>
                    </div>
                </div>

            </div>

            <div class="button_area">
                <button data-testid="cancel_button" type="reset" class="cancel_button">× Cancel</button>
                <button data-testid="submit_button" type="submit" class="submit_button">+ Add Task</button>
            </div>
        </form>

        <div class="todo_list" droppable="">
            <div id="primary_category" class="droppable_area"></div>
            <div data-testid="normal_category" id="normal_category" class="droppable_area"></div>
            <div id="done_category">
                <div id="done_primary_category" class="droppable_area"></div>
                <div id="done_normal_category" class="droppable_area"></div>
            </div>
        </div>
        <p data-testid="left_tasks_numbers" class="left_tasks_numbers">0 task left</p>
        
    `;

    // Import test logic
    require('../todolist_script.js');

    test('新增任務:不是重要任務、不是完成任務，增加任務名稱first,日期2020-12-20', () => {
        // From DOM get necessary element, ex input and button

        const container = document.body;
        const addTaskButton = getByTestId(container, 'newTodo');
        const taskTitle = getByTestId(container, 'title');
        const date = getByTestId(container, 'date');
        const submitButton = getByTestId(container, 'submit_button')
        // Act
        fireEvent.click(addTaskButton);
        taskTitle.value = "first"
        date.value = "2020-12-20"
        fireEvent.click(submitButton);

        // Assert
        const normalTodo = getByTestId(container, 'normal_category')
        const countLeft = getByTestId(container, 'left_tasks_numbers')
        const actualResult = `<form data-index="0" ondragstart="handleDragStart(event,this)" ondragend="handleDragEnd(event,this)" ondragenter="handleDragPassby(event,this)" class="tasks  " draggable="true">
        <div class="drag_icon">
        </div>
        <div class="main_information">
        <input id="status0" data-use="done" onclick="toggleStatus(this)" class="completed_checkbox" type="checkbox">
                        <label for="status0" class="completed_checkbox  "><i class="fas fa-check"></i></label>
        <input type="text" class="task_title" value="first" placeholder="Type Something Here..." readonly="">
        <input id="priority0" data-use="primary" onclick="toggleStatus(this)" class="star_mark" type="checkbox">
                        <label for="priority0" class="star_mark "><i class="far fa-star"></i></label>
        <input id="edit0" onclick="toggleShow(this)" class="edit_icon" type="checkbox">
        <label for="edit0" class="edit_icon"><i class="far fa-pen"></i></label>
        
        <input id="delete0" class="delete_icon" type="checkbox">
        <label for="delete0" onclick="deleteTask(this)" class="delete_icon"><i class="far fa-trash-alt"></i></label>
        </div>
        
        <div class="quick_detail">
        <span>
            <i class="far fa-calendar-alt"></i>
            <span>2020-12-20</span></span>
        
        
        </div>
        
        <div class="detail_area" style="display:none;">
        <div class="deadline">
            <i class="icon far fa-calendar-alt"></i>
            <div class="content_block">
                <p>Deadline</p>
                <div class="time_block">
                    <input name="date" class="deadline_date" value="2020-12-20" type="date" placeholder="yyyy/mm/dd">
                    <input name="time" class="deadline_time" value="" type="time" placeholder="hh:mm">
                </div>
            </div>
        </div>
        <div class="file_update">
            <i class="icon far fa-file"></i>
            <div class="content_block">
                <p>File</p>
                <input id="file_update0" onchange="fileNameUpdate(this)" name="update" type="file" class="update_button">
                <span class="file_name"></span>
                <label for="file_update0"></label>
            </div>
        </div>
        <div class="memo">
            <i class="icon far fa-comment-dots"></i>
            <div class="content_block">
                <p>Comment</p>
                <textarea name="memo_content" placeholder="Type your memo here..."></textarea>
            </div>
        </div>
        
        </div>
        <div class="button_area" style="display:none;">
        <button type="button" class="cancel_edit_button">× Cancel</button>
        <button type="button" class="save_button">+ Save</button>
        </div>
        </form>`
        const expectedResult = normalTodo.innerHTML
        expect(expectedResult).toBe(actualResult);
        expect(countLeft.textContent).toBe("1 task left")
    });
});