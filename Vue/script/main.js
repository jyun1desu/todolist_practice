const selectButtons = [{
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
}];
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const vm = new Vue({
    el: '#app',
    data: {
        selectButtons,
        nowSelector: 'all',
        tasks,
    },
    methods:{
        swithSelector:function(e){
            const element = e.target;
            this.nowSelector = element.dataset.selector;
        },
        addNewTask : function(){
            const addButton = document.querySelector('.add_new_task');
            const addForm = document.querySelector('.add_task_form');  
            addButton.classList.add('click');
            addForm.classList.add('click');
            setTimeout(() => addForm.classList.add('click-active'), 5);
        },
        withDraw: function(){
            const addButton = document.querySelector('.add_new_task');
            const addForm = document.querySelector('.add_task_form');  
            addForm.classList.remove('click-active');
            setTimeout(() => addForm.classList.remove('click'), 280);
            setTimeout(() => addButton.classList.remove('click'), 280);
        },
        toggle: function(e){
            const element = e.target
            const addForm = document.querySelector('.add_task_form');
            addForm.classList.toggle(element.dataset.use);
            element.classList.toggle('fas');
            element.classList.toggle('far');
            element.classList.toggle("clicked");
        }
    }
})
