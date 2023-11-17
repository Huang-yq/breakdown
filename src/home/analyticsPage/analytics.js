const calendar = document.querySelector('.calendar');

// Generate 365 days with varying levels of activity
const daysHtml = Array.from({ length: 365 }).map(() => {
// Simulate activity level with a random choice for the sake of example
const activityLevel = Math.floor(Math.random() * 6); // random number between 0 and 5
const className = activityLevel ? `active-${activityLevel}` : '';
return `<div class="day ${className}"></div>`;
}).join('');

// Set the innerHTML of the calendar div to the generated days
calendar.innerHTML = daysHtml;