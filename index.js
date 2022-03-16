import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 5000;
const local = 'localhost';
app.set('view engine', 'ejs');

// kasus harian covid indonesia
app.get('/', (req, res) => {
  fetch('https://data.covid19.go.id/public/api/update.json')
    .then((response) => response.json())
    .then((data) => res.render('index', { content: JSON.stringify(data) }));
});

// kasus covid di seluruh provinsi
app.get('/covid-province', (req, res) => {
  fetch('https://data.covid19.go.id/public/api/prov.json')
    .then((response) => response.json())
    .then((data) =>
      res.render('covid_prov', { content: JSON.stringify(data) })
    );
});

// kasus covid harian di seluruh provinsi
app.get('/covid-province-daily', (req, res) => {
  fetch('https://data.covid19.go.id/public/api/prov_time.json')
    .then((response) => response.json())
    .then((data) => {
      res.render('daily_covid_prov', { content: JSON.stringify(data) });
    });
});

// resiko covid di provinsi indonesia
app.get('/covid-province-risk', (req, res) => {
  fetch('https://data.covid19.go.id/public/api/skor.json')
    .then((response) => response.json())
    .then((data) => {
      res.render('risk_covid', { content: JSON.stringify(data) });
    });
});


app.listen(port, () => {
  console.log(`Your server running at http://${local}:${port}`);
});
