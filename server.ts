let express = require('express');
const app = express();
const config = require('./config.js');
const https = require('https');
const cors = require('cors');

app.use(express.json());

app.use(express.urlencoded({ extended: true }), cors())

const videoBase = 'https://www.googleapis.com/youtube/v3/videos';
const videoPart = `snippet,contentDetails,player`;
const videoChart = `mostPopular`;
const regionCode = `US`;
const maxResults = 10;

app.get('/', (request:any, response:any) => {
  response.json({info:'Youtube API'})
});

app.get('/home-videos', (request:any, response:any) => {
  https.get(`${videoBase}?part=${videoPart}&regionCode=${regionCode}&chart=${videoChart}&maxResults=${maxResults}&key=${config.YT_KEY}`, (resp:any) => {
    let data = '';

    resp.on('data', (chunk:any) => {
      data+= chunk;
    });

    resp.on('end', () => {
      response.setHeader('Content-Type', 'application/json');
      response.send(JSON.stringify(data));
    })
  }).on('error', (err:any) => {
    console.log(`Error": ${err.message}`);
  })
})

app.listen(3000, () => console.log('Server Started'));
