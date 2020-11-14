const template = `
<form 
class="tasks" 
:class="{noquery: editMode,primary:taskList.primary,done:taskList.done}">
    <div class="drag_icon">
    </div>
    <div class="main_information">
        <i 
        class="fas fa-check completed_checkbox"
        :class="{far:!taskList.done,clicked:taskList.done,fas:taskList.done}"
        @click = "taskList.done=!taskList.done">
        </i>
        <input type="text" class="task_title" placeholder="Type Something Here..." :readonly="!editMode">
        <i 
        @click = "taskList.primary=!taskList.primary"
        class="fa-star star_mark"
        :class="{far:!taskList.primary,clicked:taskList.primary,fas:taskList.primary}"></i>
        <i 
        @click="toggleEdit"
        class="fa-pen edit_icon"
        :class="{far:!editMode,clicked:editMode,fas:editMode}">
        </i>
        <i class="far fa-trash-alt delete_icon"></i>
    </div>

    <div class="quick_detail">
        <span>
            <i class="far fa-calendar-alt"></i>
            <span>2020-11-12</span></span>
        <span><i class="far fa-file"></i></span>
        <span><i class="far fa-comment-dots"></i></span>
    </div>
    <div class="detail_area">
        <div class="deadline"> <i class="icon far fa-calendar-alt"></i>
            <div class="content_block">
                <p>Deadline</p>
                <div class="time_block"> <input name="date" class="deadline_date" value="2020-11-12" type="date"
                        placeholder="yyyy/mm/dd"> <input name="time" class="deadline_time" value="13:53" type="time"
                        placeholder="hh:mm"> </div>
            </div>
        </div>
        <div class="file_update">
            / <i class="icon far fa-file"></i>
            <div class="content_block">
                <p>File</p>
                <input id="file_update1" name="update" type="file" class="update_button">
                <span class="file_name">200x200f.jpg</span>
                <label for="file_update1"></label>
            </div>
        </div>
        <div class="memo">
            <i class="icon far fa-comment-dots"></i>
            <div class="content_block">
                <p>Comment</p>
                <textarea name="memo_content" placeholder="Type your memo here...">1</textarea>
            </div>
        </div>

    </div>
    <div class="button_area">
        <button type="button" class="cancel_edit_button">× Cancel</button>
        <button type="button" class="save_button">+ Save</button>
    </div>
</form>
`

export default {
    data: function () {
        return {
            editMode: false,
        }
    },
    template,
    props: ['task-list'],
    methods: {
        toggleEdit(){
            this.editMode = !this.editMode;
        }
    }
}