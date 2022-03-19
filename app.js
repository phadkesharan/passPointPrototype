const express = require('express');
const path = require('path');

const app = express();

let coordinates = [];
let coordinatesLogin = [];
const tol = 10;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/verify', (req, res) => {

    console.log(coordinates);
    console.log(coordinatesLogin);

    if (coordinates.length != coordinatesLogin.length)
        res.render('error');


    const n = coordinates.length;

    let flag = true;
    for (let i = 0; i < n; i++) {

        const aX = Number(coordinates[i].X);
        const bX = Number(coordinatesLogin[i].X);

        const aY = Number(coordinates[i].Y);
        const bY = Number(coordinatesLogin[i].Y);

        if((bX > aX + tol) || (bX < aX - Number(tol))) {
            flag = false;
            console.log(aX + tol);
            console.log(aX - tol);
            console.log(bX);
            break;
        }

        if((bY > aY + tol) ||( bY < aY - Number(tol))) {
            flag = false;
            console.log(aY);
            console.log(bY);
            break;
        }
    }

    if(!flag)
        context = {result: 'Error Wrong Passpoints!'};

    else 
        context = {result: 'Success Login!'}

    coordinates = [];
    coordinatesLogin = [];

    res.render('result', context);
})

app.post('/data', (req, res) => {
    const imgX = req.body.imgX;
    const imgY = req.body.imgY;

    coordinates.push({ 'X': imgX, 'Y': imgY });
    console.log(coordinates);
    res.redirect('/register');
})

app.post('/dataLogin', (req, res) => {
    const imgX = req.body.imgX;
    const imgY = req.body.imgY;

    coordinatesLogin.push({ 'X': imgX, 'Y': imgY });
    console.log(coordinatesLogin);
    res.redirect('/login');
})

app.listen(8000, (err) => {
    if (!err)
        console.log("server running on port 8000");
})