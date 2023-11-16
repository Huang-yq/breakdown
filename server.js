const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'src')));

// index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './src/home/homePage', 'home.html'));
});

// handle export(currently export json file)
app.get('/export', function(req, res) {
    const databasePath = path.join(__dirname, 'database', 'database_current.json');
    res.download(databasePath);
});

// Set the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
