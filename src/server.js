const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname+'/dist/ng-blog'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/ng-blog/index.html'));
});

app.listen(process.env.PORT || 8080);
// {
// "scripts": {
//     "ng": "ng",
//     "start": "node server.js",
//     "build": "ng build",
//     "test": "ng test",
//     "lint": "ng lint",
//     "e2e": "ng e2e",
//     "lite": "lite-server",
//     "postinstall": "ng build --prod"
//   }

// "engines": {
// "node": "10.14.2",
// "npm": "6.4.1"
//     }

// }