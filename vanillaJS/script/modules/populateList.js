import countLeft from "./countLeft.js"
import handleTaskEvents from "./handleTaskEvents.js";

export default function populateList(tasksArray = [], taskList) {
    let taskHTMLlist = tasksArray.map((task, index) => {
        const eachTaskHTML = `<form data-index="${index}" class="tasks ${task.primary?"primary":""} ${task.done?"done":""}" draggable="true">
        <div class="drag_icon">
        </div>
        <div class="main_information">
        <input id="status${index}" data-use="done" class="completed_checkbox" type="checkbox"
            ${task.done?"checked":" "}>
                        <label for="status${index}" class="completed_checkbox  ${task.done?" clicked":""}"><i
            class="fas fa-check"></i></label>
        <input type="text" class="task_title" value="${task.taskTitle}" placeholder="Type Something Here..." readonly>
        <input id="priority${index}" data-use="primary" class="star_mark" type="checkbox"
            ${task.primary?"checked":" "}>
                        <label for="priority${index}" class="star_mark ${task.primary?" clicked":""}"><i
            class="${task.primary?"fas":"far"} fa-star"></i></label>
        <input id="edit${index}" class="edit_icon" type="checkbox">
        <label for="edit${index}" class="edit_icon"><i class="far fa-pen"></i></label>
        
        <input id="delete${index}" class="delete_icon" type="checkbox">
        <label for="delete${index}" class="delete_icon"><i class="far fa-trash-alt"></i></label>
        </div>
        
        <div class="quick_detail">
        ${task.deadlineDate?`<span>
            <i class="far fa-calendar-alt"></i>
            <span>${task.deadlineDate}</span></span>`:""}
        ${task.updateFile?`<span><i class="far fa-file"></i></span>`:""}
        ${task.memo?`<span><i class="far fa-comment-dots"></i></span>`:""}
        </div>
        
        <div class="detail_area" style="display:none;">
        <div class="deadline">
            <i class="icon far fa-calendar-alt"></i>
            <div class="content_block">
                <p>Deadline</p>
                <div class="time_block">
                    <input name="date" class="deadline_date" value="${task.deadlineDate}" type="date"
                        placeholder="yyyy/mm/dd">
                    <input name="time" class="deadline_time" value="${task.deadlineTime}" type="time" placeholder="hh:mm">
                </div>
            </div>
        </div>
        <div class="file_update">
            <i class="icon far fa-file"></i>
            <div class="content_block">
                <p>File</p>
                <input id="file_update${index}" name="update" type="file" class="update_button">
                <span class="file_name">${task.updateFile||""}</span>
                <label for="file_update${index}"></label>
            </div>
        </div>
        <div class="memo">
            <i class="icon far fa-comment-dots"></i>
            <div class="content_block">
                <p>Comment</p>
                <textarea name="memo_content" placeholder="Type your memo here...">${task.memo}</textarea>
            </div>
        </div>
        
        </div>
        <div class="button_area" style="display:none;">
        <button type="button" class="cancel_edit_button">&times; Cancel</button>
        <button type="button" class="save_button">&#43; Save</button>
        </div>
        </form>`
        return eachTaskHTML
    })

    const sortedPrimary = taskHTMLlist.filter(el => el.includes(`tasks primary`) && !el.includes(`tasks primary done`)).join("");
    const sortedNormal = taskHTMLlist.filter(el => el.includes(`class="tasks  "`)).join("");
    const sortedDonePrimary = taskHTMLlist.filter(el => el.includes(`tasks primary done`)).join("");
    const sortedDoneNormal = taskHTMLlist.filter(el => el.includes(`tasks  done`)).join("");
    const primaryBlock = taskList.querySelector('#primary_category');
    const normalBlock = taskList.querySelector('#normal_category');
    const donePrimaryBlock = taskList.querySelector('#done_primary_category');
    const doneNormalBlock = taskList.querySelector('#done_normal_category');

    primaryBlock.innerHTML = sortedPrimary;
    normalBlock.innerHTML = sortedNormal;
    donePrimaryBlock.innerHTML = sortedDonePrimary;
    doneNormalBlock.innerHTML = sortedDoneNormal;

    handleTaskEvents();
    countLeft();
}