// ----------------ALL ROUTERS---------------------

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.port || 11000;
const user = require('./router/user');
const admin = require('./router/admin');
const path = require("path");
const category = require('./router/category');
const product = require('./router/product');
const order = require('./router/order');
const cors = require('cors');
app.use(cors());

// ----------------DATABASE CONNECTION---------------------

mongoose.connect('mongodb+srv://amitkumarsingh1482:amit1234@first-c.2z2tzps.mongodb.net/db').then(() => console.log("DB Connected!!")).
    catch((err) => console.log({ "Error": err }));

app.use(bodyParser.json());

app.use('/api/v1', user);
app.use('/api/v2', admin);
app.use('/api/v3', category);
app.use('/api/v4', product);
app.use('/api/v5', order);

app.use(express.static(path.join(__dirname, 'frontcode/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/frontcode/build/index.html'));
});

// ----------------SERVER CONNECTION---------------------

app.listen(port, () => console.log("Server Created !!"));