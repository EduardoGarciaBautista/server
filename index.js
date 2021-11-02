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

//Routes
app.use('/api/users', require('./routes/users.routes'));

app.use('/api/login', require('./routes/auth.routes'))

app.listen(process.env.PORT, () => {
    console.log('Server running at port: ', process.env.PORT)
});
