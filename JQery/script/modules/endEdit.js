import populateList from "./populateList.js";

export default function editTask(event) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const $taskList = $('.todo_list');

    const $element = $(event.target);
    const $taskForm = $element.parent().parent();

    const $title = $taskForm.find('input[type="text"]');
    const $index = $taskForm.data('index');
    const taskCoords = tasks[$index];

    const $cancelButton = $taskForm.find('.cancel_edit_button');
    const $saveButton = $taskForm.find('.save_button')

    if ($element.is($cancelButton)) {
        $title.value = taskCoords.taskTitle;
        $taskForm.find('[name="date"]').val(taskCoords.deadlineDate);
        $taskForm.find('[name="time"]').val(taskCoords.deadlineTime);
        $taskForm.find('[name="memo_content"]').val(taskCoords.memo);
    }

    if ($element.is($saveButton)) {
        const $editedTitle = $title.val();
        const $editedDate = $taskForm.find('[name="date"]').val();
        const $editedTime = $taskForm.find('[name="time"]').val();
        const $editedFile = $taskForm.find('.file_name').text();
        const $editedMemo = $taskForm.find('[name="memo_content"]').val();

        if (!$title.val().length) {
            $title.attr("placeholder", "Please add the task title here")
            $title.get(0).style.setProperty("--c", "#D0021B")
            return;
        }

        taskCoords.taskTitle = $editedTitle;
        taskCoords.deadlineDate = $editedDate;
        taskCoords.deadlineTime = $editedTime;
        taskCoords.updateFile = $editedFile;
        taskCoords.memo = $editedMemo;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        populateList(tasks, $taskList);

    }
}