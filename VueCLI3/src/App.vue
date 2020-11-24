<template>
  <header>
    <SelectorBar />
  </header>
  <main class="container">
    <StartNewTask />
    <NewTaskForm />
    <div class="todo_list">
      <TodoItem/>
    </div>
    <p class="left_tasks_numbers">2 tasks left</p>
  </main>
</template>

<script>
import SelectorBar from "./components/SelectorBar.vue";
import StartNewTask from "./components/StartNewTask.vue";
import NewTaskForm from "./components/NewTaskForm.vue";
import TodoItem from "./components/TodoItem.vue";
export default {
  name: "App",
  components: {
    SelectorBar,
    StartNewTask,
    NewTaskForm,
    TodoItem,
  },
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
