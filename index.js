const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// Use CORS for all routes
app.use(cors());

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Fallback for handling non-existing routes
app.use((req, res, next) => {
    fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end(`Server Error: ${err.code}`);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
