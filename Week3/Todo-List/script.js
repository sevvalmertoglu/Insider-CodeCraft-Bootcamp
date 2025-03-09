$(document).ready(function() {
    $('#addTaskBtn').click(function() {
        const taskText = $('#taskInput').val();
        
        if (taskText) {
            const li = $('<li>');
            const span = $('<span>').text(taskText);
            const completeBtn = $('<button>')
                .addClass('complete-btn')
                .text('Complete')
                .click(function() {
                    $(this).toggleClass('completed');
                    span.toggleClass('completed'); 
                });

            const deleteBtn = $('<button>')
                .addClass('delete-btn')
                .text('Delete')
                .click(function() {
                    li.remove();
                });

            const actionsDiv = $('<div>').addClass('task-actions').append(completeBtn, deleteBtn);

            li.append(span, actionsDiv);
            $('#taskList').append(li);
            $('#taskInput').val('');
        }
    });
});
