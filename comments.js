// Create web server 

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Create web server

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define the port
const port = process.env.PORT || 3000;

// Define the comments file path
const commentsFilePath = path.join(__dirname, 'comments.json');

// Endpoint to get comments
app.get('/comments', (req, res) => {
    fs.readFile(commentsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading comments file');
        }
        res.send(JSON.parse(data));
    });
});

// Endpoint to add a new comment
app.post('/comments', (req, res) => {
    const newComment = req.body;
    fs.readFile(commentsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading comments file');
        }
        const comments = JSON.parse(data);
        comments.push(newComment);
        fs.writeFile(commentsFilePath, JSON.stringify(comments, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing comments file');
            }
            res.status(201).send('Comment added');
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});