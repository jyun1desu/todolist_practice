function toggleShow() {
    const task = this.parentNode.parentNode;
    const quick_detail = this.parentNode.nextElementSibling;
    const detail = quick_detail.nextElementSibling;
    const button = detail.nextElementSibling;
    const label = this.nextElementSibling;
    const icon = label.firstChild
    const title = task.querySelector('input[type="text"]');
    const deleteIcon = task.querySelector('label.delete_icon');

    if (this.checked) {
        task.classList.add('noquery');
        quick_detail.style.setProperty('display', 'none');
        detail.style.setProperty('display', 'block');
        button.style.setProperty('display', 'flex');
        label.classList.add("clicked");
        deleteIcon.classList.add("editting")
        icon.classList.add('fas');
        icon.classList.remove('far');
        title.readOnly = false;
        task.setAttribute('draggable', false);
    } else {
        task.classList.remove('noquery')
        task.setAttribute('draggable', true);
        detail.style.setProperty('display', 'none');
        button.style.setProperty('display', 'none');
        quick_detail.style.setProperty('display', 'flex');
        label.classList.remove("clicked");
        icon.classList.add('far');
        icon.classList.remove('fas');
        deleteIcon.classList.remove("editting")
        title.readOnly = true;
    }
}

function toggleStatus() {
    const label = this.nextElementSibling;
    const icon = label.firstChild;
    const task = this.parentNode.parentNode;
    const index = task.dataset.index;
    const usage = this.dataset.use;
    label.classList.toggle("clicked");
    task.classList.toggle(`${usage}`);
    icon.classList.toggle('fas');
    icon.classList.toggle('far');
    if (task.dataset.index) {
        tasks[index][usage] = !tasks[index][usage];
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    populateList(tasks, taskList);
    countLeft();
}

function deleteTask() {
    const dataIndex = this.id.match(/\d+/);
    // const orderIndex = orderArray.findIndex(el => el == dataIndex);
    tasks.splice(dataIndex, 1)
    localStorage.setItem('tasks', JSON.stringify(tasks));
    populateList(tasks, taskList);
}

export {
    toggleShow,
    toggleStatus,
    deleteTask,
}