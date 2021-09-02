const express = require ('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require ('mysql2');

require ('dotenv').config();

const app = express ();
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());


//for static files like adding html and css
app.use(express.static('public'));


app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine', 'hbs');


const db = mysql.createConnection({
    connectionLimit : 100,
    host        : process.env.DB_HOST,
    user        : process.env.DB_USER,
    password    : process.env.DB_PASS,
    database    : process.env.DB_NAME

});
db.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    } else {
        console.log('MySQL Connected');
    }
});

const routes = require('./server/routes/user');
app.use('/', routes);

app.listen(port,()=>console.log (`listening on port ${port}`));



