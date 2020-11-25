<template>
  <header>
    <SelectorBar
      :now-selector="nowSelector"
      @updateSelector="selectTasks"
    />
  </header>
  <main class="container">
    <StartNewTask 
      :class="{click: addNewTask.isClick,'click-active':addNewTask.isOpen}"
      @click="addNewTaskForm"/>
    <NewTaskForm
      :class="{click: addNewTask.isClick,'click-active':addNewTask.isOpen}"
      @closeEdit="withDraw"
      @addNewTask="updateTaskList"
    />
    <div class="todo_list">
      <TodoItem
        v-for="(task,index) in selectedTasks"
        :index="index"
        :task="task"
        :key="task.taskTitle+index"
        @updateTask="updateOldTask"
        @delete="deleteTask"
      />
    </div>
    <p class="left_tasks_numbers">{{countTasks}}</p>
  </main>
</template>

<script>
import SelectorBar from "./components/SelectorBar.vue";
import StartNewTask from "./components/StartNewTask.vue";
import NewTaskForm from "./components/NewTaskForm.vue";
import TodoItem from "./components/TodoItem.vue";
export default {
  name: "App",
  data(){
    return{
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
      nowSelector: 'all',
      addNewTask: {
        isClick: false,
        isOpen: false,
      },
    }
  },
  components: {
    SelectorBar,
    StartNewTask,
    NewTaskForm,
    TodoItem,
  },
  watch:{
    tasks: {
      handler: function (value) {
          window.localStorage.setItem('tasks', JSON.stringify(value));
      },
      deep: true,
    },
  },
  methods:{
    selectTasks(value){
      this.nowSelector = value
    },
    addNewTaskForm() {
      this.addNewTask.isClick = true;
      setTimeout(() => {
          this.addNewTask.isOpen = true
      }, 5);
    },
    withDraw() {
      this.addNewTask.isOpen = false;
      setTimeout(() => this.addNewTask.isClick = false, 280);
    },
    updateTaskList(value){
      this.tasks.push(value);
    },
    updateOldTask(oldTask,newTask){
      const index = this.tasks.indexOf(oldTask);
      this.tasks[index] = { ...newTask }
    },
    deleteTask(task){
      const index = this.tasks.indexOf(task);
      this.tasks.splice(index, 1);
    }
  },
  computed:{
    sortedTasks(){
      const sorted = this.tasks.slice().sort((a, b) => {
          const orderA = (a.primary ? -2 : 0) + (a.done ? 1 : -2)
          const orderB = (b.primary ? -2 : 0) + (b.done ? 1 : -2)
          return [orderA - orderB]
      })
      return sorted
    },
    selectedTasks(){
      let selected;
      switch(this.nowSelector) {
          case 'all':
              selected = this.sortedTasks.slice();
              break;
          case 'done':
              selected = this.sortedTasks.slice().filter(task=>task.done===true)
              break;
          case 'undone':
              selected = this.sortedTasks.slice().filter(task=>task.done===false)
              break;
          }
      return selected;
    },
    countTasks() {
    const undoneleft = this.tasks.filter(task => task.done === false).length;
    const leftText = `${undoneleft} task${undoneleft>1?"s":""} left`;
    const doneCount = this.tasks.filter(task => task.done === true).length;
    const doneText = `${doneCount} task${doneCount>1?"s":""} completed`;
    return this.nowSelector === "done" ? doneText : leftText;
    },
  }
};
</script>

<style lang="scss">
  body {
    background-color: $primary_background_color;
    min-width: 420px;

    header {
      background-color: $main_color;
    }

    main {
      margin-top: 15px;
    }

    .todo_list {
      margin-top: 20px;
    }

    .left_tasks_numbers {
      padding-left: $position_left;

      @include RWD($pad_horizontal) {
        padding-left: 25px;
      }

      font-style: italic;
      color: $secondary_font_color;
    }
  }
</style>
