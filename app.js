const express = require('express');
const PORT = 3000 || process.env.PORT;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const routerValidation = require('./routes/routes');
const app = express();

app.use('/', routerValidation);

app.listen(PORT, ()=>{
    console.log('server running!')
})