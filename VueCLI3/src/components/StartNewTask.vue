<template>
    <button
        class="add_new_task"
    >
        + Add Task
    </button>

            <!-- :class="{ click: edit.isClick, 'click-active': edit.isOpen }"
        @click="addNewTaskForm" -->
</template>

<script>
export default {
    name:'StartNewTask',
}
</script>

<style lang="scss">
    .add_new_task {
    width: 100%;
    background-color: white;
    border: 2px solid #c8c8c8;
    border-radius: 5px;
    padding: 10px;
    font-size: 18px;
    text-align: left;
    color: $secondary_font_color;

        &:focus{
            outline: none;
        }

        &.click {
            display: none;
        }
    }
</style>