var express = require('express')
var app = express()
var session = require('express-session')
var BodyParser = require('body-parser')

app.use(session({
    secret: 'keyboard cat', cookie: { maxAge: 60000 },
    resave: false, saveUninitialized: false
}))
app.use(BodyParser.urlencoded({ extended: true }));
app.set('views', './views')
app.set('view engine', 'ejs')


app.get('/', function (req, res) {
    res.render('Form')
})

app.post('/admin', function (req, res) {
    if (!req.body.email || req.body.pwd !== '240311') {
        res.redirect('/admin')
    }
    else {
        req.session.is = req.body.email
        res.redirect('/admin')
    }

})

app.get('/admin', function (req, res) {
    if (req.session.is) {
        res.render('Admin', { email: req.session.is })
    } else {
        res.render('LoginAgain')
    }
})


app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

app.listen(8000)
