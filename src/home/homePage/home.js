// Breakdown button routing
document.addEventListener('DOMContentLoaded', function() {
    var breakDownButton = document.getElementById('submit-button');
    breakDownButton.onclick = function() {
        window.location.href = '/home/tasksListPage/tasksList.html';
    };
});

// display numerical value of range input
let rangeInput = document.getElementById('granularity');
let valueDisplay = document.getElementById('rangeValue');

updateValueDisplay();

rangeInput.addEventListener('input', function() {
    valueDisplay.textContent = rangeInput.value;
    updateValueDisplay();
});

function updateValueDisplay() {
    let percentPos = (rangeInput.value - rangeInput.min) / (rangeInput.max - rangeInput.min);
    let leftPos = percentPos * (rangeInput.offsetWidth - valueDisplay.offsetWidth);
    valueDisplay.style.left = leftPos + 'px';
}

// next to do:
// call query() function,
// modify query() function to store the results in database.json and database_current.json