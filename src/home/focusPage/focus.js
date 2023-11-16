const steps = [
    { text: 'Step 1: This is step 1 test test', done: false },
    { text: 'Step 2: now step 2', done: false },
    { text: 'Step 3: step 3 test again', done: false },
    { text: 'Step 4: step 4 is not the last step', done: false },
    { text: 'Step 5: step 5 is the last step', done: false },
    // need to connect the steps with before
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

    checkbox.addEventListener('change', () => {
        steps[currentStepIndex].done = checkbox.checked;
        updateSteps();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateSteps();
    setupEventListeners();
});

