const express = require('express');
const routes = require('./routes/indexRouter');
require('dotenv').config();
var cors = require('cors');
var morgan = require('morgan');

const port = process.env.PORT;
const app = express();

app.use(morgan('dev'));
app.use(cors({
  origin:'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true
}));

app.use('/api/v1', routes);

app.listen(port, () => {
  console.log(`App is running and listening on port ${port}`);
})