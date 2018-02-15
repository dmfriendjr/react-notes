const express = require('express');
const app = express();

const port = process.env.PORT || 8000;

app.get('/api', (req, res) => {
  res.send('Response testing');
});

app.listen(port, () => {
  console.log('API Server is listening');
});