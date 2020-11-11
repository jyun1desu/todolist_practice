import populateList from "./populateList.js";

let $draggedElement;
let $currentPassbyElement;
let previousY;

//拖曳物件
export function handleDragStart() {
    $draggedElement = $(this);
    $(this).css('opacity','0.3');
    $(this).parent().addClass('pop');
}
export function handleDragEnd() {
    $(this).css('opacity','1');
    $currentPassbyElement.css('margin',"0 0 8px");
    $(".droppable_area").removeClass('pop');
}
export function handleDragPassby(e) {
    if ($draggedElement.parent().is($(this).parent()) && !$draggedElement.is($(this))) {
        const moveDown = e.pageY > previousY;
        $(this).css('margin',`${moveDown?"0 0px 50px":"50px 0px 8px"}`);
    }
    if ($currentPassbyElement && !$currentPassbyElement.is($(this))) {
        $currentPassbyElement.css('margin',"0 0 8px");
    }
    $currentPassbyElement = $(this);
    previousY = e.pageY;
}
//拖曳物件drop區域
export function handleDragover(e) {
    e.preventDefault();
}
export function handleDrop(e) {
    $(".droppable_area").removeClass('pop');
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const $dropdownArea = $(this);
    const $draggedElementArea = $draggedElement.parent();
    if (!$draggedElementArea.is($dropdownArea)) return;

    const moveDown = e.pageY > $currentPassbyElement.offset().top;
    const old_index = $draggedElement.data('index');
    let new_index;
    if (moveDown) {
        new_index = Number($currentPassbyElement.data('index'));
        $draggedElement.insertBefore($currentPassbyElement.next());
    }
    if (!moveDown) {
        $draggedElement.insertBefore($currentPassbyElement);
        new_index = Number($currentPassbyElement.data('index'));
    }

    const task = tasks[old_index];
    tasks.splice(old_index, 1)
    tasks.splice(new_index, 0, task)
    localStorage.setItem('tasks', JSON.stringify(tasks));
    const $taskList = $('.todo_list');
    populateList(tasks, $taskList);
}

export default {handleDragStart, handleDragEnd, handleDragPassby,handleDragover,handleDrop}