const addTaskButton = document.querySelector('.add_new_task');
const form = document.querySelector('.add_task_form');


function addTask(){
    this.classList.add('click');
    form.classList.add('click');
    setTimeout(()=>form.classList.add('click-active'),50)
}

addTaskButton.addEventListener("click",addTask);