const path = require('path');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
// app.use(getWeather);

function getWeather(req, res, next) {
  req.visitorWeather = true;
  req.visitorWeather ? 'Please come back when it is not raining' : next();
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.get('/', (req, res) => {
  res.render('home', {
    isRaining: req.visitorWeather,
    pets: [
      { name: 'meaowsalot', species: 'cat' },
      { name: 'barksalot', species: 'dog' },
    ],
  });
});

app.get('/about', (req, res) => {
  res.send("We're happy you are here.");
});

app.post('/result', (req, res) => {
  req.body.colour.trim().toUpperCase() == 'BLUE'
    ? res.send('Congrats')
    : res.send('Sorry');
});

app.get('/result', (req, res) => {
  res.send('Why are you here?');
});

app.listen(3000);
