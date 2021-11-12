require('dotenv').config();
const express = require('express');
const cors = require('cors')
const {initConnection} = require('./database/config');

// create express server
const app = express();

// Configure CORS
app.use(cors());

// Parse and read body
app.use(express.json());

// Init db connection
initConnection();

// Public directory
app.use(express.static('public'));

//Routes
app.use('/api/users', require('./routes/users.routes'));

app.use('/api/login', require('./routes/auth.routes'));

app.use('/api/hospitals', require('./routes/hospitals.route'));

app.use('/api/medicos', require('./routes/medicos.routes'));

app.use('/api/search', require('./routes/search.route'));

app.use('/api/upload', require('./routes/upload.routes'));


app.listen(process.env.PORT, () => {
    console.log('Server running at port: ', process.env.PORT)
});
