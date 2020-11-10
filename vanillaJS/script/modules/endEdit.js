import populateList from "./populateList.js";

export default function editTask(e) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.querySelector('.todo_list');

    const element = e.target;
    const taskForm = element.parentNode.parentNode;
    const title = taskForm.querySelector('input[type="text"]');
    const index = taskForm.dataset.index;
    const taskCoords = tasks[index];

    if (element.matches('button.cancel_edit_button')) {
        title.value = taskCoords.taskTitle;;
        taskForm.querySelector('[name="date"]').value = taskCoords.deadlineDate;
        taskForm.querySelector('[name="time"]').value = taskCoords.deadlineTime;
        taskForm.querySelector('[name="memo_content"]').value = taskCoords.memo;
    }

    if (element.matches('button.save_button')) {
        const editedTitle = title.value;
        const editedDate = taskForm.querySelector('[name="date"]').value;
        const editedTime = taskForm.querySelector('[name="time"]').value;
        const editedFile = taskForm.querySelector('.file_name').textContent
        const editedMemo = taskForm.querySelector('[name="memo_content"]').value;

        if (!title.value.length) {
            title.placeholder = "Please add the task title here";
            title.style.setProperty("--c", "#D0021B")
            return;
        }

        taskCoords.taskTitle = editedTitle;
        taskCoords.deadlineDate = editedDate;
        taskCoords.deadlineTime = editedTime;
        taskCoords.updateFile = editedFile;
        taskCoords.memo = editedMemo;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        populateList(tasks, taskList);
    }
}