const express = require('express');
const path = require('path');
const configViewEngine=(app)=>{
    //config static files
    app.use(express.static(path.join('./src','public')))
}
module.exports = configViewEngine;