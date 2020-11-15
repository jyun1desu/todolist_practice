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
            }
            this.edit.emptyTitle = false;
            this.withDraw();
        },
        deleteCertainTask(task){
            const index = this.tasks.indexOf(task);
            this.tasks.splice(index,1)
        }
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
        primayTasks() {
            return this.tasks.filter(task => task.primary === true && task.done === false)
        },
        normalTasks() {
            return this.tasks.filter(task => task.primary === false && task.done === false)
        },
        doneNormalTasks(){
            return this.tasks.filter(task => task.primary === false && task.done === true)
        },
        donePrimaryTasks(){
            return this.tasks.filter(task => task.primary === true && task.done === true)
        },
    },
})