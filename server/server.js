const { log } = require('console');
const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config()

app.get('*', (req, res) => {
  res.json({messg: 'Welcome to the test'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});