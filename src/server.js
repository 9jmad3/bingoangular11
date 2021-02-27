const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname+'/dist/ng-blog'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/ng-blog/bingo-dos'));
});

app.listen(process.env.PORT || 8080);

// ORIGINALES DE PACKAGE.JSON
// {
// "scripts": {
//     "ng": "ng",
//     "start": "ng serve",
//     "lite": "lite-server",
//     "postinstall": "ng build --prod"
//   }
// No traia nada de engines