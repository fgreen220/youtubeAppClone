var express = require('express');
var app = express();
var config = require('./config.js');
var https = require('https');
var cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }), cors());
var videoBase = 'https://www.googleapis.com/youtube/v3/videos';
var videoPart = "snippet,contentDetails,player,statistics";
var videoChart = "mostPopular";
var regionCode = "US";
var maxResults = 12;
app.get('/', function (request, response) {
    response.json({ info: 'Youtube API' });
});
app.get('/home-videos', function (request, response) {
    var pagetoken = request.headers.pagetoken;
    https.get(pagetoken !== '0' ?
        videoBase + "?part=" + videoPart + "&regionCode=" + regionCode + "&chart=" + videoChart + "&maxResults=" + maxResults + "&pageToken=" + pagetoken + "&key=" + config.YT_KEY
        : videoBase + "?part=" + videoPart + "&regionCode=" + regionCode + "&chart=" + videoChart + "&maxResults=" + maxResults + "&key=" + config.YT_KEY, function (resp) {
        var data = '';
        resp.on('data', function (chunk) {
            data += chunk;
        });
        resp.on('end', function () {
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify(data));
        });
    }).on('error', function (err) {
        console.log("Error\": " + err.message);
    });
});
app.get('/trending', function (request, response) {
    var pagetoken = request.headers.pagetoken;
    var trendingpage = request.headers.trendingpage;
    https.get(pagetoken !== '0' ?
        videoBase + "?part=" + videoPart + "&regionCode=" + regionCode + "&chart=" + videoChart + "&maxResults=" + maxResults + "&pageToken=" + pagetoken + "&videoCategoryId=" + trendingpage + "&key=" + config.YT_KEY
        : videoBase + "?part=" + videoPart + "&regionCode=" + regionCode + "&chart=" + videoChart + "&maxResults=" + maxResults + "&videoCategoryId=" + trendingpage + "&key=" + config.YT_KEY, function (resp) {
        if (resp.statusCode !== 400) {
            var data_1 = '';
            resp.on('data', function (chunk) {
                data_1 += chunk;
            });
            resp.on('end', function () {
                response.setHeader('Content-Type', 'application/json');
                response.send(JSON.stringify(data_1));
            });
        }
        if (resp.statusCode === 400) {
            https.get(videoBase + "?part=" + videoPart + "&regionCode=" + regionCode + "&chart=" + videoChart + "&maxResults=" + maxResults + "&key=" + config.YT_KEY, function (resp) {
                var data = '';
                resp.on('data', function (chunk) {
                    data += chunk;
                });
                resp.on('end', function () {
                    response.setHeader('Content-Type', 'application/json');
                    response.send(JSON.stringify(data));
                });
            });
        }
    }).on('error', function (err) {
        console.log("Error\": " + err.message);
    });
});
var commentParts = 'snippet,replies';
app.get('/comments', function (request, response) {
    var videoid = request.headers.videoid;
    https.get("https://www.googleapis.com/youtube/v3/commentThreads?part=" + commentParts + "&videoId=" + videoid + "&order=relevance&key=" + config.YT_KEY, function (resp) {
        var data = '';
        resp.on('data', function (chunk) {
            data += chunk;
        });
        resp.on('end', function () {
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify(data));
        });
    }).on('error', function (err) {
        console.log("Error\": " + err.message);
    });
});
app.get('/search', function (request, response) {
    var searchquery = request.headers.searchquery;
    var part = 'snippet';
    https.get("https://www.googleapis.com/youtube/v3/search?part=" + part + "&q=" + searchquery + "&type=video&maxResults=50&key=" + config.YT_KEY, function (resp) {
        var data = '';
        resp.on('data', function (chunk) {
            data += chunk;
        });
        resp.on('end', function () {
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify(data));
        });
    }).on('error', function (err) {
        console.log("Error\": " + err.message);
    });
});
app.get('/result-videos', function (request, response) {
    var resultvideoid = request.headers.resultvideoid;
    var part = 'snippet,statistics,contentDetails';
    https.get("https://www.googleapis.com/youtube/v3/videos?part=" + part + "&id=" + resultvideoid + "&type=video&key=" + config.YT_KEY, function (resp) {
        var data = '';
        resp.on('data', function (chunk) {
            data += chunk;
        });
        resp.on('end', function () {
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify(data));
        });
    }).on('error', function (err) {
        console.log("Error\": " + err.message);
    });
});
var port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
app.listen(port, function () { return console.log('Server Started'); });
