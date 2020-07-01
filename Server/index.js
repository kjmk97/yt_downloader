const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const https = require('https');

var certificate  = fs.readFileSync('/etc/letsencrypt/live/youtubetomp3.plus/fullchain.pem', 'utf8');
var privateKey = fs.readFileSync('/etc/letsencrypt/live/youtubetomp3.plus/privkey.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(8443);

var path = require('path');

app.use(cors());

app.listen(8080, () => {
    console.log('Server Works !!! At port 8080');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/app.js', (req, res) => {
    res.sendFile(path.join(__dirname+'/app.js'));
});

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname+'/style.css'));
});
app.get('/favicon.png', (req, res) => {
    res.sendFile(path.join(__dirname+'/favicon.png'));
});

app.get('/download', (req,res,next) => {
    try {
        var URL = req.query.URL;
        let stream = ytdl(URL, {
            quality: 'highestaudio',
          });
        res.header('Content-Disposition', 'attachment; filename="video.mp3"');
    	ffmpeg(stream)
            .audioBitrate(128)
            .format('mp3')
            .on('error', function(err) {
                console.log('An error occurred: ' + err.message);
                next(err)
            })
            .writeToStream(res);
    } catch(err) {
        next(err)
    }
});
// 404 Error
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

// Error Handler
app.use((err, req, res, next) => {
    res.status(500).sendFile(path.join(__dirname+'/index.html'))
});
