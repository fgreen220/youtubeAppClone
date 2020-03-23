let express = require('express');
const app = express();
const config = require('./config.js');
const https = require('https');
const cors = require('cors');

app.use(express.json());

app.use(express.urlencoded({ extended: true }), cors())

const videoBase = 'https://www.googleapis.com/youtube/v3/videos';
const videoPart = `snippet,contentDetails,player,statistics`;
const videoChart = `mostPopular`;
const regionCode = `US`;

const maxResults = 12;

app.get('/', (request:any, response:any) => {
  response.json({info:'Youtube API'})
});

app.get('/home-videos', (request:any, response:any) => {
  const { pagetoken } = request.headers;
  https.get(pagetoken !== '0'?
    `${videoBase}?part=${videoPart}&regionCode=${regionCode}&chart=${videoChart}&maxResults=${maxResults}&pageToken=${pagetoken}&key=${config.YT_KEY}`
    :`${videoBase}?part=${videoPart}&regionCode=${regionCode}&chart=${videoChart}&maxResults=${maxResults}&key=${config.YT_KEY}`, (resp:any) => {
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

app.get('/trending', (request:any, response:any) => {
  const { pagetoken } = request.headers;
  const { trendingpage } = request.headers;
  https.get(pagetoken !== '0'?
    `${videoBase}?part=${videoPart}&regionCode=${regionCode}&chart=${videoChart}&maxResults=${maxResults}&pageToken=${pagetoken}&videoCategoryId=${trendingpage}&key=${config.YT_KEY}`
    :`${videoBase}?part=${videoPart}&regionCode=${regionCode}&chart=${videoChart}&maxResults=${maxResults}&videoCategoryId=${trendingpage}&key=${config.YT_KEY}`, (resp:any) => {
      if(resp.statusCode !== 400){
        let data = '';

        resp.on('data', (chunk:any) => {
          data+= chunk;
        });

        resp.on('end', () => {
          response.setHeader('Content-Type', 'application/json');
          response.send(JSON.stringify(data));
        })
      }
      if(resp.statusCode === 400) {
        https.get(`${videoBase}?part=${videoPart}&regionCode=${regionCode}&chart=${videoChart}&maxResults=${maxResults}&key=${config.YT_KEY}`, (resp:any) => {
            let data = '';
      
            resp.on('data', (chunk:any) => {
              data+= chunk;
            });
        
            resp.on('end', () => {
              response.setHeader('Content-Type', 'application/json');
              response.send(JSON.stringify(data));
          })
        })
      }
  }).on('error', (err:any) => {
    console.log(`Error": ${err.message}`);
  })
})

const commentParts = 'snippet,replies';

app.get('/comments', (request:any, response:any) => {
  const { videoid } = request.headers;
  https.get(`https://www.googleapis.com/youtube/v3/commentThreads?part=${commentParts}&videoId=${videoid}&order=relevance&key=${config.YT_KEY}`, (resp:any) => {
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

app.get('/search', (request:any, response:any) => {
  const { searchquery } = request.headers;
  const part = 'snippet';
  https.get(`https://www.googleapis.com/youtube/v3/search?part=${part}&q=${searchquery}&type=video&maxResults=50&key=${config.YT_KEY}`, (resp:any) => {
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

app.get('/result-videos', (request:any, response:any) => {
  const { resultvideoid } = request.headers;
  const part = 'snippet,statistics,contentDetails';
  https.get(`https://www.googleapis.com/youtube/v3/videos?part=${part}&id=${resultvideoid}&type=video&key=${config.YT_KEY}`, (resp:any) => {
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
