<template>
    <form
    @submit.prevent="submitEdit" 
    @dragstart="handleDragStart"
    @dragenter="handleDragPassby"
    @dragend="handleDragEnd"
    class="tasks"
    :class="{noquery: editMode,
            dragged:task.isDragged,
            passedfromtop:task.isPassed&&dragDirection,
            passedfrombottom:task.isPassed&&!dragDirection,
            primary:edittingTask.primary,
            done:edittingTask.done,
            }"
    :draggable="!editMode">
        <div class="drag_icon"></div>
        <div class="main_information">
        <i 
        @click="toggle('done')"
        :class="{
            far: !edittingTask.done,
            fas: edittingTask.done,
            clicked: edittingTask.done,}"
        class="fa-check completed_checkbox">
        </i>
        <input
            type="text"
            :placeholder="placeholder"
            :readonly="!editMode"
            class="task_title"
            :class="{warning: edittingTask.taskTitle.length==0?true:false}"
            v-model="edittingTask.taskTitle"
        />
        <i 
        @click="toggle('primary')"
        :class="{
            far: !edittingTask.primary,
            fas: edittingTask.primary,
            clicked: edittingTask.primary}"
        class="fa-star star_mark far">
        </i>
        <i 
        @click="editModeHandler"
        class="fa-pen edit_icon far"
        :class="{far:!editMode,clicked:editMode,fas:editMode}">
        </i>
        <i 
        @click="$emit('delete')"
        class="far fa-trash-alt delete_icon"></i>
        </div>
        <div class="quick_detail">
            <span v-if="edittingTask.deadlineDate">
                <i class="far fa-calendar-alt"></i>
                <span>{{edittingTask.deadlineDate}}</span>
            </span>
            <span v-if="edittingTask.updateFile">
                <i class="far fa-file"></i>
            </span>
            <span v-if="edittingTask.memo">
                <i class="far fa-comment-dots"></i>
            </span>
        </div>

        <div class="detail_area">
        <div class="deadline">
            <i class="icon far fa-calendar-alt"></i>
            <div class="content_block">
            <p>Deadline</p>
            <div class="time_block">
                <input v-model="edittingTask.deadlineDate" type="date" class="deadline_date" />
                <input v-model="edittingTask.deadlineTime" type="time" class="deadline_time" />
            </div>
            </div>
        </div>
        <div class="file_update">
            <i class="icon far fa-file"></i>
            <div class="content_block">
            <p>File</p>
            <input 
            @change="fileNameUpdate"
            :id="'update'+index"
            type="file"
            class="update_button" />
            <span v-text="edittingTask.updateFile" class="file_name"></span>
            <label :for="'update'+index"></label>
            </div>
        </div>
        <div class="memo">
            <i class="icon far fa-comment-dots"></i>
            <div class="content_block">
            <p>Comment</p>
            <textarea  v-model="edittingTask.memo" placeholder="Type your memo here..."></textarea>
            </div>
        </div>
        </div>
        <div class="button_area">
        <button @click.prevent="cancelEdit" type="button" class="cancel_edit_button">× Cancel</button>
        <button type="submit" class="save_button">+ Save</button>
        </div>
    </form>
</template>

<script>
export default {
    name: "TodoItem",
    props:['task', 'index','drag-direction'],
    data(){
        return{
            editMode: false,
            edittingTask: {
                ...this.task
            }
        }
    },
    methods:{
        toggle(usage) {
            this.edittingTask[usage] = !this.edittingTask[usage];
            if (!this.editMode) {
                this.$emit('update-task',this.edittingTask);
            }
        },
        editModeHandler(){
            this.editMode = !this.editMode;
            this.$emit('update-task',this.edittingTask);
        },
        fileNameUpdate(e) {
            const file = e.target.files[0].name;
            this.edittingTask.updateFile = file;
        },
        submitEdit(){
            if (!this.edittingTask.taskTitle) return;
            this.$emit('update-task',this.edittingTask);
            this.editMode = false;
        },
        cancelEdit(){
            const edittedPrimary = this.edittingTask.primary;
            const edittedStatus = this.edittingTask.done;
        
            this.edittingTask = { 
                ...this.task,
                primary:edittedPrimary,
                done:edittedStatus, 
            };
            this.$emit('update-task',this.edittingTask);
            this.editMode = false;
        },
        handleDragStart() {
            this.$emit('start-dragging',this.task)
        },
        handleDragPassby(e) {
            this.$emit('drag-pass-by',this.task,e.pageY)
        },
        handleDragEnd() {
            this.$emit('drag-is-end')
        }
    },
    computed:{
        placeholder() {
            const isEmptyTitle = !this.edittingTask.taskTitle.length
            return isEmptyTitle ? "Please add task title here" : ""
        },
    }
};
</script>

<style lang="scss">
.todo_list {
    .tasks {
        @include task_detail;
        background-color: $secondary_background_color;
        border-radius: 5px;
        margin-bottom: 8px;
        user-select: none;
        opacity: 1;
        transition: all 0.5s;
        overflow: hidden;

        position: relative;

        .drag_icon {
        width: 3px;
        height: 3px;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        opacity: 0;
        transition: opacity 0.1s;
        left: 8px;
        background-color: $primary_background_color;

        &:before,
        &:after {
            content: "";
            position: absolute;
            width: inherit;
            height: inherit;
            background-color: inherit;
            border-radius: inherit;
        }

        &:before {
            top: -9px;
        }

        &:after {
            top: 9px;
        }
        }

        &.dragged {
        opacity: 0.3;
        transform: translateY(0);
        }
        &.passedfromtop {
        margin: 0 0 50px;
        }
        &.passedfrombottom {
        margin: 50px 0 8px;
        }
        &.primary {
        background-color: $highlight_color;
        }
        &.done {
        .task_title {
            text-decoration: line-through;
        }
        }
        .main_information {
        @include task_overview;
        border-bottom: none;

            i {
                @include icons;
            }

            .task_title {
                @include input_style;
                margin-right: 10px;
                margin-bottom: 0;
                flex: 0 1 100%;
                font-size: 18px;
                font-weight: bold;
                background-color: transparent;

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
        .quick_detail {
        padding: 0 0 0 60px;
        display: flex;
        align-items: center;

        @include RWD($pad_horizontal) {
            padding-left: 60px;
        }

        > span {
            display: flex;
            align-items: center;
            font-size: 0;
            margin-bottom: 10px;

            & + span {
            margin-left: 12px;
            }

            > span {
            margin-left: 3px;
            }

            i,
            span {
            font-size: 12px;
            color: $secondary_icon_color;
            }
        }
        }
        .detail_area {
        display: none;
        border-top: 2px solid $secondary_font_color;
        }
        .button_area {
        display: none;
        }


        &:hover {
            transform: scale(1.01) translateY(-5px);
            box-shadow: 0px 0px 5px 3px #c8c8c8;
            .drag_icon {
                opacity: 1;
            }
            .main_information {
                .delete_icon {
                    transform: scale(1);
                    max-width: 20px;
                }
            }
        }
        &.noquery {
            &:hover {
                transform: scale(1) translateY(0);
                box-shadow: none;

                .drag_icon {
                display: none;
                }
            }
            .main_information {
                .delete_icon {
                    transform: scale(1);
                    max-width: 20px;
                }
            }
            .quick_detail {
                display: none;
            }
            .detail_area {
                display: block;
            }
            .button_area {
                display: flex;
            }
        }
    }
}
</style>