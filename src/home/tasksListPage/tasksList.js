document.addEventListener('DOMContentLoaded', function() {
    var exportIcon = document.querySelector('.fa-file-export');
    exportIcon.onclick = function() {
        window.location.href = '/export';
    };
});

document.addEventListener('DOMContentLoaded', function() {
    var returnButton = document.getElementById('return');

    returnButton.onclick = function() {
        window.location.href = '/home/homePage/home.html';
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
