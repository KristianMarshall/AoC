const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
app.use(express.static("public"));
app.listen(3000);
app.set('view engine', 'ejs');

app.get("/", (request, response) => {

    fs.readdir(path.join(__dirname, './public/days'), function (err, files) {

        if (err)
            return console.log('Unable to scan directory: ' + err);

            response.render("index", {days: files});

    });
    
});

app.get("/day/:day", (request, response) => {
    response.render(`day`, {day: request.params.day});
});
