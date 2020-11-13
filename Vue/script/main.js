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
        toggle(e) {
            // addForm.classList.toggle(usage);
            // element.classList.toggle("clicked");
        },
        submitNewTask(e) {
            const title = this.edittingTask.taskTitle;
            if (!title.length) {

                this.edit.emptyTitle = true;
                return;
            }
            const task = this.edittingTask;
            this.tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
            this.withDraw();
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
        fileNameUpdate(e) {
            const file = e.target.files[0].name;
            this.edittingTask.updateFile = file;
        }
    },
    computed: {
        placeholder() {
            return this.edit.emptyTitle ? "Type something here" : "Please add task title here"
        },
        countTasks(){
            const undoneleft = this.tasks.filter(task=>task.done===false).length;
            const leftText = `${undoneleft} task${undoneleft>1?"s":""} left`;
            const doneCount = this.tasks.filter(task=>task.done===true).length;
            const doneText = `${doneCount} task${doneCount>1?"s":""} completed`;
            return this.nowSelector==="done"?doneText:leftText;
        }
    },
})