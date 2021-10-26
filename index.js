require('dotenv').config();
const express = require('express');
const cors = require('cors')
const {initConnection} = require('./database/config');

// create express server
const app = express();
app.use(cors());

// db connection
initConnection().then(() => {

});
//Routes

app.get('/', (req, response) => {
    response
        // .status(400)
        .json({
            msg: 'Hola',
        });
});


app.listen(process.env.PORT, () => {
    console.log('Server running at port: ', process.env.PORT)
});
