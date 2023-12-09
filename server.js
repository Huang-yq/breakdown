const express = require('express');
const path = require('path');
const { query } = require('./src/home/api/chatGPTAPI');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'src')));
app.use('/database', express.static(path.join(__dirname, 'database')));

// index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './src/home/homePage', 'home.html'));
});

// API endpoint to handle query
app.post('/api/query', async (req, res) => {
    try {
        const { content, rate } = req.body;
        const response = await query(content, rate);
        res.json(response);
        console.log("content: "+content+" rate: "+rate);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// handle export(currently export json file)
app.get('/export', function(req, res) {
    const databasePath = path.join(__dirname, 'database', 'database_current.json');
    res.download(databasePath);
});

// Set the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`======== Server running on port ${PORT}`);
});
