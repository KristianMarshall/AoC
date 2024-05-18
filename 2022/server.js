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

        files.sort(fileSort);
        response.render("index", {days: files});
        
    });
    
});

app.get("/day/:day", (request, response) => {
    response.render(`day`, {
        day: request.params.day,
        test: request.query.test !== undefined
    });
});

function fileSort(a, b){
    a = parseInt(a.slice(3, a.length-3));
    b = parseInt(b.slice(3, b.length-3));
    return a - b;
}
