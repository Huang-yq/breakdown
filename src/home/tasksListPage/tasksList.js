// handle export
document.addEventListener('DOMContentLoaded', function() {
    var exportIcon = document.querySelector('.fa-file-export');

    exportIcon.onclick = function() {
        window.location.href = '/export';
    };
});



// handle dropdown menu
document.addEventListener('DOMContentLoaded', function () {
    var optionsIcons = document.querySelectorAll('.fa-ellipsis');

    optionsIcons.forEach(function(icon) {
        icon.addEventListener('click', function(event) {
            var dropdownMenu = icon.nextElementSibling;
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
            event.stopPropagation();
        });
    });

    document.addEventListener('click', function(event) {
        var dropdownMenus = document.querySelectorAll('.dropdown-menu');
        dropdownMenus.forEach(function(menu) {
            if (menu !== event.target && !menu.contains(event.target)) {
                menu.style.display = 'none';
            }
        });
    });
});

// handle dropdown menu - edit

// handle dropdown menu - delete
document.addEventListener('DOMContentLoaded', function () {
    var deleteButton = document.querySelector('.delete');
    var taskList = document.getElementsByClassName("subtask-container")
    deleteButton.addEventListener('click', function() {
        taskList[0].remove();
    });

    // delete from database

});

// handle dropdown menu - add
document.addEventListener('DOMContentLoaded', function () {
    var addButton = document.querySelector('.add');

    addButton.addEventListener('click', function() {
        var taskList = document.getElementById('sub-subtask-list');
        var inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = 'Enter new task';
        inputField.className = 'task-input'; // for css

        taskList.appendChild(inputField);
        inputField.focus();

        inputField.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                var task = this.value.trim();
                if (task !== '') {
                    var li = document.createElement('li');
                    li.textContent = task;
                    taskList.appendChild(li);
                }
                this.remove();
            }
        });
    });

    // add input to database



});












// handle return & confirm button
document.addEventListener('DOMContentLoaded', function() {
    var returnButton = document.getElementById('return');

    returnButton.onclick = function() {
        var confirmation = confirm("Are you sure you want to start over? You will lose all your progress.");
        if (confirmation) {
            window.location.href = '/home/homePage/home.html';
        }
    };
});
document.addEventListener('DOMContentLoaded', function() {
    var confirmButton = document.getElementById('confirm');

    confirmButton.onclick = function() {
        window.location.href = '../../home/focusPage/focus.html';
    };
});




// next to do:
// fetch data from database_current.json, display the real data in the html page,
// handle the click event of the modify button, delete button, and add button
// add listener to the Modify button, to modifyTaskPage Or handle edit in this page
