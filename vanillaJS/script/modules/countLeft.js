export function countLeft(){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []
    const countLeft = document.querySelector('.left_tasks_numbers');
    countLeft.textContent = `${tasks.filter(task=>task.done===false).length} task${tasks.filter(task=>task.done===false).length>1?"s":""} left`
}

export default countLeft;