const express = require('express');
const app = express();
app.use(express.static("public"));
app.listen(3001);
app.set('view engine', 'ejs');

app.get("/", (request, response) => {
    response.render("index");
});

app.get("/day/:day", (request, response) => {
    response.render(`day`, {day: request.params.day});
});