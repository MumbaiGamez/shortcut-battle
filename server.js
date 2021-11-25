const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3000;
const STATIC_DIR = path.resolve(__dirname, 'dist');
const INDEX = path.resolve(STATIC_DIR, 'index.html');
const SW = path.resolve(STATIC_DIR, 'sw.js');

const app = express();

app.use(express.static(STATIC_DIR));

app.get('/sw.js', (req, res) => {
  res.writeHead(201, {
    'Content-Type': 'application/javascript',
  });
  res.sendFile(SW);
});

app.get('*', (req, res) => {
  res.sendFile(INDEX);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
