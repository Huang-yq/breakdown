document.addEventListener('DOMContentLoaded', function() {
    setupButtonEvent();
    setupRangeInputEvent();
});

async function setupButtonEvent() {
    const breakDownButton = document.getElementById('submit-button');
    const elephantInput = document.getElementById('elephantInput');
    const granularityInput = document.getElementById('granularity');

    breakDownButton.addEventListener('click', async function() {
        const elephantValue = elephantInput.value;
        const granularityValue = granularityInput.value;
        console.log('Elephant:', elephantValue, 'Granularity:', granularityValue);

        // indicate waiting
        let dotCount = 0;
        const originalText = breakDownButton.textContent;
        const interval = setInterval(() => {
            dotCount = (dotCount + 1) % 4;
            breakDownButton.textContent = "Breaking down " + ".".repeat(dotCount);
        }, 500);

        try {
            await sendQueryToServer(elephantValue, granularityValue);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            clearInterval(interval);
            window.location.href = '/home/tasksListPage/tasksList.html';
        }
    });
}

async function sendQueryToServer(content, rate) {
    try {
        const response = await fetch('/api/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content, rate })
        });
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


function setupRangeInputEvent() {
    const rangeInput = document.getElementById('granularity');
    const valueDisplay = document.getElementById('rangeValue');

    updateValueDisplay(rangeInput, valueDisplay);

    rangeInput.addEventListener('input', function() {
        valueDisplay.textContent = rangeInput.value;
        updateValueDisplay(rangeInput, valueDisplay);
    });
}

function updateValueDisplay(rangeInput, valueDisplay) {
    const percentPos = (rangeInput.value - rangeInput.min) / (rangeInput.max - rangeInput.min);
    const leftPos = percentPos * (rangeInput.offsetWidth - valueDisplay.offsetWidth);
    valueDisplay.style.left = leftPos + 'px';
}