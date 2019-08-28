//business logic
function Task(title, category) {
    this.title = title;
    this.category = category;
    this.tasks = [];
}

function TaskList(taskName, taskTime) {
    this.taskName = taskName;
    this.taskTime = taskTime;
}
TaskList.prototype.aTask = function () {
    return this.taskName + "     " + this.taskTime;
}
function resetFields() {
    $('#new-task-name').val("");
    $('#input_starttime').val("");
    $('#nTask').val("")

}

//user inteface logic

$(document).ready(function () {
    let category;
    $('button#select-category').click(function () {
        category = $("input:radio[name=task]:checked").val();
        $('span#mCategory').text(category);
        $('.modal').modal('hide');

    });


    $('#add-task').click(function () {
        $("#new_task").append('<div class="row nTaskList">' +
            '<div class="col-md-6">' +
            '<div class="form-group">' +
            '<label for="new-task"><i class="material-icons orange601 text-primary">note_add</i> Task</label>' +
            '<input type="text" class="form-control taskInput" id="nTask" placeholder="To Study Proptypes" value="">' +
            '</div>' +
            '</div>' +
            '<div class="col-md-6">' +
            '<div class="form-group">' +
            '<label for="new-task"><i class="material-icons orange600">alarm</i> Time</label>' +
            '<input placeholder="Time" type="time" id="input_starttime" class="form-control timepicker timeInput" value="">' +
            '</div>' +

            '</div>'+
            '</div>'

        );
    });



    $('form#new-task').submit(function (event) {
        event.preventDefault();

        let taskTitle = $('#new-task-name').val();
        let newTask = new Task(taskTitle, category);

        $('.nTaskList').each(function () {
            let task_name = $(this).find('input.taskInput').val();
            let task_time = $(this).find('input.timeInput').val();

            let newTaskList = new TaskList(task_name, task_time);
            newTask.tasks.push(newTaskList);
        });
        $('#tlist').append("<li><span class='task'>" + newTask.title + "</span><span class='badge badge-primary float-right' id='badge'>" + newTask.category + "</span></li>");

        $('.task').last().click(function () {
            $('#details').show();
            $('#taskDetails h3').text(newTask.title);
            $('span#cCat').text(newTask.category);
            $('ol#clear').text('');
            newTask.tasks.forEach(function (task) {
                $(".allTasks").append("<li>" + task.aTask() + "</li>");
            });
        })


        // resetFields();
        $('form#new-task')[0].reset();
    });
});
