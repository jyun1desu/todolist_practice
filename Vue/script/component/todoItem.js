const template = `
<form 
class="tasks" 
:class="{noquery: editMode,primary:taskList.primary,done:taskList.done}">
    <div class="drag_icon">
    </div>
    <div class="main_information">
        <i class="fa-check completed_checkbox"
        :class="statusClass"
        @click = "taskList.done=!taskList.done">
        </i>
        <input 
        type="text"
        class="task_title"
        v-model="edittingTask.taskTitle"
        placeholder="Type Something Here..."
        :readonly="!editMode">
        <i 
        @click = "taskList.primary=!taskList.primary"
        class="fa-star star_mark"
        :class="MarkClass"></i>
        <i 
        @click="toggleEdit"
        class="fa-pen edit_icon"
        :class="{far:!editMode,clicked:editMode,fas:editMode}">
        </i>
        <i class="far fa-trash-alt delete_icon"></i>
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
            edittingTask:{
                taskTitle: this.taskList.taskTitle,
                deadlineDate: this.taskList.deadlineDate,
                deadlineTime: this.taskList.deadlineTime,
                updateFile: this.taskList.updateFile,
                memo: this.taskList.memo,
                primary: this.taskList.primary,
                done: this.taskList.done
            },
            statusClass:{
                far:!this.taskList.done,
                fas:this.taskList.done,
                clicked:this.taskList.done,
            },
            MarkClass:{
                far:!this.taskList.primary,
                fas:this.taskList.primary,
                clicked:this.taskList.primary,
            },
        }
    },
    template,
    props: ['task-list','index'],
    methods: {
        toggleEdit(){
            this.editMode = !this.editMode;
        },
        fileNameUpdate(e){
            const file = e.target.files[0].name;
            this.edittingTask.updateFile = file;
        },
        togglePrimary(){
            if(this.editMode){
                this.edittingTask['primary'] = !this.edittingTask.primary;
                console.log(this.edittingTask.primary)
            }
            else{
                this.taskList.primary = !this.taskList.primary;
            }
        },
        saveChange(){
            this.replace(this.edittingTask,this.taskList);
            this.toggleEdit();
        },
        cancelChange(){
            this.replace(this.taskList,this.edittingTask);
        },
        replace(newData,oldData){
            for(let prop in newData){
                if(oldData.hasOwnProperty(prop)){
                    oldData[prop] = newData[prop]
                }
            }
        },
    }
}