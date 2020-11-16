import todoItem from './component/todoItem.js'

const vm = new Vue({
    el: '#app',
    data: {
        edit: {
            isClick: false,
            isOpen: false,
            emptyTitle: false,
        },
        nowSelector: 'all',
        edittingTask: {
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
        dragEventData: {
            beingDragged: null,
            beingPassedby: null,
            previousY: null,
            isMoveDown: null,
        },
        selectButtons: [{
                title: 'My tasks',
                sort: 'all'
            },
            {
                title: 'In progress',
                sort: 'undone'
            },
            {
                title: 'Completed',
                sort: 'done'
            }
        ],
        tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    },
    components: {
        'todo-item': todoItem,
    },
    watch: {
        tasks: {
            handler: function (value) {
                window.localStorage.setItem('tasks', JSON.stringify(value));
            },
            deep: true,
        },
        'dragEventData': {
            handler: function () {},
            deep: true
        }
    },
    methods: {
        addNewTaskForm() {
            this.edit.isClick = true;
            setTimeout(() => {
                this.edit.isOpen = true
            }, 5);
        },
        withDraw() {
            this.edit.isOpen = false;
            this.edit.emptyTitle = false;
            setTimeout(() => this.edit.isClick = false, 280);
        },
        submitNewTask() {
            const title = this.edittingTask.taskTitle;
            if (!title.length) {
                this.edit.emptyTitle = true;
                return;
            }
            const task = this.edittingTask;
            this.tasks.push(task);
            this.reset();
        },
        fileNameUpdate(e) {
            const file = e.target.files[0].name;
            this.edittingTask.updateFile = file;
        },
        reset() {
            this.edittingTask = {
                taskTitle: '',
                deadlineDate: '',
                deadlineTime: '',
                updateFile: '',
                memo: '',
                done: false,
                primary: false,
                isDragged: false,
                isPassed: false,
            }
            this.edit.emptyTitle = false;
            this.withDraw();
        },
        deleteCertainTask(task) {
            const index = this.tasks.indexOf(task);
            this.tasks.splice(index, 1)
        },
        getDraggedElement(draggedtask) {
            this.dragEventData.beingDragged = draggedtask;
            draggedtask.isDragged = true;
        },
        getPassedElement(passbytask, position) {
            const dragged = this.dragEventData.beingDragged;
            const passed = this.dragEventData.beingPassedby;
            const sameType = (dragged.primary == passbytask.primary) && (dragged.done == passbytask.done);
            if (sameType && dragged !== passbytask) {
                const moveDown = position > this.dragEventData.previousY;
                this.dragEventData.isMoveDown = moveDown
                passbytask.isPassed = true;
            }
            if (passed && passed !== passbytask) {
                passed.isPassed = false;
            }
            this.dragEventData.beingPassedby = passbytask;
            this.dragEventData.previousY = position;
        },
        handleDrop() {
            // console.log(this.tasks.indexOf(this.dragEventData.beingDragged))
            // console.log(this.tasks.indexOf(this.dragEventData.beingPassedby))
        },
        initialData() {
            this.dragEventData.beingDragged.isDragged = false;
            this.dragEventData.beingPassedby.isPassed = false;
            this.dragEventData = {
                beingDragged: null,
                beingPassedby: null,
                previousY: null,
                isMoveDown: null,
            }
        },
    },
    computed: {
        placeholder() {
            return this.edit.emptyTitle ? "Please type something here" : "Please add task title here"
        },
        countTasks() {
            const undoneleft = this.tasks.filter(task => task.done === false).length;
            const leftText = `${undoneleft} task${undoneleft>1?"s":""} left`;
            const doneCount = this.tasks.filter(task => task.done === true).length;
            const doneText = `${doneCount} task${doneCount>1?"s":""} completed`;
            return this.nowSelector === "done" ? doneText : leftText;
        },
        sortedTasks() {
            const sorted = this.tasks.sort((a, b) => {
                const orderA = (a.primary ? -2 : 0) + (a.done ? 1 : -2)
                const orderB = (b.primary ? -2 : 0) + (b.done ? 1 : -2)
                return orderA - orderB
            })
            return sorted
        }
    },
})