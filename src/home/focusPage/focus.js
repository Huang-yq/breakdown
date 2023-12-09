let mainElephant = '';
let currentSubTaskIndex = 0;
let subTasks = [];
document.addEventListener('DOMContentLoaded', function() {
    fetch('/database/database_current.json')
        .then(response => response.json())
        .then(data => {
            mainElephant = data[0].elephant;
            data[0].tasks.forEach(task => {
                subTasks.push(...task.subTasks.map(subTask => ({ 
                    text: subTask.description, 
                    done: false 
                })));
            });
            updateSteps();
            setupEventListeners();
        })
        .catch(error => console.error('Error:', error));
});


function updateSteps(elephant = mainElephant, tasksData = subTasks) {
    const firstSectionStep = document.querySelector('.first-section .step');
    const centralSectionStep = document.querySelector('.central-section .step');
    const thirdSectionStep = document.querySelector('.third-section .step');
    const checkbox = document.querySelector('.central-section .check');
    const mainTask = document.getElementById('mainElephant');
    const upIcon = document.querySelector('.first-section .move-up');
    const downIcon = document.querySelector('.third-section .move-down');


    mainTask.textContent = `Main task: ${elephant}.`;
    firstSectionStep.textContent = currentSubTaskIndex > 0 ? tasksData[currentSubTaskIndex - 1].text : '';
    centralSectionStep.textContent = tasksData[currentSubTaskIndex].text;
    thirdSectionStep.textContent = currentSubTaskIndex < tasksData.length - 1 ? tasksData[currentSubTaskIndex + 1].text : '';

    checkbox.checked = tasksData[currentSubTaskIndex].done;

    firstSectionStep.classList.toggle('done', currentSubTaskIndex > 0 && tasksData[currentSubTaskIndex - 1].done);
    centralSectionStep.classList.toggle('done', tasksData[currentSubTaskIndex].done);
    thirdSectionStep.classList.toggle('done', currentSubTaskIndex < tasksData.length - 1 && tasksData[currentSubTaskIndex + 1].done);
    
    upIcon.style.display = currentSubTaskIndex > 0 ? 'block' : 'none';
    downIcon.style.display = currentSubTaskIndex < tasksData.length - 1 ? 'block' : 'none';
}

function moveToNextStepAfterDelay() {
    setTimeout(() => {
        if (currentSubTaskIndex < subTasks.length - 1) {
            currentSubTaskIndex++;
            updateSteps();
        }
    }, 800); 
}

function setupEventListeners() {
    const upIcon = document.querySelector('.first-section .move-up');
    const downIcon = document.querySelector('.third-section .move-down');
    const checkbox = document.querySelector('.central-section .check');

    upIcon.addEventListener('click', () => {
        if (currentSubTaskIndex > 0) {
            currentSubTaskIndex--;
            updateSteps();
        }
    });

    downIcon.addEventListener('click', () => {
        if (currentSubTaskIndex < subTasks.length - 1) {
            currentSubTaskIndex++;
            updateSteps();
        }
    });

    checkbox.addEventListener('change', (e) => {
        if (!e.target.checked && currentSubTaskIndex < subTasks.length - 1 && subTasks[currentSubTaskIndex + 1].done) {
            alert("Please uncheck the later step first.");
            e.target.checked = true; 
        } else if (currentSubTaskIndex > 0 && !subTasks[currentSubTaskIndex- 1].done) {
            alert("Please complete the previous step first.");
            e.target.checked = false; 
        } else {
            subTasks[currentSubTaskIndex].done = e.target.checked;
            updateSteps();
            if (e.target.checked) {
                moveToNextStepAfterDelay();
            }
        }
        updateTaskButtonState();
        if (subTasks.every(task => task.done)) {
            triggerConfettiAnimation();
        }
    });
}
function triggerConfettiAnimation() {
    confetti({
        particleCount: 150,
        spread: 150,
        origin: { y: 0.8 },
        // colors: ['#bb0000', '#ffffff'] 
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var returnButton = document.getElementById('return');

    returnButton.onclick = function() {
        window.location.href = '/home/tasksListPage/tasksList.html';
    };
});

// change the button from edit tasks to shrink another elephant
function updateTaskButtonState() {
    var returnButton = document.getElementById('return');
    if (subTasks.every(task => task.done)) {
        returnButton.textContent = "SHRINK ANOTHER ELEPHANT";
        returnButton.onclick = function() {
            var confirmation = confirm("Are you sure you want to go back to home page? You will start a new task.");
            if (confirmation) {
                window.location.href = '/home/homePage/home.html';
            }
        };
    } else {
        returnButton.textContent = "EDIT TASKS";
        returnButton.onclick = function() {
            var confirmation = confirm("Are you sure you want to edit your tasks now? You will lose all your progress.");
            if (confirmation) {
                window.location.href = '/home/tasksListPage/tasksList.html';
            }
        };
    }
}


// handle edit task button
document.addEventListener('DOMContentLoaded', function() {
    var returnButton = document.getElementById('return');

    returnButton.onclick = function() {
        var confirmation = confirm("Are you sure you want to edit your tasks now? You will lose all your progress.");
        if (confirmation) {
            window.location.href = '/home/tasksListPage/tasksList.html';
        }
    };
});

// hide task
document.addEventListener('DOMContentLoaded', function () {
    const mainTask = document.getElementById('mainElephant');
    const toggleIcon = document.querySelector('.toggle');
    const toggleTxt = document.getElementById('toggleTxt');

    mainTask.classList.remove('hidden');
    toggleTxt.textContent = 'HIDE TASK';

    toggleIcon.addEventListener('click', function () {
        mainTask.classList.toggle('hidden');

        if (mainTask.classList.contains('hidden')) {
            toggleTxt.textContent = 'VIEW TASK';
        } else {
            toggleTxt.textContent = 'HIDE TASK';
        }
    });
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
