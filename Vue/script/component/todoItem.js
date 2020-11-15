const template = `
<form 
class="tasks" 
:class="{
    noquery: editMode,
    primary:editMode?edittingTask.primary:taskList.primary,
    done:editMode?edittingTask.done:
    taskList.done}">
    <div class="drag_icon">
    </div>
    <div class="main_information">
        <i class="fa-check completed_checkbox"
        :class="{
            far: editMode?!edittingTask.done:!taskList.done,
            fas: editMode?edittingTask.done:taskList.done,
            clicked: editMode?edittingTask.done:taskList.done,
        }"
        @click = "toggle('done')">
        </i>
        <input 
        type="text"
        class="task_title"
        v-model="edittingTask.taskTitle"
        placeholder="Type Something Here..."
        :readonly="!editMode">
        <i 
        @click = "toggle('primary')"
        class="fa-star star_mark"
        :class="{
            far: editMode?!edittingTask.primary:!taskList.primary,
            fas: editMode?edittingTask.primary:taskList.primary,
            clicked: editMode?edittingTask.primary:taskList.primary
        }"></i>
        <i 
        @click="editMode = !editMode"
        class="fa-pen edit_icon"
        :class="{far:!editMode,clicked:editMode,fas:editMode}">
        </i>
        <i 
        @click="deleteItem"
        class="far fa-trash-alt delete_icon"></i>
    </div>

    <div class="quick_detail">
        <span v-if="taskList.deadlineDate">
            <i class="far fa-calendar-alt"></i>
            <span>{{taskList.deadlineDate}}</span>
        </span>
        <span v-if="taskList.updateFile">
            <i class="far fa-file"></i>
        </span>
        <span v-if="taskList.memo">
            <i class="far fa-comment-dots">
            </i>
        </span>
    </div>
    <div class="detail_area">
        <div class="deadline">
            <i class="icon far fa-calendar-alt"></i>
            <div class="content_block">
                <p>Deadline</p>
                <div class="time_block">
                    <input 
                    class="deadline_date"
                    v-model="edittingTask.deadlineDate"
                    type="date">
                    <input 
                    class="deadline_time"
                    v-model="edittingTask.deadlineTime"
                    type="time">
                </div>
            </div>
        </div>
        <div class="file_update">
            <i class="icon far fa-file"></i>
            <div class="content_block">
                <p>File</p>
                <input :id="'update'+index" 
                @change="fileNameUpdate"
                type="file" 
                class="update_button">
                <span 
                v-if="taskList.updateFile"
                class="file_name"
                v-text="edittingTask.updateFile">
                </span>
                <label :for="'update'+index"></label>
            </div>
        </div>
        <div class="memo">
            <i class="icon far fa-comment-dots"></i>
            <div class="content_block">
                <p>Comment</p>
                <textarea v-model="edittingTask.memo" placeholder="Type your memo here...">1</textarea>
            </div>
        </div>

    </div>
    <div class="button_area">
        <button
        @click="cancelChange"
        type="button"
        class="cancel_edit_button">× Cancel
        </button>
        <button 
        @click="saveChange"
        type="button"
        class="save_button">+ Save
        </button>
    </div>
</form>
`

export default {
    data: function () {
        return {
            editMode: false,
            edittingTask: {
                taskTitle: this.taskList.taskTitle,
                deadlineDate: this.taskList.deadlineDate,
                deadlineTime: this.taskList.deadlineTime,
                updateFile: this.taskList.updateFile,
                memo: this.taskList.memo,
                primary: this.taskList.primary,
                done: this.taskList.done
            },
        }
    },
    template,
    props: ['task-list','index'],
    methods: {
        fileNameUpdate(e) {
            const file = e.target.files[0].name;
            this.edittingTask.updateFile = file;
        },
        saveChange() {
            this.replace(this.edittingTask, this.taskList);
            this.taskList['primary'] = this.edittingTask['primary'];
            this.taskList['done'] = this.edittingTask['done'];
            this.editMode = !this.editMode;
        },
        cancelChange() {
            this.replace(this.taskList, this.edittingTask);
            this.taskList['primary'] = this.edittingTask['primary'];
            this.taskList['done'] = this.edittingTask['done'];
            this.editMode = !this.editMode;
        },
        replace(newData, oldData) {
            for (let prop in newData) {
                if (prop!=='primary' && prop!== 'done') {
                    oldData[prop] = newData[prop]
                }
            }
        },
        toggle(usage){
            if(this.editMode){
                this.edittingTask[usage] = !this.edittingTask[usage]
            }else{
                this.taskList[usage] = !this.taskList[usage];
                this.edittingTask[usage] = this.taskList[usage];
            }
        },
        deleteItem(){
        }
    },
    watch:{
        'edittingTask.done': function(){
        },
        'edittingTask.primary': function(){
        },
    }
}