// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const path = require('path');

// Configure middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public/dist')));

// Import database queries
const db = require('../db/index.js');

// Get all comments
app.get('/api/comments', (req, res) => {
  db.getAllComments((err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

// Add a comment
app.post('/api/comments', (req, res) => {
  db.addComment(req.body, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

// Update a comment
app.put('/api/comments', (req, res) => {
  db.updateComment(req.body, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

// Delete a comment
app.delete('/api/comments', (req, res) => {
  db.deleteComment(req.body, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});