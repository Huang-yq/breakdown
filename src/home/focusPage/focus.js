const steps = [
    { text: 'Choose a suitable template or design layout', done: false },
    { text: 'Create a color scheme and select appropriate fonts', done: false },
    { text: 'Design the logo and other visual elements', done: false },
    { text: 'Create a home page with a clear navigation menu', done: false },
    { text: 'Design individual web pages for different sections or features of the website', done: false },
    { text: 'Implement appropriate buttons, links, and forms for user interaction', done: false },
    { text: 'Select an API or library to integrate ChatGpt with the website', done: false },
    { text: 'Configure the ChatGpt to handle user queries and generate responses', done: false },
    { text: 'Implement a user interface for the chatbot to appear on the website', done: false },
    { text: 'Conduct thorough testing to ensure all website functionalities work correctly', done: false },
    { text: "Identify and fix any bugs or issues in the website's code or design", done: false },
    { text: 'Test the ChatGpt integration for smooth conversation flow and accuracy', done: false },
    { text: 'Choose a suitable web hosting provider to deploy the website', done: false },
    { text: 'Configure the website to be accessible online', done: false },
    { text: 'Regularly update and maintain the website to ensure compatibility and security', done: false },
];

let currentStepIndex = 0;

function updateSteps() {
    const firstSectionStep = document.querySelector('.first-section .step');
    const centralSectionStep = document.querySelector('.central-section .step');
    const thirdSectionStep = document.querySelector('.third-section .step');
    const checkbox = document.querySelector('.central-section .check');

    firstSectionStep.textContent = currentStepIndex > 0 ? steps[currentStepIndex - 1].text : '';
    centralSectionStep.textContent = steps[currentStepIndex].text;
    thirdSectionStep.textContent = currentStepIndex < steps.length - 1 ? steps[currentStepIndex + 1].text : '';

    checkbox.checked = steps[currentStepIndex].done;

    firstSectionStep.classList.toggle('done', currentStepIndex > 0 && steps[currentStepIndex - 1].done);
    centralSectionStep.classList.toggle('done', steps[currentStepIndex].done);
    thirdSectionStep.classList.toggle('done', currentStepIndex < steps.length - 1 && steps[currentStepIndex + 1].done);
}

function moveToNextStepAfterDelay() {
    setTimeout(() => {
        if (currentStepIndex < steps.length - 1) {
            currentStepIndex++;
            updateSteps();
        }
    }, 800); 
}

function setupEventListeners() {
    const upIcon = document.querySelector('.first-section .move-up');
    const downIcon = document.querySelector('.third-section .move-down');
    const checkbox = document.querySelector('.central-section .check');

    upIcon.addEventListener('click', () => {
        if (currentStepIndex > 0) {
            currentStepIndex--;
            updateSteps();
        }
    });

    downIcon.addEventListener('click', () => {
        if (currentStepIndex < steps.length - 1) {
            currentStepIndex++;
            updateSteps();
        }
    });

    checkbox.addEventListener('change', (e) => {
        if (!e.target.checked && currentStepIndex < steps.length - 1 && steps[currentStepIndex + 1].done) {
            alert("Please uncheck the later step first.");
            e.target.checked = true; 
        } else if (currentStepIndex > 0 && !steps[currentStepIndex - 1].done) {
            alert("Please complete the previous step first.");
            e.target.checked = false; 
        } else {
            steps[currentStepIndex].done = e.target.checked;
            updateSteps();
            if (e.target.checked) {
                moveToNextStepAfterDelay();
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateSteps();
    setupEventListeners();
});

document.addEventListener('DOMContentLoaded', function() {
    var returnButton = document.getElementById('return');

    returnButton.onclick = function() {
        window.location.href = '/home/tasksListPage/tasksList.html';
    };
});
