const express = require('express');
const app = express();
const port = require('./config').port;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/auth');
const movieRoutes = require('./src/routes/movie');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(authRoutes);
app.use(movieRoutes);

mongoose.connect('mongodb://localhost/tbms_db')
    .then(() => {
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        });
    })
    .catch(err => {
        console.log('Failed to connect MongoDB..!!', err);
    })