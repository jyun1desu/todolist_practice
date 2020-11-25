<template>
    <form 
    class="add_task_form"
    :class="{done:newTask.done,primary:newTask.primary}"
    @submit.prevent="submitNewTask"
    >
        <div class="title_area">
        <i 
        @click="newTask.done=!newTask.done"
        data-use="done"
        :class="{far:!newTask.done,clicked:newTask.done,fas:newTask.done}"
        class="fa-check completed_checkbox">
        </i>
        <input
        v-model="newTask.taskTitle"
        name="title"
        class="task_title"
        type="text"
        placeholder="hi" />
        <i 
        @click="newTask.primary=!newTask.primary"
        data-use="primary"
        :class="{far:!newTask.primary,clicked:newTask.primary,fas:newTask.primary}"
        class="fa-star star_mark">
        </i>
        <i 
        @click="$emit('close-edit')"
        class="fas fa-pen edit_icon clicked"></i>
        </div>

        <div class="detail_area">
        <div class="deadline">
            <i class="icon far fa-calendar-alt"></i>
            <div class="content_block">
            <p>Deadline</p>
            <div class="time_block">
                <input v-model="newTask.deadlineDate" name="date" class="deadline_date" type="date" />
                <input v-model="newTask.deadlineTime"  name="time" class="deadline_time" type="time" />
            </div>
            </div>
        </div>
        <div class="file_update">
            <i class="icon far fa-file"></i>
            <div class="content_block">
            <p>File</p>
            <input
                @change="fileNameUpdate"
                id="file_update"
                name="update"
                type="file"
                class="update_button"
            />
            <span v-text="newTask.updateFile" class="file_name"></span>
            <label for="file_update"></label>
            </div>
        </div>
        <div class="memo">
            <i class="icon far fa-comment-dots"></i>
            <div class="content_block">
            <p>Comment</p>
            <textarea
                name="memo_content"
                placeholder="Type your memo here..."
                v-model="newTask.memo"
            ></textarea>
            </div>
        </div>
        </div>

        <div class="button_area">
        <button @click="initializeTask" class="cancel_button">× Cancel</button>
        <button type="submit" class="submit_button">+ Add Task</button>
        </div>
    </form>
</template>

<script>
export default {
  name: "NewTaskForm",
    data(){
        return{
            emptyTitle: false,
            newTask: {
                taskTitle: '',
                deadlineDate: '',
                deadlineTime: '',
                updateFile: '',
                memo: '',
                done: false,
                primary: false,
                isDragged: false,
                isPassed: false,
            },
        }
    },
    methods:{
            fileNameUpdate(e) {
                const file = e.target.files[0].name;
                this.newTask.updateFile = file;
            },
            submitNewTask(){
                const title = this.newTask.taskTitle;
                if (!title.length) {
                    this.emptyTitle = true;
                    return;
                }
                const task = this.newTask;
                this.$emit('add-new-task',task);
                this.initializeTask();
            },
            initializeTask(){
                this.newTask = {
                    taskTitle: '',
                    deadlineDate: '',
                    deadlineTime: '',
                    updateFile: '',
                    memo: '',
                    done: false,
                    primary: false,
                    isDragged: false,
                    isPassed: false,
                };
                this.$emit('close-edit');
            }
    }
    };
</script>

<style lang="scss">
.add_task_form {
    @include task_detail;
    display: none;
    background-color: $secondary_background_color;
    border-radius: 5px;
    box-shadow: 0px 3px 4px #c8c8c8;
    overflow: hidden;
    margin-top: 10px;

    &.click {
        display: block;
        max-height: 10px;
        transition: 0.5s;
    }

    &.click-active {
        display: block;
        opacity: 1;
        max-height: 500px;
    }

    &.primary {
        .title_area {
        background-color: $highlight_color;
        }
    }

    &.done {
        .task_title {
        text-decoration: line-through;
        }
    }

    .title_area {
        @include task_overview;

        &.done {
        background-color: transparent;
        }

        .task_title {
        @include input_style;
        background-color: transparent;

        flex: 0 1 100%;
        margin-right: 10px;

        font-size: 18px;
        font-weight: bold;

        &::placeholder {
            font-size: 18px;
            color: $secondary_font_color;
            font-weight: bold;
        }

        &.warning::placeholder {
            color: $warning_color;
        }
        }
    }

    i{
        @include icons;
    }
}
</style>