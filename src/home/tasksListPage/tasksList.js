// fetch data from database_current.json, display the real data in the html page
document.addEventListener('DOMContentLoaded', function() {
    fetch('/database/database_current.json')
        .then(response => response.json())
        .then(data => {
            const mainElephant = data[0].elephant;
            const tasksData = data[0].tasks;
            updateTasksList(mainElephant, tasksData);
        })
        .catch(error => console.error('Error:', error));
});

function updateTasksList(mainElephant, tasksData) {
    const tasksContainer = document.querySelector('.tasks');
    const mainTask = document.getElementById('mainElephant');
    mainTask.textContent = "Your Elephant: " + mainElephant;

    tasksContainer.innerHTML = ''; // clean template

    tasksData.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.draggable = true;
        taskItem.classList.add('subtask');
        taskItem.innerHTML = `
            <span class="drag-handle">&#x2630;</span>
            <div class="subtask-content">
                <p class="subtask-description">${task.description}</p>
                <div class="options-container">
<!--                    <i class="fa-solid fa-rotate-right"></i>-->
                    <i class="fa-solid fa-ellipsis"></i>
                    <div class="dropdown-menu" style="display: none;">
                        <ul>
                            <li class="modify modify-edit">EDIT</li>
                            <li class="modify modify-delete">DELETE</li>
                            <li class="modify modify-add">ADD</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        // handle dropdown menu
        const ellipsisIcon = taskItem.querySelector('.fa-ellipsis');
        ellipsisIcon.addEventListener('click', function(event) {
            var dropdownMenu = event.target.nextElementSibling;
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
            event.stopPropagation();
        });

        // handle dropdown menu - edit
        const editButton = taskItem.querySelector('.modify-edit');
        editButton.addEventListener('click', function(event) {
            const taskDescriptionElem = taskItem.querySelector('.subtask-description');
            const originalText = taskDescriptionElem.textContent;
            const inputElem = document.createElement('input');
            inputElem.type = 'text';
            inputElem.value = originalText;
            inputElem.classList.add('subtask-edit-input');
            taskDescriptionElem.parentNode.replaceChild(inputElem, taskDescriptionElem);

            inputElem.focus();

            // Update main task description
            inputElem.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    task.description = inputElem.value;
                    taskDescriptionElem.textContent = inputElem.value;
                    inputElem.parentNode.replaceChild(taskDescriptionElem, inputElem);
                    // updateTaskInDatabase(task);
                }
            });

            // Make subtasks editable
            const subtaskList = taskItem.querySelector('.sub-subtask-list');
            Array.from(subtaskList.children).forEach((subtaskItem, index) => {
                const subtaskDescriptionElem = subtaskItem.querySelector('.subtask-description');
                const subInputElem = document.createElement('input');
                subInputElem.type = 'text';
                subInputElem.value = subtaskDescriptionElem.textContent;
                subInputElem.classList.add('subtask-edit-input');
                subtaskDescriptionElem.parentNode.replaceChild(subInputElem, subtaskDescriptionElem);

                // Update subtask description
                subInputElem.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        task.subTasks[index].description = subInputElem.value;
                        subtaskDescriptionElem.textContent = subInputElem.value;
                        subInputElem.parentNode.replaceChild(subtaskDescriptionElem, subInputElem);
                        // updateSubtaskInDatabase(task.subTasks[index]);
                    }
                });
            });

            event.stopPropagation();
        });

        // handle dropdown menu - delete
        const deleteButton = taskItem.querySelector('.modify-delete');
        deleteButton.addEventListener('click', function(event) {
            taskItem.remove();

            const index = tasksData.indexOf(task);
            if (index > -1) {
                tasksData.splice(index, 1);
            }

            // deleteTaskFromDatabase(task.id);

            event.stopPropagation();
        });

        // handle dropdown menu - add
        const addButton = taskItem.querySelector('.modify-add');
        addButton.addEventListener('click', function(event) {
            const subtaskList = taskItem.querySelector('.sub-subtask-list');

            const inputElem = document.createElement('input');
            inputElem.type = 'text';
            inputElem.classList.add('subtask-edit-input');
            inputElem.placeholder = "Enter new subtask";

            inputElem.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && inputElem.value.trim() !== '') {
                    const newSubtaskDescription = document.createElement('p');
                    newSubtaskDescription.classList.add('subtask-description');
                    newSubtaskDescription.textContent = inputElem.value.trim();

                    const newSubtaskItem = document.createElement('li');
                    newSubtaskItem.appendChild(newSubtaskDescription);
                    subtaskList.appendChild(newSubtaskItem);
                    task.subTasks.push({ description: inputElem.value.trim() });
                    inputElem.remove();
                } else if (e.key === 'Escape') {
                    inputElem.remove();
                }
            });

            subtaskList.appendChild(inputElem);
            inputElem.focus();

            // updateSubtaskInDatabase()
            event.stopPropagation();
        });


        // subtask list
        const subtaskList = document.createElement('ul');
        subtaskList.classList.add('sub-subtask-list');
        task.subTasks.forEach(subTask => {
            const subtaskItem = document.createElement('li');
            const subtaskDescriptionElem = document.createElement('p');
            subtaskDescriptionElem.classList.add('subtask-description');
            subtaskDescriptionElem.textContent = subTask.description;
            subtaskItem.appendChild(subtaskDescriptionElem);
            subtaskList.appendChild(subtaskItem);
        });

        taskItem.appendChild(subtaskList);
        tasksContainer.appendChild(taskItem);
    });
}


// handle export
document.addEventListener('DOMContentLoaded', function() {
    var exportIcon = document.querySelector('.export-click');

    exportIcon.onclick = function() {
        window.location.href = '/export';
    };
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
    var returnHome = document.getElementById('home-click');

    returnHome.onclick = function() {
        var confirmHome = confirm("Are you sure you want to return home? You will lose all your progress.");
        if (confirmHome) {
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