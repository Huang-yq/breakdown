require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const {data} = require("autoprefixer");

const chatGptApiUrl = 'https://api.openai.com/v1/chat/completions';

// Generate prompt
function buildPrompt(content, rate) {
    return `${content} Break this down into ${rate} sub tasks.
Requirement:
Each subtask requires at least three subtasks. Answer strictly according to the format. Do not include additional information.
Format:
1.task1 description
- task1.1 description
- task1.2 description
2.task2 description
- task2.1 description
- task2.2 description`;
}

// Parse API response to extract tasks and subtasks
function parseApiResponse(response) {
    const tasks = [];
    let currentTask = null;
    let taskId = 0;
    const today = new Date().toISOString().split('T')[0];

    response.split('\n').forEach(line => {
        if (line.match(/^\d+\./)) {
            // Main Tasks
            taskId++;
            currentTask = {
                id: taskId,
                description: line.split('. ')[1],
                isCompleted: false,
                subTasks: []
            };
            tasks.push(currentTask);
        } else if (line.startsWith('- ')) {
            // Subtasks
            if (currentTask) {
                const subTaskId = currentTask.subTasks.length + 1;
                currentTask.subTasks.push({
                    id: subTaskId,
                    description: line.substring(2)
                });
            }
        }
    });

    return [{ createdDate: today, tasks }];
}

// Update Database function
function updateDatabaseWithNewTasks(parsedTasks) {
    const databasePath = path.join(__dirname, '..','..','..', 'database', 'database.json');
    let database;

    // Try read current database, if not exist create new one
    try {
        database = JSON.parse(fs.readFileSync(databasePath, 'utf8'));
        if (!Array.isArray(database)) {
            database = [];
        }
    } catch (error) {
        database = [];
    }

    // Add new breakdown tasks
    database = [...database, ...parsedTasks];
    fs.writeFileSync(databasePath, JSON.stringify(database, null, 2));
}


// Main query function
async function query(content, rate) {
    if (!content || !rate) {
        console.error('Invalid arguments');
        return;
    }

    const prompt = buildPrompt(content, rate);

    try {
        const apiKey = process.env.OPENAI_API_KEY;

        const response = await axios.post(chatGptApiUrl, {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (response.data.choices && response.data.choices.length > 0) {
            const parsedTasks = parseApiResponse(response.data.choices[0].message.content);
            updateDatabaseWithNewTasks(parsedTasks);
            console.log(response.data.choices[0].message.content);
            console.log('New tasks added to database.json');
        } else {
            console.log("No response text available");
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

query("I want to use ChatGpt to create my own website.", 5);
// query("I need to grade 25 students .ipynb python assignments.", 4);
